#!/usr/bin/env node
/**
 * COURSE VALIDATOR
 *
 * Checks editorial and sourcing quality of the shipped course. Run:
 *   npm run validate:course
 *
 * This imports the real TypeScript modules (Node strips types natively) and
 * inspects actual objects. The previous version read the files as strings and
 * regex-grepped them, which meant it reported errors about content that had
 * been deleted and passed content that was broken.
 *
 * Two rules for this file:
 *   1. No stub checks. A check either does real work or does not exist.
 *      Emitting "requires manual review" warnings just manufactures noise that
 *      hides the real failures.
 *   2. Errors exit non-zero. A validator that always passes is decoration.
 *
 * Mechanical shape checks (exercise wellformedness, ids, placeholders) live in
 * src/tests/ and gate the build. This file covers what tests do not: sourcing,
 * plain-language rules, and the pedagogical exercise mix.
 */

import { AUTHORED_LESSONS, LESSON_LIST, MAX_LESSON_ID } from '../src/data/authored-lessons.ts';
import { TOP_500_WORDS } from '../src/data/vocabulary.ts';
import { BANNED_TERMS, ALLOWLIST } from '../src/data/banned-terms.ts';
import { VERIFIED_FORMS, isVerifiedForm } from '../src/data/verified-forms.ts';

const errors = [];
const warnings = [];
const passes = [];

const fail = (id, msg) => errors.push({ id, msg });
const warn = (id, msg) => warnings.push({ id, msg });
const pass = (id, msg) => passes.push({ id, msg });

/** Every exercise in the course, with a human-readable location. */
const allExercises = AUTHORED_LESSONS.flatMap((lesson) =>
  lesson.cards
    .filter((c) => c.exercise)
    .map((c) => ({ ex: c.exercise, lesson: lesson.id, where: `L${lesson.id}/${c.id}` })),
);

/** All learner-visible prose, per lesson. */
const proseOf = (lesson) =>
  lesson.cards
    .flatMap((c) => [c.title, c.prompt, c.content, c.exercise?.question, c.exercise?.hint, c.exercise?.explanation])
    .filter(Boolean)
    .join('\n');

// ============================================================================
// SOURCING — the checks that exist because invented Somali once shipped
// ============================================================================

/** S1: every Somali token in a machine-checkable field must be verified. */
function checkAnswerSourcing() {
  const unverified = [];
  for (const { ex, where } of allExercises) {
    // These fields are unambiguously Somali.
    const somaliFields = [];
    if (ex.type === 'unscramble') {
      somaliFields.push(...(ex.words ?? []));
      if (typeof ex.answer === 'string') somaliFields.push(...ex.answer.split(/\s+/));
    }
    if (ex.type === 'translate') {
      const a = Array.isArray(ex.answer) ? ex.answer : [ex.answer];
      for (const one of a) if (typeof one === 'string') somaliFields.push(...one.split(/\s+/));
    }
    for (const tok of somaliFields) {
      const clean = tok.replace(/[.,?!]+$/, '');
      if (!clean) continue;
      if (!isVerifiedForm(clean)) unverified.push(`${where}: "${clean}"`);
    }
  }
  if (unverified.length) {
    fail('S1', `Unverified Somali in exercise answers (add to verified-forms.ts or remove):\n      ${unverified.join('\n      ')}`);
  } else {
    pass('S1', `All Somali in exercise answers is source-verified (${allExercises.length} exercises checked)`);
  }
}

/**
 * S2: Somali forms asserted in lesson prose.
 *
 * Bold spans mark the form under discussion, but the same markup is used for
 * English emphasis, so single lowercase words that are not English are the
 * checkable subset. Reported as warnings — a miss here is a prompt to source
 * the form, not proof it is wrong.
 */
const ENGLISH_STOPLIST = new Set(
  ('the a an and or but not is are was were be been being of to in on at for with from by as it its this that these those ' +
   'masculine feminine gender genders noun nouns verb verbs word words letter letters sound sounds vowel vowels consonant ' +
   'consonants ending endings suffix suffixes subject object plural singular definite indefinite tone spelling alphabet ' +
   'somali english arabic why what which how when who where because so if then than also just only always never ' +
   'you your yours we our us they them their he she him her his hers i me my mine one two three both each every ' +
   'no yes may can will would should could must has have had do does did make makes made take takes ' +
   'including excluding instead alone itself already reliable unpredictable identical separate ' +
   'boy girl man woman house book shoe city knife month teacher father mother lion snake table key story bus cat lamp tree ' +
   'left right first last next same different new old good bad big small long short deep hard easy ' +
   'three-letter throat pair pairs single missing absent present borrowed unadapted rule rules form forms').split(/\s+/),
);

