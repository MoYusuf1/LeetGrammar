/**
 * ASSESSMENT ENGINE — mastery gating, correctives, spaced review.
 *
 * ⚠️ NOT WIRED IN. This module currently has zero importers: no UI calls
 * scoreUnitTest(), no unit test exists to score, and nothing reads the review
 * schedule. It is retained because the logic is sound and self-contained, and
 * because building the unit test (the next content job) needs it.
 *
 * Do not treat its presence as evidence the course has assessment. It does not.
 * Either wire it to a real test bank or delete it — an engine with no callers
 * that looks finished is how the rest of this codebase went wrong.
 */

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
  itemsToRetest: number; // Usually 3–5 items per objective
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
 * Generate correctives session for failed objectives
 * After a unit test failure, user gets a targeted retests on only the failed objectives.
 *
 * @param unitId unit that was failed
 * @param failedObjectives which objectives to remediate
 * @param itemsPerObjective how many items to give per objective (default 3)
 */
export function generateCorrectivesSession(
  unitId: number,
  failedObjectives: string[],
  itemsPerObjective: number = 3
): CorrectivesSession {
  return {
    unitId,
    failedObjectives,
    itemsToRetest: failedObjectives.length * itemsPerObjective,
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
 * Get lessons in a unit (for prerequisites)
 */
export function getLessonsInUnit(unitId: number): number[] {
  const lessonsPerUnit: Record<number, number[]> = {
    1: [1, 2, 3, 4],
    2: [5, 6, 7, 8],
    3: [9, 10, 11],
    4: [12, 13, 14],
  };
  return lessonsPerUnit[unitId] || [];
}

/**
 * Check if all lessons in a unit are completed
 */
export function isUnitComplete(unitId: number, completedLessons: number[]): boolean {
  const unitLessons = getLessonsInUnit(unitId);
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
