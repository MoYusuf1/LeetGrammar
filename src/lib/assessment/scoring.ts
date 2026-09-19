/**
 * SCORING — grading a unit test against the mastery criterion.
 *
 * `gradeUnitTest()` is the entry point: it grades a learner's responses with
 * the same `isAnswerCorrect()` the lesson player uses, scores each objective
 * separately, and returns both the overall pass/fail at 85% and the list of
 * objectives to send back through correctives.
 *
 * Two things this module deliberately does not do:
 *   • It does not grade anything by itself. Grading lives in lib/grading.ts and
 *     is tested there; duplicating it here is how the two would drift.
 *   • It does not invent outcome evidence. `outcomeScores` is derived from the
 *     same graded items, mapped through the outcome's declared objectives.
 */

import type { PracticeExercise } from '@/data/types';
import { isAnswerCorrect } from '@/lib/grading';
import { COURSE_OUTCOMES } from '@/data/course-outcomes';

export const MASTERY_THRESHOLD = 0.85; // 85% to pass unit test

/**
 * Unit test result — tracks performance per objective
 */
export interface OutcomeScore {
  outcomeId: string;
  canDo: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface UnitTestResult {
  unitId: number;
  score: number; // 0–1
  percentage: number; // 0–100
  passed: boolean; // >= 85%
  totalItems: number;
  correctItems: number;
  failedObjectives: string[]; // Objectives where score < 85%
  outcomeScores: OutcomeScore[]; // Can-do evidence, derived from the same graded items
  timestamp: number;
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

  const outcomeScores: OutcomeScore[] = COURSE_OUTCOMES.map((outcome) => {
    const scores = [...itemScores.entries()].filter(([objective]) => outcome.objectiveIds.includes(objective));
    const total = scores.reduce((sum, [, value]) => sum + value.total, 0);
    const correct = scores.reduce((sum, [, value]) => sum + value.correct, 0);
    return { outcomeId: outcome.id, canDo: outcome.canDo, correct, total, percentage: total ? Math.round((correct / total) * 100) : 0 };
  }).filter((score) => score.total > 0);

  return {
    unitId,
    score,
    percentage,
    passed,
    totalItems: totalCount,
    correctItems: correctCount,
    failedObjectives,
    outcomeScores,
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
