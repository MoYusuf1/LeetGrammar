/**
 * Zustand store for user progress.
 * Replaces useProgress hook with global state + persistence.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'leet-somali-progress-v6';

export interface UserProgress {
  completedLessons: number[];
  streak: number;
  lastStudyDate: string;
  xp: number;
  practiceScores: Record<number, number>;
}

const defaultProgress: UserProgress = {
  completedLessons: [],
  streak: 0,
  lastStudyDate: '',
  xp: 0,
  practiceScores: {},
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
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...defaultProgress,

      completeLesson: (lessonId: number) => {
        set((state) => {
          if (state.completedLessons.includes(lessonId)) {
            return { ...state, lastStudyDate: getToday() };
          }
          const newStreak = computeStreak(state.lastStudyDate, state.streak);
          return {
            ...state,
            completedLessons: [...state.completedLessons, lessonId],
            streak: newStreak,
            lastStudyDate: getToday(),
            xp: state.xp + 10,
          };
        });
      },

      isLessonCompleted: (lessonId: number) => {
        return get().completedLessons.includes(lessonId);
      },

      getLessonStatus: (lessonId: number) => {
        const state = get();
        if (state.completedLessons.includes(lessonId)) return 'completed';
        const prevLesson = lessonId - 1;
        if (prevLesson === 0 || state.completedLessons.includes(prevLesson)) {
          return 'current';
        }
        return 'locked';
      },

      recordPracticeScore: (lessonId: number, score: number) => {
        set((state) => {
          const existing = state.practiceScores[lessonId] || 0;
          const bonus = score > existing ? (score - existing) * 5 : 0;
          return {
            ...state,
            practiceScores: {
              ...state.practiceScores,
              [lessonId]: Math.max(score, existing),
            },
            xp: state.xp + bonus,
            lastStudyDate: getToday(),
          };
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
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        streak: state.streak,
        lastStudyDate: state.lastStudyDate,
        xp: state.xp,
        practiceScores: state.practiceScores,
      }),
    }
  )
);
