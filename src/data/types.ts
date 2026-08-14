/**
 * DATA MODEL FOR COURSE REDESIGN (Phase 1)
 * ========================================
 * Single source of truth for all lesson/exercise/vocabulary types.
 * Every field here is enforced by scripts/validate-course.mjs.
 *
 * CARD TYPES — how a single card's content is structured
 * EXERCISE TYPES — the specific interaction in a practice card
 * VOCABULARY — the word tracking system
 * UNITS — grouping of lessons for mastery gating
 */

// ============================================================================
// CARD TYPES — every lesson is a sequence of these
// ============================================================================

export type CardType =
  | 'blueprint'   // visual organizer showing the running sentence shape
  | 'connect'     // connect to last lesson + prime prior knowledge
  | 'promise'     // tell the learner what they'll be able to do by lesson end
  | 'predict'     // guess before a rule is revealed (retrieval event)
  | 'teach'       // explain the rule plainly
  | 'example'     // worked example, fully annotated
  | 'notice'      // structured input: comprehend only, hinges on target form
  | 'complete'    // partially-scaffolded production
  | 'produce'     // full production, no scaffold
  | 'payoff'      // build the exact sentence promised at lesson start
  | 'summary'     // lesson wrap-up
  | 'vocab';      // vocabulary list (synthetic, generated per lesson)

// ============================================================================
// EXERCISE TYPES — the interaction shapes inside practice cards
// ============================================================================

/**
 * Interaction SHAPE — how the learner answers. Distinct from the card's
 * pedagogical ROLE (notice/complete/produce, see CardType): a `notice` card
 * asks for comprehension, but the learner still answers it via one of these
 * shapes. Every shape below must have a matching renderer in
 * LessonCards.tsx `PracticeCard`, or the card becomes unanswerable.
 */
export type ExerciseType =
  | 'multiple_choice'           // pick one from n options
  | 'fill_blank'                // fill-in-the-blank
  | 'matching'                  // match pairs
  | 'unscramble'                // reorder words to build a sentence
  | 'translate'                 // type a translation or Somali sentence
  | 'marker_identification';    // identify/build particles + pronouns

// ============================================================================
// EXERCISE — the thing a learner does in a practice card
// ============================================================================

export interface PracticeExercise {
  id: string;
  type: ExerciseType;
  question: string;             // what the learner is asked; always required

  // MCQ / fill_blank / matching
  options?: string[];
  correctAnswer?: string;

  // unscramble
  words?: string[];             // word bank to reorder

  /**
   * A Somali sentence displayed to the learner above the input.
   *
   * Only for exercises where seeing the sentence IS the task (e.g.
   * marker_identification). Never set this on `unscramble` — it renders the
   * target sentence in full, handing over the answer.
   */
  somali?: string;

  /**
   * The correct answer for every non-multiple-choice type, including
   * `unscramble`. `isAnswerCorrect()` reads this field and nothing else, so an
   * exercise without it can never be marked correct.
   */
  answer?: string | string[];

  // Every exercise must have these
  hint: string;                 // Plain-English hint, never generic
  explanation: string;          // Metalinguistic explanation; ≥80 chars

  // Objective mapping for correctives
  objectiveIds: string[];       // Which lesson objectives this item targets
}

// ============================================================================
// CARD — a single "page" in a lesson
// ============================================================================

/**
 * The four boxes of the sentence blueprint, in the order they are drawn.
 *
 * Declared here rather than in the component because the *data* is what says
 * which boxes a lesson fills; the component only draws them.
 */
export const BLUEPRINT_SLOTS = ['WHO', 'SIGNAL', 'WHAT', 'DO'] as const;
export type BlueprintSlot = (typeof BLUEPRINT_SLOTS)[number];

export interface Card {
  id: string;
  type: CardType;

  // Content — exactly one per card
  // (see BlueprintSlot below for the sentence-shape boxes)
  title?: string;               // for teach/example/summary cards
  prompt?: string;              // for blueprint/connect/promise/predict
  content?: string;             // long-form for teach/example cards
  exercise?: PracticeExercise;  // for practice cards (notice/complete/produce)
  vocab?: string[];             // for vocab cards (list of Somali words)

  // Blueprint state — used in blueprint card only.
  //
  // A LESSON MAY FILL MORE THAN ONE BOX, which is why this takes a list as well
  // as a single value. COURSE_DESIGN §4B.1's own progression table says Lesson 2
  // adds "WHO / WHAT can hold a noun" and Lesson 3 "those boxes can be made
  // definite" — both plural. The field used to be a single slot, so those
  // lessons could only claim WHO, `WHAT` was never lit by anything, and Lesson
  // 8's blueprint card asserted "Every box is filled" while one never had been.
  blueprintSlot?: BlueprintSlot | BlueprintSlot[];

  // Metadata
  isNew?: boolean;              // This card introduces new grammar
}

// ============================================================================
// LESSON — 14 lessons total, ~8–18 cards each
// ============================================================================

export interface Lesson {
  id: number;                   // 1–14
  unitId: number;              // Which unit (1–4) this belongs to
  title: string;               // Plain English: "Naming Things", "Action Words"
  cards: Card[];

  // Metadata for validation
  newItems: string[];          // IDs of cards marked isNew (must be ≤4 per lesson)
  objectives: string[];        // e.g. ["waa_statement", "subject_verb_matching"]
}

// ============================================================================
// UNIT — groups of lessons for mastery gating (85% threshold)
// ============================================================================

export interface Unit {
  id: number;                  // 1–4
  name: string;                // "Fill the boxes", "Assemble the shape"
  lessonIds: number[];         // e.g. [1, 2, 3, 4]
  testBankId: string;          // Reference to the test bank for this unit
}

// ============================================================================
// TEST BANK — for unit tests and homework banks
// ============================================================================

export interface TestBank {
  id: string;
  name: string;
  description: string;         // e.g. "Unit 2 Test Bank" or "Lesson 5 Homework"
  items: PracticeExercise[];
}

// ============================================================================
// VOCABULARY WORD (extends existing structure with confidence tracking)
// ============================================================================

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'adverb'
  | 'numeral'
  | 'particle'
  | 'phrase';

export type ConfidenceLevel = 'verified' | 'single-source' | 'uncertain';

export interface VocabWord {
  rank: number;                // 1–500 (approximate learning order)
  somali: string;
  english: string;
  pos: PartOfSpeech;
  lessonId: number;            // 1–14

  // Sourcing + confidence (optional for migration; defaults to 'uncertain' if missing)
  confidence?: ConfidenceLevel; // verified = 2+ independent sources
  sources?: string[];           // e.g. ["Wiktionary", "Lexilogos"]
}

// ============================================================================
// COURSE — the full shape
// ============================================================================

export interface Course {
  units: Unit[];
  lessons: Lesson[];
  vocabulary: VocabWord[];
  testBanks: TestBank[];
}
