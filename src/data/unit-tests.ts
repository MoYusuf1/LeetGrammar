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

import type { PracticeExercise, TestBank, Unit } from './types';
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

/**
 * The actual test a learner sits: this unit's bank, plus carried-back items
 * from every earlier unit.
 *
 * WHY THIS IS NOT JUST THE BANK. A unit test that only asks about its own unit
 * is not cumulative, and cumulative retrieval is one of only two techniques
 * COURSE_DESIGN §1.2–1.3 rates "high utility". Unit 2's bank tested zero Unit 1
 * objectives before this existed, which quietly violated design rule `A4`.
 *
 * Composing rather than authoring carry-back items is deliberate:
 *
 *   • It costs nothing per unit and cannot be forgotten. The alternative —
 *     asking each author to remember to write carry-back items — is advice,
 *     and this project's postmortem is about what advice produces.
 *   • The items are already registry-verified and already machine-gradable.
 *   • It scales: Unit 4 will carry back from 1, 2 and 3 with no new code.
 *
 * **One item per earlier objective**, so carry-back spreads across everything
 * previously taught rather than over-sampling one lesson, capped so the test
 * stays inside the ~25–30 items §3.2 asks for. Selection is deterministic: the
 * first bank item testing that objective, in bank order. A randomised test
 * cannot be verified, and a learner retaking it should meet the same gaps.
 *
 * Carry-back items come last. Interleaving them would read as disorganised;
 * this way the test moves from "what you just learned" to "what you still
 * remember", which is also the order the two feel different in.
 */
export function composeUnitTest(unitId: number, maxCarryBack = 13): PracticeExercise[] {
  const own = getUnitTest(unitId)?.items ?? [];
  if (!own.length) return [];

  const earlier = UNITS.filter((u) => u.id < unitId).map((u) => u.id);
  const seen = new Set(own.map((i) => i.id));
  const carried: PracticeExercise[] = [];

  for (const priorId of earlier) {
    const bank = getUnitTest(priorId)?.items ?? [];
    for (const objective of getUnitObjectives(priorId)) {
      if (carried.length >= maxCarryBack) break;
      const item = bank.find((i) => i.objectiveIds.includes(objective) && !seen.has(i.id));
      if (!item) continue;
      seen.add(item.id);
      carried.push(item);
    }
  }

  return [...own, ...carried];
}

