/**
 * HOMEWORK — Layer 2 of the design's three-layer assessment (COURSE_DESIGN §3.2).
 *
 * This is the layer the course went eight lessons without, and its absence was
 * the largest gap in the whole project. §1.2 rates exactly two techniques as
 * "high utility": practice testing and **distributed practice**. Layer 1
 * (in-lesson practice) and Layer 3 (the gating unit test) are both practice
 * testing. Nothing distributed anything. A learner met the `-ka`/`-ta` rule in
 * Lesson 3 and, unless they failed a unit test, might never meet it again.
 *
 * Homework is also where **interleaving** starts (§1.5). In-lesson practice is
 * blocked on purpose — one point at a time, until it is solid. Interleaving
 * before that is an "undesirable difficulty" for a beginner. Homework is the
 * first place items from different lessons are deliberately mixed.
 *
 * WHY THE ITEMS ARE COMPOSED, NOT AUTHORED
 *
 * Every item here already exists, is registry-verified and is machine-gradable.
 * Authoring a separate homework bank per lesson would mean sourcing eight more
 * sets of Somali for material the learner has already met — and, worse, it
 * would be a step a future author has to remember. `composeUnitTest()` took the
 * same decision for carry-back and it has held up. Nothing to forget, nothing
 * to source, and it scales to Unit 3 with no new code.
 *
 * CARRY-BACK IS THE SPACED-REVIEW QUEUE, NOT A SECOND MECHANISM
 *
 * These used to be two systems saying similar things: carry-back pulled from
 * "any earlier lesson", while `lib/review.ts` separately tracked which lessons
 * were actually *due*. §1.17 (successive relearning) is the argument for making
 * them one — retrieval to criterion across spaced sessions more than doubles
 * recall against the same retrievals massed, and it is the union of the only two
 * high-utility techniques §1.2 names. Two half-implementations of it are worth
 * less than one.
 *
 * So `composeHomework` takes an optional `due` list. When it is supplied,
 * carry-back is drawn from lessons the schedule says are owed, most overdue
 * first, and falls back to any earlier lesson only if that runs short. Passing
 * nothing keeps the old behaviour, which is what the validator and the tests do.

MISSES OUTRANK EVERYTHING ELSE

The schedule says *when* material should come back. The per-prompt attempt
history says *what* should come back first. Every graded retrieval — in a
lesson, in homework, anywhere — records attempts and misses per prompt into
`exerciseProgress` in the progress store, and that record syncs with the
account. Until this parameter existed, that history was written and never
read: homework served the same rotation to a learner who had missed a form
four times as to one who had never missed it. Error-driven repetition is the
oldest finding in the retrieval literature — the items you fail are exactly
the items worth re-testing — so when `history` is supplied, missed prompts
lead their group: most-missed first, then the longest since the last attempt.
Recognition and production weighting still apply *within* what is owed; a miss
simply outranks both. Rotation across attempts is unchanged, so a retry still
serves a different set rather than the same ranking again.
 *
 * WHAT IT IS NOT
 *
 * It does not gate, and it is **not measurement** — the learner authors these
 * items, so an item whose answer and distractors they chose is not an effortful
 * retrieval. COURSE_DESIGN §3.2 has the full argument. The score is recorded so
 * the schedule has something to move on; it is not shown as a verdict.
 */

import type { PracticeExercise } from '../data/types';
// Explicit .ts extensions and relative paths, both required: validate-course.mjs
// imports this module directly under Node's native type stripping, which will
// not resolve an extensionless specifier or the `@/` alias. See WORKING_AGREEMENT.
import { AUTHORED_LESSONS } from '../data/authored-lessons.ts';
import { TEST_BANKS } from '../data/unit-tests.ts';

/** How many items a homework set aims for. §3.2 asks for ~10–15. */
export const HOMEWORK_SIZE = 12;

/** Share of the set that must come from earlier lessons. Design rule `A3`. */
export const CARRY_BACK_SHARE = 0.3;

/**
 * The slice of the progress store's per-prompt history this module reads.
 * Declared structurally rather than imported from `stores/progress-store.ts`
 * so `validate-course.mjs` can import this file under Node's type stripping
 * without pulling in zustand. `Record<string, ExerciseProgress>` satisfies it.
 */
