#!/usr/bin/env node
/**
 * Migrate the 50 hardcoded problems into the graph_exercises table.
 *
 * For each problem:
 * 1. Create an exercise node in graph_exercises
 * 2. Link it to its primary concept via a TESTS edge
 * 3. Compute difficulty from prerequisite depth
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://wikibfhsndlwvfrvtgvu.supabase.co';

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

// Load problems
const problemsContent = fs.readFileSync(
  path.resolve(__dirname, '../src/data/problems.ts'),
  'utf-8'
);

const problems = [];
const problemRegex = /\{\s*id:\s*(\d+),[\s\S]*?title:\s*['"]([^'"]+)['"],[\s\S]*?difficulty:\s*['"]([^'"]+)['"],[\s\S]*?description:\s*['"]([^'"]+)['"],[\s\S]*?prerequisites:\s*\[([^\]]*)\]/g;
let pm;
while ((pm = problemRegex.exec(problemsContent)) !== null) {
  problems.push({
    id: parseInt(pm[1]),
    title: pm[2],
    difficulty: pm[3],
    description: pm[4],
    prerequisites: pm[5].split(',').map(t => parseInt(t.trim())).filter(n => !isNaN(n)),
  });
}

// Load concept mappings
const mapContent = fs.readFileSync(
  path.resolve(__dirname, '../src/data/problem-concept-map.ts'),
  'utf-8'
);

const mappings = [];
const mapRegex = /\{\s*problemId:\s*(\d+),\s*primaryConceptId:\s*['"]([^'"]+)['"],\s*secondaryConceptIds:\s*\[([^\]]*)\],\s*isSynthetic:\s*(true|false)/g;
let mm;
while ((mm = mapRegex.exec(mapContent)) !== null) {
  mappings.push({
    problemId: parseInt(mm[1]),
    primaryConceptId: mm[2],
    secondaryConceptIds: mm[3].split(',').map(t => t.trim().replace(/['"]/g, '')).filter(Boolean),
    isSynthetic: mm[4] === 'true',
  });
}

const mappingByProblemId = new Map(mappings.map(m => [m.problemId, m]));

// Difficulty mapping
const difficultyMap = { Beginner: 0.3, Intermediate: 0.6, Advanced: 0.9 };

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  console.log(`[migrate] ${problems.length} problems to migrate`);

  // Fetch graph to compute prerequisite depths
  console.log('[migrate] Fetching graph for depth computation...');
  const { data: graph, error: graphErr } = await supabase.rpc('get_full_graph');
  if (graphErr) {
    console.error('Failed to fetch graph:', graphErr.message);
    process.exit(1);
  }

  const nodes = new Map(graph.nodes.map(n => [n.id, n]));
  const requiresEdges = graph.edges.filter(e => e.type === 'REQUIRES');

  // Build adjacency list for REQUIRES
  const adj = new Map();
  for (const e of requiresEdges) {
    if (!adj.has(e.from_node)) adj.set(e.from_node, []);
    adj.get(e.from_node).push(e.to_node);
  }

  // Compute depth of each concept
  const depthCache = new Map();
  function getDepth(nodeId, visited = new Set()) {
    if (depthCache.has(nodeId)) return depthCache.get(nodeId);
    if (visited.has(nodeId)) return 0;
    visited.add(nodeId);

    const prereqs = adj.get(nodeId) || [];
    if (prereqs.length === 0) {
      depthCache.set(nodeId, 0);
      return 0;
    }

    const maxDepth = Math.max(...prereqs.map(p => getDepth(p, new Set(visited))));
    depthCache.set(nodeId, maxDepth + 1);
    return maxDepth + 1;
  }

  // Prepare exercises
  const exercises = [];
  const testEdges = [];

  for (const problem of problems) {
    const mapping = mappingByProblemId.get(problem.id);
    if (!mapping) {
      console.warn(`  No mapping for problem ${problem.id}: ${problem.title}`);
      continue;
    }

    const conceptId = mapping.primaryConceptId;
    const concept = nodes.get(conceptId);
    if (!concept) {
      console.warn(`  Concept not found: ${conceptId} for problem ${problem.id}`);
      continue;
    }

    const depth = getDepth(conceptId);
    const baseDifficulty = difficultyMap[problem.difficulty] || 0.5;
    // Adjust difficulty by depth: deeper concepts are harder
    const adjustedDifficulty = Math.min(0.95, baseDifficulty + (depth * 0.05));

    const exerciseId = `exercise:problem-${problem.id}`;

    exercises.push({
      id: exerciseId,
      title: problem.title,
      problem_id: problem.id,
      concept_ids: [conceptId, ...mapping.secondaryConceptIds.filter(id => nodes.has(id))],
      difficulty: adjustedDifficulty,
      discrimination: 1.0,
      exposure_count: 0,
      success_count: 0,
      success_rate: 0.5,
      content: {
        description: problem.description,
        difficulty: problem.difficulty,
        prerequisites: problem.prerequisites,
      },
      qualifiers: {
        source: { textbookId: 'problem-curriculum' },
        confidence: 0.95,
        dialects: ['standard'],
      },
    });

    // TESTS edge: exercise → primary concept
    testEdges.push({
      id: `edge:tests-${exerciseId}-${conceptId}`,
      from_node: exerciseId,
      to_node: conceptId,
      type: 'TESTS',
      qualifiers: {
        source: { textbookId: 'problem-curriculum' },
        confidence: 0.95,
        dialects: ['standard'],
        isPrimary: true,
      },
    });

    // TESTS edges to secondary concepts
    for (const secId of mapping.secondaryConceptIds) {
      if (!nodes.has(secId)) continue;
      testEdges.push({
        id: `edge:tests-${exerciseId}-${secId}`,
        from_node: exerciseId,
        to_node: secId,
        type: 'TESTS',
        qualifiers: {
          source: { textbookId: 'problem-curriculum' },
          confidence: 0.7,
          dialects: ['standard'],
          isPrimary: false,
        },
      });
    }
  }

  console.log(`[migrate] Prepared ${exercises.length} exercises, ${testEdges.length} TESTS edges`);

  // Clear existing exercise data
  console.log('[migrate] Clearing existing exercises...');
  await supabase.from('graph_edges').delete().like('id', 'edge:tests-%');
  await supabase.from('graph_exercises').delete().like('id', 'exercise:%');
  await supabase.from('graph_nodes').delete().like('id', 'exercise:%');

  const BATCH = 100;

  // Create exercise nodes in graph_nodes (required for edge FK)
  const exerciseNodes = exercises.map((ex) => ({
    id: ex.id,
    type: 'EXERCISE',
    labels: { default: ex.title, english: ex.title },
    attributes: { problem_id: ex.problem_id, difficulty: ex.difficulty },
    definition_cids: [],
  }));

  console.log('[migrate] Uploading exercise nodes...');
  for (let i = 0; i < exerciseNodes.length; i += BATCH) {
    const batch = exerciseNodes.slice(i, i + BATCH);
    const { error } = await supabase.from('graph_nodes').insert(batch);
    if (error) {
      console.error(`Node batch failed:`, error.message);
      process.exit(1);
    }
    process.stdout.write(`  ${Math.min(i + BATCH, exerciseNodes.length)}/${exerciseNodes.length}\r`);
  }
  console.log();

  // Upload exercises in batches
  console.log('[migrate] Uploading exercises...');
  for (let i = 0; i < exercises.length; i += BATCH) {
    const batch = exercises.slice(i, i + BATCH);
    const { error } = await supabase.from('graph_exercises').insert(batch);
    if (error) {
      console.error(`Exercise batch failed:`, error.message);
      process.exit(1);
    }
    process.stdout.write(`  ${Math.min(i + BATCH, exercises.length)}/${exercises.length}\r`);
  }
  console.log();

  // Upload TESTS edges
  console.log('[migrate] Uploading TESTS edges...');
  for (let i = 0; i < testEdges.length; i += BATCH) {
    const batch = testEdges.slice(i, i + BATCH);
    const { error } = await supabase.from('graph_edges').insert(batch);
    if (error) {
      console.error(`Edge batch failed:`, error.message);
      process.exit(1);
    }
    process.stdout.write(`  ${Math.min(i + BATCH, testEdges.length)}/${testEdges.length}\r`);
  }
  console.log();

  // Verify
  const { data, error: rpcErr } = await supabase.rpc('get_full_graph');
  if (rpcErr) {
    console.error('Verify failed:', rpcErr.message);
    process.exit(1);
  }

  const exerciseCount = data.nodes.filter(n => n.id.startsWith('exercise:')).length;
  const testsEdgeCount = data.edges.filter(e => e.type === 'TESTS').length;

  console.log('[migrate] ✅ Complete!');
  console.log(`  Exercises: ${exerciseCount}`);
  console.log(`  TESTS edges: ${testsEdgeCount}`);
  console.log(`  Total nodes: ${data.meta.node_count}`);
  console.log(`  Total edges: ${data.meta.edge_count}`);
}

main().catch(err => {
  console.error('[migrate] Failed:', err);
  process.exit(1);
});
