#!/usr/bin/env node
/**
 * Normalize swarm knowledge graph into LeetSomali engine format.
 *
 * Reads: docs/Kimi_Agent_Somali%20Textbook%20Knowledge%20Graph/somali_knowledge_graph.json
 * Writes: public/somali-knowledge-graph.json
 *
 * Fixes:
 * - nodes: label → labels.default, adds attributes/definitionCids, infers bilingual labels
 * - edges: adds missing qualifiers.dialects, removes orphans
 * - constructions: adds type/qualifiers, normalizes roles, creates synthetic nodes for missing word:* refs
 * - chunks: id→cid, text→payload, adds contentType, cleans empty/bad chunks, formats markdown
 * - chunk→node linking: heuristic matching to populate definitionCids
 * - synthetic node label cleanup
 */

const fs = require('fs');
const path = require('path');

const INPUT = path.resolve(__dirname, '../docs/knowledge-graph-source/somali_knowledge_graph.json');
const OUTPUT = path.resolve(__dirname, '../public/somali-knowledge-graph.json');

function log(...args) {
  console.log('[normalize]', ...args);
}

function cleanLabel(raw) {
  if (!raw) return '';
  return String(raw).trim();
}

function cleanSyntheticLabel(raw) {
  let s = String(raw).trim();
  // Fix common placeholder malformations from swarm data
  s = s.replace(/\[\s*/g, '[').replace(/\s*\]/g, ']');  // normalize bracket spacing
  s = s.replace(/\]\s*-/g, ']-').replace(/-\s*\[/g, '-['); // fix ]- and -[ spacing
  s = s.replace(/\]\s+/g, '] ').replace(/\s+\[/g, ' [');    // normalize spaces around brackets
  s = s.replace(/stem\]\s*-/g, 'stem-');                    // fix "stem] -" → "stem-"
  s = s.replace(/\[verb\s*\]/g, '[verb]');                  // fix [verb] variations
  s = s.replace(/\[noun\s*\]/g, '[noun]');                  // fix [noun] variations
  // Add missing closing brackets for common patterns
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
  s = s.replace(/\s+/g, ' ');                               // collapse multiple spaces
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
  // If already has markdown formatting, keep as-is
  if (/^#+\s/.test(text) || /^\*\s/.test(text) || /^\-\s/.test(text)) {
    return text;
  }
  // For short comma-separated lists, format as bullet list
  if (text.includes(',') && text.length < 200 && !text.includes('.')) {
    const items = text.split(',').map(s => s.trim()).filter(Boolean);
    if (items.length > 2) {
      return items.map(item => `- ${item}`).join('\n');
    }
  }
  // For exercise-style content with clear sections, add headers
  if (/^Exercise\s+\d+:/i.test(text)) {
    return text.replace(/(Exercise\s+\d+):/gi, '### $1');
  }
  return text;
}

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
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

  // Exact label match
  if (chunkLabel === nodeLabel) score += 200;
  if (chunkCid === nodeId) score += 200;

  // Substring containment (strong signal)
  if (chunkLabel.includes(nodeLabel) || nodeLabel.includes(chunkLabel)) score += 80;
  if (chunkCid.includes(nodeId) || nodeId.includes(chunkCid)) score += 80;

  // Keyword overlap
  const chunkWords = extractKeywords(chunkLabel + ' ' + chunkCid);
  const nodeWords = extractKeywords(nodeLabel + ' ' + nodeId);
  const overlap = chunkWords.filter(w => nodeWords.includes(w)).length;
  score += overlap * 25;

  // Special known mappings
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

