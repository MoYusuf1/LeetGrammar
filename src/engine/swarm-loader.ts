/**
 * Swarm output loader — parses and validates JSON produced by LLM swarm agents.
 *
 * Normalizes simplified CIDs to real SHA-256 CIDs so deduplication works.
 * Reports validation errors without rejecting the entire payload.
 */

import { ChunkStore } from './chunk-store';
import type { Node, Edge, Construction, Chunk, NodeType, EdgeType, ConstructionRole, ContentType } from './types';
import type { TextbookPayload } from './ingestion';

export interface SwarmChapterOutput {
  textbookId: string;
  chapter: string;
  pageRange: string;
  nodes: unknown[];
  edges: unknown[];
  constructions: unknown[];
  chunks: unknown[];
}

export interface ValidationError {
  path: string;
  message: string;
}

export interface ParsedPayload {
  payload: TextbookPayload;
  chapter: string;
  pageRange: string;
  errors: ValidationError[];
}

const VALID_NODE_TYPES: NodeType[] = [
  'CONCEPT', 'MORPHEME', 'WORD', 'EXAMPLE', 'RULE', 'LESSON', 'TEXTBOOK', 'CONSTRUCTION', 'LEXICAL_ENTRY',
];

const VALID_EDGE_TYPES: EdgeType[] = [
  'REQUIRES', 'CONTRADICTS', 'DERIVES_FROM', 'EXEMPLIFIES', 'CITES',
  'IS_A', 'PART_OF', 'VARIES_BY', 'SHARED_FORM', 'AGREES_WITH', 'INFLECTION_OF', 'HOMONYM_OF',
];

const VALID_ROLES: ConstructionRole[] = [
  'marker', 'head', 'dependent', 'subject', 'object', 'verb',
  'tense', 'aspect', 'polarity', 'mood', 'focus', 'topic',
  'modifier', 'determiner', 'possessor', 'complement', 'slot',
];

const VALID_CONTENT_TYPES: ContentType[] = ['text/markdown', 'text/plain', 'audio/mp3'];

/**
 * Parse raw JSON from swarm agents.
 * Accepts a single chapter object or an array of them.
 */
export async function parseSwarmOutput(raw: unknown): Promise<ParsedPayload[]> {
  const inputs: unknown[] = Array.isArray(raw) ? raw : [raw];
  const results: ParsedPayload[] = [];

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const basePath = inputs.length > 1 ? `[${i}]` : '';
    const errors: ValidationError[] = [];

    if (typeof input !== 'object' || input === null) {
      errors.push({ path: basePath, message: `Expected object, got ${typeof input}` });
      continue;
    }

    const obj = input as Record<string, unknown>;
    const textbookId = typeof obj.textbookId === 'string' ? obj.textbookId : '';
    const chapter = typeof obj.chapter === 'string' ? obj.chapter : '';
    const pageRange = typeof obj.pageRange === 'string' ? obj.pageRange : '';

    if (!textbookId) {
      errors.push({ path: `${basePath}.textbookId`, message: 'Missing or invalid textbookId' });
    }

    const rawNodes = Array.isArray(obj.nodes) ? obj.nodes : [];
    const rawEdges = Array.isArray(obj.edges) ? obj.edges : [];
    const rawConstructions = Array.isArray(obj.constructions) ? obj.constructions : [];
    const rawChunks = Array.isArray(obj.chunks) ? obj.chunks : [];

    if (!Array.isArray(obj.nodes)) errors.push({ path: `${basePath}.nodes`, message: 'Expected array' });
    if (!Array.isArray(obj.edges)) errors.push({ path: `${basePath}.edges`, message: 'Expected array' });
    if (!Array.isArray(obj.constructions)) errors.push({ path: `${basePath}.constructions`, message: 'Expected array' });
    if (!Array.isArray(obj.chunks)) errors.push({ path: `${basePath}.chunks`, message: 'Expected array' });

    // Parse and normalize chunks first (to compute real CIDs)
    const chunkResult = await parseChunks(rawChunks, `${basePath}.chunks`, errors);
    const cidMap = chunkResult.cidMap;
    const chunks = chunkResult.chunks;

    // Parse nodes, rewriting definitionCids
    const nodes = parseNodes(rawNodes, `${basePath}.nodes`, errors, cidMap);

    // Parse edges
    const edges = parseEdges(rawEdges, `${basePath}.edges`, errors);

    // Parse constructions
    const constructions = parseConstructions(rawConstructions, `${basePath}.constructions`, errors);

    results.push({
      payload: {
        textbookId: textbookId || 'unknown',
        nodes,
        edges,
        constructions,
        chunks,
      },
      chapter,
      pageRange,
      errors,
    });
  }

  return results;
}

