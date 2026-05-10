#!/usr/bin/env node
/**
 * Build-time script: normalize swarm data and produce a SQLite .db file.
 *
 * Reads: docs/knowledge-graph-source/somali_knowledge_graph.json
 * Writes: public/graph.db
 *
 * The runtime app fetches this .db binary and loads it directly into sql.js WASM,
 * skipping JSON parsing + batch insertion entirely.
 */

const fs = require('fs');
const path = require('path');

const INPUT = path.resolve(__dirname, '../docs/knowledge-graph-source/somali_knowledge_graph.json');
const OUTPUT = path.resolve(__dirname, '../public/graph.db');

// ─── Normalization helpers (copied from normalize-swarm-data.cjs) ─────────

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

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  console.log('[build-db] Reading swarm data...');
  const raw = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));

  // ── Phase 1: Normalize nodes ────────────────────────────────────────────
  const nodeMap = new Map();
  const syntheticNodes = [];

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

  // ── Phase 2: Synthetic construction nodes ───────────────────────────────
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
    const node = {
      id, type: 'WORD',
      labels: { default: label, somali: label },
      attributes: { synthetic: true, source: 'construction-placeholder' },
      definitionCids: [],
    };
    syntheticNodes.push(node);
    nodeMap.set(id, node);
  }

  // ── Phase 3: Synthetic edge-orphan nodes ────────────────────────────────
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
    syntheticNodes.push(node);
    nodeMap.set(id, node);
  }

  // ── Phase 4: Textbook nodes ─────────────────────────────────────────────
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

  // ── Phase 5: Normalize edges ────────────────────────────────────────────
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

  // ── Phase 6: Normalize constructions ────────────────────────────────────
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

  // ── Phase 7: Normalize chunks ───────────────────────────────────────────
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

  // ── Phase 8: Link chunks to nodes ───────────────────────────────────────
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

  // ── Phase 9: Build SQLite DB ────────────────────────────────────────────
  console.log('[build-db] Building SQLite database...');
  const initSqlJs = require('sql.js');
  const SQL = await initSqlJs();
  const db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS nodes (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      labels TEXT NOT NULL,
      attributes TEXT NOT NULL,
      definition_cids TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS edges (
      id TEXT PRIMARY KEY,
      from_id TEXT NOT NULL,
      to_id TEXT NOT NULL,
      type TEXT NOT NULL,
      qualifiers TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS constructions (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      members TEXT NOT NULL,
      qualifiers TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS chunks (
      cid TEXT PRIMARY KEY,
      content_type TEXT NOT NULL,
      payload TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_edges_from ON edges(from_id);
    CREATE INDEX IF NOT EXISTS idx_edges_to ON edges(to_id);
    CREATE INDEX IF NOT EXISTS idx_edges_type ON edges(type);
  `);

  const nodeStmt = db.prepare('INSERT INTO nodes (id, type, labels, attributes, definition_cids) VALUES (?, ?, ?, ?, ?)');
  for (const node of nodes) {
    nodeStmt.run([node.id, node.type, JSON.stringify(node.labels), JSON.stringify(node.attributes), JSON.stringify(node.definitionCids)]);
  }
  nodeStmt.free();

  const edgeStmt = db.prepare('INSERT INTO edges (id, from_id, to_id, type, qualifiers) VALUES (?, ?, ?, ?, ?)');
  for (const edge of edges) {
    edgeStmt.run([edge.id, edge.from, edge.to, edge.type, JSON.stringify(edge.qualifiers)]);
  }
  edgeStmt.free();

  const consStmt = db.prepare('INSERT INTO constructions (id, name, members, qualifiers) VALUES (?, ?, ?, ?)');
  for (const c of constructions) {
    consStmt.run([c.id, c.name, JSON.stringify(c.members), JSON.stringify(c.qualifiers)]);
  }
  consStmt.free();

  const chunkStmt = db.prepare('INSERT INTO chunks (cid, content_type, payload) VALUES (?, ?, ?)');
  for (const chunk of chunks) {
    chunkStmt.run([chunk.cid, chunk.contentType, chunk.payload]);
  }
  chunkStmt.free();

  const binary = db.export();
  fs.writeFileSync(OUTPUT, Buffer.from(binary));

  console.log(`[build-db] Wrote ${OUTPUT}`);
  console.log(`[build-db] Stats: ${nodes.length} nodes, ${edges.length} edges, ${constructions.length} constructions, ${chunks.length} chunks`);
  console.log(`[build-db] Size: ${(binary.length / 1024).toFixed(1)} KB`);

  db.close();
}

main().catch(err => {
  console.error('[build-db] Failed:', err);
  process.exit(1);
});