function main() {
  log('Reading swarm data...');
  const raw = JSON.parse(fs.readFileSync(INPUT, 'utf-8'));

  log('Nodes:', raw.nodes?.length ?? 0);
  log('Edges:', raw.edges?.length ?? 0);
  log('Constructions:', raw.constructions?.length ?? 0);
  log('Chunks:', raw.chunks?.length ?? 0);

  // ─── Phase 1: Normalize nodes ───────────────────────────────────────────
  const nodeMap = new Map();
  const syntheticNodes = [];

  for (const n of raw.nodes || []) {
    const id = makeNodeIdSafe(n.id);
    if (!id) continue;

    const labels = {
      default: cleanLabel(n.label) || id,
    };
    if (n.somali) labels.somali = cleanLabel(n.somali);
    if (n.translation) labels.english = cleanLabel(n.translation);
    if (n.english) labels.english = cleanLabel(n.english);

    // Infer bilingual labels based on node type
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
      id,
      type: n.type || 'CONCEPT',
      labels,
      attributes,
      definitionCids: Array.isArray(n.definitionCids) ? n.definitionCids : [],
    };
    nodeMap.set(id, node);
  }

  // ─── Phase 2: Pre-scan constructions for missing word:* nodes ───────────
  const missingWordIds = new Set();
  for (const c of raw.constructions || []) {
    for (const m of c.members || []) {
      const nid = makeNodeIdSafe(m.nodeId);
      if (!nid) continue;
      if (nid.startsWith('slot:')) continue;
      if (!nodeMap.has(nid)) {
        missingWordIds.add(nid);
      }
    }
  }
  log('Synthetic WORD nodes needed for constructions:', missingWordIds.size);

  for (const id of missingWordIds) {
    const rawLabel = id.replace(/^word:/, '');
    const label = cleanSyntheticLabel(rawLabel);
    const node = {
      id,
      type: 'WORD',
      labels: {
        default: label,
        somali: label,
      },
      attributes: {
        synthetic: true,
        source: 'construction-placeholder',
      },
      definitionCids: [],
    };
    syntheticNodes.push(node);
    nodeMap.set(id, node);
  }

  // ─── Phase 3: Pre-scan edges for missing nodes ──────────────────────────
  const missingEdgeTargets = new Set();
  for (const e of raw.edges || []) {
    const from = makeNodeIdSafe(e.from);
    const to = makeNodeIdSafe(e.to);
    if (from && !nodeMap.has(from)) missingEdgeTargets.add(from);
    if (to && !nodeMap.has(to)) missingEdgeTargets.add(to);
  }
  log('Synthetic nodes needed for edges:', missingEdgeTargets.size);

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
      id,
      type,
      labels: {
        default: label,
        somali: type === 'WORD' || type === 'MORPHEME' ? label : undefined,
        english: type === 'CONCEPT' || type === 'RULE' || type === 'LESSON' || type === 'TEXTBOOK' ? label : undefined,
      },
      attributes: {
        synthetic: true,
        source: 'edge-orphan-repair',
      },
      definitionCids: [],
    };
    // Remove undefined labels
    if (!node.labels.somali) delete node.labels.somali;
    if (!node.labels.english) delete node.labels.english;
    syntheticNodes.push(node);
    nodeMap.set(id, node);
  }

  // ─── Phase 4: Create textbook nodes from metadata ───────────────────────
  const textbookNodes = [];
  if (raw.metadata?.textbooks) {
    for (const tb of raw.metadata.textbooks) {
      const id = `textbook:${tb.id}`;
      if (!nodeMap.has(id)) {
        const node = {
          id,
          type: 'TEXTBOOK',
          labels: {
            default: tb.title,
            english: tb.title,
          },
          attributes: {
            author: tb.author,
            publisher: tb.publisher,
            year: tb.year,
            source: 'metadata',
          },
          definitionCids: [],
        };
        textbookNodes.push(node);
        nodeMap.set(id, node);
      }
    }
  }

  const nodes = [...nodeMap.values()];
  log('Total nodes after synthesis:', nodes.length);

  // ─── Phase 5: Normalize edges ───────────────────────────────────────────
  const edges = [];
  const edgeIds = new Set();
  let orphanCount = 0;

  for (const e of raw.edges || []) {
    const id = makeNodeIdSafe(e.id) || `edge:${edgeIds.size}`;
    const from = makeNodeIdSafe(e.from);
    const to = makeNodeIdSafe(e.to);
    if (!from || !to) continue;
    if (!nodeMap.has(from) || !nodeMap.has(to)) {
      orphanCount++;
      continue;
    }
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

    edges.push({
      id,
      from,
      to,
      type: e.type || 'IS_A',
      qualifiers,
    });
  }
  log('Edges after cleanup:', edges.length, `(removed ${orphanCount} orphans)`);

  // ─── Phase 6: Normalize constructions ───────────────────────────────────
  const constructions = [];
  const constructionIds = new Set();
  let droppedConstructions = 0;

  for (const c of raw.constructions || []) {
    const id = makeNodeIdSafe(c.id);
    if (!id) continue;
    if (constructionIds.has(id)) continue;
    constructionIds.add(id);

    const members = [];
    for (const m of c.members || []) {
      const nodeId = makeNodeIdSafe(m.nodeId);
      if (!nodeId) continue;
      if (!nodeId.startsWith('slot:') && !nodeMap.has(nodeId)) continue;

      members.push({
        nodeId,
        role: normalizeRole(m.role),
        position: typeof m.position === 'number' ? m.position : undefined,
        optional: typeof m.optional === 'boolean' ? m.optional : undefined,
        bound: typeof m.bound === 'boolean' ? m.bound : undefined,
      });
    }

    if (members.length < 2) {
      droppedConstructions++;
      continue;
    }

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

    constructions.push({
      id,
      type: 'CONSTRUCTION',
      name: c.name || id,
      members,
      qualifiers,
    });
  }
  log('Constructions after cleanup:', constructions.length, `(dropped ${droppedConstructions})`);

  // ─── Phase 7: Normalize chunks ──────────────────────────────────────────
  const chunks = [];
  const chunkIds = new Set();
  const chunkByCid = new Map();

  for (const ch of raw.chunks || []) {
    const cid = makeNodeIdSafe(ch.id) || makeNodeIdSafe(ch.cid);
    if (!cid) {
      log('Skipping chunk with no id/cid');
      continue;
    }
    if (chunkIds.has(cid)) continue;
    chunkIds.add(cid);

    const payload = ch.text || ch.payload || '';
    if (!payload) {
      log('Skipping empty chunk:', cid);
      continue;
    }

    const chunk = {
      cid,
      contentType: ch.contentType || 'text/markdown',
      payload: toMarkdownPayload(cid, ch.label, payload),
      label: ch.label || undefined,
      page: ch.page || undefined,
    };
    // Clean undefined fields
    if (!chunk.label) delete chunk.label;
    if (!chunk.page) delete chunk.page;

    chunks.push(chunk);
    chunkByCid.set(cid, chunk);
  }
  log('Chunks after cleanup:', chunks.length);

  // ─── Phase 8: Link chunks to nodes via definitionCids ───────────────────
  let linkedChunks = 0;
  let linkedNodes = 0;

  for (const chunk of chunks) {
    let bestNode = null;
    let bestScore = 0;

    for (const node of nodes) {
      if (node.type !== 'CONCEPT' && node.type !== 'RULE') continue;
      const score = scoreChunkNodeMatch(chunk, node);
      if (score > bestScore) {
        bestScore = score;
        bestNode = node;
      }
    }

    // Require a reasonable match threshold
    if (bestNode && bestScore >= 50) {
      if (!bestNode.definitionCids.includes(chunk.cid)) {
        bestNode.definitionCids.push(chunk.cid);
        linkedChunks++;
        if (bestNode.definitionCids.length === 1) linkedNodes++;
      }
    }
  }
  log(`Linked ${linkedChunks} chunks to ${linkedNodes} nodes`);

  // Also link glossary chunks to a generic glossary node if one exists
  const glossaryNode = nodes.find(n => n.id === 'concept:glossary' || n.labels.default.toLowerCase() === 'glossary');
  if (glossaryNode) {
    for (const chunk of chunks) {
      if (chunk.cid.includes('glossary') && !glossaryNode.definitionCids.includes(chunk.cid)) {
        glossaryNode.definitionCids.push(chunk.cid);
      }
    }
  }

  // ─── Phase 9: Deduplicate definitionCids ────────────────────────────────
  for (const node of nodes) {
    node.definitionCids = [...new Set(node.definitionCids)];
  }

  // ─── Phase 10: Write output ─────────────────────────────────────────────
  const output = {
    nodes,
    edges,
    constructions,
    chunks,
    metadata: {
      ...raw.metadata,
      normalizedAt: new Date().toISOString(),
      originalNodes: raw.nodes?.length ?? 0,
      originalEdges: raw.edges?.length ?? 0,
      originalConstructions: raw.constructions?.length ?? 0,
      originalChunks: raw.chunks?.length ?? 0,
      syntheticNodes: syntheticNodes.length,
      textbookNodes: textbookNodes.length,
      linkedChunks,
      linkedNodes,
    },
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 0));
  const stats = fs.statSync(OUTPUT);
  log(`Wrote ${OUTPUT}`);
  log(`Final size: ${(stats.size / 1024).toFixed(1)} KB`);
  log(`Nodes: ${nodes.length} | Edges: ${edges.length} | Constructions: ${constructions.length} | Chunks: ${chunks.length}`);
}

main();
