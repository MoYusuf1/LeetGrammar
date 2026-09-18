import { describe, expect, it } from 'vitest';
import { mergeProgress } from '@/lib/progress-sync';
import type { UserProgress } from '@/stores/progress-store';
const base = (over: Partial<UserProgress> = {}): UserProgress => ({ completedLessons: [], streak: 0, lastStudyDate: '', practiceScores: {}, activityLog: [], lessonCardPositions: {}, unitTestResults: {}, reviewSchedule: {}, ...over });
describe('first sign-in progress merge', () => {
  it('preserves completions, best practice scores, and activity from both devices', () => {
    const merged = mergeProgress(base({ completedLessons:[1], practiceScores:{1:70}, activityLog:['2026-09-17'] }), base({ completedLessons:[2], practiceScores:{1:90}, activityLog:['2026-09-18'] }));
    expect(merged.completedLessons).toEqual([1,2]); expect(merged.practiceScores[1]).toBe(90); expect(merged.activityLog).toEqual(['2026-09-17','2026-09-18']);
  });
  it('never lowers a unit-test best score', () => {
    const result = (percentage:number, timestamp:number) => ({ unitId:1, attempts:1, bestPercentage:percentage, passed:percentage>=85, last:{ unitId:1, score:percentage/100, percentage, passed:percentage>=85, totalItems:10, correctItems:percentage/10, failedObjectives:[], timestamp } });
    const merged = mergeProgress(base({unitTestResults:{1:result(92,1)}}), base({unitTestResults:{1:result(60,2)}}));
    expect(merged.unitTestResults[1].bestPercentage).toBe(92); expect(merged.unitTestResults[1].passed).toBe(true);
  });
});
