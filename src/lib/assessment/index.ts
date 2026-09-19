/**
 * ASSESSMENT ENGINE — mastery gating, correctives, unit membership.
 *
 * Wired to the unit test banks (src/data/unit-tests.ts) and driven by
 * src/pages/UnitTest.tsx. The module splits along its three jobs:
 *
 *   scoring.ts      grading a test against the 85% mastery criterion
 *   correctives.ts  the targeted retest after a failed objective
 *   units.ts        which lessons make a unit, and when its test unlocks
 *
 * Spaced review is *not* here: it is the cross-cutting layer and lives in
 * lib/review.ts, including the interval ladder (`getNextReviewDate`) that used
 * to squat at the bottom of this file. The old SM-2-era `getItemsDueForReview`
 * had no callers and is deleted — the real SM-2 implementation went with
 * lib/srs.ts.
 */

export * from './scoring';
export * from './correctives';
export * from './units';
