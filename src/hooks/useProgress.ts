/**
 * Backward-compatible hook wrapping the Zustand progress store.
 *
 * All state logic has moved to src/stores/progress-store.ts.
 * This hook remains as a thin adapter for existing components.
 */

import { useProgressStore } from '@/stores/progress-store';
import { useCallback } from 'react';

export interface UserProgress {
  completedLessons: number[];
  streak: number;
  lastStudyDate: string;
  xp: number;
  practiceScores: Record<number, number>;
  srsCards: Record<string, import('@/engine/srs').SrsCard>;
  activityLog: string[];
  completedWorkbookLevels: number[];
  workbookLevelScores: Record<number, number>;
}

export function useProgress() {
  const store = useProgressStore();

  // Wrap store methods in useCallback to maintain API compatibility
  const completeLesson = useCallback(
    (lessonId: number) => store.completeLesson(lessonId),
    [store]
  );

  const isLessonCompleted = useCallback(
    (lessonId: number) => store.isLessonCompleted(lessonId),
    [store]
  );

  const getLessonStatus = useCallback(
    (lessonId: number): 'completed' | 'current' | 'locked' =>
      store.getLessonStatus(lessonId),
    [store]
  );

  const recordPracticeScore = useCallback(
    (lessonId: number, score: number) =>
      store.recordPracticeScore(lessonId, score),
    [store]
  );

  const resetProgress = useCallback(() => store.resetProgress(), [store]);

  const isTopicCompleted = useCallback(
    (lessonIds: number[]) => store.isTopicCompleted(lessonIds),
    [store]
  );

  const getTopicStatus = useCallback(
    (
      lessonIds: number[],
      _prerequisiteTopicIds: string[] = []
    ): 'completed' | 'in-progress' | 'locked' =>
      store.getTopicStatus(lessonIds),
    [store]
  );

  const getTopicProgress = useCallback(
    (lessonIds: number[]) => store.getTopicProgress(lessonIds),
    [store]
  );

  const arePrerequisitesMet = useCallback(
    (prereqLessonIds: number[]) => store.arePrerequisitesMet(prereqLessonIds),
    [store]
  );

  const progress: UserProgress = {
    completedLessons: store.completedLessons,
    streak: store.streak,
    lastStudyDate: store.lastStudyDate,
    xp: store.xp,
    practiceScores: store.practiceScores,
    srsCards: store.srsCards,
    activityLog: store.activityLog,
    completedWorkbookLevels: store.completedWorkbookLevels,
    workbookLevelScores: store.workbookLevelScores,
  };

  // Workbook progress wrappers
  const completeWorkbookLevel = useCallback(
    (levelId: number, score: number) => store.completeWorkbookLevel(levelId, score),
    [store]
  );

  const isWorkbookLevelCompleted = useCallback(
    (levelId: number) => store.isWorkbookLevelCompleted(levelId),
    [store]
  );

  const getWorkbookLevelStatus = useCallback(
    (levelId: number): 'available' | 'completed' =>
      store.getWorkbookLevelStatus(levelId),
    [store]
  );

  const getWorkbookLevelScore = useCallback(
    (levelId: number) => store.getWorkbookLevelScore(levelId),
    [store]
  );

  return {
    progress,
    completeLesson,
    isLessonCompleted,
    getLessonStatus,
    recordPracticeScore,
    completionPercentage: store.completionPercentage,
    resetProgress,
    isTopicCompleted,
    getTopicStatus,
    getTopicProgress,
    arePrerequisitesMet,
    // Workbook
    completeWorkbookLevel,
    isWorkbookLevelCompleted,
    getWorkbookLevelStatus,
    getWorkbookLevelScore,
    workbookCompletionPercentage: store.workbookCompletionPercentage,
  };
}
