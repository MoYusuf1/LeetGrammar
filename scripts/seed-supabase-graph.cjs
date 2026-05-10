#!/usr/bin/env node
/**
 * Seed script: upload the normalized knowledge graph into Supabase.
 *
 * Reads: docs/knowledge-graph-source/somali_knowledge_graph.json
 * Uploads to: public.graph_nodes, public.graph_edges, public.graph_constructions, public.graph_chunks
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY env var (bypasses RLS).
 *   npx cross-env SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/seed-supabase-graph.cjs
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const INPUT = path.resolve(__dirname, '../docs/knowledge-graph-source/somali_knowledge_graph.json');

// Load .env file manually (dotenv not available in scripts)
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
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    vars[key] = value;
  }
  return vars;
}

const env = loadEnv();
const SUPABASE_URL = env.VITE_SUPABASE_URL || 'https://wikibfhsndlwvfrvtgvu.supabase.co';
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY;

if (!SERVICE_KEY) {
  console.error('❌ No Supabase service role key found in .env');
  console.error('   Add SUPABASE_SERVICE_ROLE_KEY=eyJ... to your .env file');
  console.error('   Get it from: https://app.supabase.com/project/wikibfhsndlwvfrvtgvu/settings/api');
  process.exit(1);
}

// ─── Normalization helpers (mirrors build-graph-db.cjs) ────────────────────

function cleanLabel(raw) {
  if (!raw) return '';
  return String(raw).trim();
}

function cleanSyntheticLabel(raw) {
  let s = String(raw).trim();
  s = s.replace(/\[\s*/g, '[').replace(/\s*\]/g, ']');
  s = s.replace(/\]\s*-/g, ']-').replace(/-\s*\[/g, '-[');
  s = s.replace(/\]\s+/g, '] ').replace(/\s+\[/g, ' [');
  s = s.replace(/stem\]\s*-/g, 'stem-');
  s = s.replace(/\[verb\s*\]/g, '[verb]');
  s = s.replace(/\[noun\s*\]/g, '[noun]');
  s = s.replace(/\[verb$/g, '[verb]');
  s = s.replace(/\[noun$/g, '[noun]');
  s = s.replace(/\[mood$/g, '[mood]');
  s = s.replace(/\[1st$/g, '[1st]');
  s = s.replace(/\[Focus$/g, '[Focus]');
  s = s.replace(/\[object\]!$/g, '[object]!');
  s = s.replace(/\[subject\]!$/g, '[subject]!');
  s = s.replace(/\[topic\]!$/g, '[topic]!');
  s = s.replace(/\[noun\]-\[possessive$/g, '[noun]-[possessive]');
  s = s.replace(/\[noun\],$/g, '[noun],');
  s = s.replace(/unit\]-na$/g, 'unit-na');
  s = s.replace(/suffix\]$/g, 'suffix');
  s = s.replace(/NP\]$/g, 'NP');
  s = s.replace(/\s+/g, ' ');
  return s.trim();
}

function normalizeRole(role) {
  if (typeof role === 'string') return role || 'slot';
  if (role && typeof role === 'object') {
    return typeof role.role === 'string' ? role.role : 'slot';
  }
  return 'slot';
}

function makeNodeIdSafe(raw) {
  return String(raw).trim();
}

function toMarkdownPayload(cid, label, text) {
  if (!text) return '';
  if (/^#+\s/.test(text) || /^\*\s/.test(text) || /^\-\s/.test(text)) {
    return text;
  }
  if (text.includes(',') && text.length < 200 && !text.includes('.')) {
    const items = text.split(',').map(s => s.trim()).filter(Boolean);
    if (items.length > 2) {
      return items.map(item => `- ${item}`).join('\n');
    }
  }
  if (/^Exercise\s+\d+:/i.test(text)) {
    return text.replace(/(Exercise\s+\d+):/gi, '### $1');
  }
  return text;
}

function extractKeywords(text) {
  const cleaned = text.toLowerCase()
    .replace(/chunk:/g, '')
    .replace(/chapter\s*\d+/gi, '')
    .replace(/exercise\s*\d+/gi, '')
    .replace(/pages?\s*\d+/gi, '')
    .replace(/appendix/gi, '')
    .replace(/grammar\s*note/gi, '')
    .replace(/cultural\s*note/gi, '')
    .replace(/[^a-z0-9\s]/g, ' ');
  return cleaned.split(/\s+/).filter(s => s.length > 2);
}

function scoreChunkNodeMatch(chunk, node) {
  const chunkLabel = (chunk.label || chunk.cid || '').toLowerCase();
  const chunkCid = (chunk.cid || '').toLowerCase().replace(/^chunk:/, '');
  const nodeLabel = (node.labels.default || '').toLowerCase();
  const nodeId = node.id.toLowerCase().replace(/^concept:/, '');

  let score = 0;
  if (chunkLabel === nodeLabel) score += 200;
  if (chunkCid === nodeId) score += 200;
  if (chunkLabel.includes(nodeLabel) || nodeLabel.includes(chunkLabel)) score += 80;
  if (chunkCid.includes(nodeId) || nodeId.includes(chunkCid)) score += 80;

  const chunkWords = extractKeywords(chunkLabel + ' ' + chunkCid);
  const nodeWords = extractKeywords(nodeLabel + ' ' + nodeId);
  const overlap = chunkWords.filter(w => nodeWords.includes(w)).length;
  score += overlap * 25;

  const knownMappings = {
    'alphabet': ['somali-alphabet'],
    'gems': ['gemination', 'geminate-consonant'],
    'diphthongs': ['diphthong'],
    'past-endings': ['general-past-tense', 'past-tense-verb'],
    'present-endings': ['present-progressive', 'general-present-tense', 'present-tense'],
    'pronoun-list': ['verbal-subject-pronoun', 'subject-verbal-pronoun'],
    'waa-combo': ['waa'],
    'ma-combo': ['ma'],
    'article-forms': ['definite-article'],
    'declension-list': ['noun-declension'],
    'sound-changes': ['sound-change'],
    'greetings': ['greeting'],
    'vocative-examples': ['vocative-form', 'masculine-vocative', 'feminine-vocative'],
    'possessive-suffixes': ['possessive-pronoun'],
    'prefixing-verbs': ['prefixing-verb'],
    'waxa-focus': ['waxa-focus'],
    'in-clauses': ['in-clause'],
    'prep-clusters': ['preposition-pronoun-cluster'],
    'relative-clauses-oo-ee': ['relative-clause'],
    'question-words': ['question-word'],
    'independent-pronouns': ['independent-pronoun'],
    'yahay-forms': ['verb-to-be'],
    'comparative-superlative': ['comparative', 'superlative'],
    'adjectives-common': ['adjective'],
    'mass-nouns-list': ['mass-noun'],
    'collective-nouns-list': ['collective-noun'],
    'adverbial-clause-types': ['adverbial'],
    'optative-mood': ['optative'],
    'potential-mood': ['potential'],
    'folktale-translations': ['folktale'],
    'glossary': ['glossary'],
  };

  for (const [key, targets] of Object.entries(knownMappings)) {
    if (chunkCid.includes(key) || chunkLabel.includes(key)) {
      for (const target of targets) {
        if (nodeId.includes(target) || nodeLabel.includes(target)) {
          score += 100;
        }
      }
    }
  }
  return score;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  console.log('[seed] Reading swarm data...');
  const raw = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));

  // ── Phase 1: Normalize nodes ─────────────────────────────────────────────
  const nodeMap = new Map();

  for (const n of raw.nodes || []) {
    const id = makeNodeIdSafe(n.id);
    if (!id) continue;

    const labels = { default: cleanLabel(n.label) || id };
    if (n.somali) labels.somali = cleanLabel(n.somali);
    if (n.translation) labels.english = cleanLabel(n.translation);
    if (n.english) labels.english = cleanLabel(n.english);

    if (!labels.somali && (n.type === 'WORD' || n.type === 'MORPHEME')) {
      labels.somali = labels.default;
    }
    if (!labels.english && (n.type === 'CONCEPT' || n.type === 'RULE' || n.type === 'LESSON' || n.type === 'TEXTBOOK')) {
      labels.english = labels.default;
    }

    const attributes = {};
    for (const [key, value] of Object.entries(n)) {
      if (!['id', 'label', 'type', 'somali', 'translation', 'english', 'labels', 'attributes', 'definitionCids'].includes(key)) {
        attributes[key] = value;
      }
    }
    if (n.attributes && typeof n.attributes === 'object') {
      Object.assign(attributes, n.attributes);
    }

    const node = {
      id, type: n.type || 'CONCEPT', labels, attributes,
      definitionCids: Array.isArray(n.definitionCids) ? n.definitionCids : [],
    };
    nodeMap.set(id, node);
  }

  // ── Phase 2: Synthetic construction nodes ────────────────────────────────
  const missingWordIds = new Set();
  for (const c of raw.constructions || []) {
    for (const m of c.members || []) {
      const nid = makeNodeIdSafe(m.nodeId);
      if (!nid) continue;
      if (nid.startsWith('slot:')) continue;
      if (!nodeMap.has(nid)) missingWordIds.add(nid);
    }
  }
  for (const id of missingWordIds) {
    const label = cleanSyntheticLabel(id.replace(/^word:/, ''));
    nodeMap.set(id, {
      id, type: 'WORD',
      labels: { default: label, somali: label },
      attributes: { synthetic: true, source: 'construction-placeholder' },
      definitionCids: [],
    });
  }

  // ── Phase 3: Synthetic edge-orphan nodes ─────────────────────────────────
  const missingEdgeTargets = new Set();
  for (const e of raw.edges || []) {
    const from = makeNodeIdSafe(e.from);
    const to = makeNodeIdSafe(e.to);
    if (from && !nodeMap.has(from)) missingEdgeTargets.add(from);
    if (to && !nodeMap.has(to)) missingEdgeTargets.add(to);
  }
  for (const id of missingEdgeTargets) {
    if (nodeMap.has(id)) continue;
    let type = 'CONCEPT';
    if (id.startsWith('example:')) type = 'EXAMPLE';
    else if (id.startsWith('word:')) type = 'WORD';
    else if (id.startsWith('morpheme:')) type = 'MORPHEME';
    else if (id.startsWith('rule:')) type = 'RULE';
    else if (id.startsWith('lesson:')) type = 'LESSON';
    else if (id.startsWith('textbook:')) type = 'TEXTBOOK';

    const label = id.replace(/^(concept|example|word|morpheme|rule|lesson|textbook):/, '').replace(/-/g, ' ');
    const node = {
      id, type,
      labels: {
        default: label,
        somali: type === 'WORD' || type === 'MORPHEME' ? label : undefined,
        english: type === 'CONCEPT' || type === 'RULE' || type === 'LESSON' || type === 'TEXTBOOK' ? label : undefined,
      },
      attributes: { synthetic: true, source: 'edge-orphan-repair' },
      definitionCids: [],
    };
    if (!node.labels.somali) delete node.labels.somali;
    if (!node.labels.english) delete node.labels.english;
    nodeMap.set(id, node);
  }

  // ── Phase 4: Textbook nodes ──────────────────────────────────────────────
  if (raw.metadata?.textbooks) {
    for (const tb of raw.metadata.textbooks) {
      const id = `textbook:${tb.id}`;
      if (!nodeMap.has(id)) {
        nodeMap.set(id, {
          id, type: 'TEXTBOOK',
          labels: { default: tb.title, english: tb.title },
          attributes: { author: tb.author, publisher: tb.publisher, year: tb.year, source: 'metadata' },
          definitionCids: [],
        });
      }
    }
  }

  const nodes = [...nodeMap.values()];

  // ── Phase 5: Normalize edges ─────────────────────────────────────────────
  const edges = [];
  const edgeIds = new Set();
  for (const e of raw.edges || []) {
    const id = makeNodeIdSafe(e.id) || `edge:${edgeIds.size}`;
    const from = makeNodeIdSafe(e.from);
    const to = makeNodeIdSafe(e.to);
    if (!from || !to) continue;
    if (!nodeMap.has(from) || !nodeMap.has(to)) continue;
    if (edgeIds.has(id)) continue;
    edgeIds.add(id);

    const rawQualifiers = e.qualifiers || {};
    const qualifiers = {
      source: {
        textbookId: rawQualifiers.source?.textbookId || 'mixed',
        page: rawQualifiers.source?.page,
        chapter: rawQualifiers.source?.chapter,
      },
      confidence: typeof rawQualifiers.confidence === 'number' ? rawQualifiers.confidence : 0.8,
      dialects: Array.isArray(rawQualifiers.dialects) ? rawQualifiers.dialects : ['standard'],
    };
    if (rawQualifiers.register) qualifiers.register = rawQualifiers.register;
    if (rawQualifiers.era) qualifiers.era = rawQualifiers.era;
    if (rawQualifiers.notes) qualifiers.notes = rawQualifiers.notes;

    edges.push({ id, from, to, type: e.type || 'IS_A', qualifiers });
  }

  // ── Phase 6: Normalize constructions ─────────────────────────────────────
  const constructions = [];
  const constructionIds = new Set();
  for (const c of raw.constructions || []) {
    const id = makeNodeIdSafe(c.id);
    if (!id || constructionIds.has(id)) continue;
    constructionIds.add(id);

    const members = [];
    for (const m of c.members || []) {
      const nodeId = makeNodeIdSafe(m.nodeId);
      if (!nodeId) continue;
      if (!nodeId.startsWith('slot:') && !nodeMap.has(nodeId)) continue;
      members.push({
        nodeId, role: normalizeRole(m.role),
        position: typeof m.position === 'number' ? m.position : undefined,
        optional: typeof m.optional === 'boolean' ? m.optional : undefined,
        bound: typeof m.bound === 'boolean' ? m.bound : undefined,
      });
    }
    if (members.length < 2) continue;

    const rawQualifiers = c.qualifiers || {};
    const qualifiers = {
      source: {
        textbookId: rawQualifiers.source?.textbookId || c.textbookId || c.chapter || 'mixed',
        page: rawQualifiers.source?.page ?? (typeof c.page === 'number' ? String(c.page) : undefined),
        chapter: rawQualifiers.source?.chapter ?? (typeof c.chapter === 'string' ? c.chapter : undefined),
      },
      confidence: typeof rawQualifiers.confidence === 'number' ? rawQualifiers.confidence : 0.8,
      dialects: Array.isArray(rawQualifiers.dialects) ? rawQualifiers.dialects : ['standard'],
    };

    constructions.push({ id, type: 'CONSTRUCTION', name: c.name || id, members, qualifiers });
  }

  // ── Phase 7: Normalize chunks ────────────────────────────────────────────
  const chunks = [];
  const chunkIds = new Set();
  for (const ch of raw.chunks || []) {
    const cid = makeNodeIdSafe(ch.id) || makeNodeIdSafe(ch.cid);
    if (!cid || chunkIds.has(cid)) continue;
    chunkIds.add(cid);
    const payload = ch.text || ch.payload || '';
    if (!payload) continue;
    chunks.push({ cid, contentType: ch.contentType || 'text/markdown', payload: toMarkdownPayload(cid, ch.label, payload) });
  }

  // ── Phase 8: Link chunks to nodes ────────────────────────────────────────
  for (const chunk of chunks) {
    let bestNode = null;
    let bestScore = 0;
    for (const node of nodes) {
      if (node.type !== 'CONCEPT' && node.type !== 'RULE') continue;
      const score = scoreChunkNodeMatch(chunk, node);
      if (score > bestScore) { bestScore = score; bestNode = node; }
    }
    if (bestNode && bestScore >= 50) {
      if (!bestNode.definitionCids.includes(chunk.cid)) {
        bestNode.definitionCids.push(chunk.cid);
      }
    }
  }
  for (const node of nodes) {
    node.definitionCids = [...new Set(node.definitionCids)];
  }

  console.log(`[seed] Normalized: ${nodes.length} nodes, ${edges.length} edges, ${constructions.length} constructions, ${chunks.length} chunks`);

  // ── Phase 9: Upload to Supabase ──────────────────────────────────────────
  console.log('[seed] Clearing existing graph data...');

  // Delete in reverse order to respect FK constraints
  const { error: delChunks } = await supabase.from('graph_chunks').delete().neq('cid', '');
  const { error: delCons } = await supabase.from('graph_constructions').delete().neq('id', '');
  const { error: delEdges } = await supabase.from('graph_edges').delete().neq('id', '');
  const { error: delNodes } = await supabase.from('graph_nodes').delete().neq('id', '');

  if (delNodes) console.error('[seed] Clear nodes error:', delNodes.message);
  if (delEdges) console.error('[seed] Clear edges error:', delEdges.message);
  if (delCons) console.error('[seed] Clear constructions error:', delCons.message);
  if (delChunks) console.error('[seed] Clear chunks error:', delChunks.message);

  // Upload nodes in batches of 500
  const BATCH = 500;

  console.log('[seed] Uploading nodes...');
  for (let i = 0; i < nodes.length; i += BATCH) {
    const batch = nodes.slice(i, i + BATCH).map(n => ({
      id: n.id,
      type: n.type,
      labels: n.labels,
      attributes: n.attributes,
      definition_cids: n.definitionCids,
    }));
    const { error } = await supabase.from('graph_nodes').insert(batch);
    if (error) {
      console.error(`[seed] Node batch ${i}-${i + BATCH} failed:`, error.message);
      process.exit(1);
    }
    process.stdout.write(`  ${Math.min(i + BATCH, nodes.length)}/${nodes.length}\r`);
  }
  console.log();

  console.log('[seed] Uploading edges...');
  for (let i = 0; i < edges.length; i += BATCH) {
    const batch = edges.slice(i, i + BATCH).map(e => ({
      id: e.id,
      from_node: e.from,
      to_node: e.to,
      type: e.type,
      qualifiers: e.qualifiers,
    }));
    const { error } = await supabase.from('graph_edges').insert(batch);
    if (error) {
      console.error(`[seed] Edge batch ${i}-${i + BATCH} failed:`, error.message);
      process.exit(1);
    }
    process.stdout.write(`  ${Math.min(i + BATCH, edges.length)}/${edges.length}\r`);
  }
  console.log();

  console.log('[seed] Uploading constructions...');
  for (let i = 0; i < constructions.length; i += BATCH) {
    const batch = constructions.slice(i, i + BATCH).map(c => ({
      id: c.id,
      name: c.name,
      members: c.members,
      qualifiers: c.qualifiers,
    }));
    const { error } = await supabase.from('graph_constructions').insert(batch);
    if (error) {
      console.error(`[seed] Construction batch ${i}-${i + BATCH} failed:`, error.message);
      process.exit(1);
    }
    process.stdout.write(`  ${Math.min(i + BATCH, constructions.length)}/${constructions.length}\r`);
  }
  console.log();

  console.log('[seed] Uploading chunks...');
  for (let i = 0; i < chunks.length; i += BATCH) {
    const batch = chunks.slice(i, i + BATCH).map(ch => ({
      cid: ch.cid,
      content_type: ch.contentType,
      payload: ch.payload,
    }));
    const { error } = await supabase.from('graph_chunks').insert(batch);
    if (error) {
      console.error(`[seed] Chunk batch ${i}-${i + BATCH} failed:`, error.message);
      process.exit(1);
    }
    process.stdout.write(`  ${Math.min(i + BATCH, chunks.length)}/${chunks.length}\r`);
  }
  console.log();

  // Verify via RPC
  console.log('[seed] Verifying via get_full_graph()...');
  const { data, error: rpcError } = await supabase.rpc('get_full_graph');
  if (rpcError) {
    console.error('[seed] RPC verify failed:', rpcError.message);
    process.exit(1);
  }

  console.log('[seed] ✅ Success!');
  console.log(`[seed]   Nodes: ${data.meta.node_count}`);
  console.log(`[seed]   Edges: ${data.meta.edge_count}`);
  console.log(`[seed]   Constructions: ${data.meta.construction_count}`);
  console.log(`[seed]   Chunks: ${data.meta.chunk_count}`);
}

main().catch(err => {
  console.error('[seed] Failed:', err);
  process.exit(1);
});
