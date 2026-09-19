/**
 * HOMEWORK POOL — everything gradable that exists, and how it is ordered.
 *
 * WHY THE ITEMS ARE COMPOSED, NOT AUTHORED
 *
 * Every item here already exists, is registry-verified and is machine-gradable.
 * Authoring a separate homework bank per lesson would mean sourcing eight more
 * sets of Somali for material the learner has already met — and, worse, it
 * would be a step a future author has to remember. `composeUnitTest()` took the
 * same decision for carry-back and it has held up. Nothing to forget, nothing
 * to source, and it scales to Unit 3 with no new code.
 */

import type { PracticeExercise } from '../../data/types';
// Explicit .ts extensions and relative paths, both required: validate-course.mjs
// imports this module chain directly under Node's native type stripping, which
// will not resolve an extensionless specifier or the `@/` alias. See
// WORKING_AGREEMENT.
import { AUTHORED_LESSONS } from '../../data/authored-lessons.ts';
import { TEST_BANKS } from '../../data/unit-tests.ts';

export const PRODUCTION_TYPES = new Set(['translate', 'unscramble', 'marker_identification']);

/** Objectives a single lesson declares. */
export function objectivesOf(lessonId: number): string[] {
  return AUTHORED_LESSONS.find((l) => l.id === lessonId)?.objectives ?? [];
}

/**
 * Everything gradable that exists, tagged with the lesson whose objectives it
 * tests. Lesson exercises and unit-test bank items are both fair game: the bank
 * is where most production items live, and homework wants production.
 */
export function pool(): Array<{ item: PracticeExercise; lessonId: number }> {
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
export function productionFirst(items: PracticeExercise[]): PracticeExercise[] {
  return [
    ...items.filter((i) => PRODUCTION_TYPES.has(i.type)),
    ...items.filter((i) => !PRODUCTION_TYPES.has(i.type)),
  ];
}
