/**
 * HOMEWORK — Layer 2 of the design's three-layer assessment (COURSE_DESIGN §3.2).
 *
 * This is the layer the course went eight lessons without, and its absence was
 * the largest gap in the whole project. §1.2 rates exactly two techniques as
 * "high utility": practice testing and **distributed practice**. Layer 1
 * (in-lesson practice) and Layer 3 (the gating unit test) are both practice
 * testing. Nothing distributed anything. A learner met the `-ka`/`-ta` rule in
 * Lesson 3 and, unless they failed a unit test, might never meet it again.
 *
 * The module splits along its three jobs:
 *
 *   pool.ts     everything gradable that exists, and production-first ordering
 *   history.ts  the per-prompt attempt record, and why misses outrank everything
 *   compose.ts  assembling one session: current lesson + spaced carry-back
 *
 * MISSES OUTRANK EVERYTHING ELSE
 *
 * The schedule says *when* material should come back. The per-prompt attempt
 * history says *what* should come back first. When `history` is supplied,
 * missed prompts lead their group: most-missed first, then the longest since
 * the last attempt. Recognition and production weighting still apply *within*
 * what is owed; a miss simply outranks both. Rotation across attempts is
 * unchanged, so a retry still serves a different set rather than the same
 * ranking again.
 *
 * WHAT IT IS NOT
 *
 * It does not gate, and it is **not measurement** — the learner authors these
 * items, so an item whose answer and distractors they chose is not an effortful
 * retrieval. COURSE_DESIGN §3.2 has the full argument. The score is recorded so
 * the schedule has something to move on; it is not shown as a verdict.
 */

export * from './history.ts';
export * from './compose.ts';
