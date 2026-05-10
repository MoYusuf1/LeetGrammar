// ============================================================================
// MASTER PROBLEM INDEX — 50 Soomaali Grammar Problems
// LeetCode-style: each problem has metadata + links to full lesson content
// ============================================================================

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ProblemMeta {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  unit: string;
  unitId: number;
  tags: string[];
  prerequisites: number[];
  description: string;
  acceptance: number; // computed from submissions
  isPremium: boolean;
}

export interface ProblemUnit {
  id: number;
  name: string;
  description: string;
  color: string;
  problems: ProblemMeta[];
}

// ─── Difficulty Config ───
export const difficultyConfig = {
  Beginner: {
    label: 'Beginner',
    color: '#4caf50',
    bg: 'rgba(76, 175, 80, 0.12)',
    border: 'rgba(76, 175, 80, 0.25)',
  },
  Intermediate: {
    label: 'Intermediate',
    color: '#ffc107',
    bg: 'rgba(255, 193, 7, 0.12)',
    border: 'rgba(255, 193, 7, 0.25)',
  },
  Advanced: {
    label: 'Advanced',
    color: '#f44336',
    bg: 'rgba(244, 67, 54, 0.12)',
    border: 'rgba(244, 67, 54, 0.25)',
  },
} as const;

// ─── All 50 Problems ───
export const allProblems: ProblemMeta[] = [
  // ═══════════════════════════════════════════════════════════════════
  // UNIT 0: Sounds & Greetings
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 1,
    title: 'Somali Alphabet & Sounds',
    slug: 'somali-alphabet-and-sounds',
    difficulty: 'Beginner',
    unit: 'Sounds & Greetings',
    unitId: 0,
    tags: ['phonology', 'orthography', 'pronunciation'],
    prerequisites: [],
    description: 'Learn the Somali alphabet, special consonants (c, x, kh, q), and vowel length distinction.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 2,
    title: 'Greetings & Introductions',
    slug: 'greetings-and-introductions',
    difficulty: 'Beginner',
    unit: 'Sounds & Greetings',
    unitId: 0,
    tags: ['social', 'vocabulary', 'culture'],
    prerequisites: [1],
    description: 'Master essential greetings, introductions, and cultural formulas for everyday interaction.',
    acceptance: 0,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 1: The Noun System
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 3,
    title: 'Noun Gender',
    slug: 'noun-gender',
    difficulty: 'Beginner',
    unit: 'The Noun System',
    unitId: 1,
    tags: ['nouns', 'gender', 'masculine', 'feminine'],
    prerequisites: [1],
    description: 'Somali nouns are masculine or feminine. Gender controls articles, agreement, and plurals.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 4,
    title: 'Definite Articles',
    slug: 'definite-articles',
    difficulty: 'Beginner',
    unit: 'The Noun System',
    unitId: 1,
    tags: ['nouns', 'articles', 'definiteness'],
    prerequisites: [3],
    description: 'Mark definite nouns with suffixed articles: -ka/-ga (masc.) and -ta/-da (fem.).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 5,
    title: 'Indefinite vs Definite',
    slug: 'indefinite-vs-definite',
    difficulty: 'Beginner',
    unit: 'The Noun System',
    unitId: 1,
    tags: ['nouns', 'articles', 'indefiniteness'],
    prerequisites: [4],
    description: 'Understand when to use indefinite (zero marking) vs definite nouns in Somali.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 6,
    title: 'Plural Formation',
    slug: 'plural-formation',
    difficulty: 'Beginner',
    unit: 'The Noun System',
    unitId: 1,
    tags: ['nouns', 'plural', 'number'],
    prerequisites: [3],
    description: 'Form plurals using the 6 major declension patterns: -o, -yo, -yal, and more.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 7,
    title: 'Gender Polarity',
    slug: 'gender-polarity',
    difficulty: 'Beginner',
    unit: 'The Noun System',
    unitId: 1,
    tags: ['nouns', 'plural', 'gender'],
    prerequisites: [6],
    description: 'Most nouns flip gender when pluralized: masculine singular → feminine plural.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 8,
    title: 'Case Marking',
    slug: 'case-marking',
    difficulty: 'Intermediate',
    unit: 'The Noun System',
    unitId: 1,
    tags: ['nouns', 'case', 'nominative', 'oblique'],
    prerequisites: [4],
    description: 'Nominative (subjective) vs Oblique (objective) case marking on nouns.',
    acceptance: 0,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 2: Building Simple Sentences
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 9,
    title: 'Independent Pronouns',
    slug: 'independent-pronouns',
    difficulty: 'Beginner',
    unit: 'Building Simple Sentences',
    unitId: 2,
    tags: ['pronouns', 'independent', 'emphasis'],
    prerequisites: [2],
    description: 'Full pronoun forms (aniga, adiga, isaga, iyada) used for emphasis and contrast.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 10,
    title: 'Subject Clitics & waa',
    slug: 'subject-clitics-and-waa',
    difficulty: 'Beginner',
    unit: 'Building Simple Sentences',
    unitId: 2,
    tags: ['pronouns', 'clitics', 'focus', 'waa'],
    prerequisites: [9],
    description: 'Short subject pronouns fused with waa: waan, waad, wuu, way. Every sentence needs one.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 11,
    title: 'SOV Word Order',
    slug: 'sov-word-order',
    difficulty: 'Beginner',
    unit: 'Building Simple Sentences',
    unitId: 2,
    tags: ['syntax', 'word-order', 'sov'],
    prerequisites: [10],
    description: 'Somali is SOV: Subject-Object-Verb. The verb always comes last in the clause.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 12,
    title: 'The Copula yahay',
    slug: 'the-copula-yahay',
    difficulty: 'Beginner',
    unit: 'Building Simple Sentences',
    unitId: 2,
    tags: ['verbs', 'copula', 'to-be', 'yahay'],
    prerequisites: [11],
    description: 'The highly irregular verb "to be" — essential for identification and description.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 13,
    title: 'Verbless Equational Sentences',
    slug: 'verbless-equational-sentences',
    difficulty: 'Beginner',
    unit: 'Building Simple Sentences',
    unitId: 2,
    tags: ['syntax', 'waa', 'equational', 'present'],
    prerequisites: [12],
    description: 'In the present tense, waa + noun can form a sentence without yahay: Waa macallin.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 14,
    title: 'Focus Marker: baa/ayaa',
    slug: 'focus-marker-baa-ayaa',
    difficulty: 'Intermediate',
    unit: 'Building Simple Sentences',
    unitId: 2,
    tags: ['focus', 'baa', 'ayaa', 'nominal-focus'],
    prerequisites: [10, 13],
    description: 'Use baa/ayaa to emphasize WHO did something. Changes subject case to oblique.',
    acceptance: 0,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 3: The Verb
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 15,
    title: 'Verb Classes',
    slug: 'verb-classes',
    difficulty: 'Beginner',
    unit: 'The Verb',
    unitId: 3,
    tags: ['verbs', 'conjugation', 'classes'],
    prerequisites: [11],
    description: 'Class 1 (consonant stem), Class 2 (-i stem), Class 3 (-ee/-oo stem).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 16,
    title: 'Present Habitual',
    slug: 'present-habitual',
    difficulty: 'Beginner',
    unit: 'The Verb',
    unitId: 3,
    tags: ['verbs', 'tense', 'present', 'habitual'],
    prerequisites: [15],
    description: 'Express habitual actions with base conjugation + present clitic: -aa.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 17,
    title: 'Present Progressive',
    slug: 'present-progressive',
    difficulty: 'Beginner',
    unit: 'The Verb',
    unitId: 3,
    tags: ['verbs', 'tense', 'present', 'progressive', '-ayaa'],
    prerequisites: [16],
    description: 'Express ongoing action with -ay- inserted: cuno → cunayaa.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 18,
    title: 'Past Tense',
    slug: 'past-tense',
    difficulty: 'Beginner',
    unit: 'The Verb',
    unitId: 3,
    tags: ['verbs', 'tense', 'past'],
    prerequisites: [16],
    description: 'Replace present -aa with -ay. Irregulars: tag → tegay, yimid.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 19,
    title: 'Future Tense',
    slug: 'future-tense',
    difficulty: 'Beginner',
    unit: 'The Verb',
    unitId: 3,
    tags: ['verbs', 'tense', 'future', 'doon'],
    prerequisites: [18],
    description: 'Add doonaa after verb stem: Waan cuni doonaa = I will eat.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 20,
    title: 'Negation',
    slug: 'negation',
    difficulty: 'Beginner',
    unit: 'The Verb',
    unitId: 3,
    tags: ['verbs', 'negation', 'ma', '-in'],
    prerequisites: [16],
    description: 'ma mid-sentence + -in verb ending = negation. ma at START = question.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 21,
    title: 'Yes/No Questions',
    slug: 'yes-no-questions',
    difficulty: 'Beginner',
    unit: 'The Verb',
    unitId: 3,
    tags: ['verbs', 'questions', 'yes-no', 'ma'],
    prerequisites: [20],
    description: 'Replace waa with ma question marker. Wuu cunay → Miyuu cunay?',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 22,
    title: 'Imperatives & Commands',
    slug: 'imperatives-and-commands',
    difficulty: 'Intermediate',
    unit: 'The Verb',
    unitId: 3,
    tags: ['verbs', 'imperative', 'commands', 'mood'],
    prerequisites: [16],
    description: 'Give direct commands and negative commands with ha.',
    acceptance: 0,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 4: Expanding Noun Phrases
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 23,
    title: 'Demonstratives',
    slug: 'demonstratives',
    difficulty: 'Beginner',
    unit: 'Expanding Noun Phrases',
    unitId: 4,
    tags: ['nouns', 'demonstratives', 'kan', 'tan'],
    prerequisites: [3],
    description: 'This, that, these, those: kan/tan (this), kaas/taas (that), kuwan (these).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 24,
    title: 'Possessives',
    slug: 'possessives',
    difficulty: 'Beginner',
    unit: 'Expanding Noun Phrases',
    unitId: 4,
    tags: ['nouns', 'possessives', 'suffixes'],
    prerequisites: [3, 9],
    description: 'Suffixed possessives: -ayga/-aygu (my), -aaga/-aagu (your), -iisa/-iisu (his).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 25,
    title: 'Numbers 1–10',
    slug: 'numbers-1-to-10',
    difficulty: 'Beginner',
    unit: 'Expanding Noun Phrases',
    unitId: 4,
    tags: ['numbers', 'cardinals', 'counting'],
    prerequisites: [3],
    description: 'Cardinal numbers in Somali and how they function as heads in noun phrases.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 26,
    title: 'Numbers 11+ & Counting Forms',
    slug: 'numbers-11-plus',
    difficulty: 'Beginner',
    unit: 'Expanding Noun Phrases',
    unitId: 4,
    tags: ['numbers', 'counting-forms', '-ood'],
    prerequisites: [25],
    description: 'Higher numbers and the counting form suffix -ood: laba bisadood = two cats.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 27,
    title: 'True Adjectives',
    slug: 'true-adjectives',
    difficulty: 'Beginner',
    unit: 'Expanding Noun Phrases',
    unitId: 4,
    tags: ['adjectives', 'attributive', 'placement'],
    prerequisites: [3],
    description: 'The smaller class of true adjectives that do not conjugate: dhexe, hoose.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 28,
    title: 'Adjectives-as-Verbs',
    slug: 'adjectives-as-verbs',
    difficulty: 'Intermediate',
    unit: 'Expanding Noun Phrases',
    unitId: 4,
    tags: ['adjectives', 'verbs', 'stative', 'yahay'],
    prerequisites: [12, 27],
    description: 'Most Somali "adjectives" conjugate like verbs: weyn → weyn yahay.',
    acceptance: 0,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 5: Movement & Space
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 29,
    title: 'Prepositions',
    slug: 'prepositions',
    difficulty: 'Intermediate',
    unit: 'Movement & Space',
    unitId: 5,
    tags: ['prepositions', 'u', 'ku', 'ka', 'la'],
    prerequisites: [11],
    description: 'Preverbal clitics: u=to, ku=in, ka=from, la=with. Go BEFORE the verb.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 30,
    title: 'Preposition Blending',
    slug: 'preposition-blending',
    difficulty: 'Intermediate',
    unit: 'Movement & Space',
    unitId: 5,
    tags: ['prepositions', 'blending', 'ugu', 'kaga'],
    prerequisites: [29],
    description: 'When prepositions combine: u+ku=ugu, ka+ku=kaga, u+la=ula.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 31,
    title: 'Directionals',
    slug: 'directionals',
    difficulty: 'Intermediate',
    unit: 'Movement & Space',
    unitId: 5,
    tags: ['directionals', 'soo', 'sii', 'wada', 'kala'],
    prerequisites: [29],
    description: 'soo=toward speaker, sii=away, wada=together, kala=apart.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 32,
    title: 'Object Clitics',
    slug: 'object-clitics',
    difficulty: 'Intermediate',
    unit: 'Movement & Space',
    unitId: 5,
    tags: ['pronouns', 'object', 'clitics', 'i', 'ku', 'na'],
    prerequisites: [11],
    description: 'Object pronouns as preverbal clitics: i=me, ku=you, na=us, idin=you(pl).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 33,
    title: 'Object Clitics + Prepositions',
    slug: 'object-clitics-and-prepositions',
    difficulty: 'Intermediate',
    unit: 'Movement & Space',
    unitId: 5,
    tags: ['pronouns', 'prepositions', 'ii', 'kugu', 'iga'],
    prerequisites: [30, 32],
    description: 'Combine object clitics with prepositions: ii=to-me, kugu=in-you, iga=from-me.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 34,
    title: 'Existential: jir & joog',
    slug: 'existential-jir-joog',
    difficulty: 'Intermediate',
    unit: 'Movement & Space',
    unitId: 5,
    tags: ['existential', 'there-is', 'jir', 'joog'],
    prerequisites: [12],
    description: 'Express existence and location: jir (exist), joog (be located).',
    acceptance: 0,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 6: Description & Modification
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 35,
    title: 'Comparatives',
    slug: 'comparatives',
    difficulty: 'Intermediate',
    unit: 'Description & Modification',
    unitId: 6,
    tags: ['adjectives', 'comparative', 'ka', '-badan'],
    prerequisites: [28],
    description: 'Compare things: ka weyn (bigger), -badan (more), ka fiican (better).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 36,
    title: 'Superlatives',
    slug: 'superlatives',
    difficulty: 'Intermediate',
    unit: 'Description & Modification',
    unitId: 6,
    tags: ['adjectives', 'superlative', 'ugu-'],
    prerequisites: [35],
    description: 'Express the highest degree: ugu weyn (biggest), ugu fiican (best).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 37,
    title: 'Colors',
    slug: 'colors',
    difficulty: 'Beginner',
    unit: 'Description & Modification',
    unitId: 6,
    tags: ['adjectives', 'colors', 'vocabulary'],
    prerequisites: [27],
    description: 'Color words in Somali and how they function grammatically.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 38,
    title: 'Adverbs of Time',
    slug: 'adverbs-of-time',
    difficulty: 'Beginner',
    unit: 'Description & Modification',
    unitId: 6,
    tags: ['adverbs', 'time', 'maanta', 'shalay'],
    prerequisites: [11],
    description: 'When things happen: maanta (today), shalay (yesterday), berri (tomorrow).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 39,
    title: 'Adverbs of Place',
    slug: 'adverbs-of-place',
    difficulty: 'Beginner',
    unit: 'Description & Modification',
    unitId: 6,
    tags: ['adverbs', 'place', 'halkan', 'halkaas'],
    prerequisites: [11],
    description: 'Where things happen: halkan (here), halkaas (there), meel kasta (everywhere).',
    acceptance: 0,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 7: Complex Sentences
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 40,
    title: 'Connectors',
    slug: 'connectors',
    difficulty: 'Intermediate',
    unit: 'Complex Sentences',
    unitId: 7,
    tags: ['connectors', 'conjunctions', 'iyo', 'oo', '-se'],
    prerequisites: [11],
    description: 'Join ideas: iyo=and (nouns), -na=and (sentences), -se=but, oo=which/that.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 41,
    title: 'Question Words',
    slug: 'question-words',
    difficulty: 'Intermediate',
    unit: 'Complex Sentences',
    unitId: 7,
    tags: ['questions', 'wh-words', 'maxaa', 'yaa', 'sidee'],
    prerequisites: [11],
    description: 'Ask for information: maxaa (what), yaa (who), sidee (how), goorma (when).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 42,
    title: 'Embedded Questions',
    slug: 'embedded-questions',
    difficulty: 'Intermediate',
    unit: 'Complex Sentences',
    unitId: 7,
    tags: ['questions', 'embedded', 'subordinate'],
    prerequisites: [41],
    description: 'Report questions indirectly: Waxaan waydiiyay... (I asked whether...)',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 43,
    title: 'Relative Clauses',
    slug: 'relative-clauses',
    difficulty: 'Advanced',
    unit: 'Complex Sentences',
    unitId: 7,
    tags: ['clauses', 'relative', 'oo', 'ee'],
    prerequisites: [40],
    description: 'Use oo/ee as relative pronouns. Ninka oo shaqeeya = The man who works.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 44,
    title: 'Conditionals',
    slug: 'conditionals',
    difficulty: 'Advanced',
    unit: 'Complex Sentences',
    unitId: 7,
    tags: ['conditionals', 'haddii', 'marka', 'if'],
    prerequisites: [43],
    description: 'Express conditions: haddii=if, marka=when.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 45,
    title: 'Reported Speech',
    slug: 'reported-speech',
    difficulty: 'Advanced',
    unit: 'Complex Sentences',
    unitId: 7,
    tags: ['speech', 'reported', 'yidhi', 'sheegtay'],
    prerequisites: [44],
    description: 'Report what others said: Wuxuu yidhi... (He said that...), Way sheegtay in...',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 46,
    title: 'Passive Voice',
    slug: 'passive-voice',
    difficulty: 'Advanced',
    unit: 'Complex Sentences',
    unitId: 7,
    tags: ['voice', 'passive', 'la-'],
    prerequisites: [32],
    description: 'Form passive with la- prefix: Lagu cunay = It was eaten.',
    acceptance: 0,
    isPremium: false,
  },

  // ═══════════════════════════════════════════════════════════════════
  // UNIT 8: Advanced Verbs
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 47,
    title: 'Modal Verbs',
    slug: 'modal-verbs',
    difficulty: 'Advanced',
    unit: 'Advanced Verbs',
    unitId: 8,
    tags: ['verbs', 'modal', 'kar', 'rab', 'waa-in'],
    prerequisites: [19],
    description: 'Express ability, obligation, desire: kar (can), waa in (must), rab (want).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 48,
    title: 'Reflexive Verbs',
    slug: 'reflexive-verbs',
    difficulty: 'Advanced',
    unit: 'Advanced Verbs',
    unitId: 8,
    tags: ['verbs', 'reflexive', 'is-'],
    prerequisites: [32],
    description: 'is- prefix for reflexive actions: is qaatay = took oneself.',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 49,
    title: 'Causative Verbs',
    slug: 'causative-verbs',
    difficulty: 'Advanced',
    unit: 'Advanced Verbs',
    unitId: 8,
    tags: ['verbs', 'causative', '-si-'],
    prerequisites: [47],
    description: 'Make someone do something: cun → cunsi (feed), qor → qorsi (dictate).',
    acceptance: 0,
    isPremium: false,
  },
  {
    id: 50,
    title: 'Subordinate Clauses',
    slug: 'subordinate-clauses',
    difficulty: 'Advanced',
    unit: 'Advanced Verbs',
    unitId: 8,
    tags: ['clauses', 'subordinate', 'complex'],
    prerequisites: [43],
    description: 'Complex sentences with multiple subordinated clauses.',
    acceptance: 0,
    isPremium: false,
  },
];

