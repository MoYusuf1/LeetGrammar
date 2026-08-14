/**
 * Zustand store for learner progress.
 *
 * WHAT IS NOT HERE ANY MORE. It used to carry an SM-2 spaced-repetition engine
 * (`srsCards`, `reviewConcept`, `getSrsCard`, `initSrsCard`, backed by
 * `lib/srs.ts`), an XP counter, a daily goal, and topic/prerequisite helpers
 * for a lesson graph that no longer exists. None of it had a caller. Spaced
 * review uses the fixed intervals in `lib/review.ts` instead — §1.4 found
 * expanding schedules no better and more expensive, and SM-2 needs a per-item
 * quality rating this course never collects.
 *
 * `streak`, `lastStudyDate` and `activityLog` are kept despite having no UI
 * today, on a different principle: they are *history*, and a streak cannot be
 * recomputed later from anything else. Dead code goes; cheap accumulated
 * record stays.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UnitTestResult } from '@/lib/assessment';
import { seedReview, advanceReview, type ReviewSchedule } from '@/lib/review';

const STORAGE_KEY = 'leet-somali-progress-v7';

/**
 * What a learner has done on a unit test.
 *
 * Both numbers are kept on purpose: `best` is what the learner has achieved and
 * should not be taken away by a bad retry, while `last` is what correctives has
 * to work from — the objectives missed on the most recent attempt.
 */
export interface UnitTestRecord {
  unitId: number;
  attempts: number;
  bestPercentage: number;
  passed: boolean; // has ever reached the mastery threshold
  last: UnitTestResult;
}

export interface UserProgress {
  completedLessons: number[];
  streak: number;
  lastStudyDate: string;
  practiceScores: Record<number, number>;
  activityLog: string[]; // Array of YYYY-MM-DD strings

  // Lesson card positions (resume where you left off)
  lessonCardPositions: Record<number, number>;

  // Unit test results, keyed by unit id
  unitTestResults: Record<number, UnitTestRecord>;

  /**
   * When each finished lesson is next owed a review, keyed by lesson id.
   * Seeded on completion, advanced when its homework is done. Fixed intervals
   * per §1.4 — see lib/review.ts.
   */
  reviewSchedule: ReviewSchedule;
}

const defaultProgress: UserProgress = {
  completedLessons: [],
  streak: 0,
  lastStudyDate: '',
  practiceScores: {},
  activityLog: [],
  lessonCardPositions: {},
  unitTestResults: {},
  reviewSchedule: {},
};

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  return new Date(Date.now() - 86400000).toISOString().split('T')[0];
}

function computeStreak(lastStudyDate: string, currentStreak: number): number {
  const today = getToday();
  const yesterday = getYesterday();

  if (lastStudyDate === today) return currentStreak;
  if (lastStudyDate === yesterday) return currentStreak + 1;
  return 1;
}

function addActivity(state: UserProgress): UserProgress {
  const today = getToday();
  if (!state.activityLog.includes(today)) {
    return { ...state, activityLog: [...state.activityLog, today] };
  }
  return state;
}

interface ProgressState extends UserProgress {
  completeLesson: (lessonId: number) => void;
  isLessonCompleted: (lessonId: number) => boolean;
  /** Homework score for a lesson. Kept — Homework.tsx records and shows it. */
  recordPracticeScore: (lessonId: number, score: number) => void;

  // Lesson card positions (resume where you left off)
  setLessonCardPosition: (lessonId: number, cardIndex: number) => void;
  getLessonCardPosition: (lessonId: number) => number;
  clearLessonCardPosition: (lessonId: number) => void;

  // Unit tests
  recordUnitTestResult: (result: UnitTestResult) => void;
  /** Advance a lesson to its next review interval. Called when homework is done. */
  recordLessonReviewed: (lessonId: number) => void;
  getUnitTestRecord: (unitId: number) => UnitTestRecord | undefined;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...defaultProgress,

      completeLesson: (lessonId: number) => {
        set((state) => {
          if (state.completedLessons.includes(lessonId)) {
            return addActivity({ ...state, lastStudyDate: getToday() });
          }
          const newStreak = computeStreak(state.lastStudyDate, state.streak);
          return addActivity({
            ...state,
            completedLessons: [...state.completedLessons, lessonId],
            streak: newStreak,
            lastStudyDate: getToday(),
            // Finishing a lesson puts it into the review rota. Without this the
            // schedule would only ever contain lessons someone happened to
            // revisit, which is the wrong way round.
            reviewSchedule: { ...(state.reviewSchedule ?? {}), [lessonId]: seedReview(lessonId) },
          });
        });
      },

      isLessonCompleted: (lessonId: number) => {
        return get().completedLessons.includes(lessonId);
      },

      recordPracticeScore: (lessonId: number, score: number) => {
        set((state) => {
          const existing = state.practiceScores[lessonId] || 0;
          return addActivity({
            ...state,
            practiceScores: {
              ...state.practiceScores,
              [lessonId]: Math.max(score, existing),
            },
            lastStudyDate: getToday(),
          });
        });
      },

      // Lesson card positions — resume where you left off
      setLessonCardPosition: (lessonId: number, cardIndex: number) => {
        set((state) => ({
          ...state,
          lessonCardPositions: { ...state.lessonCardPositions, [lessonId]: cardIndex },
        }));
      },

      getLessonCardPosition: (lessonId: number) => {
        return get().lessonCardPositions[lessonId] ?? 0;
      },

      clearLessonCardPosition: (lessonId: number) => {
        set((state) => {
          const updated = { ...state.lessonCardPositions };
          delete updated[lessonId];
          return { ...state, lessonCardPositions: updated };
        });
      },

      // Unit tests — retries never lower a best score.
      recordUnitTestResult: (result: UnitTestResult) => {
        set((state) => {
          const results = state.unitTestResults ?? {};
          const previous = results[result.unitId];
          const record: UnitTestRecord = {
            unitId: result.unitId,
            attempts: (previous?.attempts ?? 0) + 1,
            bestPercentage: Math.max(previous?.bestPercentage ?? 0, result.percentage),
            passed: (previous?.passed ?? false) || result.passed,
            last: result,
          };
          return addActivity({
            ...state,
            unitTestResults: { ...results, [result.unitId]: record },
            lastStudyDate: getToday(),
          });
        });
      },

      getUnitTestRecord: (unitId: number) => (get().unitTestResults ?? {})[unitId],

      recordLessonReviewed: (lessonId: number) => {
        set((state) => {
          const schedule = state.reviewSchedule ?? {};
          const entry = schedule[lessonId] ?? seedReview(lessonId);
          return addActivity({
            ...state,
            lastStudyDate: getToday(),
            reviewSchedule: { ...schedule, [lessonId]: advanceReview(entry) },
          });
        });
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        streak: state.streak,
        lastStudyDate: state.lastStudyDate,
        practiceScores: state.practiceScores,
        activityLog: state.activityLog,
        lessonCardPositions: state.lessonCardPositions,
        unitTestResults: state.unitTestResults,
        reviewSchedule: state.reviewSchedule,
      }),
    }
  )
);
