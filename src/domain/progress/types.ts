import type { UnitTestResult } from '@/lib/assessment';
import type { ReviewSchedule } from '@/lib/review';

export interface UnitTestRecord {
  unitId: number;
  attempts: number;
  bestPercentage: number;
  passed: boolean;
  last: UnitTestResult;
}

export interface ExerciseProgress {
  attempts: number;
  correct: number;
  misses: number;
  lastAttemptAt: string;
}

/** Persisted learner state. Functions and UI-only state never cross this boundary. */
export interface UserProgress {
  completedLessons: number[];
  streak: number;
  lastStudyDate: string;
  practiceScores: Record<number, number>;
  activityLog: string[];
  lessonCardPositions: Record<number, number>;
  unitTestResults: Record<number, UnitTestRecord>;
  reviewSchedule: ReviewSchedule;
  exerciseProgress: Record<string, ExerciseProgress>;
}

export const defaultProgress: UserProgress = {
  completedLessons: [],
  streak: 0,
  lastStudyDate: '',
  practiceScores: {},
  activityLog: [],
  lessonCardPositions: {},
  unitTestResults: {},
  reviewSchedule: {},
  exerciseProgress: {},
};
