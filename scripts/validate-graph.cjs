#!/usr/bin/env node
/**
 * Validate the REQUIRES graph after seeding.
 *
 * Checks:
 * 1. No cycles in REQUIRES subgraph
 * 2. Prerequisite chains make sense for sample concepts
 * 3. Stats: depth distribution, bottleneck nodes
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

async function main() {
  console.log('[validate] Fetching graph...');
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  const { data: graph, error } = await supabase.rpc('get_full_graph');
  if (error) {
    console.error('Failed:', error.message);
    process.exit(1);
  }

  const nodes = new Map(graph.nodes.map(n => [n.id, n]));
  const requiresEdges = graph.edges.filter(e => e.type === 'REQUIRES');
  const isaEdges = graph.edges.filter(e => e.type === 'IS_A');

  console.log(`\n[validate] Graph stats:`);
  console.log(`  Nodes: ${graph.nodes.length}`);
  console.log(`  Edges: ${graph.edges.length}`);
  console.log(`  REQUIRES edges: ${requiresEdges.length}`);
  console.log(`  IS_A edges: ${isaEdges.length}`);

  // ─── 1. Cycle Detection ───────────────────────────────────────────────────

  console.log('\n[validate] Checking for cycles in REQUIRES subgraph...');

  const adj = new Map();
  for (const e of requiresEdges) {
    if (!adj.has(e.from_node)) adj.set(e.from_node, []);
    adj.get(e.from_node).push(e.to_node);
  }

  const cycles = [];
  const visited = new Set();
  const recStack = new Set();

  function dfs(node, path) {
    visited.add(node);
    recStack.add(node);

    for (const neighbor of adj.get(node) || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, [...path, neighbor]);
      } else if (recStack.has(neighbor)) {
        const cycleStart = path.indexOf(neighbor);
        cycles.push([...path.slice(cycleStart), neighbor]);
      }
    }

    recStack.delete(node);
  }

  for (const nodeId of adj.keys()) {
    if (!visited.has(nodeId)) dfs(nodeId, [nodeId]);
  }

  if (cycles.length === 0) {
    console.log('  ✅ No cycles found — REQUIRES graph is a DAG');
  } else {
    console.log(`  ❌ Found ${cycles.length} cycle(s):`);
    for (const cycle of cycles.slice(0, 5)) {
      console.log('    ' + cycle.map(id => nodes.get(id)?.labels?.default || id).join(' → '));
    }
  }

  // ─── 2. Prerequisite Depth Analysis ───────────────────────────────────────

  console.log('\n[validate] Prerequisite depth analysis...');

  const depthMap = new Map();

  function getDepth(nodeId, visited = new Set()) {
    if (depthMap.has(nodeId)) return depthMap.get(nodeId);
    if (visited.has(nodeId)) return 0; // cycle guard
    visited.add(nodeId);

    const prereqs = adj.get(nodeId) || [];
    if (prereqs.length === 0) {
      depthMap.set(nodeId, 0);
      return 0;
    }

    const maxDepth = Math.max(...prereqs.map(p => getDepth(p, new Set(visited))));
    depthMap.set(nodeId, maxDepth + 1);
    return maxDepth + 1;
  }

  const conceptDepths = [];
  for (const [id, node] of nodes) {
    if (node.type === 'CONCEPT' && adj.has(id)) {
      conceptDepths.push({ id, label: node.labels?.default || id, depth: getDepth(id) });
    }
  }

  conceptDepths.sort((a, b) => b.depth - a.depth);

  const depthDistribution = {};
  for (const c of conceptDepths) {
    depthDistribution[c.depth] = (depthDistribution[c.depth] || 0) + 1;
  }

  console.log('  Depth distribution:');
  for (let d = 0; d <= Math.max(...Object.keys(depthDistribution).map(Number)); d++) {
    const count = depthDistribution[d] || 0;
    const bar = '█'.repeat(Math.min(count, 40));
    console.log(`    depth ${d.toString().padStart(2)}: ${count.toString().padStart(3)} ${bar}`);
  }

  console.log('\n  Deepest chains (top 10):');
  for (const c of conceptDepths.slice(0, 10)) {
    console.log(`    depth ${c.depth.toString().padStart(2)}: ${c.label}`);
  }

  // ─── 3. Bottleneck Detection ──────────────────────────────────────────────

  console.log('\n[validate] Bottleneck nodes (most downstream dependents)...');

  const downstreamCount = new Map();
  for (const e of requiresEdges) {
    downstreamCount.set(e.to_node, (downstreamCount.get(e.to_node) || 0) + 1);
  }

  const bottlenecks = [];
  for (const [nodeId, count] of downstreamCount) {
    const node = nodes.get(nodeId);
    if (node && node.type === 'CONCEPT') {
      bottlenecks.push({ id: nodeId, label: node.labels?.default || nodeId, count });
    }
  }

  bottlenecks.sort((a, b) => b.count - a.count);

  console.log('  Top 15 bottlenecks (concepts most required by others):');
  for (const b of bottlenecks.slice(0, 15)) {
    console.log(`    ${b.count.toString().padStart(3)} dependents: ${b.label}`);
  }

  // ─── 4. Sample Prerequisite Chains ────────────────────────────────────────

  console.log('\n[validate] Sample prerequisite chains:');

  const samples = [
    'concept:subordinate-clause',
    'concept:causative',
    'concept:passive-construction',
    'concept:conditional',
    'concept:focus-marker',
  ];

  for (const startId of samples) {
    const node = nodes.get(startId);
    if (!node) continue;

    const chain = [];
    const seen = new Set();
    let current = startId;

    while (current && !seen.has(current)) {
      seen.add(current);
      const n = nodes.get(current);
      chain.push(n?.labels?.default || current);
      const prereqs = adj.get(current) || [];
      // Pick the prerequisite with highest downstream count (most central)
      current = prereqs.sort((a, b) => (downstreamCount.get(b) || 0) - (downstreamCount.get(a) || 0))[0];
    }

    console.log(`\n  ${node.labels?.default || startId}:`);
    console.log('    ' + chain.join(' → '));
  }

  // ─── Summary ──────────────────────────────────────────────────────────────

  const connectedConcepts = new Set();
  for (const e of requiresEdges) {
    const from = nodes.get(e.from_node);
    const to = nodes.get(e.to_node);
    if (from?.type === 'CONCEPT') connectedConcepts.add(e.from_node);
    if (to?.type === 'CONCEPT') connectedConcepts.add(e.to_node);
  }

  const totalConcepts = graph.nodes.filter(n => n.type === 'CONCEPT').length;

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('VALIDATION SUMMARY');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`DAG integrity:     ${cycles.length === 0 ? '✅ ACYCLIC' : '❌ ' + cycles.length + ' cycles'}`);
  console.log(`REQUIRES edges:    ${requiresEdges.length}`);
  console.log(`Connected concepts: ${connectedConcepts.size} / ${totalConcepts} (${Math.round(connectedConcepts.size / totalConcepts * 100)}%)`);
  console.log(`Max depth:         ${Math.max(...conceptDepths.map(c => c.depth), 0)}`);
  console.log(`Top bottleneck:    ${bottlenecks[0]?.label || 'N/A'} (${bottlenecks[0]?.count || 0} dependents)`);
  console.log('═══════════════════════════════════════════════════════════════');
}

main().catch(err => {
  console.error('[validate] Failed:', err);
  process.exit(1);
});
