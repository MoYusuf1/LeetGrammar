/**
 * Zustand store for user progress + SRS (Spaced Repetition).
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SrsCard } from '@/lib/srs';
import { createCard, reviewCard } from '@/lib/srs';
import { MAX_LESSON_ID } from '@/data/authored-lessons';
import type { UnitTestResult } from '@/lib/assessment';

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
  xp: number;
  practiceScores: Record<number, number>;
  srsCards: Record<string, SrsCard>;
  activityLog: string[]; // Array of YYYY-MM-DD strings
  dailyGoal: number; // XP target per day (15, 30, or 50)

  // Lesson card positions (resume where you left off)
  lessonCardPositions: Record<number, number>;

  // Unit test results, keyed by unit id
  unitTestResults: Record<number, UnitTestRecord>;
}

const defaultProgress: UserProgress = {
  completedLessons: [],
  streak: 0,
  lastStudyDate: '',
  xp: 0,
  practiceScores: {},
  srsCards: {},
  activityLog: [],
  dailyGoal: 30,
  lessonCardPositions: {},
  unitTestResults: {},
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
  getLessonStatus: (lessonId: number) => 'completed' | 'current' | 'locked';
  recordPracticeScore: (lessonId: number, score: number) => void;
  resetProgress: () => void;
  isTopicCompleted: (lessonIds: number[]) => boolean;
  getTopicStatus: (lessonIds: number[]) => 'completed' | 'in-progress' | 'locked';
  getTopicProgress: (lessonIds: number[]) => { completed: number; total: number };
  arePrerequisitesMet: (prereqLessonIds: number[]) => boolean;
  completionPercentage: number;

  // SRS
  reviewConcept: (conceptId: string, quality: number) => void;
  getSrsCard: (conceptId: string) => SrsCard | undefined;
  initSrsCard: (conceptId: string) => void;

  // Lesson card positions (resume where you left off)
  setLessonCardPosition: (lessonId: number, cardIndex: number) => void;
  getLessonCardPosition: (lessonId: number) => number;
  clearLessonCardPosition: (lessonId: number) => void;

  // Unit tests
  recordUnitTestResult: (result: UnitTestResult) => void;
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
            xp: state.xp + 10,
          });
        });
      },

      isLessonCompleted: (lessonId: number) => {
        return get().completedLessons.includes(lessonId);
      },

      getLessonStatus: (lessonId: number) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return 'completed';
        return 'current';
      },

      recordPracticeScore: (lessonId: number, score: number) => {
        set((state) => {
          const existing = state.practiceScores[lessonId] || 0;
          const bonus = score > existing ? (score - existing) * 5 : 0;
          return addActivity({
            ...state,
            practiceScores: {
              ...state.practiceScores,
              [lessonId]: Math.max(score, existing),
            },
            xp: state.xp + bonus,
            lastStudyDate: getToday(),
          });
        });
      },

      resetProgress: () => {
        set({ ...defaultProgress });
      },

      isTopicCompleted: (lessonIds: number[]) => {
        return lessonIds.every((id) => get().completedLessons.includes(id));
      },

      getTopicStatus: (lessonIds: number[]): 'completed' | 'in-progress' | 'locked' => {
        const state = get();
        const allCompleted = lessonIds.every((id) => state.completedLessons.includes(id));
        if (allCompleted) return 'completed';
        const someCompleted = lessonIds.some((id) => state.completedLessons.includes(id));
        if (someCompleted) return 'in-progress';
        return 'locked';
      },

      getTopicProgress: (lessonIds: number[]) => {
        const completed = lessonIds.filter((id) =>
          get().completedLessons.includes(id)
        ).length;
        return { completed, total: lessonIds.length };
      },

      arePrerequisitesMet: (prereqLessonIds: number[]) => {
        return prereqLessonIds.every((id) => get().completedLessons.includes(id));
      },

      get completionPercentage() {
        return Math.round((get().completedLessons.length / MAX_LESSON_ID) * 100);
      },

      // SRS
      reviewConcept: (conceptId: string, quality: number) => {
        set((state) => {
          const existing = state.srsCards[conceptId];
          const card = existing ? reviewCard(existing, quality) : reviewCard(createCard(conceptId), quality);
          return addActivity({
            ...state,
            srsCards: { ...state.srsCards, [conceptId]: card },
            lastStudyDate: getToday(),
            xp: state.xp + quality * 2,
          });
        });
      },

      getSrsCard: (conceptId: string) => {
        return get().srsCards[conceptId];
      },

      initSrsCard: (conceptId: string) => {
        set((state) => {
          if (state.srsCards[conceptId]) return state;
          return {
            ...state,
            srsCards: { ...state.srsCards, [conceptId]: createCard(conceptId) },
          };
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

      // Unit tests — a pass is worth XP once; retries never lower a best score.
      recordUnitTestResult: (result: UnitTestResult) => {
        set((state) => {
          const results = state.unitTestResults ?? {};
          const previous = results[result.unitId];
          const firstPass = result.passed && !previous?.passed;
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
            xp: state.xp + (firstPass ? 25 : 0),
            lastStudyDate: getToday(),
          });
        });
      },

      getUnitTestRecord: (unitId: number) => (get().unitTestResults ?? {})[unitId],
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        streak: state.streak,
        lastStudyDate: state.lastStudyDate,
        xp: state.xp,
        practiceScores: state.practiceScores,
        srsCards: state.srsCards,
        activityLog: state.activityLog,
        dailyGoal: state.dailyGoal,
        lessonCardPositions: state.lessonCardPositions,
        unitTestResults: state.unitTestResults,
      }),
    }
  )
);
