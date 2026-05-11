/**
 * Zustand store for user progress + SRS (Spaced Repetition).
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SrsCard } from '@/engine/srs';
import { createCard, reviewCard } from '@/engine/srs';

const STORAGE_KEY = 'leet-somali-progress-v7';

export interface UserProgress {
  completedLessons: number[];
  streak: number;
  lastStudyDate: string;
  xp: number;
  practiceScores: Record<number, number>;
  srsCards: Record<string, SrsCard>;
  activityLog: string[]; // Array of YYYY-MM-DD strings

  // Workbook progress
  completedWorkbookLevels: number[];
  workbookLevelScores: Record<number, number>;
}

const defaultProgress: UserProgress = {
  completedLessons: [],
  streak: 0,
  lastStudyDate: '',
  xp: 0,
  practiceScores: {},
  srsCards: {},
  activityLog: [],
  completedWorkbookLevels: [],
  workbookLevelScores: {},
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

  // Workbook
  completeWorkbookLevel: (levelId: number, score: number) => void;
  isWorkbookLevelCompleted: (levelId: number) => boolean;
  getWorkbookLevelStatus: (levelId: number) => 'available' | 'completed';
  getWorkbookLevelScore: (levelId: number) => number;
  workbookCompletionPercentage: number;

  // SRS
  reviewConcept: (conceptId: string, quality: number) => void;
  getSrsCard: (conceptId: string) => SrsCard | undefined;
  initSrsCard: (conceptId: string) => void;
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
        return Math.round((get().completedLessons.length / 50) * 100);
      },

      // Workbook progress
      completeWorkbookLevel: (levelId: number, score: number) => {
        set((state) => {
          const alreadyCompleted = state.completedWorkbookLevels.includes(levelId);
          const newStreak = computeStreak(state.lastStudyDate, state.streak);
          const bestScore = Math.max(score, state.workbookLevelScores[levelId] || 0);
          const bonus = alreadyCompleted ? 0 : 25;
          return addActivity({
            ...state,
            completedWorkbookLevels: alreadyCompleted
              ? state.completedWorkbookLevels
              : [...state.completedWorkbookLevels, levelId],
            workbookLevelScores: { ...state.workbookLevelScores, [levelId]: bestScore },
            streak: newStreak,
            lastStudyDate: getToday(),
            xp: state.xp + bonus,
          });
        });
      },

      isWorkbookLevelCompleted: (levelId: number) => {
        return get().completedWorkbookLevels.includes(levelId);
      },

      getWorkbookLevelStatus: (levelId: number): 'available' | 'completed' => {
        const state = get();
        if (state.completedWorkbookLevels.includes(levelId)) return 'completed';
        return 'available';
      },

      getWorkbookLevelScore: (levelId: number) => {
        return get().workbookLevelScores[levelId] || 0;
      },

      get workbookCompletionPercentage() {
        return Math.round((get().completedWorkbookLevels.length / 7) * 100);
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
        completedWorkbookLevels: state.completedWorkbookLevels,
        workbookLevelScores: state.workbookLevelScores,
      }),
    }
  )
);