// ─── Helper Functions ───

export function getProblemById(id: number): ProblemMeta | undefined {
  return allProblems.find((p) => p.id === id);
}

export function getProblemBySlug(slug: string): ProblemMeta | undefined {
  return allProblems.find((p) => p.slug === slug);
}

export function getProblemsByUnit(unitId: number): ProblemMeta[] {
  return allProblems.filter((p) => p.unitId === unitId);
}

export function getProblemsByTag(tag: string): ProblemMeta[] {
  return allProblems.filter((p) => p.tags.includes(tag));
}

export function getProblemStatus(
  problemId: number,
  completedIds: number[]
): 'completed' | 'current' | 'locked' {
  const problem = getProblemById(problemId);
  if (!problem) return 'locked';

  if (completedIds.includes(problemId)) return 'completed';

  // Current = all prerequisites are completed OR this is the first problem
  if (
    problem.prerequisites.length === 0 ||
    problem.prerequisites.every((pre) => completedIds.includes(pre))
  ) {
    return 'current';
  }

  return 'locked';
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  allProblems.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getAllUnits(): { id: number; name: string; description: string; color: string }[] {
  return [
    { id: 0, name: 'Sounds & Greetings', description: 'Phonology and social formulas', color: '#9C27B0' },
    { id: 1, name: 'The Noun System', description: 'Gender, articles, plurals, case', color: '#2196F3' },
    { id: 2, name: 'Building Simple Sentences', description: 'Pronouns, focus, word order', color: '#00BCD4' },
    { id: 3, name: 'The Verb', description: 'Conjugation, tenses, negation', color: '#4CAF50' },
    { id: 4, name: 'Expanding Noun Phrases', description: 'Demonstratives, possessives, numbers', color: '#8BC34A' },
    { id: 5, name: 'Movement & Space', description: 'Prepositions, directionals, clitics', color: '#FF9800' },
    { id: 6, name: 'Description & Modification', description: 'Adjectives, adverbs, colors', color: '#FF5722' },
    { id: 7, name: 'Complex Sentences', description: 'Clauses, questions, voice', color: '#E91E63' },
    { id: 8, name: 'Advanced Verbs', description: 'Modals, reflexive, causative', color: '#673AB7' },
  ];
}

// Flattened list for easy access
export const problemList = allProblems;
