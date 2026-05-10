import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'soomaali-grammar-progress-v5';

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

function loadProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...defaultProgress, ...JSON.parse(stored) };
    }
  } catch {
    // ignore parse errors
  }
  return { ...defaultProgress };
}

function saveProgress(progress: UserProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore storage errors
  }
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  return new Date(Date.now() - 86400000).toISOString().split('T')[0];
}

function updateStreak(progress: UserProgress): number {
  const today = getToday();
  const yesterday = getYesterday();

  if (progress.lastStudyDate === today) {
    return progress.streak;
  }
  if (progress.lastStudyDate === yesterday) {
    return progress.streak + 1;
  }
  return 1;
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const completeLesson = useCallback((lessonId: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) {
        return {
          ...prev,
          lastStudyDate: getToday(),
        };
      }
      const newStreak = updateStreak(prev);
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        streak: newStreak,
        lastStudyDate: getToday(),
        xp: prev.xp + 10,
      };
    });
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: number) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons]
  );

  const getLessonStatus = useCallback(
    (lessonId: number): 'completed' | 'current' | 'locked' => {
      if (progress.completedLessons.includes(lessonId)) return 'completed';
      // Current = previous lesson is completed OR this is the first lesson
      const prevLesson = lessonId - 1;
      if (prevLesson === 0 || progress.completedLessons.includes(prevLesson)) {
        return 'current';
      }
      return 'locked';
    },
    [progress.completedLessons]
  );

  const recordPracticeScore = useCallback((lessonId: number, score: number) => {
    setProgress((prev) => {
      const existing = prev.practiceScores[lessonId] || 0;
      const bonus = score > existing ? (score - existing) * 5 : 0;
      return {
        ...prev,
        practiceScores: { ...prev.practiceScores, [lessonId]: Math.max(score, existing) },
        xp: prev.xp + bonus,
        lastStudyDate: getToday(),
      };
    });
  }, []);

  const completionPercentage = Math.round(
    (progress.completedLessons.length / 50) * 100
  );

  const resetProgress = useCallback(() => {
    setProgress({ ...defaultProgress });
  }, []);

  const isTopicCompleted = useCallback(
    (lessonIds: number[]) => lessonIds.every((id) => progress.completedLessons.includes(id)),
    [progress.completedLessons]
  );

  const getTopicStatus = useCallback(
    (lessonIds: number[], prerequisiteTopicIds: string[]): 'completed' | 'in-progress' | 'locked' => {
      // Check if any prerequisite topics are incomplete
      // (prerequisiteTopicIds should be checked by caller with their own lessonIds)
      const allCompleted = lessonIds.every((id) => progress.completedLessons.includes(id));
      if (allCompleted) return 'completed';
      const someCompleted = lessonIds.some((id) => progress.completedLessons.includes(id));
      if (someCompleted) return 'in-progress';
      return 'locked';
    },
    [progress.completedLessons]
  );

  const getTopicProgress = useCallback(
    (lessonIds: number[]) => {
      const completed = lessonIds.filter((id) => progress.completedLessons.includes(id)).length;
      return { completed, total: lessonIds.length };
    },
    [progress.completedLessons]
  );

  const arePrerequisitesMet = useCallback(
    (prereqLessonIds: number[]) => prereqLessonIds.every((id) => progress.completedLessons.includes(id)),
    [progress.completedLessons]
  );

  return {
    progress,
    completeLesson,
    isLessonCompleted,
    getLessonStatus,
    recordPracticeScore,
    completionPercentage,
    resetProgress,
    isTopicCompleted,
    getTopicStatus,
    getTopicProgress,
    arePrerequisitesMet,
  };
}
