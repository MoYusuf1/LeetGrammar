/**
 * Core type definitions for the LeetGrammar Knowledge Graph Engine.
 *
 * Tier 2 Architecture: Property graph for most relations;
 * Construction hypergraph for grammatical patterns only.
 */

// ─── Dialects ───────────────────────────────────────────────────────────────

export type Dialect =
  | 'standard'
  | 'northern'
  | 'southern'
  | 'benadiri'
  | 'maay-maay'
  | 'digiil'
  | string;

export type Register = 'formal' | 'informal' | 'poetic' | 'religious';

// ─── Node Types ─────────────────────────────────────────────────────────────

export type NodeType =
  | 'CONCEPT'
  | 'MORPHEME'
  | 'WORD'
  | 'EXAMPLE'
  | 'RULE'
  | 'LESSON'
  | 'TEXTBOOK'
  | 'CONSTRUCTION'
  | 'LEXICAL_ENTRY';

export interface NodeLabels {
  default: string;
  somali?: string;
  english?: string;
  transliteration?: string;
}

export interface Node {
  id: string;
  type: NodeType;
  labels: NodeLabels;
  attributes: Record<string, unknown>;
  definitionCids: string[];
}

// ─── Edge Types ─────────────────────────────────────────────────────────────

export type EdgeType =
  | 'REQUIRES'
  | 'CONTRADICTS'
  | 'DERIVES_FROM'
  | 'EXEMPLIFIES'
  | 'CITES'
  | 'IS_A'
  | 'PART_OF'
  | 'VARIES_BY'
  | 'SHARED_FORM'
  | 'AGREES_WITH'
  | 'INFLECTION_OF'
  | 'HOMONYM_OF';

export interface SourceAttribution {
  textbookId: string;
  page?: string;
  chapter?: string;
}

export interface Qualifiers {
  source: SourceAttribution;
  confidence: number;
  dialects: Dialect[];
  register?: Register;
  era?: string;
  notes?: string;
}

export interface Edge {
  id: string;
  from: string;
  to: string;
  type: EdgeType;
  qualifiers: Qualifiers;
}

// ─── Construction (Hyperedge) ───────────────────────────────────────────────

export type ConstructionRole =
  | 'marker'
  | 'head'
  | 'dependent'
  | 'subject'
  | 'object'
  | 'verb'
  | 'tense'
  | 'aspect'
  | 'polarity'
  | 'mood'
  | 'focus'
  | 'topic'
  | 'modifier'
  | 'determiner'
  | 'possessor'
  | 'complement'
  | 'slot';

export interface ConstructionMember {
  nodeId: string;
  role: ConstructionRole;
  position?: number;
  optional?: boolean;
  bound?: boolean;
}

export interface Construction {
  id: string;
  type: 'CONSTRUCTION';
  name: string;
  members: ConstructionMember[];
  qualifiers: Qualifiers;
}

// ─── Chunk ──────────────────────────────────────────────────────────────────

export type ContentType = 'text/markdown' | 'text/plain' | 'audio/mp3';

export interface Chunk {
  cid: string;
  contentType: ContentType;
  payload: string;
}

// ─── Graph Query Types ──────────────────────────────────────────────────────

export interface TraversalOptions {
  edgeTypes?: EdgeType[];
  maxDepth?: number;
  dialects?: Dialect[];
  minConfidence?: number;
}

export interface GraphSnapshot {
  nodes: Node[];
  edges: Edge[];
  constructions: Construction[];
  chunks: Chunk[];
}
