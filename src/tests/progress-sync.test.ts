import { describe, expect, it } from 'vitest';
import {
  mergeActivityLog,
  mergeCompletedLessons,
  mergeExerciseProgress,
  mergeExerciseRecord,
  mergeLastStudyDate,
  mergeLessonCardPositions,
  mergePracticeScores,
  mergeProgress,
  mergeReviewSchedule,
  mergeStreak,
  mergeUnitTestRecord,
  mergeUnitTestResults,
  snapshotProgress,
} from '@/lib/progress-sync';
import type { ExerciseProgress, UnitTestRecord, UserProgress } from '@/stores/progress-store';

const base = (over: Partial<UserProgress> = {}): UserProgress => ({ completedLessons: [], streak: 0, lastStudyDate: '', practiceScores: {}, activityLog: [], lessonCardPositions: {}, unitTestResults: {}, reviewSchedule: {}, exerciseProgress: {}, ...over });

const record = (percentage: number, timestamp: number, attempts = 1): UnitTestRecord => ({
  unitId: 1, attempts, bestPercentage: percentage, passed: percentage >= 85,
  last: { unitId: 1, score: percentage / 100, percentage, passed: percentage >= 85, totalItems: 10, correctItems: percentage / 10, failedObjectives: [], outcomeScores: [], timestamp },
});

describe('first sign-in progress merge', () => {
  it('preserves completions, best practice scores, and activity from both devices', () => {
    const merged = mergeProgress(base({ completedLessons:[1], practiceScores:{1:70}, activityLog:['2026-09-17'] }), base({ completedLessons:[2], practiceScores:{1:90}, activityLog:['2026-09-18'] }));
    expect(merged.completedLessons).toEqual([1,2]); expect(merged.practiceScores[1]).toBe(90); expect(merged.activityLog).toEqual(['2026-09-17','2026-09-18']);
  });
  it('keeps retrieval misses from either device', () => {
    const merged = mergeProgress(base({ exerciseProgress:{'l1-n1':{attempts:2,correct:1,misses:1,lastAttemptAt:'2026-09-17'}} }), base({ exerciseProgress:{'l1-n1':{attempts:3,correct:1,misses:2,lastAttemptAt:'2026-09-18'}} }));
    expect(merged.exerciseProgress['l1-n1']).toEqual({attempts:3,correct:1,misses:2,lastAttemptAt:'2026-09-18'});
  });
  it('never lowers a unit-test best score', () => {
    const merged = mergeProgress(base({unitTestResults:{1:record(92,1)}}), base({unitTestResults:{1:record(60,2)}}));
    expect(merged.unitTestResults[1].bestPercentage).toBe(92); expect(merged.unitTestResults[1].passed).toBe(true);
  });
});

// Each field below names the merge rule it owns. These tests exist because the
// rules used to live inside one dense function where a per-field regression
// could hide behind a green whole-merge test.

describe('per-field merge rules', () => {
  it('mergeCompletedLessons unions and sorts both sides', () => {
    expect(mergeCompletedLessons([3, 1], [2, 3])).toEqual([1, 2, 3]);
    expect(mergeCompletedLessons(undefined, [2])).toEqual([2]);
  });
  it('mergeStreak keeps the better streak from either device', () => {
    expect(mergeStreak(5, 2)).toBe(5);
    expect(mergeStreak(2, 5)).toBe(5);
    expect(mergeStreak(undefined, undefined)).toBe(0);
  });
  it('mergeLastStudyDate keeps the later calendar date', () => {
    expect(mergeLastStudyDate('2026-09-17', '2026-09-18')).toBe('2026-09-18');
    expect(mergeLastStudyDate('2026-09-18', '')).toBe('2026-09-18');
    expect(mergeLastStudyDate('', '')).toBe('');
  });
  it('mergePracticeScores keeps the per-lesson best across devices', () => {
    expect(mergePracticeScores({ 1: 70, 2: 50 }, { 1: 90, 3: 80 })).toEqual({ 1: 90, 2: 50, 3: 80 });
  });
  it('mergeActivityLog unions days without duplicates', () => {
    expect(mergeActivityLog(['2026-09-18', '2026-09-17'], ['2026-09-18', '2026-09-19']))
      .toEqual(['2026-09-17', '2026-09-18', '2026-09-19']);
  });
  it('mergeLessonCardPositions lets this device resume where it stopped', () => {
    expect(mergeLessonCardPositions({ 1: 4, 2: 1 }, { 1: 2, 3: 5 })).toEqual({ 1: 4, 2: 1, 3: 5 });
  });
  it('mergeReviewSchedule lets this device keep its own schedule', () => {
    const local = { 1: { lessonId: 1, reviewCount: 2, lastReview: 10, nextReview: 20 } };
    const remote = { 1: { lessonId: 1, reviewCount: 1, lastReview: 5, nextReview: 15 }, 2: { lessonId: 2, reviewCount: 0, lastReview: 1, nextReview: 2 } };
    expect(mergeReviewSchedule(local, remote)).toEqual({ 1: local[1], 2: remote[2] });
  });
});

describe('unit test record merge', () => {
  it('carries units that exist on only one side', () => {
    expect(mergeUnitTestResults({ 1: record(92, 1) }, { 2: { ...record(70, 2), unitId: 2 } }))
      .toEqual({ 1: record(92, 1), 2: { ...record(70, 2), unitId: 2 } });
  });
  it('keeps max attempts, best score, and any pass; last comes from the newer series', () => {
    const older = record(92, 1, 3);
    const newer = record(60, 2, 4);
    const merged = mergeUnitTestRecord(older, newer);
    expect(merged.attempts).toBe(4);
    expect(merged.bestPercentage).toBe(92);
    expect(merged.passed).toBe(true);
    expect(merged.last.timestamp).toBe(2);
  });
  it('a pass on one device survives a failing series on the other', () => {
    const merged = mergeUnitTestRecord(record(40, 1, 5), record(90, 2, 2));
    expect(merged.passed).toBe(true);
    expect(merged.bestPercentage).toBe(90);
  });
});

describe('exercise progress merge', () => {
  const p = (attempts: number, correct: number, misses: number, at: string): ExerciseProgress =>
    ({ attempts, correct, misses, lastAttemptAt: at });
  it('keeps max counts and the freshest timestamp per prompt', () => {
    expect(mergeExerciseRecord(p(4, 3, 1, '2026-09-17'), p(2, 1, 1, '2026-09-18')))
      .toEqual({ attempts: 4, correct: 3, misses: 1, lastAttemptAt: '2026-09-18' });
  });
  it('carries prompts that exist on only one device', () => {
    expect(mergeExerciseProgress({ a: p(1, 1, 0, 'x') }, { b: p(2, 0, 2, 'y') }))
      .toEqual({ a: p(1, 1, 0, 'x'), b: p(2, 0, 2, 'y') });
  });
});

describe('mergeProgress without a remote document', () => {
  it('returns a snapshot containing only the synced keys', () => {
    const state = base({ completedLessons: [2, 1] }) as UserProgress & { extraStoreField: string };
    state.extraStoreField = 'not synced';
    const merged = mergeProgress(state, undefined);
    expect(merged).toEqual(snapshotProgress(state));
    expect('extraStoreField' in merged).toBe(false);
  });
});
