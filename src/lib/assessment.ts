/**
 * ASSESSMENT ENGINE — mastery gating, correctives, spaced review.
 *
 * Wired to the Unit 1 test bank (src/data/unit-tests.ts) and driven by
 * src/pages/UnitTest.tsx. `gradeUnitTest()` is the entry point: it grades a
 * learner's responses with the same `isAnswerCorrect()` the lesson player uses,
 * scores each objective separately, and returns both the overall pass/fail at
 * 85% and the list of objectives to send back through correctives.
 *
 * Two things this module deliberately does not do:
 *   • It does not grade anything by itself. Grading lives in lib/grading.ts and
 *     is tested there; duplicating it here is how the two would drift.
 *   • It does not invent unit membership. Which lessons are in a unit comes
 *     from the lessons themselves, so a unit cannot claim lessons that have not
 *     been written.
 */

import type { PracticeExercise } from '@/data/types';
import { AUTHORED_LESSONS } from '@/data/authored-lessons';
import { isAnswerCorrect } from '@/lib/grading';

export const MASTERY_THRESHOLD = 0.85; // 85% to pass unit test

/**
 * Unit test result — tracks performance per objective
 */
export interface UnitTestResult {
  unitId: number;
  score: number; // 0–1
  percentage: number; // 0–100
  passed: boolean; // >= 85%
  totalItems: number;
  correctItems: number;
  failedObjectives: string[]; // Objectives where score < 85%
  timestamp: number;
}

/**
 * Correctives — remediation for failed objectives
 * After failing a unit test, user gets targeted retests on only the failed objectives
 */
export interface CorrectivesSession {
  unitId: number;
  failedObjectives: string[];
  itemIds: string[]; // The actual items to re-do, in order
  itemsToRetest: number; // itemIds.length — kept for display
  timestamp: number;
  completed: boolean;
}

/**
 * Score a unit test
 * @param correctCount number of items answered correctly
 * @param totalCount total items on the test
 * @returns UnitTestResult with pass/fail and failed objectives to remediate
 */
export function scoreUnitTest(
  unitId: number,
  correctCount: number,
  totalCount: number,
  itemScores: Map<string, { correct: number; total: number }> // objective -> scores
): UnitTestResult {
  const score = totalCount > 0 ? correctCount / totalCount : 0;
  const percentage = Math.round(score * 100);
  const passed = score >= MASTERY_THRESHOLD;

  // Find failed objectives (per-objective score < 85%)
  const failedObjectives = Array.from(itemScores.entries())
    .filter(([, scores]) => {
      const objScore = scores.correct / scores.total;
      return objScore < MASTERY_THRESHOLD;
    })
    .map(([objective]) => objective);

  return {
    unitId,
    score,
    percentage,
    passed,
    totalItems: totalCount,
    correctItems: correctCount,
    failedObjectives,
    timestamp: Date.now(),
  };
}

/**
 * Per-objective tallies for a set of graded responses.
 *
 * An item tagged with two objectives counts toward both — a learner who gets
 * it wrong has shown a gap in each, and correctives should cover both.
 */
export function tallyByObjective(
  items: PracticeExercise[],
  responses: Record<string, string | null>,
): Map<string, { correct: number; total: number }> {
  const tally = new Map<string, { correct: number; total: number }>();
  for (const item of items) {
    const correct = isAnswerCorrect(item, responses[item.id] ?? null);
    for (const objective of item.objectiveIds) {
      const entry = tally.get(objective) ?? { correct: 0, total: 0 };
      entry.total += 1;
      if (correct) entry.correct += 1;
      tally.set(objective, entry);
    }
  }
  return tally;
}

/**
 * Grade a whole unit test.
 *
 * `responses` maps item id → what the learner answered. An item with no entry
 * counts as wrong, which is what an unanswered item is.
 */
export function gradeUnitTest(
  unitId: number,
  items: PracticeExercise[],
  responses: Record<string, string | null>,
): UnitTestResult {
  const correctCount = items.filter((item) =>
    isAnswerCorrect(item, responses[item.id] ?? null),
  ).length;
  return scoreUnitTest(unitId, correctCount, items.length, tallyByObjective(items, responses));
}

