import type { UserProgress } from '@/stores/progress-store';

export type StoredProgress = UserProgress & { schemaVersion: 7; updatedAt: string };

export const progressKeys: (keyof UserProgress)[] = [
  'completedLessons', 'streak', 'lastStudyDate', 'practiceScores', 'activityLog',
  'lessonCardPositions', 'unitTestResults', 'reviewSchedule',
];

export function snapshotProgress(state: UserProgress): UserProgress {
  return Object.fromEntries(progressKeys.map((key) => [key, state[key]])) as unknown as UserProgress;
}

export function mergeProgress(local: UserProgress, remote?: Partial<UserProgress>): UserProgress {
  if (!remote) return snapshotProgress(local);
  const unitIds = new Set([...Object.keys(local.unitTestResults ?? {}), ...Object.keys(remote.unitTestResults ?? {})]);
  const unitTestResults = Object.fromEntries([...unitIds].flatMap((id) => {
    const a = local.unitTestResults?.[Number(id)];
    const b = remote.unitTestResults?.[Number(id)];
    if (!a && b) return [[id, b]];
    if (!b && a) return [[id, a]];
    if (!a || !b) return [];
    const newest = b.attempts >= a.attempts ? b : a;
    return [[id, {
      ...newest,
      attempts: Math.max(a.attempts, b.attempts),
      bestPercentage: Math.max(a.bestPercentage, b.bestPercentage),
      passed: a.passed || b.passed,
    }]];
  })) as Record<number, import('@/stores/progress-store').UnitTestRecord>;
  return {
    completedLessons: [...new Set([...(local.completedLessons ?? []), ...(remote.completedLessons ?? [])])].sort((a,b) => a-b),
    streak: Math.max(local.streak ?? 0, remote.streak ?? 0),
    lastStudyDate: [local.lastStudyDate ?? '', remote.lastStudyDate ?? ''].sort().at(-1) ?? '',
    practiceScores: Object.fromEntries([...new Set([...Object.keys(local.practiceScores ?? {}), ...Object.keys(remote.practiceScores ?? {})])].map((id) => [id, Math.max(local.practiceScores?.[Number(id)] ?? 0, remote.practiceScores?.[Number(id)] ?? 0)])),
    activityLog: [...new Set([...(local.activityLog ?? []), ...(remote.activityLog ?? [])])].sort(),
    lessonCardPositions: { ...(remote.lessonCardPositions ?? {}), ...(local.lessonCardPositions ?? {}) },
    unitTestResults,
    reviewSchedule: { ...(remote.reviewSchedule ?? {}), ...(local.reviewSchedule ?? {}) },
  };
}
