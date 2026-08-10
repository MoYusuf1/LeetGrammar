// ============================================================================
// TOP ~500 HIGH-FREQUENCY SOMALI WORDS — per-lesson vocabulary sets
// ----------------------------------------------------------------------------
// Curated teaching-frequency list (NOT corpus-derived). `rank` is an approximate
// learning-order index, not a precise frequency rank. Words are assigned to the
// 26 course lessons: grammatical function words map to their matching grammar
// lesson; content words (nouns/verbs/adjectives by semantic field) are spread
// across lessons so each lesson carries ~19–20 words.
//
// ⚠️  All words must be verified against ≥2 independent published sources per D2.
//     Words marked [SINGLE] or [UNCERTAIN] are placeholders awaiting verification.
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
  /** Approximate learning-order index (1 = learn first). */
  rank: number;
  somali: string;
  english: string;
  pos: PartOfSpeech;
  /** Lesson this word is introduced in (1–14 for Phase 6 core course). */
  lessonId: number;
  /** Confidence level per D2: verified = 2+ independent sources (optional for backward compat). */
  confidence?: ConfidenceLevel;
  /** Independent published sources. Per D2: every word needs ≥1 (optional for backward compat). */
  sources?: string[];
}

export const TOP_500_WORDS: VocabWord[] = [
  // ── Lesson 1: Foundations & Phonetics (greetings & essentials) ────────────
  { rank: 1, somali: 'nabad', english: 'peace / hello', pos: 'noun', lessonId: 1 },
  { rank: 2, somali: 'salaan', english: 'greeting', pos: 'noun', lessonId: 1 },
  { rank: 3, somali: 'subax', english: 'morning', pos: 'noun', lessonId: 1 },
  { rank: 4, somali: 'galab', english: 'afternoon', pos: 'noun', lessonId: 1 },
  { rank: 5, somali: 'habeen', english: 'night', pos: 'noun', lessonId: 1 },
  { rank: 6, somali: 'maalin', english: 'day', pos: 'noun', lessonId: 1 },
  { rank: 7, somali: 'magac', english: 'name', pos: 'noun', lessonId: 1 },
  { rank: 8, somali: 'qof', english: 'person', pos: 'noun', lessonId: 1 },
  { rank: 9, somali: 'haa', english: 'yes', pos: 'particle', lessonId: 1 },
  { rank: 10, somali: 'maya', english: 'no', pos: 'particle', lessonId: 1 },
  { rank: 11, somali: 'mahadsanid', english: 'thank you', pos: 'phrase', lessonId: 1 },
  { rank: 12, somali: 'fadlan', english: 'please', pos: 'adverb', lessonId: 1 },
  { rank: 13, somali: 'wanaagsan', english: 'good / well', pos: 'adjective', lessonId: 1 },
  { rank: 14, somali: 'run', english: 'truth', pos: 'noun', lessonId: 1 },
  { rank: 15, somali: 'been', english: 'lie / falsehood', pos: 'noun', lessonId: 1 },
  { rank: 16, somali: 'cod', english: 'voice / sound', pos: 'noun', lessonId: 1 },
  { rank: 17, somali: 'eray', english: 'word', pos: 'noun', lessonId: 1 },
  { rank: 18, somali: 'af', english: 'language / mouth', pos: 'noun', lessonId: 1 },
  { rank: 19, somali: 'xarf', english: 'letter (of alphabet)', pos: 'noun', lessonId: 1 },

  // ── Lesson 2: Nouns — Gender, Number & Agreement (people & home) ──────────
  { rank: 20, somali: 'nin', english: 'man', pos: 'noun', lessonId: 2, confidence: 'verified', sources: ['Nilsson 2023 §6.1/§6.3', 'Wikipedia: Somali grammar'] },
  { rank: 21, somali: 'naag', english: 'woman', pos: 'noun', lessonId: 2, confidence: 'verified', sources: ['Wiktionary: naag', 'Nilsson 2023 §6.3'] },
  { rank: 22, somali: 'wiil', english: 'boy', pos: 'noun', lessonId: 2, confidence: 'verified', sources: ['Nilsson 2023 §6.1/§6.3', 'Wikipedia: Somali grammar'] },
  { rank: 23, somali: 'gabadh', english: 'girl', pos: 'noun', lessonId: 2, confidence: 'verified', sources: ['Nilsson 2023 §6.1/§6.3', 'Wikipedia: Somali grammar'] },
  { rank: 24, somali: 'hooyo', english: 'mother', pos: 'noun', lessonId: 2, confidence: 'verified', sources: ['Nilsson 2023 §6.1/§6.3', 'Wikipedia: Somali grammar'] },
  { rank: 25, somali: 'aabo', english: 'father', pos: 'noun', lessonId: 2 },
  { rank: 26, somali: 'walaal', english: 'sibling', pos: 'noun', lessonId: 2 },
  { rank: 27, somali: 'ilmo', english: 'child', pos: 'noun', lessonId: 2 },
  { rank: 28, somali: 'carruur', english: 'children', pos: 'noun', lessonId: 2 },
  { rank: 29, somali: 'dad', english: 'people', pos: 'noun', lessonId: 2 },
  { rank: 30, somali: 'reer', english: 'family / household', pos: 'noun', lessonId: 2 },
  { rank: 31, somali: 'guri', english: 'house', pos: 'noun', lessonId: 2, confidence: 'verified', sources: ['Nilsson 2023 §6.1/§6.3', 'Wikipedia: Somali grammar'] },
  { rank: 32, somali: 'albaab', english: 'door', pos: 'noun', lessonId: 2 },
  { rank: 33, somali: 'daaqad', english: 'window', pos: 'noun', lessonId: 2 },
  { rank: 34, somali: 'miis', english: 'table', pos: 'noun', lessonId: 2 },
  { rank: 35, somali: 'kursi', english: 'chair', pos: 'noun', lessonId: 2 },
  { rank: 36, somali: 'buug', english: 'book', pos: 'noun', lessonId: 2, confidence: 'verified', sources: ['Nilsson 2023 §6.1/§6.3', 'Wikipedia: Somali grammar'] },
  { rank: 37, somali: 'qalin', english: 'pen', pos: 'noun', lessonId: 2 },
  { rank: 38, somali: 'warqad', english: 'paper / letter', pos: 'noun', lessonId: 2 },
  { rank: 39, somali: 'sariir', english: 'bed', pos: 'noun', lessonId: 2 },
  // Needed for the sourced sentence "Wiilku waa macallin." (Nilsson §11.1).
  { rank: 79, somali: 'macallin', english: 'teacher', pos: 'noun', lessonId: 2, confidence: 'verified', sources: ['Nilsson 2023 §6.3/§6.7', 'Wikipedia: Somali grammar'] },

  // ── Lesson 3: Articles & Determiners (places + this/that) ─────────────────
  { rank: 40, somali: 'kan', english: 'this (m)', pos: 'pronoun', lessonId: 3 },
  { rank: 41, somali: 'tan', english: 'this (f)', pos: 'pronoun', lessonId: 3 },
  { rank: 42, somali: 'kaas', english: 'that (m)', pos: 'pronoun', lessonId: 3 },
  { rank: 43, somali: 'taas', english: 'that (f)', pos: 'pronoun', lessonId: 3 },
  { rank: 44, somali: 'kuwan', english: 'these', pos: 'pronoun', lessonId: 3 },
  { rank: 45, somali: 'kuwaas', english: 'those', pos: 'pronoun', lessonId: 3 },
  { rank: 46, somali: 'magaalo', english: 'city / town', pos: 'noun', lessonId: 3, confidence: 'verified', sources: ['Nilsson 2023 §6.1/§6.3', 'Wikipedia: Somali grammar'] },
  { rank: 47, somali: 'tuulo', english: 'village', pos: 'noun', lessonId: 3 },
  { rank: 48, somali: 'dal', english: 'country', pos: 'noun', lessonId: 3 },
  { rank: 49, somali: 'dugsi', english: 'school', pos: 'noun', lessonId: 3 },
  { rank: 50, somali: 'suuq', english: 'market', pos: 'noun', lessonId: 3 },
  { rank: 51, somali: 'masjid', english: 'mosque', pos: 'noun', lessonId: 3 },
  { rank: 52, somali: 'jid', english: 'road / way', pos: 'noun', lessonId: 3 },
  { rank: 53, somali: 'beer', english: 'farm / garden', pos: 'noun', lessonId: 3 },
  { rank: 54, somali: 'webi', english: 'river', pos: 'noun', lessonId: 3 },
  { rank: 55, somali: 'bad', english: 'sea', pos: 'noun', lessonId: 3 },
  { rank: 56, somali: 'buur', english: 'mountain', pos: 'noun', lessonId: 3 },
  { rank: 57, somali: 'geed', english: 'tree', pos: 'noun', lessonId: 3 },
  { rank: 58, somali: 'dab', english: 'fire', pos: 'noun', lessonId: 3 },
  { rank: 59, somali: 'biyo', english: 'water', pos: 'noun', lessonId: 3 },

  // ── Lesson 4: Pronouns — Comprehensive System ─────────────────────────────
  { rank: 60, somali: 'aniga', english: 'I / me', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 61, somali: 'adiga', english: 'you (sg)', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 62, somali: 'isaga', english: 'he / him', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 63, somali: 'iyada', english: 'she / her', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 64, somali: 'annaga', english: 'we (exclusive)', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 65, somali: 'innaga', english: 'we (inclusive)', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 66, somali: 'idinka', english: 'you (pl)', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 67, somali: 'iyaga', english: 'they / them', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 68, somali: 'aan', english: 'I (subject clitic)', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 69, somali: 'aad', english: 'you (subject clitic)', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 70, somali: 'uu', english: 'he (subject clitic)', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 71, somali: 'ay', english: 'she / they (subject clitic)', pos: 'pronoun', lessonId: 4, confidence: 'verified', sources: ['Nilsson 2023 §5.1', 'Wikipedia: Somali grammar'] },
  { rank: 72, somali: 'kayga', english: 'my / mine (m)', pos: 'pronoun', lessonId: 4 },
  { rank: 73, somali: 'kaaga', english: 'your (m)', pos: 'pronoun', lessonId: 4 },
  { rank: 74, somali: 'kiisa', english: 'his', pos: 'pronoun', lessonId: 4 },
  { rank: 75, somali: 'keeda', english: 'her / hers', pos: 'pronoun', lessonId: 4 },
  { rank: 76, somali: 'keenna', english: 'our (m)', pos: 'pronoun', lessonId: 4 },
  { rank: 77, somali: 'kooda', english: 'their', pos: 'pronoun', lessonId: 4 },
  { rank: 78, somali: 'kee', english: 'which one', pos: 'pronoun', lessonId: 4 },

];

/** All words taught in a given lesson (1–14 for Phase 6 core), in learning order. */
export function getVocabForLesson(lessonId: number): VocabWord[] {
  return TOP_500_WORDS.filter((w) => w.lessonId === lessonId);
}

/** The full list sorted by approximate frequency rank. */
export function getVocabByRank(): VocabWord[] {
  return [...TOP_500_WORDS].sort((a, b) => a.rank - b.rank);
}

/** Total number of curated words. */
export const VOCAB_COUNT = TOP_500_WORDS.length;
