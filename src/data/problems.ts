// ============================================================================
// PROBLEM SET — 30 Compound Somali Grammar Challenges
// LeetCode-style: each problem is a boss fight combining multiple concepts.
// Learn is DISCONNECTED. Study the grammar reference first, then tackle problems.
// ============================================================================

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProblemMeta {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  section: string;
  sectionId: number;
  tags: string[];
  prerequisites: number[];
  description: string;
  acceptance: number;
  isPremium: boolean;
}

export interface ProblemSection {
  id: number;
  name: string;
  description: string;
  color: string;
}

export function displayDifficulty(d: string): string {
  switch (d) {
    case 'Beginner': return 'Easy';
    case 'Intermediate': return 'Medium';
    case 'Advanced': return 'Hard';
    default: return d;
  }
}

export const difficultyConfig = {
  Beginner: { label: 'Easy', color: '#00b8a3', bg: 'rgba(0,184,163,0.12)', border: 'rgba(0,184,163,0.25)' },
  Intermediate: { label: 'Medium', color: '#ffc01e', bg: 'rgba(255,192,30,0.12)', border: 'rgba(255,192,30,0.25)' },
  Advanced: { label: 'Hard', color: '#ff375f', bg: 'rgba(255,55,95,0.12)', border: 'rgba(255,55,95,0.25)' },
} as const;

export const problemSections: ProblemSection[] = [
  { id: 0, name: 'Foundations', description: 'Alphabet, sounds, and greetings', color: '#3b82f6' },
  { id: 1, name: 'Noun System', description: 'Gender, articles, plurals, and case', color: '#22c55e' },
  { id: 2, name: 'Sentence Core', description: 'Clitics, SOV order, and the copula', color: '#a855f7' },
  { id: 3, name: 'Focus & Questions', description: 'waa, baa, waxa, and question markers', color: '#f97316' },
  { id: 4, name: 'Verb & Tense', description: 'Classes, tenses, negation, and aspect', color: '#eab308' },
  { id: 5, name: 'Space & Modifiers', description: 'Prepositions, directionals, adjectives, and numbers', color: '#06b6d4' },
  { id: 6, name: 'Complex Grammar', description: 'Connectors, relatives, and conditionals', color: '#ec4899' },
  { id: 7, name: 'Mastery', description: 'Passive, causative, and free production', color: '#ef4444' },
];

