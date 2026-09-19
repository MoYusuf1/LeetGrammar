/**
 * HOMEWORK COMPOSITION — assembling one session from the pool.
 *
 * `composeHomework` builds a set for one lesson: mostly that lesson's own
 * material, with a deliberate share carried back from earlier lessons. The
 * carry-back is where interleaving starts (§1.5). In-lesson practice is
 * blocked on purpose — one point at a time, until it is solid. Interleaving
 * before that is an "undesirable difficulty" for a beginner. Homework is the
 * first place items from different lessons are deliberately mixed.
 *
 * CARRY-BACK IS THE SPACED-REVIEW QUEUE, NOT A SECOND MECHANISM
 *
 * These used to be two systems saying similar things: carry-back pulled from
 * "any earlier lesson", while `lib/review.ts` separately tracked which lessons
 * were actually *due*. §1.17 (successive relearning) is the argument for making
 * them one — retrieval to criterion across spaced sessions more than doubles
 * recall against the same retrievals massed, and it is the union of the only
 * two high-utility techniques §1.2 names. Two half-implementations of it are
 * worth less than one.
 *
 * So `composeHomework` takes an optional `due` list. When it is supplied,
 * carry-back is drawn from lessons the schedule says are owed, most overdue
 * first, and falls back to any earlier lesson only if that runs short. Passing
 * nothing keeps the old behaviour, which is what the validator and the tests
 * rely on.
 */

import type { PracticeExercise } from '../../data/types';
import { AUTHORED_LESSONS } from '../../data/authored-lessons.ts';
import { missedFirst, type AttemptHistory } from './history.ts';
import { objectivesOf, pool, productionFirst } from './pool.ts';

/** How many items a homework set aims for. §3.2 asks for ~10–15. */
export const HOMEWORK_SIZE = 12;

/** Share of the set that must come from earlier lessons. Design rule `A3`. */
export const CARRY_BACK_SHARE = 0.3;

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
 * supplied, prompts the learner has missed lead their group — most-missed,
 * then longest since last attempt. Omit it and ranking is unchanged.
 *
 * Returns fewer than `size` items only when the pool genuinely has fewer.
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
