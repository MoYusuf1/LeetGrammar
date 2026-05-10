/**
 * Problem → Concept Mapping
 *
 * Bridges the 50 hardcoded problems to the knowledge graph.
 * Each problem maps to a primary concept (what it teaches)
 * and optional secondary concepts (supporting topics).
 *
 * Used by: generate-requires-edges script, adaptive curriculum engine
 */

export interface ProblemConceptMapping {
  problemId: number;
  primaryConceptId: string;
  secondaryConceptIds: string[];
  /** Whether the primary concept needs to be created in the graph */
  isSynthetic: boolean;
  /** If synthetic, the label for the new concept node */
  syntheticLabel?: string;
}

export const problemConceptMappings: ProblemConceptMapping[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 0: Sounds & Greetings
  // ═══════════════════════════════════════════════════════════════════════════
  {
    problemId: 1,
    primaryConceptId: 'concept:somali-alphabet',
    secondaryConceptIds: [],
    isSynthetic: false,
  },
  {
    problemId: 2,
    primaryConceptId: 'concept:greeting',
    secondaryConceptIds: ['concept:somali-language'],
    isSynthetic: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 1: The Noun System
  // ═══════════════════════════════════════════════════════════════════════════
  {
    problemId: 3,
    primaryConceptId: 'concept:noun-gender',
    secondaryConceptIds: ['concept:masculine-gender', 'concept:feminine-gender', 'concept:grammatical-gender'],
    isSynthetic: false,
  },
  {
    problemId: 4,
    primaryConceptId: 'concept:definite-article',
    secondaryConceptIds: ['concept:definite-noun'],
    isSynthetic: false,
  },
  {
    problemId: 5,
    primaryConceptId: 'concept:indefinite-noun',
    secondaryConceptIds: ['concept:definite-article'],
    isSynthetic: false,
  },
  {
    problemId: 6,
    primaryConceptId: 'concept:plural-formation',
    secondaryConceptIds: ['concept:plural-noun', 'concept:irregular-plurals'],
    isSynthetic: false,
  },
  {
    problemId: 7,
    primaryConceptId: 'concept:semantic-vs-grammatical-gender',
    secondaryConceptIds: ['concept:noun-gender', 'concept:masculine-gender', 'concept:feminine-gender'],
    isSynthetic: false,
  },
  {
    problemId: 8,
    primaryConceptId: 'concept:subject-case',
    secondaryConceptIds: ['concept:oblique-case', 'concept:noun-declension'],
    isSynthetic: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 2: Building Simple Sentences
  // ═══════════════════════════════════════════════════════════════════════════
  {
    problemId: 9,
    primaryConceptId: 'concept:independent-pronoun',
    secondaryConceptIds: ['concept:pronoun', 'concept:emphatic-pronoun'],
    isSynthetic: false,
  },
  {
    problemId: 10,
    primaryConceptId: 'concept:verbal-subject-pronoun',
    secondaryConceptIds: ['concept:subject-clitic', 'concept:focus'],
    isSynthetic: false,
  },
  {
    problemId: 11,
    primaryConceptId: 'concept:word-order',
    secondaryConceptIds: ['concept:sentence-structure', 'concept: predicate-final'],
    isSynthetic: false,
  },
  {
    problemId: 12,
    primaryConceptId: 'concept:verb-to-be',
    secondaryConceptIds: ['concept:copula', 'concept:yahay'],
    isSynthetic: false,
  },
  {
    problemId: 13,
    primaryConceptId: 'concept:verbless-declarative',
    secondaryConceptIds: ['concept:equational', 'concept:declarative-sentence'],
    isSynthetic: false,
  },
  {
    problemId: 14,
    primaryConceptId: 'concept:focus-marker',
    secondaryConceptIds: ['concept:baa-contraction', 'concept:ayaa-focus', 'concept:focus-construction'],
    isSynthetic: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 3: The Verb
  // ═══════════════════════════════════════════════════════════════════════════
  {
    problemId: 15,
    primaryConceptId: 'concept:verb-conjugation',
    secondaryConceptIds: ['concept:conjugation', 'concept:verb-classes'],
    isSynthetic: false,
  },
  {
    problemId: 16,
    primaryConceptId: 'concept:present-habitual',
    secondaryConceptIds: ['concept:habitual-tense', 'concept:habitual-aspect'],
    isSynthetic: false,
  },
  {
    problemId: 17,
    primaryConceptId: 'concept:present-progressive',
    secondaryConceptIds: ['concept:progressive-aspect', 'concept:progressive-tense'],
    isSynthetic: false,
  },
  {
    problemId: 18,
    primaryConceptId: 'concept:general-past-tense',
    secondaryConceptIds: ['concept:past-tense', 'concept:past-tense-verb'],
    isSynthetic: false,
  },
  {
    problemId: 19,
    primaryConceptId: 'concept:future-tense',
    secondaryConceptIds: ['concept:conditional-tense'],
    isSynthetic: false,
  },
  {
    problemId: 20,
    primaryConceptId: 'concept:negation',
    secondaryConceptIds: ['concept:negative-marker', 'concept:negative-expression'],
    isSynthetic: false,
  },
  {
    problemId: 21,
    primaryConceptId: 'concept:yes-no-question',
    secondaryConceptIds: ['concept:question-marker', 'concept:ma-question'],
    isSynthetic: false,
  },
  {
    problemId: 22,
    primaryConceptId: 'concept:imperative',
    secondaryConceptIds: ['concept:singular-imperative', 'concept:plural-imperative', 'concept:non-focus-command'],
    isSynthetic: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 4: Expanding Noun Phrases
  // ═══════════════════════════════════════════════════════════════════════════
  {
    problemId: 23,
    primaryConceptId: 'concept:demonstrative',
    secondaryConceptIds: ['concept:demonstrative-pronoun', 'concept:demonstrative-suffix'],
    isSynthetic: false,
  },
  {
    problemId: 24,
    primaryConceptId: 'concept:possessive-pronoun',
    secondaryConceptIds: ['concept:possessive-suffix', 'concept:ownership-leh'],
    isSynthetic: false,
  },
  {
    problemId: 25,
    primaryConceptId: 'concept:cardinal-number',
    secondaryConceptIds: ['concept:numbers-with-nouns', 'concept:counting'],
    isSynthetic: false,
  },
  {
    problemId: 26,
    primaryConceptId: 'concept:number-system',
    secondaryConceptIds: ['concept:ordinal-number', 'concept:ordinal-numeral'],
    isSynthetic: false,
  },
  {
    problemId: 27,
    primaryConceptId: 'concept:adjective',
    secondaryConceptIds: ['concept:attributive-adjective', 'concept:placement'],
    isSynthetic: false,
  },
  {
    problemId: 28,
    primaryConceptId: 'concept:stative-verb',
    secondaryConceptIds: ['concept:adjectival-verb', 'concept:verb-to-be'],
    isSynthetic: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 5: Movement & Space
  // ═══════════════════════════════════════════════════════════════════════════
  {
    problemId: 29,
    primaryConceptId: 'concept:preposition',
    secondaryConceptIds: ['concept:locative-preposition', 'concept:deictic-preposition'],
    isSynthetic: false,
  },
  {
    problemId: 30,
    primaryConceptId: 'concept:preposition-fusion',
    secondaryConceptIds: ['concept:preposition', 'concept:grammatical-fusion'],
    isSynthetic: false,
  },
  {
    problemId: 31,
    primaryConceptId: 'concept:directionals',
    secondaryConceptIds: ['concept:preposition', 'concept:deictic-preposition'],
    isSynthetic: true,
    syntheticLabel: 'Directionals',
  },
  {
    problemId: 32,
    primaryConceptId: 'concept:object-pronoun',
    secondaryConceptIds: ['concept:pronoun', 'concept:short-pronoun'],
    isSynthetic: false,
  },
  {
    problemId: 33,
    primaryConceptId: 'concept:pronoun-preposition-cluster',
    secondaryConceptIds: ['concept:object-pronoun', 'concept:preposition-fusion'],
    isSynthetic: false,
  },
  {
    problemId: 34,
    primaryConceptId: 'concept:existential',
    secondaryConceptIds: ['concept:existential-jir', 'concept:verb-to-be'],
    isSynthetic: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 6: Description & Modification
  // ═══════════════════════════════════════════════════════════════════════════
  {
    problemId: 35,
    primaryConceptId: 'concept:comparative',
    secondaryConceptIds: ['concept:comparative-degree', 'concept:comparative-ka', 'concept:comparative-adjective'],
    isSynthetic: false,
  },
  {
    problemId: 36,
    primaryConceptId: 'concept:superlative',
    secondaryConceptIds: ['concept:superlative-degree', 'concept:superlative-adjective'],
    isSynthetic: false,
  },
  {
    problemId: 37,
    primaryConceptId: 'concept:colors',
    secondaryConceptIds: ['concept:adjective', 'concept:vocabulary'],
    isSynthetic: true,
    syntheticLabel: 'Colors',
  },
  {
    problemId: 38,
    primaryConceptId: 'concept:adverbial',
    secondaryConceptIds: ['concept:time-expressions', 'concept:temporal-clause'],
    isSynthetic: false,
  },
  {
    problemId: 39,
    primaryConceptId: 'concept:locative',
    secondaryConceptIds: ['concept:adverbial', 'concept:locative-expression'],
    isSynthetic: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 7: Complex Sentences
  // ═══════════════════════════════════════════════════════════════════════════
  {
    problemId: 40,
    primaryConceptId: 'concept:conjunction',
    secondaryConceptIds: ['concept:coordination', 'concept:connectors'],
    isSynthetic: false,
  },
  {
    problemId: 41,
    primaryConceptId: 'concept:question-word',
    secondaryConceptIds: ['concept:interrogative', 'concept:wh-words'],
    isSynthetic: false,
  },
  {
    problemId: 42,
    primaryConceptId: 'concept:interrogative-sentence',
    secondaryConceptIds: ['concept:question-word', 'concept:embedded-questions'],
    isSynthetic: false,
  },
  {
    problemId: 43,
    primaryConceptId: 'concept:relative-clause',
    secondaryConceptIds: ['concept:restrictive-relative', 'concept:relative-clause-neg'],
    isSynthetic: false,
  },
  {
    problemId: 44,
    primaryConceptId: 'concept:conditional',
    secondaryConceptIds: ['concept:conditional-haddii', 'concept:conditional-mood', 'concept:negative-conditional'],
    isSynthetic: false,
  },
  {
    problemId: 45,
    primaryConceptId: 'concept:indirect-speech',
    secondaryConceptIds: ['concept:direct-speech', 'concept:reported-speech'],
    isSynthetic: false,
  },
  {
    problemId: 46,
    primaryConceptId: 'concept:passive-construction',
    secondaryConceptIds: ['concept:passive-equivalent', 'concept:voice'],
    isSynthetic: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // UNIT 8: Advanced Verbs
  // ═══════════════════════════════════════════════════════════════════════════
  {
    problemId: 47,
    primaryConceptId: 'concept:modal-verbs',
    secondaryConceptIds: ['concept:verb', 'concept:verb-mood'],
    isSynthetic: true,
    syntheticLabel: 'Modal Verbs',
  },
  {
    problemId: 48,
    primaryConceptId: 'concept:reflexive-reciprocal',
    secondaryConceptIds: ['concept:reciprocal-verb', 'concept:verb-derivation'],
    isSynthetic: false,
  },
  {
    problemId: 49,
    primaryConceptId: 'concept:causative',
    secondaryConceptIds: ['concept:causative-verb', 'concept:derived-verb'],
    isSynthetic: false,
  },
  {
    problemId: 50,
    primaryConceptId: 'concept:subordinate-clause',
    secondaryConceptIds: ['concept:subordinate-verb-form', 'concept:complex-sentences'],
    isSynthetic: false,
  },
];

/** Helper: Get mapping by problem ID */
export function getConceptMapping(problemId: number): ProblemConceptMapping | undefined {
  return problemConceptMappings.find((m) => m.problemId === problemId);
}

/** Helper: Get all synthetic concepts that need to be created */
export function getSyntheticConcepts(): { id: string; label: string }[] {
  return problemConceptMappings
    .filter((m) => m.isSynthetic)
    .map((m) => ({ id: m.primaryConceptId, label: m.syntheticLabel! }));
}
