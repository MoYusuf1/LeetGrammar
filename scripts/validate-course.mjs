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
import { VERIFIED_FORMS, DERIVATION_RULES, isVerifiedForm } from '../src/data/verified-forms.ts';
import { TEST_BANKS, UNITS, getUnitObjectives } from '../src/data/unit-tests.ts';
import { describeObjective, labelledObjectives, objectiveLabels } from '../src/data/objectives.ts';

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

/**
 * Ordinary English words that may legitimately appear where a Somali form
 * would. Used by S2's bold-span heuristic and by the choice-answer check in
 * `somaliTokensOf` — a word here is never treated as unsourced Somali.
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
   'three-letter throat pair pairs single missing absent present borrowed unadapted rule rules form forms ' +
   // Lesson 5 emphasises these English words in bold while teaching the signal
   // system; they are plain English, not Somali forms awaiting a source.
   'voice tone volume loud louder emphasis emphasises signal signals spotlight spotlights end friend friends ' +
   'statement statements before after left right position placement flat evenly ends starts finishes').split(/\s+/),
);

/**
 * The tokens of an exercise that are unambiguously Somali.
 *
 * Answers and word banks qualify. Question and explanation prose is mixed
 * English and Somali and is covered by the bold-span heuristic in S2 instead.
 * Shared with the unit-test bank checks so the two cannot diverge — the bank
 * once claimed in its own header to be checked here while nothing checked it.
 *
 * REGRESSION: this function used to skip choice types entirely, so a
 * multiple_choice item could present an invented Somali word as the *correct*
 * answer and both S1 and U1 would pass while reporting every item checked.
 * Verified by injecting `libaaxyaal` as a correct answer: all three gates went
 * green. A choice answer is a single token once its English gloss is stripped
 * ("sheeko (story)" → "sheeko"); multi-word answers are English prose
 * ("writing the vowel twice") and are left alone, as are one- and two-letter
 * answers, which are alphabet letters rather than words.
 */