/**
 * The items to re-do after a failed test: up to `itemsPerObjective` for each
 * failed objective, in bank order.
 *
 * Deterministic on purpose. A randomised selection cannot be tested, and a
 * learner who retries twice should see the same gap addressed the same way.
 */
export function selectCorrectivesItems(
  items: PracticeExercise[],
  failedObjectives: string[],
  itemsPerObjective: number = 3,
): PracticeExercise[] {
  const chosen: PracticeExercise[] = [];
  const seen = new Set<string>();
  for (const objective of failedObjectives) {
    let taken = 0;
    for (const item of items) {
      if (taken >= itemsPerObjective) break;
      if (!item.objectiveIds.includes(objective)) continue;
      taken += 1;
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      chosen.push(item);
    }
  }
  return chosen;
}

/**
 * Generate correctives session for failed objectives
 * After a unit test failure, user gets a targeted retest on only the failed objectives.
 *
 * @param unitId unit that was failed
 * @param failedObjectives which objectives to remediate
 * @param items the unit's test bank, to pick real items from
 * @param itemsPerObjective how many items to give per objective (default 3)
 */
export function generateCorrectivesSession(
  unitId: number,
  failedObjectives: string[],
  items: PracticeExercise[],
  itemsPerObjective: number = 3
): CorrectivesSession {
  const itemIds = selectCorrectivesItems(items, failedObjectives, itemsPerObjective).map(
    (i) => i.id,
  );
  return {
    unitId,
    failedObjectives,
    itemIds,
    itemsToRetest: itemIds.length,
    timestamp: Date.now(),
    completed: false,
  };
}

/**
 * Check if a unit test can be taken (prerequisites met)
 * @param completedUnits array of unit IDs that have been passed
 * @param targetUnit the unit trying to take the test for
 */
export function canTakeUnitTest(completedUnits: number[], targetUnit: number): boolean {
  // Unit 1 is always available
  if (targetUnit === 1) return true;

  // Other units require the previous unit to be completed
  return completedUnits.includes(targetUnit - 1);
}

/**
 * Get lessons in a unit.
 *
 * Derived from the authored lessons, not a hardcoded table. The table this
 * replaced listed lessons 5–14, none of which exist.
 */
export function getLessonsInUnit(unitId: number): number[] {
  return AUTHORED_LESSONS.filter((l) => l.unitId === unitId).map((l) => l.id);
}

/**
 * Check if all lessons in a unit are completed.
 *
 * A unit with no lessons is not complete — `every` on an empty list is true,
 * which would unlock a test for a unit that has not been written.
 */
export function isUnitComplete(unitId: number, completedLessons: number[]): boolean {
  const unitLessons = getLessonsInUnit(unitId);
  if (unitLessons.length === 0) return false;
  return unitLessons.every((id) => completedLessons.includes(id));
}

/**
 * Spaced review scheduling — returns when a word/item should next be reviewed
 * Per Phase 1.4: use fixed intervals (not expanding schedules)
 *
 * @param lastReviewDate timestamp of last review
 * @param reviewCount how many times this item has been reviewed
 * @returns timestamp when next review is due
 */
export function getNextReviewDate(lastReviewDate: number, reviewCount: number): number {
  // Fixed intervals (in days): 1, 3, 7, 14, 30, 60, 90
  const intervals = [1, 3, 7, 14, 30, 60, 90];
  const daysUntilNext = intervals[Math.min(reviewCount, intervals.length - 1)];
  const nextDate = new Date(lastReviewDate);
  nextDate.setDate(nextDate.getDate() + daysUntilNext);
  return nextDate.getTime();
}

/**
 * Items due for review
 * @param srsItems map of item IDs to their review state
 * @returns array of item IDs that are due for review now
 */
export function getItemsDueForReview(
  srsItems: Record<
    string,
    { nextReview: number; interval: number; easeFactor: number }
  >
): string[] {
  const now = Date.now();
  return Object.entries(srsItems)
    .filter(([, state]) => state.nextReview <= now)
    .map(([itemId]) => itemId);
}
