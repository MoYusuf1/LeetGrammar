/**
 * PROGRESS SYNC — snapshotting and merging learner progress across devices.
 *
 * The store keeps one user's progress locally; Firestore keeps the account
 * copy. On sign-in the two meet and must become one. The rules here are the
 * whole contract: every field says, for itself, what "one" means. Nothing
 * about React or Firebase lives in this file — the wiring that calls it is
 * `lib/sync-engine.ts`, and the React shell around that is
 * `contexts/AuthSyncContext.tsx`.
 *
 * Each field merges by the rule that loses the least:
 *
 *   completedLessons    union — a lesson finished on either device is finished
 *   streak              max — a streak cannot be recomputed, so keep the best
 *   lastStudyDate       latest calendar date
 *   practiceScores      per-lesson max — retries never lower a best score
 *   activityLog         union of days
 *   lessonCardPositions local wins — you resume where *this* device left off
 *   unitTestResults     per unit: newest record, best score kept, pass sticks
 *   reviewSchedule      local wins — same reason as card positions
 *   exerciseProgress    per prompt: max counts, most recent attempt time
 *
 * Merge results must be deterministic: two devices merging the same pair of
 * snapshots in either order converge on the same state, or sync is a coin
 * flip. Every rule below is order-independent in its inputs.
 */

import type { ExerciseProgress, UnitTestRecord, UserProgress } from '@/stores/progress-store';

export type StoredProgress = UserProgress & { schemaVersion: 8; updatedAt: string };

export const progressKeys: (keyof UserProgress)[] = [
  'completedLessons', 'streak', 'lastStudyDate', 'practiceScores', 'activityLog',
  'lessonCardPositions', 'unitTestResults', 'reviewSchedule', 'exerciseProgress',
];

export function snapshotProgress(state: UserProgress): UserProgress {
  return Object.fromEntries(progressKeys.map((key) => [key, state[key]])) as unknown as UserProgress;
}

/** A lesson finished anywhere is finished. */
export function mergeCompletedLessons(local: number[] = [], remote: number[] = []): number[] {
  return [...new Set([...local, ...remote])].sort((a, b) => a - b);
}

/** A streak is history, not state: it cannot be recomputed, so keep the best. */
export function mergeStreak(local = 0, remote = 0): number {
  return Math.max(local, remote);
}

/** The later calendar date. ISO dates sort lexicographically. */
export function mergeLastStudyDate(local = '', remote = ''): string {
  return [local, remote].sort().at(-1) ?? '';
}

/** Best score per lesson; a retry never lowers it. */
export function mergePracticeScores(
  local: Record<number, number> = {},
  remote: Record<number, number> = {},
): Record<number, number> {
  const ids = new Set([...Object.keys(local), ...Object.keys(remote)]);
  return Object.fromEntries(
    [...ids].map((id) => [id, Math.max(local[Number(id)] ?? 0, remote[Number(id)] ?? 0)]),
  );
}

/** Every day either device studied. */
export function mergeActivityLog(local: string[] = [], remote: string[] = []): string[] {
  return [...new Set([...local, ...remote])].sort();
}

/**
 * Local wins: a card position is where *this* device stopped reading, and the
 * next session starts here.
 */
export function mergeLessonCardPositions(
  local: Record<number, number> = {},
  remote: Record<number, number> = {},
): Record<number, number> {
  return { ...remote, ...local };
}

/**
 * One unit's record from two devices. The newest attempt series (tie: the
 * remote, which is the account's own record) supplies `last` for correctives;
 * the best result and the pass flag are kept from whichever side earned them.
 */
export function mergeUnitTestRecord(a: UnitTestRecord, b: UnitTestRecord): UnitTestRecord {
  const newest = b.attempts >= a.attempts ? b : a;
  return {
    ...newest,
    attempts: Math.max(a.attempts, b.attempts),
    bestPercentage: Math.max(a.bestPercentage, b.bestPercentage),
    passed: a.passed || b.passed,
  };
}

export function mergeUnitTestResults(
  local: Record<number, UnitTestRecord> = {},
  remote: Record<number, UnitTestRecord> = {},
): Record<number, UnitTestRecord> {
  const unitIds = new Set([...Object.keys(local), ...Object.keys(remote)]);
  return Object.fromEntries(
    [...unitIds].flatMap((id) => {
      const a = local[Number(id)];
      const b = remote[Number(id)];
      if (!a && b) return [[id, b]];
      if (!b && a) return [[id, a]];
      if (!a || !b) return [];
      return [[id, mergeUnitTestRecord(a, b)]];
    }),
  );
}

/** Same reason as card positions: the schedule belongs to this device. */
export function mergeReviewSchedule(
  local: UserProgress['reviewSchedule'] = {},
  remote: UserProgress['reviewSchedule'] = {},
): UserProgress['reviewSchedule'] {
  return { ...remote, ...local };
}

/**
 * One prompt's retrieval history from two devices. Attempts, correct answers
 * and misses accumulate independently per device, so take the max of each —
 * the true total is at least that — and keep the freshest timestamp.
 */
export function mergeExerciseRecord(a: ExerciseProgress, b: ExerciseProgress): ExerciseProgress {
  const newest = a.lastAttemptAt >= b.lastAttemptAt ? a : b;
  return {
    attempts: Math.max(a.attempts, b.attempts),
    correct: Math.max(a.correct, b.correct),
    misses: Math.max(a.misses, b.misses),
    lastAttemptAt: newest.lastAttemptAt,
  };
}

export function mergeExerciseProgress(
  local: Record<string, ExerciseProgress> = {},
  remote: Record<string, ExerciseProgress> = {},
): Record<string, ExerciseProgress> {
  const ids = new Set([...Object.keys(local), ...Object.keys(remote)]);
  return Object.fromEntries(
    [...ids].map((id) => {
      const a = local[id];
      const b = remote[id];
      if (!a && b) return [id, b];
      if (!b && a) return [id, a];
      if (!a || !b) throw new Error('unreachable missing exercise progress');
      return [id, mergeExerciseRecord(a, b)];
    }),
  );
}

/**
 * Merge a remote snapshot into the local one, field by field, by the rules at
 * the top of this file. With no remote document (first sign-in on a new
 * account) the local snapshot stands as it is.
 */
export function mergeProgress(local: UserProgress, remote?: Partial<UserProgress>): UserProgress {
  if (!remote) return snapshotProgress(local);
  return {
    completedLessons: mergeCompletedLessons(local.completedLessons, remote.completedLessons),
    streak: mergeStreak(local.streak, remote.streak),
    lastStudyDate: mergeLastStudyDate(local.lastStudyDate, remote.lastStudyDate),
    practiceScores: mergePracticeScores(local.practiceScores, remote.practiceScores),
    activityLog: mergeActivityLog(local.activityLog, remote.activityLog),
    lessonCardPositions: mergeLessonCardPositions(local.lessonCardPositions, remote.lessonCardPositions),
    unitTestResults: mergeUnitTestResults(local.unitTestResults, remote.unitTestResults),
    reviewSchedule: mergeReviewSchedule(local.reviewSchedule, remote.reviewSchedule),
    exerciseProgress: mergeExerciseProgress(local.exerciseProgress, remote.exerciseProgress),
  };
}