function checkProseSourcing() {
  const suspects = new Map();
  for (const lesson of AUTHORED_LESSONS) {
    for (const m of proseOf(lesson).matchAll(/\*\*([^*]+)\*\*/g)) {
      const inner = m[1].trim();
      if (/\s/.test(inner)) continue;                       // multi-word: English emphasis
      const w = inner.toLowerCase().replace(/[.,?!:;()]+$/, '');
      if (!w || /[^a-z']/.test(w)) continue;                 // punctuation / markup
      if (ENGLISH_STOPLIST.has(w)) continue;
      if (isVerifiedForm(w)) continue;
      if (w.length <= 2) continue;                           // dh, kh, sh, c, x, q — letters, not words
      if (!suspects.has(w)) suspects.set(w, `L${lesson.id}`);
    }
  }
  if (suspects.size) {
    const list = [...suspects.entries()].map(([w, l]) => `${l}: "${w}"`).join('\n      ');
    warn('S2', `Somali-looking forms in prose that are not in verified-forms.ts:\n      ${list}`);
  } else {
    pass('S2', 'All Somali forms asserted in lesson prose are source-verified');
  }
}

/** S3: vocabulary shown to learners must carry sources. */
function checkVocabSourcing() {
  const missing = TOP_500_WORDS.filter((w) => !w.sources || w.sources.length < 2);
  const verified = TOP_500_WORDS.length - missing.length;
  if (missing.length) {
    warn(
      'S3',
      `${missing.length} of ${TOP_500_WORDS.length} vocabulary entries lack 2 sources ` +
        `(${verified} verified). These are shown in lesson vocab decks:\n      ` +
        missing.slice(0, 12).map((w) => `L${w.lessonId} "${w.somali}"`).join(', ') +
        (missing.length > 12 ? `, +${missing.length - 12} more` : ''),
    );
  } else {
    pass('S3', `All ${TOP_500_WORDS.length} vocabulary entries carry 2+ sources`);
  }
}

/**
 * S4: registry integrity.
 *
 * Zero sources is an error — the entry is an assertion with nothing behind it.
 * Exactly one source is a warning, and must be declared via `confidence:
 * 'single'` so that thin sourcing is visible rather than implied.
 */
function checkRegistryIntegrity() {
  const entries = Object.entries(VERIFIED_FORMS);
  const none = entries.filter(([, v]) => !v.sources?.length);
  const undeclaredSingle = entries.filter(([, v]) => v.sources?.length === 1 && v.confidence !== 'single');
  const declaredSingle = entries.filter(([, v]) => v.confidence === 'single');

  if (none.length) {
    fail('S4', `Registry entries with no sources: ${none.map(([k]) => k).join(', ')}`);
  }
  if (undeclaredSingle.length) {
    fail(
      'S4',
      `Registry entries with one source but not marked confidence:'single': ${undeclaredSingle.map(([k]) => k).join(', ')}`,
    );
  }
  if (declaredSingle.length) {
    warn('S4', `${declaredSingle.length} registry form(s) rest on a single source: ${declaredSingle.map(([k]) => k).join(', ')}`);
  }
  if (!none.length && !undeclaredSingle.length) {
    pass('S4', `All ${entries.length} registry forms carry sources (${entries.length - declaredSingle.length} with 2+)`);
  }
}

// ============================================================================
// LANGUAGE — plain English, no linguistics jargon
// ============================================================================

function checkBannedTerms() {
  const allowed = new Set(ALLOWLIST.map((a) => a.term.toLowerCase()));
  const hits = [];
  for (const lesson of AUTHORED_LESSONS) {
    const prose = proseOf(lesson).toLowerCase();
    for (const term of BANNED_TERMS) {
      if (allowed.has(term.toLowerCase())) continue;
      if (new RegExp(`\\b${term.toLowerCase()}\\b`).test(prose)) hits.push(`L${lesson.id}: "${term}"`);
    }
  }
  if (hits.length) {
    fail('L1', `Linguistics jargon in learner-facing text:\n      ${[...new Set(hits)].join('\n      ')}`);
  } else {
    pass('L1', 'No banned linguistics jargon in lesson text');
  }
}

function checkSentenceLength(limit = 30) {
  const long = [];
  for (const lesson of AUTHORED_LESSONS) {
    for (const raw of proseOf(lesson).split(/(?<=[.?!])\s+|\n+/)) {
      const s = raw.replace(/\*\*/g, '').trim();
      const n = s.split(/\s+/).filter(Boolean).length;
      if (n > limit) long.push(`L${lesson.id} (${n}w): ${s.slice(0, 60)}…`);
    }
  }
  if (long.length) {
    warn('L2', `${long.length} sentence(s) over ${limit} words:\n      ${long.slice(0, 5).join('\n      ')}`);
  } else {
    pass('L2', `No sentence exceeds ${limit} words`);
  }
}

// ============================================================================
// PEDAGOGY — exercise mix and coverage
// ============================================================================

const CHOICE_TYPES = new Set(['multiple_choice', 'fill_blank', 'matching']);
const PRODUCTION_TYPES = new Set(['translate', 'unscramble', 'marker_identification']);

function checkExerciseMix() {
  const total = allExercises.length;
  if (!total) return fail('E1', 'Course contains no exercises');
  const choice = allExercises.filter((e) => CHOICE_TYPES.has(e.ex.type)).length;
  const production = total - choice;
  const prodPct = Math.round((production / total) * 100);

  if (production === 0) {
    fail('E1', 'No production exercises — the course is recognition-only');
  } else if (prodPct < 20) {
    warn('E1', `Production exercises are ${prodPct}% of ${total} (target: 30%+). Recognition-heavy.`);
  } else {
    pass('E1', `Exercise mix: ${prodPct}% production, ${100 - prodPct}% choice (${total} total)`);
  }
}

function checkExerciseDensity(min = 4) {
  const thin = AUTHORED_LESSONS.map((l) => ({
    id: l.id,
    n: l.cards.filter((c) => c.exercise).length,
  })).filter((l) => l.n < min);
  if (thin.length) {
    warn('E2', `Lessons with fewer than ${min} exercises: ${thin.map((l) => `L${l.id} (${l.n})`).join(', ')}`);
  } else {
    pass('E2', `Every lesson has at least ${min} exercises`);
  }
}

function checkObjectiveCoverage() {
  const gaps = [];
  for (const lesson of AUTHORED_LESSONS) {
    const tagged = new Set(
      lesson.cards.flatMap((c) => c.exercise?.objectiveIds ?? []),
    );
    for (const obj of lesson.objectives) {
      if (!tagged.has(obj)) gaps.push(`L${lesson.id}: "${obj}" has no exercise`);
    }
  }
  if (gaps.length) {
    fail('E3', `Objectives with no exercise testing them:\n      ${gaps.join('\n      ')}`);
  } else {
    pass('E3', 'Every lesson objective is tested by at least one exercise');
  }
}

function checkOrphanObjectives() {
  const orphans = [];
  for (const lesson of AUTHORED_LESSONS) {
    const declared = new Set(lesson.objectives);
    for (const card of lesson.cards) {
      for (const o of card.exercise?.objectiveIds ?? []) {
        if (!declared.has(o)) orphans.push(`L${lesson.id}/${card.id}: "${o}" not in lesson objectives`);
      }
    }
  }
  if (orphans.length) {
    fail('E4', `Exercises tagged with undeclared objectives:\n      ${orphans.join('\n      ')}`);
  } else {
    pass('E4', 'All exercise objective tags are declared on their lesson');
  }
}

// ============================================================================
// STRUCTURE
// ============================================================================

function checkStructure() {
  const problems = [];
  for (const lesson of AUTHORED_LESSONS) {
    if (lesson.cards[0]?.type !== 'blueprint') problems.push(`L${lesson.id} does not open on a blueprint`);
    if (lesson.cards.at(-1)?.type !== 'summary') problems.push(`L${lesson.id} does not close on a summary`);
    if (!lesson.cards.some((c) => c.type === 'payoff')) problems.push(`L${lesson.id} has no payoff card`);
    if (!lesson.objectives.length) problems.push(`L${lesson.id} declares no objectives`);
    if (lesson.newItems.length > 4) problems.push(`L${lesson.id} introduces ${lesson.newItems.length} new items (max 4)`);
  }
  if (LESSON_LIST.length !== MAX_LESSON_ID) {
    problems.push(`LESSON_LIST has ${LESSON_LIST.length} entries but MAX_LESSON_ID is ${MAX_LESSON_ID}`);
  }
  if (problems.length) {
    fail('T1', `Structure problems:\n      ${problems.join('\n      ')}`);
  } else {
    pass('T1', `All ${AUTHORED_LESSONS.length} lessons follow the card structure`);
  }
}

// ============================================================================
// REPORT
// ============================================================================

console.log('\n\x1b[1mCOURSE VALIDATION\x1b[0m');
console.log(`${AUTHORED_LESSONS.length} lessons · ${allExercises.length} exercises · ${TOP_500_WORDS.length} vocabulary entries\n`);

checkAnswerSourcing();
checkProseSourcing();
checkVocabSourcing();
checkRegistryIntegrity();
checkBannedTerms();
checkSentenceLength();
checkExerciseMix();
checkExerciseDensity();
checkObjectiveCoverage();
checkOrphanObjectives();
checkStructure();

for (const p of passes) console.log(`  \x1b[32m✓\x1b[0m ${p.id}  ${p.msg}`);
if (warnings.length) console.log('');
for (const w of warnings) console.log(`  \x1b[33m⚠\x1b[0m ${w.id}  ${w.msg}`);
if (errors.length) console.log('');
for (const e of errors) console.log(`  \x1b[31m✗\x1b[0m ${e.id}  ${e.msg}`);

console.log(
  `\n${passes.length} passed · ${warnings.length} warning(s) · ${errors.length} error(s)\n`,
);

process.exit(errors.length ? 1 : 0);