export interface AttemptRecord {
  misses: number;
  lastAttemptAt: string;
}
export type AttemptHistory = Record<string, AttemptRecord>;

/**
 * Missed prompts first, then everything else in its existing order.
 *
 * A stable sort, so within "never missed" the caller's ordering (production
 * weight, due order) is untouched — a miss is the only thing that outranks
 * them. Among missed prompts: more misses first, then the longest since the
 * last attempt, so the form decaying longest leads. Deterministic, which the
 * attempt-rotation tests rely on.
 */
function missedFirst(items: PracticeExercise[], history: AttemptHistory): PracticeExercise[] {
  if (!history || Object.keys(history).length === 0) return items;
  const key = (id: string): [number, number, string] => {
    const h = history[id];
    return h && h.misses > 0 ? [0, -h.misses, h.lastAttemptAt] : [1, 0, ''];
  };
  return [...items].sort((a, b) => {
    const ka = key(a.id);
    const kb = key(b.id);
    if (ka[0] !== kb[0]) return ka[0] - kb[0];
    if (ka[1] !== kb[1]) return ka[1] - kb[1];
    return ka[2] < kb[2] ? -1 : ka[2] > kb[2] ? 1 : 0;
  });
}

const PRODUCTION_TYPES = new Set(['translate', 'unscramble', 'marker_identification']);

/** Objectives a single lesson declares. */
function objectivesOf(lessonId: number): string[] {
  return AUTHORED_LESSONS.find((l) => l.id === lessonId)?.objectives ?? [];
}

/**
 * Everything gradable that exists, tagged with the lesson whose objectives it
 * tests. Lesson exercises and unit-test bank items are both fair game: the bank
 * is where most production items live, and homework wants production.
 */
function pool(): Array<{ item: PracticeExercise; lessonId: number }> {
  const byObjective = new Map<string, number>();
  for (const lesson of AUTHORED_LESSONS) {
    for (const o of lesson.objectives) if (!byObjective.has(o)) byObjective.set(o, lesson.id);
  }

  const out: Array<{ item: PracticeExercise; lessonId: number }> = [];
  for (const lesson of AUTHORED_LESSONS) {
    for (const card of lesson.cards) {
      if (card.exercise) out.push({ item: card.exercise, lessonId: lesson.id });
    }
  }
  for (const bank of TEST_BANKS) {
    for (const item of bank.items) {
      // A bank item belongs to the earliest lesson that teaches any objective
      // it tests, so carry-back means the same thing for both sources.
      const owners = item.objectiveIds.map((o) => byObjective.get(o)).filter((n): n is number => n !== undefined);
      if (owners.length) out.push({ item, lessonId: Math.min(...owners) });
    }
  }
  return out;
}

/**
 * Production first, then everything else — §1.8 rates recall above recognition,
 * and §3.2 asks homework specifically to be production-weighted. Order is
 * otherwise left alone so selection stays deterministic.
 */
function productionFirst(items: PracticeExercise[]): PracticeExercise[] {
  return [
    ...items.filter((i) => PRODUCTION_TYPES.has(i.type)),
    ...items.filter((i) => !PRODUCTION_TYPES.has(i.type)),
  ];
}


/** True only when the lesson itself is owed by the spaced-review schedule. */
export function isDelayedTransferSession(lessonId: number, due: number[]): boolean {
  return due.includes(lessonId);
}

/**
 * Evidence from a delayed session that is not a verbatim repeat of a lesson
 * prompt. These are the items that can support a delayed-transfer claim.
 */
export function delayedTransferItems(
  lessonId: number,
  attempt = 0,
  due: number[] = [],
  history: AttemptHistory = {},
): PracticeExercise[] {
  if (!isDelayedTransferSession(lessonId, due)) return [];
  const lessonQuestions = new Set(
    AUTHORED_LESSONS.find((lesson) => lesson.id === lessonId)?.cards
      .flatMap((card) => card.exercise ? [card.exercise.question.trim().toLowerCase()] : []) ?? [],
  );
  return composeHomework(lessonId, attempt, HOMEWORK_SIZE, due, history).filter(
    (item) => !lessonQuestions.has(item.question.trim().toLowerCase()),
  );
}