interface ChunkParseResult {
  chunks: Chunk[];
  cidMap: Map<string, string>;
}

async function parseChunks(
  raw: unknown[],
  basePath: string,
  errors: ValidationError[]
): Promise<ChunkParseResult> {
  const chunks: Chunk[] = [];
  const cidMap = new Map<string, string>();

  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    const path = `${basePath}[${i}]`;

    if (typeof item !== 'object' || item === null) {
      errors.push({ path, message: 'Expected chunk object' });
      continue;
    }

    const obj = item as Record<string, unknown>;
    const originalCid = typeof obj.cid === 'string' ? obj.cid : '';
    const rawContentType = typeof obj.contentType === 'string' ? obj.contentType : 'text/plain';
    const payload = typeof obj.payload === 'string' ? obj.payload : '';

    if (!originalCid) errors.push({ path: `${path}.cid`, message: 'Missing cid' });
    if (!payload) errors.push({ path: `${path}.payload`, message: 'Missing payload' });

    const contentType = VALID_CONTENT_TYPES.includes(rawContentType as ContentType)
      ? (rawContentType as ContentType)
      : 'text/plain';

    if (contentType !== rawContentType) {
      errors.push({ path: `${path}.contentType`, message: `Invalid content type "${rawContentType}", defaulting to text/plain` });
    }

    // Compute real SHA-256 CID
    const realCid = await ChunkStore.computeCid(payload, contentType);

    // Map simplified CID → real CID
    if (originalCid) {
      cidMap.set(originalCid, realCid);
    }

    chunks.push({ cid: realCid, contentType, payload });
  }

  return { chunks, cidMap };
}

function parseNodes(
  raw: unknown[],
  basePath: string,
  errors: ValidationError[],
  cidMap: Map<string, string>
): Node[] {
  const nodes: Node[] = [];

  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    const path = `${basePath}[${i}]`;

    if (typeof item !== 'object' || item === null) {
      errors.push({ path, message: 'Expected node object' });
      continue;
    }

    const obj = item as Record<string, unknown>;
    const id = typeof obj.id === 'string' ? obj.id : '';
    const type = typeof obj.type === 'string' ? obj.type : '';
    const rawLabels = obj.labels;
    const rawAttributes = obj.attributes;
    const rawDefCids = obj.definitionCids;

    if (!id) errors.push({ path: `${path}.id`, message: 'Missing id' });
    if (!type) errors.push({ path: `${path}.type`, message: 'Missing type' });

    if (!VALID_NODE_TYPES.includes(type as NodeType)) {
      errors.push({ path: `${path}.type`, message: `Invalid node type "${type}"` });
    }

    const labels: Node['labels'] = { default: '' };
    if (typeof rawLabels === 'object' && rawLabels !== null) {
      const l = rawLabels as Record<string, unknown>;
      labels.default = typeof l.default === 'string' ? l.default : '';
      if (l.somali) labels.somali = String(l.somali);
      if (l.english) labels.english = String(l.english);
      if (l.transliteration) labels.transliteration = String(l.transliteration);
    }
    if (!labels.default) {
      labels.default = id;
      errors.push({ path: `${path}.labels.default`, message: 'Missing default label, using id as fallback' });
    }

    const attributes: Node['attributes'] = {};
    if (typeof rawAttributes === 'object' && rawAttributes !== null) {
      for (const [key, value] of Object.entries(rawAttributes as Record<string, unknown>)) {
        attributes[key] = value;
      }
    }

    // Rewrite definitionCids using real CIDs
    const definitionCids: string[] = [];
    if (Array.isArray(rawDefCids)) {
      for (let j = 0; j < rawDefCids.length; j++) {
        const cid = String(rawDefCids[j]);
        const realCid = cidMap.get(cid) || cid;
        if (realCid) definitionCids.push(realCid);
      }
    }

    nodes.push({
      id: id || `__anon_node_${i}`,
      type: (VALID_NODE_TYPES.includes(type as NodeType) ? type : 'CONCEPT') as NodeType,
      labels,
      attributes,
      definitionCids,
    });
  }

  return nodes;
}

