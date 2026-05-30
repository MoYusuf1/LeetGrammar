/**
 * Problems — Somali Grammar Workbook 1 Focus
 *
 * 10 problems organized into 5 categories aligned with Learn progression.
 * All content from Workbook 1: markers, contractions, word order, prepositions, connectors.
 */

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
  unit?: string;
  unitId?: number;
}

export interface ProblemSection {
  id: number;
  name: string;
  description: string;
}

export function displayDifficulty(d: string): string {
  switch (d) {
    case 'Beginner': return 'Easy';
    case 'Intermediate': return 'Med';
    case 'Advanced': return 'Hard';
    default: return d;
  }
}

export const difficultyConfig = {
  Beginner: { color: '#00b8a3', bg: '#00b8a318' },
  Intermediate: { color: '#ffc01e', bg: '#ffc01e18' },
  Advanced: { color: '#ff375f', bg: '#ff375f18' },
};

export const problemSections: ProblemSection[] = [
  { id: 0, name: 'Marker System', description: 'Identifying and distinguishing waa, baa, waxa, and ma' },
  { id: 1, name: 'Contractions & Pronouns', description: 'Unfusing marker+pronoun forms in fast speech' },
  { id: 2, name: 'Word Order & SOV', description: 'Subject-Object-Verb ordering and sentence structure' },
  { id: 3, name: 'Prepositions & Direction', description: 'u, ku, ka, la with soo and sii' },
  { id: 4, name: 'Connectors & Composition', description: 'iyo, -na, -se, oo and building complete sentences' },
];

export const allProblems: ProblemMeta[] = [
  // ═══════════════════════════════════════════════════════════════════
  // SECTION 0: Marker System
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Marker Classifier',
    slug: 'marker-classifier',
    difficulty: 'Beginner',
    section: 'Marker System',
    sectionId: 0,
    tags: ['markers', 'waa', 'baa', 'waxa', 'ma'],
    prerequisites: [],
    description: 'Given 10 Somali sentences, identify the marker and classify it as STATEMENT (waa), FOCUS (baa), SPOTLIGHT (waxa), or QUESTION (ma).',
    acceptance: 76,
    isPremium: false,
  },
  {
    id: 2,
    title: 'Marker Distinction',
    slug: 'marker-distinction',
    difficulty: 'Intermediate',
    section: 'Marker System',
    sectionId: 0,
    tags: ['markers', 'emphasis', 'production'],
    prerequisites: [1],
    description: 'Given English sentences with emphasis cues (e.g., "ALI ate" vs "Ali ATE" vs "What Ali ate was..."), choose the correct Somali marker.',
    acceptance: 61,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: Contractions & Pronouns
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 3,
    title: 'Contraction Splitter',
    slug: 'contraction-splitter',
    difficulty: 'Beginner',
    section: 'Contractions & Pronouns',
    sectionId: 1,
    tags: ['contractions', 'pronouns', 'markers'],
    prerequisites: [1],
    description: 'Split 12 fused marker+pronoun forms (wuu, bay, waxay, buu, waan, etc.) into their component marker and pronoun.',
    acceptance: 68,
    isPremium: false,
  },
  {
    id: 4,
    title: 'Fast Speech Recognition',
    slug: 'fast-speech-recognition',
    difficulty: 'Intermediate',
    section: 'Contractions & Pronouns',
    sectionId: 1,
    tags: ['listening', 'contractions', 'speech-rhythm'],
    prerequisites: [3],
    description: 'Listen to 8 fast Somali sentences with contractions and transcribe the full split form (e.g., "wuu" as "waa + uu"). Focus on hearing contractions in natural rhythm.',
    acceptance: 54,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: Word Order & SOV
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 5,
    title: 'SOV Word Order',
    slug: 'sov-word-order',
    difficulty: 'Beginner',
    section: 'Word Order & SOV',
    sectionId: 2,
    tags: ['word-order', 'SOV'],
    prerequisites: [1],
    description: 'Fix 8 sentences with English SVO word order. Rearrange each to correct Somali SOV: Subject → Marker → Object → Verb.',
    acceptance: 72,
    isPremium: false,
  },
  {
    id: 6,
    title: 'Sentence Builder Basics',
    slug: 'sentence-builder-basics',
    difficulty: 'Intermediate',
    section: 'Word Order & SOV',
    sectionId: 2,
    tags: ['word-order', 'markers', 'production'],
    prerequisites: [5],
    description: 'Build 5 complete Somali sentences from English prompts. Each requires: correct marker, subject, object, and SOV word order. Word bank provided.',
    acceptance: 58,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3: Prepositions & Direction
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 7,
    title: 'Preposition Picker',
    slug: 'preposition-picker',
    difficulty: 'Beginner',
    section: 'Prepositions & Direction',
    sectionId: 3,
    tags: ['prepositions', 'u', 'ku', 'ka', 'la'],
    prerequisites: [5],
    description: 'Choose the correct preposition (u=to/for, ku=in/at, ka=from, la=with) for 10 sentences based on English meaning.',
    acceptance: 70,
    isPremium: false,
  },
  {
    id: 8,
    title: 'Direction Stacking',
    slug: 'direction-stacking',
    difficulty: 'Intermediate',
    section: 'Prepositions & Direction',
    sectionId: 3,
    tags: ['prepositions', 'directionals', 'soo', 'sii'],
    prerequisites: [7],
    description: '8 sentences require both a preposition and a directional (soo=toward speaker, sii=away). Stack them in correct order before the verb.',
    acceptance: 56,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 4: Connectors & Composition
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 9,
    title: 'Connector Selector',
    slug: 'connector-selector',
    difficulty: 'Beginner',
    section: 'Connectors & Composition',
    sectionId: 4,
    tags: ['connectors', 'iyo', '-na', '-se', 'oo'],
    prerequisites: [6],
    description: 'Choose the correct connector (iyo=and nouns, -na=and also, -se=but, oo=which/that) for 10 pairs of clauses or nouns.',
    acceptance: 67,
    isPremium: false,
  },
  {
    id: 10,
    title: 'Full Composition',
    slug: 'full-composition',
    difficulty: 'Advanced',
    section: 'Connectors & Composition',
    sectionId: 4,
    tags: ['production', 'markers', 'connectors', 'mastery'],
    prerequisites: [2, 4, 6, 8, 9],
    description: 'Write 3 multi-sentence Somali paragraphs from English prompts. Must use: markers, contractions, SOV order, prepositions, and connectors. No word bank.',
    acceptance: 38,
    isPremium: false,
  },
].map((p) => ({ ...p, unit: p.section, unitId: p.sectionId })) as ProblemMeta[];

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