/**
 * A homework set for one lesson.
 *
 * `attempt` rotates the starting point in each group, so retrying serves a
 * different set rather than the same one again — §3.2 asks for "retryable with
 * fresh items", and it is also the fix for the complaint that unit-test retakes
 * serve identical questions. Rotation is deterministic: attempt 2 always gives
 * the same set as attempt 2.
 *
 * `due` is the spaced-review queue from `dueLessons()`, most overdue first. When
 * given, carry-back prefers those lessons — the material the schedule says has
 * decayed — rather than whatever happens to sit earliest in the course. Omit it
 * and carry-back behaves as it always did.
 *
 * `history` is the per-prompt attempt record (`exerciseProgress`). When
supplied, prompts the learner has missed lead their group — most-missed,
then longest since last attempt. Omit it and ranking is unchanged.

Returns fewer than `size` items only when the pool genuinely has fewer.
 */
export function composeHomework(
  lessonId: number,
  attempt = 0,
  size = HOMEWORK_SIZE,
  due: number[] = [],
  history: AttemptHistory = {},
): PracticeExercise[] {
  // A lesson that does not exist gets nothing. Without this the carry-back
  // filter (`lessonId < 99`) matches the entire course and happily composes a
  // full set of homework for a lesson nobody has written.
  if (!AUTHORED_LESSONS.some((l) => l.id === lessonId)) return [];

  const all = pool();
  const own = objectivesOf(lessonId);

  const current = missedFirst(
    productionFirst(
      all.filter((p) => p.lessonId === lessonId && p.item.objectiveIds.some((o) => own.includes(o))).map((p) => p.item),
    ),
    history,
  );
  // Carry-back candidates, due-first. `due` is already ordered most-overdue-first
  // by dueLessons(), and that order is preserved here so the lesson decaying
  // longest contributes before one that came due this morning. The lesson being
  // practised is excluded — it is the `current` half of the set, not carry-back.
  const dueEarlier = due.filter((id) => id !== lessonId);
  const isDue = new Set(dueEarlier);
  const rank = new Map(dueEarlier.map((id, i) => [id, i]));

  const anyEarlier = all.filter((p) => p.lessonId < lessonId);
  // productionFirst is applied to each group separately, not to the concatenation.
  // Run over the whole list it would hoist every production item to the front and
  // undo the due ordering — a not-due production item would outrank a due one,
  // which is the opposite of what drawing from the queue is for. Production
  // weighting (§1.8) is a preference *within* what is owed, not above it.
  const earlier = [
    ...missedFirst(
      productionFirst(
        anyEarlier
          .filter((p) => isDue.has(p.lessonId))
          .sort((a, b) => (rank.get(a.lessonId) ?? 0) - (rank.get(b.lessonId) ?? 0))
          .map((p) => p.item),
      ),
      history,
    ),
    // Anything not due, as filler. Without this a learner with an empty queue
    // gets no carry-back at all, which would silently switch interleaving off.
    ...missedFirst(productionFirst(anyEarlier.filter((p) => !isDue.has(p.lessonId)).map((p) => p.item)), history),
  ];

  const wantBack = earlier.length ? Math.max(1, Math.round(size * CARRY_BACK_SHARE)) : 0;
  const wantCurrent = size - wantBack;

  const rotate = <T,>(xs: T[], by: number) => (xs.length ? [...xs.slice(by % xs.length), ...xs.slice(0, by % xs.length)] : xs);

  const picked: PracticeExercise[] = [];
  const seen = new Set<string>();
  const take = (from: PracticeExercise[], n: number) => {
    for (const item of from) {
      if (picked.length >= size || n <= 0) break;
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      picked.push(item);
      n--;
    }
  };

  take(rotate(current, attempt * wantCurrent), wantCurrent);
  take(rotate(earlier, attempt * wantBack), wantBack);
  // Short pool on one side: fill from the other rather than serve a stub set.
  take(rotate(current, attempt * wantCurrent), size - picked.length);
  take(rotate(earlier, attempt * wantBack), size - picked.length);

  return picked;
}

/** How many of a composed set come from lessons before this one. */
export function carryBackCount(lessonId: number, items: PracticeExercise[]): number {
  const own = new Set(objectivesOf(lessonId));
  return items.filter((i) => !i.objectiveIds.some((o) => own.has(o))).length;
}
