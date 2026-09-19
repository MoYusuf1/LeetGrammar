/**
 * UNIT HELPERS — which lessons make a unit, and when its test unlocks.
 *
 * Unit membership is derived from the lessons themselves, not a hardcoded
 * table, so a unit cannot claim lessons that have not been written. The table
 * this replaced listed lessons 5–14, none of which exist.
 */

import { AUTHORED_LESSONS } from '@/data/authored-lessons';

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
