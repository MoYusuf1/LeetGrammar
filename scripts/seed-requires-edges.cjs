#!/usr/bin/env node
/**
 * Seed script: upload synthetic nodes and new REQUIRES edges to Supabase.
 *
 * Reads:
 *   - scripts/output/new-synthetic-nodes.json
 *   - scripts/output/new-requires-edges.json
 *
 * Uploads to:
 *   - public.graph_nodes (synthetic concepts)
 *   - public.graph_edges (REQUIRES edges)
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

const OUTPUT_DIR = path.resolve(__dirname, 'output');

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  // ─── Load generated data ──────────────────────────────────────────────────

  const nodesPath = path.join(OUTPUT_DIR, 'new-synthetic-nodes.json');
  const edgesPath = path.join(OUTPUT_DIR, 'new-requires-edges.json');

  if (!fs.existsSync(nodesPath) || !fs.existsSync(edgesPath)) {
    console.error('❌ Run generate-requires-edges.cjs first');
    process.exit(1);
  }

  const syntheticNodes = JSON.parse(fs.readFileSync(nodesPath, 'utf-8'));
  const newEdges = JSON.parse(fs.readFileSync(edgesPath, 'utf-8'));

  console.log(`[seed] ${syntheticNodes.length} synthetic nodes to create`);
  console.log(`[seed] ${newEdges.length} REQUIRES edges to upload`);

  // ─── Upload synthetic nodes ───────────────────────────────────────────────

  if (syntheticNodes.length > 0) {
    console.log('[seed] Uploading synthetic nodes...');
    const { error } = await supabase.from('graph_nodes').insert(syntheticNodes);
    if (error) {
      console.error('[seed] Node upload failed:', error.message);
      process.exit(1);
    }
    console.log(`[seed] ✅ ${syntheticNodes.length} nodes uploaded`);
  }

  // ─── Upload edges in batches ──────────────────────────────────────────────

  const BATCH = 500;
  console.log('[seed] Uploading edges...');

  for (let i = 0; i < newEdges.length; i += BATCH) {
    const batch = newEdges.slice(i, i + BATCH);
    const { error } = await supabase.from('graph_edges').insert(batch);
    if (error) {
      console.error(`[seed] Edge batch ${i}-${i + BATCH} failed:`, error.message);
      // Try to identify which edge failed
      if (error.message.includes('foreign key constraint')) {
        console.error('  Hint: A from_node or to_node does not exist in graph_nodes');
      }
      process.exit(1);
    }
    process.stdout.write(`  ${Math.min(i + BATCH, newEdges.length)}/${newEdges.length}\r`);
  }
  console.log();

  // ─── Verify ───────────────────────────────────────────────────────────────

  console.log('[seed] Verifying via get_full_graph()...');
  const { data, error: rpcError } = await supabase.rpc('get_full_graph');
  if (rpcError) {
    console.error('[seed] RPC verify failed:', rpcError.message);
    process.exit(1);
  }

  const requiresCount = data.edges.filter(e => e.type === 'REQUIRES').length;

  console.log('[seed] ✅ Upload complete!');
  console.log(`[seed]   Total nodes: ${data.meta.node_count} (+${data.meta.node_count - 3657})`);
  console.log(`[seed]   Total edges: ${data.meta.edge_count} (+${data.meta.edge_count - 1325})`);
  console.log(`[seed]   REQUIRES edges: ${requiresCount} (+${requiresCount - 55})`);
}

main().catch(err => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
