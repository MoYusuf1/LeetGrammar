#!/usr/bin/env node
/**
 * Generate REQUIRES edges from the problem curriculum DAG + IS_A transitive closure.
 *
 * Reads:
 *   - src/data/problems.ts (problem prerequisite DAG)
 *   - src/data/problem-concept-map.ts (problem → concept mappings)
 *   - Supabase graph (for IS_A edges and node existence checks)
 *
 * Writes:
 *   - scripts/output/new-requires-edges.json (edges to upload)
 *   - scripts/output/new-synthetic-nodes.json (nodes to create)
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://wikibfhsndlwvfrvtgvu.supabase.co';

// Load .env
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf-8');
  const vars = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    vars[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return vars;
}

const env = loadEnv();
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;

if (!SERVICE_KEY) {
  console.error('❌ No Supabase service role key in .env');
  process.exit(1);
}

const OUTPUT_DIR = path.resolve(__dirname, 'output');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ─── Load Problem Data ──────────────────────────────────────────────────────

const problemsContent = fs.readFileSync(
  path.resolve(__dirname, '../src/data/problems.ts'),
  'utf-8'
);

// Extract allProblems array entries
const problems = [];
const problemRegex = /\{\s*id:\s*(\d+),[\s\S]*?title:\s*['"]([^'"]+)['"],[\s\S]*?prerequisites:\s*\[([^\]]*)\]/g;
let pm;
while ((pm = problemRegex.exec(problemsContent)) !== null) {
  problems.push({
    id: parseInt(pm[1]),
    title: pm[2],
    prerequisites: pm[3].split(',').map(t => parseInt(t.trim())).filter(n => !isNaN(n)),
  });
}

// Extract grammar topics for unit ordering
const topicsContent = fs.readFileSync(
  path.resolve(__dirname, '../src/data/grammar-topics.ts'),
  'utf-8'
);
const topicProblemIds = [];
const topicRegex = /lessonIds:\s*\[([^\]]*)\]/g;
let tm;
while ((tm = topicRegex.exec(topicsContent)) !== null) {
  topicProblemIds.push(tm[1].split(',').map(t => parseInt(t.trim())).filter(n => !isNaN(n)));
}

// ─── Load Concept Mappings ──────────────────────────────────────────────────

// We can't directly require TS, so we'll parse the mapping file
const mapContent = fs.readFileSync(
  path.resolve(__dirname, '../src/data/problem-concept-map.ts'),
  'utf-8'
);

const mappings = [];
const mapRegex = /\{\s*problemId:\s*(\d+),\s*primaryConceptId:\s*['"]([^'"]+)['"],\s*secondaryConceptIds:\s*\[([^\]]*)\],\s*isSynthetic:\s*(true|false)(?:,\s*syntheticLabel:\s*['"]([^'"]*)['"])?/g;
let mm;
while ((mm = mapRegex.exec(mapContent)) !== null) {
  mappings.push({
    problemId: parseInt(mm[1]),
    primaryConceptId: mm[2],
    secondaryConceptIds: mm[3].split(',').map(t => t.trim().replace(/['"]/g, '')).filter(Boolean),
    isSynthetic: mm[4] === 'true',
    syntheticLabel: mm[5] || undefined,
  });
}

const mappingByProblemId = new Map(mappings.map(m => [m.problemId, m]));

// ─── Fetch Graph from Supabase ──────────────────────────────────────────────

async function main() {
  console.log('[generate] Fetching graph from Supabase...');
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: graph, error } = await supabase.rpc('get_full_graph');
  if (error) {
    console.error('Failed to fetch graph:', error.message);
    process.exit(1);
  }

  const nodeIds = new Set(graph.nodes.map(n => n.id));
  const isaEdges = graph.edges.filter(e => e.type === 'IS_A');
  const partOfEdges = graph.edges.filter(e => e.type === 'PART_OF');

  console.log(`[generate] Graph: ${graph.nodes.length} nodes, ${graph.edges.length} edges`);
  console.log(`[generate] IS_A edges: ${isaEdges.length}, PART_OF edges: ${partOfEdges.length}`);

  // ─── Identify synthetic concepts needed ───────────────────────────────────

  const syntheticNodes = [];
  for (const mapping of mappings) {
    if (mapping.isSynthetic && !nodeIds.has(mapping.primaryConceptId)) {
      syntheticNodes.push({
        id: mapping.primaryConceptId,
        type: 'CONCEPT',
        labels: { default: mapping.syntheticLabel, english: mapping.syntheticLabel },
        attributes: { synthetic: true, source: 'problem-curriculum-bridge' },
        definition_cids: [],
      });
      nodeIds.add(mapping.primaryConceptId);
    }
  }

  console.log(`[generate] Synthetic concepts to create: ${syntheticNodes.length}`);
  for (const n of syntheticNodes) {
    console.log(`  ${n.id} → "${n.labels.default}"`);
  }

  // ─── Build IS_A lookup tables ─────────────────────────────────────────────

  // child → parent
  const isAChildToParent = new Map();
  for (const e of isaEdges) {
    isAChildToParent.set(e.from_node, e.to_node);
  }
  // parent → children
  const isAParentToChildren = new Map();
  for (const e of isaEdges) {
    if (!isAParentToChildren.has(e.to_node)) isAParentToChildren.set(e.to_node, []);
    isAParentToChildren.get(e.to_node).push(e.from_node);
  }

  // Get all descendants of a node (via IS_A)
  function getDescendants(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);
    const children = isAParentToChildren.get(nodeId) || [];
    const result = [...children];
    for (const child of children) {
      result.push(...getDescendants(child, visited));
    }
    return result;
  }

  // Get all ancestors of a node (via IS_A)
  function getAncestors(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);
    const parent = isAChildToParent.get(nodeId);
    if (!parent) return [];
    return [parent, ...getAncestors(parent, visited)];
  }

  // ─── Phase 2: Generate REQUIRES from Problem DAG ──────────────────────────

  console.log('[generate] Phase 2: Building REQUIRES edges from problem DAG...');

  const newEdges = [];
  const edgeIdSet = new Set(graph.edges.map(e => e.id));

  function addEdge(from, to, source) {
    if (!nodeIds.has(from)) {
      console.warn(`  Skip: from node missing: ${from}`);
      return;
    }
    if (!nodeIds.has(to)) {
      console.warn(`  Skip: to node missing: ${to}`);
      return;
    }
    if (from === to) return;

    const id = `edge:req-${source}-${from.replace(/:/g, '-')}-${to.replace(/:/g, '-')}`;
    if (edgeIdSet.has(id)) return;
    edgeIdSet.add(id);

    newEdges.push({
      id,
      from_node: from,
      to_node: to,
      type: 'REQUIRES',
      qualifiers: {
        source: { textbookId: 'problem-curriculum' },
        confidence: 0.95,
        dialects: ['standard'],
      },
    });
  }

  for (const problem of problems) {
    const mapping = mappingByProblemId.get(problem.id);
    if (!mapping) {
      console.warn(`  No mapping for problem ${problem.id}: ${problem.title}`);
      continue;
    }

    const fromConcept = mapping.primaryConceptId;

    for (const prereqId of problem.prerequisites) {
      const prereqMapping = mappingByProblemId.get(prereqId);
      if (!prereqMapping) continue;

      const toConcept = prereqMapping.primaryConceptId;
      addEdge(fromConcept, toConcept, `p${problem.id}`);
    }
  }

  console.log(`[generate] Phase 2 complete: ${newEdges.length} edges from problem DAG`);

  // ─── Phase 3: Transitive Closure via IS_A ─────────────────────────────────

  console.log('[generate] Phase 3: IS_A transitive closure...');

  const baseRequires = [...newEdges];
  const closureCount = { downstream: 0, upstream: 0, partOfDownstream: 0 };

  // Downstream: if B REQUIRES C and A IS_A B, then A REQUIRES C
  for (const reqEdge of baseRequires) {
    const b = reqEdge.from_node;
    const c = reqEdge.to_node;

    // Find all A such that A IS_A B
    const descendants = getDescendants(b);
    for (const a of descendants) {
      const before = newEdges.length;
      addEdge(a, c, 'isa-down');
      if (newEdges.length > before) closureCount.downstream++;
    }
  }

  // Upstream: if C REQUIRES B and B IS_A A, then C REQUIRES A
  for (const reqEdge of baseRequires) {
    const c = reqEdge.from_node;
    const b = reqEdge.to_node;

    const ancestors = getAncestors(b);
    for (const a of ancestors) {
      const before = newEdges.length;
      addEdge(c, a, 'isa-up');
      if (newEdges.length > before) closureCount.upstream++;
    }
  }

  // PART_OF downstream: if B REQUIRES C and A PART_OF B, then A REQUIRES C
  const partOfChildToParent = new Map();
  for (const e of partOfEdges) {
    partOfChildToParent.set(e.from_node, e.to_node);
  }
  const partOfParentToChildren = new Map();
  for (const e of partOfEdges) {
    if (!partOfParentToChildren.has(e.to_node)) partOfParentToChildren.set(e.to_node, []);
    partOfParentToChildren.get(e.to_node).push(e.from_node);
  }

  function getPartOfDescendants(nodeId, visited = new Set()) {
    if (visited.has(nodeId)) return [];
    visited.add(nodeId);
    const children = partOfParentToChildren.get(nodeId) || [];
    const result = [...children];
    for (const child of children) {
      result.push(...getPartOfDescendants(child, visited));
    }
    return result;
  }

  for (const reqEdge of baseRequires) {
    const b = reqEdge.from_node;
    const c = reqEdge.to_node;

    const descendants = getPartOfDescendants(b);
    for (const a of descendants) {
      const before = newEdges.length;
      addEdge(a, c, 'partof-down');
      if (newEdges.length > before) closureCount.partOfDownstream++;
    }
  }

  console.log(`[generate] Phase 3 complete:`);
  console.log(`  IS_A downstream (subtype inherits prereq): ${closureCount.downstream}`);
  console.log(`  IS_A upstream (prereq of subtype → supertype): ${closureCount.upstream}`);
  console.log(`  PART_OF downstream (component inherits prereq): ${closureCount.partOfDownstream}`);

  // ─── Summary ──────────────────────────────────────────────────────────────

  console.log(`\n[generate] TOTAL NEW EDGES: ${newEdges.length}`);
  console.log(`[generate] Breakdown:`);
  console.log(`  From problem DAG: ${baseRequires.length}`);
  console.log(`  From IS_A/PART_OF closure: ${newEdges.length - baseRequires.length}`);

  // Count concepts with REQUIRES edges now
  const connectedConcepts = new Set();
  for (const e of newEdges) {
    connectedConcepts.add(e.from_node);
    connectedConcepts.add(e.to_node);
  }
  // Also count existing REQUIRES edges
  const existingRequires = graph.edges.filter(e => e.type === 'REQUIRES');
  for (const e of existingRequires) {
    connectedConcepts.add(e.from_node);
    connectedConcepts.add(e.to_node);
  }

  const conceptNodes = graph.nodes.filter(n => n.type === 'CONCEPT');
  console.log(`\n[generate] Coverage:`);
  console.log(`  Concepts with REQUIRES edges: ${connectedConcepts.size} / ${conceptNodes.length} (${Math.round(connectedConcepts.size / conceptNodes.length * 100)}%)`);

  // ─── Write Output ─────────────────────────────────────────────────────────

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'new-synthetic-nodes.json'),
    JSON.stringify(syntheticNodes, null, 2)
  );
  console.log(`\n[generate] Wrote ${syntheticNodes.length} synthetic nodes → scripts/output/new-synthetic-nodes.json`);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'new-requires-edges.json'),
    JSON.stringify(newEdges, null, 2)
  );
  console.log(`[generate] Wrote ${newEdges.length} REQUIRES edges → scripts/output/new-requires-edges.json`);

  // Also write a summary report
  const report = {
    syntheticNodes: syntheticNodes.length,
    newEdges: newEdges.length,
    fromProblemDag: baseRequires.length,
    fromClosure: newEdges.length - baseRequires.length,
    conceptsWithRequires: connectedConcepts.size,
    totalConcepts: conceptNodes.length,
    coveragePct: Math.round(connectedConcepts.size / conceptNodes.length * 100),
  };
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'report.json'),
    JSON.stringify(report, null, 2)
  );
}

main().catch(err => {
  console.error('[generate] Failed:', err);
  process.exit(1);
});
