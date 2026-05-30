/**
 * LeetGrammar Engine — Public API
 *
 * Engine layer provides the core knowledge graph, SRS, and curriculum algorithms.
 * No dependencies on Supabase, stores, or components.
 */

// ─── Core Types ──────────────────────────────────────────────────────────────
export type {
  Node,
  NodeType,
  NodeLabels,
  Edge,
  EdgeType,
  Construction,
  ConstructionRole,
  ConstructionMember,
  Chunk,
  ContentType,
  TraversalOptions,
  GraphSnapshot,
  Dialect,
  Register,
  SourceAttribution,
  Qualifiers,
} from './types';

// ─── Graph Engine ────────────────────────────────────────────────────────────
export { GraphEngine } from './graph-engine';

// ─── SRS Systems ─────────────────────────────────────────────────────────────
export {
  processReview,
  getDueConcepts,
  getLearningFrontier,
  initConceptState,
  type ConceptState,
  type ReviewRating,
  type ReviewResult,
} from './graph-srs';

// ─── Curriculum ──────────────────────────────────────────────────────────────
export {
  generateLearningPath,
  validateCurriculum,
  shortestPath,
} from './curriculum';

// ─── Quiz Generation ─────────────────────────────────────────────────────────
export { generateQuiz, type QuizQuestion } from './quiz-generator';

// ─── Persistence ─────────────────────────────────────────────────────────────
export { GraphPersistence } from './persistence';

// ─── Chunk Store (Content-Addressed) ──────────────────────────────────────────
export { ChunkStore } from './chunk-store';

// ─── Data Ingestion ──────────────────────────────────────────────────────────
export {
  ingestTextbook,
  generateDiffReport,
  type TextbookPayload,
} from './ingestion';

// ─── Export/Import ───────────────────────────────────────────────────────────
export {
  exportToJSON,
  importFromJSON,
  downloadJSON,
  readJSONFile,
  downloadSQLite,
  readBinaryFile,
  type PortableGraph,
} from './export-import';
