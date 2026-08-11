/**
 * UNIT REGISTRY — which units exist, what they are called, and which test
 * bank belongs to each.
 *
 * This file holds no item content. Each unit's questions live in their own
 * file under `unit-banks/`, so a bank can grow without this module growing
 * with it.
 *
 * ── ADDING A UNIT ────────────────────────────────────────────────────────
 * 1. Author the lessons in `authored-lessons.ts` with the new `unitId`.
 * 2. Create `unit-banks/unit-N.ts` exporting `UNIT_N_TEST: TestBank`.
 * 3. Add the import and two entries below — `UNIT_NAMES` and `TEST_BANKS`.
 * That is the whole procedure. Nothing in the UI needs touching: the lessons
 * page, unlock gating and progress all derive from `UNITS`.
 *
 * `UNITS` is derived from the lessons themselves, never hand-written, so a
 * unit cannot appear in the UI before its lessons exist — and a lesson cannot
 * be orphaned from its unit. Validator checks U0/U5 enforce the rest.
 */

import type { TestBank, Unit } from './types';
// Explicit .ts extension and a relative path, both required: validate-course.mjs
// imports this module directly under Node's native type stripping, which will
// not resolve an extensionless specifier or the `@/` alias. See WORKING_AGREEMENT.
import { AUTHORED_LESSONS } from './authored-lessons.ts';
import { UNIT_1_TEST } from './unit-banks/unit-1.ts';
import { UNIT_2_TEST } from './unit-banks/unit-2.ts';

export { UNIT_1_TEST, UNIT_2_TEST };

/** Every bank that exists. A unit with no bank simply has no test. */
export const TEST_BANKS: TestBank[] = [UNIT_1_TEST, UNIT_2_TEST];

/** Unit names are editorial; membership is derived from the lessons themselves. */
const UNIT_NAMES: Record<number, string> = {
  1: 'Filling the WHO box',
  2: 'Assembling the shape',
};

/**
 * The units that actually contain lessons — derived, so a unit cannot appear
 * in the UI before its lessons are written.
 */
export const UNITS: Unit[] = [...new Set(AUTHORED_LESSONS.map((l) => l.unitId))]
  .sort((a, b) => a - b)
  .map((id) => ({
    id,
    // Empty rather than a `Unit N` placeholder: the UI already prints the
    // number, so a fallback name rendered as "Unit 2: Unit 2". Check U5 warns
    // when a unit reaches the UI without a real name.
    name: UNIT_NAMES[id] ?? '',
    lessonIds: AUTHORED_LESSONS.filter((l) => l.unitId === id).map((l) => l.id),
    testBankId: `unit-${id}-test`,
  }));

export function getUnit(unitId: number): Unit | undefined {
  return UNITS.find((u) => u.id === unitId);
}

/** The bank for a unit, or undefined if that unit has no test written yet. */
export function getUnitTest(unitId: number): TestBank | undefined {
  return TEST_BANKS.find((b) => b.id === `unit-${unitId}-test`);
}

/** Objectives a unit's test covers, in lesson order. */
export function getUnitObjectives(unitId: number): string[] {
  return AUTHORED_LESSONS.filter((l) => l.unitId === unitId).flatMap((l) => l.objectives);
}

