/**
 * BANNED LINGUISTICS TERMS (Learner-Facing Text)
 * ===============================================
 * Single source of truth for the jargon ban (Part 4, Rule 4.2).
 * Used by validate-course.mjs check L1.
 *
 * ANY TERM IN THIS LIST MUST NOT APPEAR IN LEARNER-FACING TEXT.
 * If a term is unavoidable, it requires a written justification in
 * the ALLOWLIST (see below), and that justification is part of the
 * review record.
 */

/**
 * Core banned list — all case-insensitive, word-boundary matched.
 * These are linguistics terms that students shouldn't need to learn.
 */
export const BANNED_TERMS = [
  'agreement',           // ← "matching" instead
  'nominative',
  'absolutive',
  'genitive',
  'vocative',
  'copular',
  'copula',
  'predicate nominative',
  'existential',
  'morphology',
  'morpheme',
  'derivational',
  'inflection',
  'inflected',
  'declarative',
  'interrogative',
  'imperative',
  'subjunctive',
  'optative',
  'topicalization',
  'topicalize',
  'clitic',
  'determiner',
  'particle',            // ← "signal word" instead (but allowed in explaining pronouns)
  'lexeme',
  'modality',
  'aspectual',
  'transitive',
  'intransitive',
  'valence',
  'register',            // ← "formal vs. casual" instead
  'polarity',
];

/**
 * Allowlist — terms that can appear with justification.
 * Each entry documents WHY the term is unavoidable.
 *
 * Format: { term, justification, usageContext }
 * The validator will FAIL if a term is used without a corresponding
 * allowlist entry, or if an allowlist entry lacks a justification.
 */
export const ALLOWLIST: Array<{
  term: string;
  justification: string;
  usageContext: string;
}> = [
  {
    term: 'particle',
    justification:
      'The word "signal word" alone does not convey that these are bound forms ' +
      'fused to pronouns (wuu, bay, wuxuu). "Particle" is the linguistic term that ' +
      'precisely captures this. It appears only in the glossary and in metalinguistic ' +
      'feedback explaining the technical name, never in the core lesson text.',
    usageContext: 'Glossary entry + one aside per lesson: "grammar books call this a particle"',
  },
];

/**
 * Plain-English replacements.
 * Map from banned term → plain name used in lessons.
 * See Part 4.2 of COURSE_DESIGN.md for the full translation table.
 */
export const TERM_TRANSLATIONS: Record<string, string> = {
  agreement: 'matching',
  nominative: 'subject form',
  absolutive: 'base form',
  genitive: "possessive form",
  vocative: 'calling form',
  copular: 'linking',
  copula: 'linking',
  'predicate nominative': 'linking',
  existential: '"there is / there are"',
  morphology: 'word-building',
  morpheme: 'word piece',
  derivational: 'word-building',
  inflection: 'ending change',
  inflected: 'changed by ending',
  declarative: 'statement',
  interrogative: 'question form',
  imperative: 'command form',
  subjunctive: 'the -o form (wishes/purpose)',
  optative: 'the -a form (wishes)',
  topicalization: 'fronting',
  topicalize: 'put first',
  clitic: 'attached form',
  determiner: 'the/a/this/that words',
  particle: 'signal word',
  lexeme: 'word',
  modality: 'wants, musts & maybes',
  aspectual: 'ongoing vs. finished',
  transitive: 'takes an object',
  intransitive: "doesn't take an object",
  valence: 'how many objects',
  register: 'formal vs. casual',
  polarity: 'positive vs. negative',
};

/**
 * Validation helper — used by validate-course.mjs.
 * Returns true if a term is banned (and not on the allowlist with justification).
 */
export function isBannedTerm(term: string): boolean {
  const lower = term.toLowerCase();
  const banned = BANNED_TERMS.some(
    (t) => lower.includes(t.toLowerCase())
  );
  if (!banned) return false;

  // Check if it's on the allowlist with justification
  const allowed = ALLOWLIST.find(
    (a) => lower.includes(a.term.toLowerCase()) && a.justification
  );
  return !allowed;
}

/**
 * Returns all banned terms, with their plain replacements.
 * For building the glossary page.
 */
export function getBannedTermsWithReplacements(): Array<{
  technical: string;
  plain: string;
  note?: string;
}> {
  return BANNED_TERMS.map((term) => ({
    technical: term,
    plain: TERM_TRANSLATIONS[term] || `[no replacement defined for "${term}"]`,
    note: ALLOWLIST.find((a) => a.term === term)?.justification,
  }));
}