export const allProblems: ProblemMeta[] = [
  // ═══════════════════════════════════════════════════════════════════
  // SECTION 0: Foundations
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 1, title: 'Sound Decoder', slug: 'sound-decoder', difficulty: 'Beginner',
    section: 'Foundations', sectionId: 0,
    tags: ['phonology', 'transcription'], prerequisites: [],
    description: 'Given a set of Somali words, correctly identify the phonetic value of each special consonant (c, x, kh, q) and transcribe them using IPA.',
    acceptance: 72, isPremium: false,
  },
  {
    id: 2, title: 'Greeting Builder', slug: 'greeting-builder', difficulty: 'Beginner',
    section: 'Foundations', sectionId: 0,
    tags: ['clitics', 'social'], prerequisites: [1],
    description: 'Construct appropriate greetings for 5 different social contexts using correct clitic pronouns (waan, waad, wuu, way).',
    acceptance: 65, isPremium: false,
  },
  {
    id: 3, title: 'Audio Transcription', slug: 'audio-transcription', difficulty: 'Intermediate',
    section: 'Foundations', sectionId: 0,
    tags: ['phonology', 'listening'], prerequisites: [1, 2],
    description: 'Transcribe a short spoken Somali passage into standard orthography. Pay attention to vowel length, tone, and consonant clusters.',
    acceptance: 48, isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: Noun System
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 4, title: 'Article Application', slug: 'article-application', difficulty: 'Beginner',
    section: 'Noun System', sectionId: 1,
    tags: ['nouns', 'articles', 'gender'], prerequisites: [1],
    description: 'Given 10 bare nouns, apply the correct definite article (-ka/-ga/-ha or -ta/-da) with proper voicing assimilation.',
    acceptance: 68, isPremium: false,
  },
  {
    id: 5, title: 'Plural Factory', slug: 'plural-factory', difficulty: 'Beginner',
    section: 'Noun System', sectionId: 1,
    tags: ['nouns', 'plurals', 'gender'], prerequisites: [4],
    description: 'Convert 8 singular nouns to their plural forms. Some require suffix changes, others stem changes. Watch for gender polarity.',
    acceptance: 58, isPremium: false,
  },
  {
    id: 6, title: 'Case Marker Challenge', slug: 'case-marker-challenge', difficulty: 'Intermediate',
    section: 'Noun System', sectionId: 1,
    tags: ['nouns', 'case', 'definiteness'], prerequisites: [4, 5],
    description: 'Given sentences with missing case markers, fill in the correct form. Combines definite articles, plural suffixes, and case endings.',
    acceptance: 45, isPremium: false,
  },
  {
    id: 7, title: 'Noun Phrase Architect', slug: 'noun-phrase-architect', difficulty: 'Advanced',
    section: 'Noun System', sectionId: 1,
    tags: ['nouns', 'case', 'plurals', 'gender'], prerequisites: [4, 5, 6],
    description: 'Build complex noun phrases from English prompts: definite plural nouns with possessors and case markers. No scaffolding provided.',
    acceptance: 32, isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: Sentence Core
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 8, title: 'SOV Assembler', slug: 'sov-assembler', difficulty: 'Beginner',
    section: 'Sentence Core', sectionId: 2,
    tags: ['word-order', 'SOV'], prerequisites: [1, 2],
    description: 'Rearrange scrambled Somali words into correct SOV order. Each sentence includes a subject clitic, object, and verb.',
    acceptance: 70, isPremium: false,
  },
  {
    id: 9, title: 'Clitic Selector', slug: 'clitic-selector', difficulty: 'Beginner',
    section: 'Sentence Core', sectionId: 2,
    tags: ['clitics', 'pronouns'], prerequisites: [2, 8],
    description: 'Choose the correct subject clitic (waan, waad, wuu, way, waannu, waynu) for 10 sentences based on subject person and number.',
    acceptance: 62, isPremium: false,
  },
  {
    id: 10, title: 'Copula vs Verbless', slug: 'copula-vs-verbless', difficulty: 'Intermediate',
    section: 'Sentence Core', sectionId: 2,
    tags: ['copula', 'equational'], prerequisites: [8, 9],
    description: 'Given 12 English sentences, determine whether each requires the copula (yahay/ahay/tahay) or a verbless equational construction (waa + noun).',
    acceptance: 51, isPremium: false,
  },
  {
    id: 11, title: 'Sentence Constructor', slug: 'sentence-constructor', difficulty: 'Advanced',
    section: 'Sentence Core', sectionId: 2,
    tags: ['SOV', 'clitics', 'copula', 'word-order'], prerequisites: [8, 9, 10],
    description: 'Translate 5 English sentences into Somali from scratch. Each requires correct clitic selection, SOV ordering, and copula/verbless choice. No word bank.',
    acceptance: 28, isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3: Focus & Questions
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 12, title: 'Marker Identifier', slug: 'marker-identifier', difficulty: 'Beginner',
    section: 'Focus & Questions', sectionId: 3,
    tags: ['focus', 'markers', 'recognition'], prerequisites: [8, 9],
    description: 'Analyze 12 Somali sentences. For each, identify the marker type (statement waa, focus baa, spotlight waxa, question ma) and name its function.',
    acceptance: 74, isPremium: false,
  },
  {
    id: 13, title: 'Focus Chooser', slug: 'focus-chooser', difficulty: 'Beginner',
    section: 'Focus & Questions', sectionId: 3,
    tags: ['focus', 'waa', 'baa', 'waxa'], prerequisites: [12],
    description: 'Given 8 English sentences with emphasis hints, select the correct Somali marker (waa, baa, or waxa) and construct the sentence.',
    acceptance: 61, isPremium: false,
  },
  {
    id: 14, title: 'Contraction Decomposer', slug: 'contraction-decomposer', difficulty: 'Intermediate',
    section: 'Focus & Questions', sectionId: 3,
    tags: ['clitics', 'contractions', 'pronouns'], prerequisites: [9, 12, 13],
    description: 'Break down 15 contracted forms (waan, wuu, way, bay, waxaan, waxaad, buu, etc.) into their marker + pronoun components.',
    acceptance: 53, isPremium: false,
  },
  {
    id: 15, title: 'Question Crafter', slug: 'question-crafter', difficulty: 'Intermediate',
    section: 'Focus & Questions', sectionId: 3,
    tags: ['questions', 'ma', 'miyaa'], prerequisites: [12, 13],
    description: 'Convert 8 Somali statements into yes/no questions using the correct question marker (ma, miyaa, miyuu, miyay).',
    acceptance: 47, isPremium: false,
  },
  {
    id: 16, title: 'Focus Mastery', slug: 'focus-mastery', difficulty: 'Advanced',
    section: 'Focus & Questions', sectionId: 3,
    tags: ['focus', 'translation', 'production'], prerequisites: [12, 13, 14, 15],
    description: 'Translate a short English paragraph into Somali with correct focus marking throughout. You must choose the right emphasis for each sentence. No hints.',
    acceptance: 24, isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 4: Verb & Tense
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 17, title: 'Verb Conjugator', slug: 'verb-conjugator', difficulty: 'Beginner',
    section: 'Verb & Tense', sectionId: 4,
    tags: ['verbs', 'conjugation', 'present'], prerequisites: [9],
    description: 'Conjugate 6 regular verbs across all persons in the present habitual tense. Watch for stem changes and consonant clusters.',
    acceptance: 63, isPremium: false,
  },
  {
    id: 18, title: 'Tense Shifter', slug: 'tense-shifter', difficulty: 'Intermediate',
    section: 'Verb & Tense', sectionId: 4,
    tags: ['verbs', 'tense', 'past', 'future'], prerequisites: [17],
    description: 'Given 8 sentences in the present habitual, rewrite them in past tense, then future tense. Maintain correct subject clitics throughout.',
    acceptance: 49, isPremium: false,
  },
  {
    id: 19, title: 'Negation Transformer', slug: 'negation-transformer', difficulty: 'Intermediate',
    section: 'Verb & Tense', sectionId: 4,
    tags: ['verbs', 'negation', 'tense'], prerequisites: [17, 18],
    description: 'Negate 10 affirmative sentences. Each spans different tenses and verb classes. Pay attention to where ma appears in the sentence.',
    acceptance: 44, isPremium: false,
  },
  {
    id: 20, title: 'Narrative Builder', slug: 'narrative-builder', difficulty: 'Advanced',
    section: 'Verb & Tense', sectionId: 4,
    tags: ['verbs', 'tense', 'narrative', 'production'], prerequisites: [17, 18, 19],
    description: 'Write a 5-sentence narrative in Somali describing a sequence of events. Use at least 3 different tenses and 2 negations correctly.',
    acceptance: 22, isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 5: Space & Modifiers
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 21, title: 'Preposition Picker', slug: 'preposition-picker', difficulty: 'Beginner',
    section: 'Space & Modifiers', sectionId: 5,
    tags: ['prepositions', 'u', 'ku', 'ka', 'la'], prerequisites: [8, 11],
    description: 'Select the correct preposition (u, ku, ka, la) for 12 sentences based on English meaning: to/for, in/at, from, with.',
    acceptance: 66, isPremium: false,
  },
  {
    id: 22, title: 'Direction Stacker', slug: 'direction-stacker', difficulty: 'Intermediate',
    section: 'Space & Modifiers', sectionId: 5,
    tags: ['prepositions', 'directionals', 'soo', 'sii'], prerequisites: [21],
    description: 'Stack prepositions with directionals (soo/sii) in the correct order. 10 sentences require both a preposition and a directional before the verb.',
    acceptance: 50, isPremium: false,
  },
  {
    id: 23, title: 'Adjective-As-Verb', slug: 'adjective-as-verb', difficulty: 'Intermediate',
    section: 'Space & Modifiers', sectionId: 5,
    tags: ['adjectives', 'stative-verbs'], prerequisites: [10, 17],
    description: 'Given English descriptions, form correct Somali sentences using adjectives-as-verbs with the copula (weyn yahay, fiican tahay, etc.).',
    acceptance: 46, isPremium: false,
  },
  {
    id: 24, title: 'Scene Descriptor', slug: 'scene-descriptor', difficulty: 'Advanced',
    section: 'Space & Modifiers', sectionId: 5,
    tags: ['prepositions', 'adjectives', 'numbers', 'production'], prerequisites: [21, 22, 23],
    description: 'Describe a complex scene in Somali: 3 objects with locations, 2 moving subjects with direction, and comparative adjectives. Free production.',
    acceptance: 26, isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 6: Complex Grammar
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 25, title: 'Connector Selector', slug: 'connector-selector', difficulty: 'Beginner',
    section: 'Complex Grammar', sectionId: 6,
    tags: ['connectors', 'iyo', '-na', '-se', 'oo'], prerequisites: [11, 15],
    description: 'Choose the correct connector (iyo, -na, -se, oo) for 10 pairs of clauses or nouns. Distinguish noun-joining from clause-joining.',
    acceptance: 64, isPremium: false,
  },
  {
    id: 26, title: 'Clause Combiner', slug: 'clause-combiner', difficulty: 'Intermediate',
    section: 'Complex Grammar', sectionId: 6,
    tags: ['connectors', 'compound'], prerequisites: [25],
    description: 'Combine 8 pairs of simple Somali sentences into compound or complex sentences using the correct connector and word order.',
    acceptance: 48, isPremium: false,
  },
  {
    id: 27, title: 'Relative Clause Builder', slug: 'relative-clause-builder', difficulty: 'Intermediate',
    section: 'Complex Grammar', sectionId: 6,
    tags: ['relative-clauses', 'oo'], prerequisites: [25, 26],
    description: 'Transform 6 simple sentences into relative clauses using oo. Maintain correct focus markers and word order within the embedded clause.',
    acceptance: 41, isPremium: false,
  },
  {
    id: 28, title: 'Complex Translator', slug: 'complex-translator', difficulty: 'Advanced',
    section: 'Complex Grammar', sectionId: 6,
    tags: ['connectors', 'relatives', 'conditionals', 'production'], prerequisites: [25, 26, 27],
    description: 'Translate a complex English paragraph into Somali. Contains compound sentences, relative clauses, and a conditional. No scaffolding.',
    acceptance: 21, isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 7: Mastery
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 29, title: 'Voice Transformer', slug: 'voice-transformer', difficulty: 'Intermediate',
    section: 'Mastery', sectionId: 7,
    tags: ['passive', 'causative', 'transform'], prerequisites: [20, 24],
    description: 'Transform 8 active sentences into passive (la-) or causative (-si-) forms. Maintain correct tense and subject reference.',
    acceptance: 43, isPremium: false,
  },
  {
    id: 30, title: 'Free Composition', slug: 'free-composition', difficulty: 'Advanced',
    section: 'Mastery', sectionId: 7,
    tags: ['production', 'mastery', 'writing'], prerequisites: [16, 20, 24, 28, 29],
    description: 'Write a short story (6–8 sentences) in Somali about your day. Must use: 2 tenses, 1 focus marker, 1 preposition+directional, 1 connector, 1 relative clause.',
    acceptance: 18, isPremium: false,
  },
];

// Helper lookups
const problemMap = new Map(allProblems.map((p) => [p.id, p]));
export function getProblemById(id: number): ProblemMeta | undefined {
  return problemMap.get(id);
}

export function getProblemsBySection(sectionId: number): ProblemMeta[] {
  return allProblems.filter((p) => p.sectionId === sectionId);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const p of allProblems) {
    for (const t of p.tags) set.add(t);
  }
  return Array.from(set).sort();
}
