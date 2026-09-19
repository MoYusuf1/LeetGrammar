/**
 * ATTEMPT HISTORY — the per-prompt record homework ranking reads.
 *
 * Every graded retrieval — in a lesson, in homework, anywhere — records
 * attempts and misses per prompt into `exerciseProgress` in the progress
 * store, and that record syncs with the account. Until homework read it, that
 * history was written and never used: a learner who had missed a form four
 * times got the same rotation as one who had never missed it. Error-driven
 * repetition is the oldest finding in the retrieval literature — the items
 * you fail are exactly the items worth re-testing.
 */

import type { PracticeExercise } from '../../data/types';

/**
 * The slice of the progress store's per-prompt history this module reads.
 * Declared structurally rather than imported from `stores/progress-store.ts`
 * so `validate-course.mjs` can import this module chain under Node's type
 * stripping without pulling in zustand. `Record<string, ExerciseProgress>`
 * satisfies it.
 */
export interface AttemptRecord {
  misses: number;
  lastAttemptAt: string;
}
export type AttemptHistory = Record<string, AttemptRecord>;

/**
 * Missed prompts first, then everything else in its existing order.
 *
 * A stable sort, so within "never missed" the caller's ordering (production
 * weight, due order) is untouched — a miss is the only thing that outranks
 * them. Among missed prompts: more misses first, then the longest since the
 * last attempt, so the form decaying longest leads. Deterministic, which the
 * attempt-rotation tests rely on.
 */
export function missedFirst(items: PracticeExercise[], history: AttemptHistory): PracticeExercise[] {
  if (!history || Object.keys(history).length === 0) return items;
  const key = (id: string): [number, number, string] => {
    const h = history[id];
    return h && h.misses > 0 ? [0, -h.misses, h.lastAttemptAt] : [1, 0, ''];
  };
  return [...items].sort((a, b) => {
    const ka = key(a.id);
    const kb = key(b.id);
    if (ka[0] !== kb[0]) return ka[0] - kb[0];
    if (ka[1] !== kb[1]) return ka[1] - kb[1];
    return ka[2] < kb[2] ? -1 : ka[2] > kb[2] ? 1 : 0;
  });
}