function parseEdges(
  raw: unknown[],
  basePath: string,
  errors: ValidationError[]
): Edge[] {
  const edges: Edge[] = [];

  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    const path = `${basePath}[${i}]`;

    if (typeof item !== 'object' || item === null) {
      errors.push({ path, message: 'Expected edge object' });
      continue;
    }

    const obj = item as Record<string, unknown>;
    const id = typeof obj.id === 'string' ? obj.id : '';
    const from = typeof obj.from === 'string' ? obj.from : '';
    const to = typeof obj.to === 'string' ? obj.to : '';
    const type = typeof obj.type === 'string' ? obj.type : '';
    const rawQualifiers = obj.qualifiers;

    if (!id) errors.push({ path: `${path}.id`, message: 'Missing id' });
    if (!from) errors.push({ path: `${path}.from`, message: 'Missing from' });
    if (!to) errors.push({ path: `${path}.to`, message: 'Missing to' });
    if (!type) errors.push({ path: `${path}.type`, message: 'Missing type' });

    if (!VALID_EDGE_TYPES.includes(type as EdgeType)) {
      errors.push({ path: `${path}.type`, message: `Invalid edge type "${type}"` });
    }

    // Parse qualifiers with generous defaults
    const qualifiers: Edge['qualifiers'] = {
      source: { textbookId: 'unknown' },
      confidence: 0.8,
      dialects: ['standard'],
    };

    if (typeof rawQualifiers === 'object' && rawQualifiers !== null) {
      const q = rawQualifiers as Record<string, unknown>;

      const rawSource = q.source;
      if (typeof rawSource === 'object' && rawSource !== null) {
        const s = rawSource as Record<string, unknown>;
        if (typeof s.textbookId === 'string') qualifiers.source.textbookId = s.textbookId;
        if (typeof s.page === 'string') qualifiers.source.page = s.page;
        if (typeof s.chapter === 'string') qualifiers.source.chapter = s.chapter;
      }

      if (typeof q.confidence === 'number') {
        qualifiers.confidence = Math.max(0, Math.min(1, q.confidence));
      } else if (typeof q.confidence === 'string') {
        const parsed = parseFloat(q.confidence);
        if (!isNaN(parsed)) qualifiers.confidence = Math.max(0, Math.min(1, parsed));
      }

      if (Array.isArray(q.dialects)) {
        qualifiers.dialects = q.dialects.map((d) => String(d));
      }
      if (typeof q.register === 'string') qualifiers.register = q.register as Edge['qualifiers']['register'];
      if (typeof q.era === 'string') qualifiers.era = q.era;
      if (typeof q.notes === 'string') qualifiers.notes = q.notes;
    } else {
      errors.push({ path: `${path}.qualifiers`, message: 'Missing qualifiers, using defaults' });
    }

    edges.push({
      id: id || `__anon_edge_${i}`,
      from: from || '__unknown',
      to: to || '__unknown',
      type: (VALID_EDGE_TYPES.includes(type as EdgeType) ? type : 'IS_A') as EdgeType,
      qualifiers,
    });
  }

  return edges;
}