function somaliTokensOf(ex) {
  const tokens = [];
  if (ex.type === 'unscramble') {
    tokens.push(...(ex.words ?? []));
    if (typeof ex.answer === 'string') tokens.push(...ex.answer.split(/\s+/));
  }
  if (ex.type === 'translate' || ex.type === 'marker_identification') {
    const answers = Array.isArray(ex.answer) ? ex.answer : [ex.answer];
    for (const one of answers) if (typeof one === 'string') tokens.push(...one.split(/\s+/));
    if (typeof ex.somali === 'string') tokens.push(...ex.somali.split(/\s+/));
  }
  if (ex.type === 'multiple_choice' || ex.type === 'fill_blank' || ex.type === 'matching') {
    const bare = String(ex.correctAnswer ?? '').replace(/\(.*?\)/g, '').trim();
    const word = bare.toLowerCase().replace(/[.,?!:;]+$/, '');
    if (word && !/\s/.test(word) && !/[^a-z']/.test(word) && word.length > 2 && !ENGLISH_STOPLIST.has(word)) {
      tokens.push(word);
    }
  }
  return tokens.map((t) => t.replace(/[.,?!]+$/, '')).filter(Boolean);
}

/** S1: every Somali token in a machine-checkable field must be verified. */
function checkAnswerSourcing() {
  const unverified = [];
  for (const { ex, where } of allExercises) {
    for (const clean of somaliTokensOf(ex)) {
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
  // A `derived` form legitimately carries one direct citation: its second line
  // of evidence is the rule that generates it, which S7 checks separately.
  const undeclaredSingle = entries.filter(
    ([, v]) => v.sources?.length === 1 && v.confidence !== 'single' && v.confidence !== 'derived',
  );
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

/**
 * S5: two citations of the same book are one source.
 *
 * D2 requires "≥2 independent published sources", and the binding constraint
 * on this whole project is that no native speaker will ever check the content.
 * `['N §6.1', 'N §6.3']` is two sections of Nilsson — if Nilsson is wrong, both
 * are wrong together, which is precisely the failure two-source verification
 * exists to catch. S4 counted these as verified, so the reported "2+ sources"
 * figure overstated the guarantee.
 *
 * A warning, not an error: these are real forms from a reputable grammar, and
 * erroring would take down the shipped course over a citation-quality problem.
 * The point is that the number is honest.
 */
function checkSourceIndependence() {
  const rootOf = (s) => s.split(/[ §]/)[0];
  const weak = Object.entries(VERIFIED_FORMS).filter(([, v]) => {
    const srcs = v.sources ?? [];
    return srcs.length >= 2 && new Set(srcs.map(rootOf)).size < 2;
  });
  if (weak.length) {
    warn(
      'S5',
      `${weak.length} form(s) cite one author twice rather than two independent sources:\n      ` +
        weak.map(([k, v]) => `${k} [${v.sources.join(', ')}]`).join('\n      '),
    );
  } else {
    pass('S5', 'Every multi-source form cites at least two independent sources');
  }
}

/**
 * S6: thin sourcing may reach the eye, never the fingers.
 *
 * A form resting on one source may appear as something the learner reads or
 * picks from a list — being wrong about it costs a recognition. Asking them to
 * *produce* it is different: production is what gets rehearsed into memory, and
 * §1.12 of COURSE_DESIGN is about errors that resurface on delayed tests long
 * after the correction. With no native speaker to ever catch it, a
 * single-sourced form drilled into production is the most expensive mistake
 * this project can make.
 *
 * Promoted from a convention in docs/LESSON_CONVENTIONS.md §2.5. It was already
 * true of every item when written down; this keeps it true.
 */
const PRODUCTION_TYPES_FOR_SOURCING = new Set(['translate', 'unscramble', 'marker_identification']);

function checkProducedFormsAreWellSourced() {
  // `derived` forms are producible: the rule that generates them carries two
  // independent sources, which S7 verifies. Only `single` is read-only.
  const thin = new Set(
    Object.entries(VERIFIED_FORMS)
      .filter(([, v]) => v.confidence === 'single')
      .map(([k]) => k),
  );
  const offenders = [];
  const everyItem = [
    ...allExercises.map(({ ex, where }) => ({ ex, where })),
    ...allBankItems.map(({ ex, where }) => ({ ex, where })),
  ];
  for (const { ex, where } of everyItem) {
    if (!PRODUCTION_TYPES_FOR_SOURCING.has(ex.type)) continue;
    const answers = Array.isArray(ex.answer) ? ex.answer : [ex.answer];
    for (const one of answers) {
      if (typeof one !== 'string') continue;
      for (const raw of one.split(/\s+/)) {
        const t = raw.toLowerCase().replace(/[.,?!:;]+$/, '');
        if (thin.has(t)) offenders.push(`${where} [${ex.type}] asks the learner to produce "${t}"`);
      }
    }
  }
  if (offenders.length) {
    fail(
      'S6',
      `Single-source forms used as production answers (recognition is fine, production is not):\n      ` +
        [...new Set(offenders)].join('\n      '),
    );
  } else {
    pass('S6', `No production item answers with a single-source form (${thin.size} thin forms in the registry)`);
  }
}

/**
 * S7: `derived` must not become a way to launder thin sourcing.
 *
 * The derived tier widens D2 deliberately — the unit of verification for
 * morphology is the rule rather than the form — but it only holds if the rule
 * itself is genuinely double-attested and actually named. Without this check,
 * marking a form `derived` would be strictly easier than sourcing it, which is
 * exactly the incentive that produced the original invented content.
 *
 * Four things must hold for every derived form:
 *   1. it names a rule
 *   2. that rule exists
 *   3. the rule cites two or more genuinely independent sources (same test as S5)
 *   4. the stem it is built on is itself in the registry
 */
function checkDerivationRules() {
  const rootOf = (s) => s.split(/[ §]/)[0];
  const problems = [];

  for (const [id, rule] of Object.entries(DERIVATION_RULES)) {
    const srcs = rule.sources ?? [];
    if (srcs.length < 2) {
      problems.push(`rule "${id}" cites ${srcs.length} source(s); a derivation rule needs 2+`);
    } else if (new Set(srcs.map(rootOf)).size < 2) {
      problems.push(`rule "${id}" cites one author twice [${srcs.join(', ')}]`);
    }
    if (!rule.attestedBy?.trim()) {
      problems.push(`rule "${id}" does not record how each source attests it`);
    }
  }

  for (const [form, v] of Object.entries(VERIFIED_FORMS)) {
    if (v.confidence !== 'derived') continue;
    if (!v.rule) {
      problems.push(`"${form}" is derived but names no rule`);
      continue;
    }
    if (!DERIVATION_RULES[v.rule]) {
      problems.push(`"${form}" names rule "${v.rule}", which does not exist`);
      continue;
    }
    // The stem must be registered too — a rule applied to an unsourced word
    // produces an unsourced form, however good the rule is.
    const stems = Object.keys(VERIFIED_FORMS).filter(
      (k) => k !== form && VERIFIED_FORMS[k].confidence !== 'derived' && form.startsWith(k),
    );
    if (!stems.length) {
      problems.push(`"${form}" is derived but no registered stem it is built from`);
    }
  }

  if (problems.length) {
    fail('S7', `Derivation problems:\n      ${problems.join('\n      ')}`);
  } else {
    const n = Object.values(VERIFIED_FORMS).filter((v) => v.confidence === 'derived').length;
    const r = Object.keys(DERIVATION_RULES).length;
    pass('S7', `All ${n} derived form(s) trace to one of ${r} double-attested rule(s) and a registered stem`);
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
// UNIT TESTS — the same sourcing and plain-language bar as lesson content
// ============================================================================

/**
 * Every bank item, with its unit and a human-readable location.
 *
 * A bank whose unit has no lessons is itself a finding (U0): it would mean a
 * test exists for content nobody can have studied.
 */
const allBankItems = TEST_BANKS.flatMap((bank) => {
  const unitId = Number(bank.id.replace(/^unit-|-test$/g, ''));
  return bank.items.map((ex) => ({ ex, unitId, where: `${bank.id}/${ex.id}` }));
});

/** All learner-visible prose in a bank item. */
const bankProseOf = (ex) =>
  [ex.question, ex.hint, ex.explanation, ...(ex.options ?? [])].filter(Boolean).join('\n');

/** U0: a bank must belong to a unit that has lessons written. */
function checkBankUnits() {
  const orphans = [];
  for (const bank of TEST_BANKS) {
    const unitId = Number(bank.id.replace(/^unit-|-test$/g, ''));
    const unit = UNITS.find((u) => u.id === unitId);
    if (!unit) orphans.push(`${bank.id} targets unit ${unitId}, which has no lessons`);
    else if (!bank.items.length) orphans.push(`${bank.id} has no items`);
  }
  if (orphans.length) {
    fail('U0', `Test banks that cannot be taken:\n      ${orphans.join('\n      ')}`);
  } else {
    pass('U0', `All ${TEST_BANKS.length} test bank(s) target a unit with written lessons`);
  }
}

/**
 * U5: a unit that has lessons must be presentable and finishable.
 *
 * UNITS is derived from the lessons, so authoring a lesson with a new unitId
 * creates a unit everywhere in the UI immediately — that is the point, but it
 * also means a half-registered unit ships silently. Both halves are warnings,
 * not errors: authoring lessons before their test bank is the normal order of
 * work, and blocking it would make the validator an obstacle to the workflow
 * it exists to protect.
 */
function checkUnitRegistration() {
  const unnamed = UNITS.filter((u) => !u.name.trim()).map((u) => u.id);
  const bankless = UNITS.filter((u) => !TEST_BANKS.some((b) => b.id === u.testBankId)).map((u) => u.id);

  if (unnamed.length) {
    warn('U5', `Unit(s) with no name in UNIT_NAMES (shown to learners as a bare number): ${unnamed.join(', ')}`);
  }
  if (bankless.length) {
    warn(
      'U5',
      `Unit(s) with lessons but no test bank — learners finish the lessons and get no test: ${bankless.join(', ')}. ` +
        `Add unit-banks/unit-N.ts and register it in TEST_BANKS.`,
    );
  }
  if (!unnamed.length && !bankless.length) {
    pass('U5', `All ${UNITS.length} unit(s) have a name and a test bank`);
  }
}

/**
 * U1: bank Somali must be registry-verified, exactly as lesson Somali is.
 *
 * This is the check the bank's own header claimed was running while nothing
 * was importing it. Distractor options are deliberately-wrong Somali and are
 * not checked — they are never presented to the learner as correct.
 */
function checkBankSourcing() {
  const unverified = [];
  for (const { ex, where } of allBankItems) {
    for (const clean of somaliTokensOf(ex)) {
      if (!isVerifiedForm(clean)) unverified.push(`${where}: "${clean}"`);
    }
  }
  if (unverified.length) {
    fail('U1', `Unverified Somali in unit test answers (add to verified-forms.ts or remove):\n      ${unverified.join('\n      ')}`);
  } else {
    pass('U1', `All Somali in unit test answers is source-verified (${allBankItems.length} items checked)`);
  }
}

/** U2: no linguistics jargon in test prose either. */
function checkBankLanguage() {
  const allowed = new Set(ALLOWLIST.map((a) => a.term.toLowerCase()));
  const hits = [];
  for (const { ex, where } of allBankItems) {
    const prose = bankProseOf(ex).toLowerCase();
    for (const term of BANNED_TERMS) {
      if (allowed.has(term.toLowerCase())) continue;
      if (new RegExp(`\\b${term.toLowerCase()}\\b`).test(prose)) hits.push(`${where}: "${term}"`);
    }
  }
  for (const label of objectiveLabels()) {
    for (const term of BANNED_TERMS) {
      if (allowed.has(term.toLowerCase())) continue;
      if (new RegExp(`\\b${term.toLowerCase()}\\b`).test(label.toLowerCase())) {
        hits.push(`objective label "${label}": "${term}"`);
      }
    }
  }
  if (hits.length) {
    fail('U2', `Linguistics jargon in unit test text:\n      ${[...new Set(hits)].join('\n      ')}`);
  } else {
    pass('U2', 'No banned jargon in unit test items or objective labels');
  }
}

/**
 * U3: every objective the unit teaches is tested, with enough items to score.
 *
 * Two is the floor because per-objective scoring is only as fine-grained as
 * the item count — a single-item objective is pass/fail on one question, which
 * routes a learner to correctives on one slip.
 */
function checkBankObjectiveCoverage(minItems = 2) {
  const problems = [];
  for (const unit of UNITS) {
    const bank = TEST_BANKS.find((b) => b.id === unit.testBankId);
    if (!bank) continue; // a unit with no test is allowed; U0 covers the reverse
    const declared = new Set(getUnitObjectives(unit.id));
    const counts = new Map();
    for (const item of bank.items) {
      for (const o of item.objectiveIds ?? []) {
        counts.set(o, (counts.get(o) ?? 0) + 1);
        if (!declared.has(o)) problems.push(`${bank.id}/${item.id}: "${o}" is not taught in unit ${unit.id}`);
      }
    }
    for (const o of declared) {
      const n = counts.get(o) ?? 0;
      if (n < minItems) problems.push(`unit ${unit.id}: "${o}" has ${n} test item(s), needs ${minItems}`);
    }
  }
  if (problems.length) {
    fail('U3', `Unit test objective coverage:\n      ${[...new Set(problems)].join('\n      ')}`);
  } else {
    pass('U3', `Every unit objective has at least ${minItems} test items, and no item tests an untaught objective`);
  }
}

/**
 * U4: every objective in the course has a plain-English label.
 *
 * Without one, a learner who fails a test is sent to correctives for
 * "article-assimilation". describeObjective() falls back to the raw id rather
 * than throwing, so nothing breaks visibly — which is exactly why it needs a
 * check here.
 */
function checkObjectiveLabels() {
  const labelled = new Set(labelledObjectives());
  const declared = [...new Set(AUTHORED_LESSONS.flatMap((l) => l.objectives))];
  const unlabelled = declared.filter((o) => !labelled.has(o));
  const stale = [...labelled].filter((o) => !declared.includes(o));
  const homeless = declared.filter((o) => describeObjective(o).lessonId === undefined);

  const problems = [
    ...unlabelled.map((o) => `"${o}" is taught but has no label in objectives.ts`),
    ...stale.map((o) => `"${o}" has a label but no lesson teaches it`),
    ...homeless.map((o) => `"${o}" resolves to no lesson`),
  ];
  if (problems.length) {
    fail('U4', `Objective labels:\n      ${problems.join('\n      ')}`);
  } else {
    pass('U4', `All ${declared.length} course objectives have a plain-English label and a home lesson`);
  }
}

// ============================================================================
// REPORT
// ============================================================================

console.log('\n\x1b[1mCOURSE VALIDATION\x1b[0m');
console.log(
  `${AUTHORED_LESSONS.length} lessons · ${allExercises.length} exercises · ` +
    `${allBankItems.length} unit test items · ${TOP_500_WORDS.length} vocabulary entries\n`,
);

checkAnswerSourcing();
checkProseSourcing();
checkVocabSourcing();
checkRegistryIntegrity();
checkSourceIndependence();
checkProducedFormsAreWellSourced();
checkDerivationRules();
checkBannedTerms();
checkSentenceLength();
checkExerciseMix();
checkExerciseDensity();
checkObjectiveCoverage();
checkOrphanObjectives();
checkStructure();
checkBankUnits();
checkUnitRegistration();
checkBankSourcing();
checkBankLanguage();
checkBankObjectiveCoverage();
checkObjectiveLabels();

for (const p of passes) console.log(`  \x1b[32m✓\x1b[0m ${p.id}  ${p.msg}`);
if (warnings.length) console.log('');
for (const w of warnings) console.log(`  \x1b[33m⚠\x1b[0m ${w.id}  ${w.msg}`);
if (errors.length) console.log('');
for (const e of errors) console.log(`  \x1b[31m✗\x1b[0m ${e.id}  ${e.msg}`);

console.log(
  `\n${passes.length} passed · ${warnings.length} warning(s) · ${errors.length} error(s)\n`,
);

process.exit(errors.length ? 1 : 0);
