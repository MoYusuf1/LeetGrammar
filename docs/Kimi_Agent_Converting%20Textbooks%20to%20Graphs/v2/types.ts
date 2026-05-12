/**
 * Somali Grammar v2 — TypeScript Types
 * Matches the normalized relational schema.
 * JSONB only for extensibility; standard fields are typed columns.
 */

// ─── Core Node Types ─────────────────────────────────────────────────

export type NodeType = "CONCEPT" | "MORPHEME" | "WORD" | "EXAMPLE" | "RULE";

export interface GraphNode {
  id: string;
  type: NodeType;
  label_default: string;
  label_somali: string | null;
  label_english: string | null;
  pos: string | null;            // noun, verb, adj, classifier, particle...
  gender: "masculine" | "feminine" | null;
  bound: boolean | null;         // true for clitics
  polarity: "positive" | "negative" | null;
  verb_class: string | null;     // conjugation group (1, 2A, 2B, 3)
  dialect: string | null;        // standard, northern, southern, benadiri, maay-maay
  extra_attrs: Record<string, unknown> | null;  // extensibility
  definition_cids: string[] | null;
}

// ─── Lessons ─────────────────────────────────────────────────────────

export interface GraphLesson {
  id: string;
  textbook_id: string;
  chapter: string;
  title: string;
  page_range: string | null;
  difficulty: number;            // 0.0 - 1.0
  estimated_minutes: number;
  sort_key: number;
  previous_lesson: string | null;
  next_lesson: string | null;
  created_at: string;
}

// ─── Chunks ──────────────────────────────────────────────────────────

export type ChunkType =
  | "dialogue"
  | "dialogue-translation"
  | "vocabulary"
  | "grammar"
  | "cultural-note"
  | "exercise-prompt"
  | "memo"
  | "folktale"
  | "survival-dialog"
  | "paradigm"
  | "reading"
  | "overview";

export interface GraphChunk {
  cid: string;
  lesson_id: string | null;
  content_type: string;
  payload: string;
  source_page: string | null;
  chunk_type: ChunkType;
  extra_qualifiers: Record<string, unknown> | null;
}

export interface LessonChunk {
  lesson_id: string;
  chunk_cid: string;
  section_order: number;
  section_title: string | null;
}

// ─── Edges ───────────────────────────────────────────────────────────

export type ConceptEdgeType =
  | "REQUIRES"
  | "IS_A"
  | "CONTRADICTS"
  | "PART_OF"
  | "DERIVES_FROM"
  | "VARIES_BY"
  | "AGREES_WITH"
  | "SHARED_FORM"
  | "CITES";

export type ContentEdgeType = "TEACHES" | "DEFINES" | "EXEMPLIFIES" | "TESTS";

export interface ConceptEdge {
  id: string;
  from_node: string;
  to_node: string;
  type: ConceptEdgeType;
  weight: number;
  source_page: string | null;
  source_textbook: string | null;
  confidence: number | null;
}

export interface ContentEdge {
  id: string;
  content_id: string;
  concept_id: string;
  type: ContentEdgeType;
  weight: number;
  source_page: string | null;
  source_textbook: string | null;
}

// ─── Constructions ───────────────────────────────────────────────────

export interface GraphConstruction {
  id: string;
  name: string;
  members: ConstructionMember[];
  source_page: string | null;
  source_textbook: string | null;
}

export interface ConstructionMember {
  nodeId: string;
  role: string;
  position: number;
  optional: boolean;
  bound?: boolean;
}

// ─── Exercises ───────────────────────────────────────────────────────

export interface GraphExercise {
  id: string;
  lesson_id: string | null;
  title: string;
  instruction: string | null;
  difficulty: number;
  created_at: string;
}

export interface ExerciseItem {
  id: number;
  exercise_id: string;
  item_order: number;
  prompt: string;
  answer: string | null;
  hint: string | null;
}

export interface ExerciseConcept {
  exercise_id: string;
  concept_id: string;
  is_primary: boolean;
}

// ─── Learner State (SRS) ─────────────────────────────────────────────

export interface LearnerConceptState {
  user_id: string;
  concept_id: string;
  mastery: number;
  stability: number;
  difficulty: number;
  retrievability: number;
  last_reviewed: string | null;
  next_review_at: string | null;
  review_count: number;
  lapse_count: number;
  total_study_time_seconds: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewLog {
  id: string;
  user_id: string;
  concept_id: string;
  exercise_id: string | null;
  rating: 1 | 2 | 3 | 4;
  old_mastery: number;
  new_mastery: number;
  old_stability: number;
  new_stability: number;
  scheduled_interval: number | null;
  actual_interval: number | null;
  study_time_seconds: number;
  created_at: string;
}

// ─── Composite Views ─────────────────────────────────────────────────

export interface LessonView {
  lesson: GraphLesson;
  sections: LessonSection[];
  vocabulary: GraphNode[];
  exercises: GraphExercise[];
  teachesConcepts: GraphNode[];
}

export interface LessonSection {
  chunk: GraphChunk;
  order: number;
  title: string | null;
}

export interface ConceptDetail {
  concept: GraphNode;
  lessons: GraphLesson[];
  chunks: (GraphChunk & { edge_type: ContentEdgeType; edge_weight: number })[];
  exercises: (GraphExercise & { items: ExerciseItem[] })[];
  prerequisites: (GraphNode & { edge_weight: number })[];
  nextConcepts: (GraphNode & { edge_weight: number })[];
  related: (GraphNode & { edge_type: ConceptEdgeType })[];
}

// ─── Dashboard ───────────────────────────────────────────────────────

export interface MasteryStats {
  totalConcepts: number;
  mastered: number;
  learning: number;
  new: number;
  dueToday: number;
}

export interface UnitProgress {
  chapter: string;
  total_concepts: number;
  mastered: number;
  in_progress: number;
  not_started: number;
  pct_complete: number;
}