function parseConstructions(
  raw: unknown[],
  basePath: string,
  errors: ValidationError[]
): Construction[] {
  const constructions: Construction[] = [];

  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    const path = `${basePath}[${i}]`;

    if (typeof item !== 'object' || item === null) {
      errors.push({ path, message: 'Expected construction object' });
      continue;
    }

    const obj = item as Record<string, unknown>;
    const id = typeof obj.id === 'string' ? obj.id : '';
    const name = typeof obj.name === 'string' ? obj.name : '';
    const rawMembers = obj.members;
    const rawQualifiers = obj.qualifiers;

    if (!id) errors.push({ path: `${path}.id`, message: 'Missing id' });
    if (!name) errors.push({ path: `${path}.name`, message: 'Missing name' });

    const members: Construction['members'] = [];
    if (Array.isArray(rawMembers)) {
      for (let j = 0; j < rawMembers.length; j++) {
        const m = rawMembers[j];
        const mPath = `${path}.members[${j}]`;
        if (typeof m !== 'object' || m === null) {
          errors.push({ path: mPath, message: 'Expected member object' });
          continue;
        }
        const mo = m as Record<string, unknown>;
        const nodeId = typeof mo.nodeId === 'string' ? mo.nodeId : '';
        const role = typeof mo.role === 'string' ? mo.role : '';

        if (!nodeId) errors.push({ path: `${mPath}.nodeId`, message: 'Missing nodeId' });
        if (!role) errors.push({ path: `${mPath}.role`, message: 'Missing role' });
        if (!VALID_ROLES.includes(role as ConstructionRole)) {
          errors.push({ path: `${mPath}.role`, message: `Invalid role "${role}"` });
        }

        members.push({
          nodeId: nodeId || `__anon_member_${j}`,
          role: (VALID_ROLES.includes(role as ConstructionRole) ? role : 'slot') as ConstructionRole,
          position: typeof mo.position === 'number' ? mo.position : undefined,
          optional: typeof mo.optional === 'boolean' ? mo.optional : undefined,
          bound: typeof mo.bound === 'boolean' ? mo.bound : undefined,
        });
      }
    } else {
      errors.push({ path: `${path}.members`, message: 'Expected array' });
    }

    if (members.length < 2) {
      errors.push({ path: `${path}.members`, message: `Construction has only ${members.length} member(s), need ≥2` });
    }

    // Parse qualifiers
    const qualifiers: Construction['qualifiers'] = {
      source: { textbookId: 'unknown' },
      confidence: 0.8,
      dialects: ['standard'],
    };

    if (typeof rawQualifiers === 'object' && rawQualifiers !== null) {
      const q = rawQualifiers as Record<string, unknown>;
      const rawSource = q.source;
      if (typeof rawSource === 'object' && rawSource !== null) {
        const s = rawSource as Record<string, unknown>;
        if (typeof s.textbookId === 'string') qualifiers.source.textbookId = s.textbookId;
        if (typeof s.page === 'string') qualifiers.source.page = s.page;
        if (typeof s.chapter === 'string') qualifiers.source.chapter = s.chapter;
      }
      if (typeof q.confidence === 'number') qualifiers.confidence = Math.max(0, Math.min(1, q.confidence));
      if (Array.isArray(q.dialects)) qualifiers.dialects = q.dialects.map((d) => String(d));
    } else {
      errors.push({ path: `${path}.qualifiers`, message: 'Missing qualifiers, using defaults' });
    }

    constructions.push({
      id: id || `__anon_construction_${i}`,
      type: 'CONSTRUCTION',
      name: name || 'Unnamed Construction',
      members,
      qualifiers,
    });
  }

  return constructions;
}

/**
 * Merge multiple parsed payloads into a single payload (same textbook).
 * Useful when swarm agents produced one file per chapter.
 */
export function mergePayloads(payloads: ParsedPayload[]): TextbookPayload {
  const textbookId = payloads[0]?.payload.textbookId || 'merged';
  const chunks: Chunk[] = [];
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const constructions: Construction[] = [];

  const chunkIds = new Set<string>();
  const nodeIds = new Set<string>();
  const edgeIds = new Set<string>();
  const constructionIds = new Set<string>();

  for (const p of payloads) {
    for (const chunk of p.payload.chunks) {
      if (!chunkIds.has(chunk.cid)) {
        chunkIds.add(chunk.cid);
        chunks.push(chunk);
      }
    }
    for (const node of p.payload.nodes) {
      if (!nodeIds.has(node.id)) {
        nodeIds.add(node.id);
        nodes.push(node);
      }
    }
    for (const edge of p.payload.edges) {
      if (!edgeIds.has(edge.id)) {
        edgeIds.add(edge.id);
        edges.push(edge);
      }
    }
    for (const c of p.payload.constructions) {
      if (!constructionIds.has(c.id)) {
        constructionIds.add(c.id);
        constructions.push(c);
      }
    }
  }

  return { textbookId, chunks, nodes, edges, constructions };
}
