/**
 * CORRECTIVES — remediation for failed objectives.
 *
 * After failing a unit test, the learner gets a targeted retest on only the
 * failed objectives, drawn from the unit's real test bank rather than a
 * parallel set of items someone would have to source.
 */

import type { PracticeExercise } from '@/data/types';

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
