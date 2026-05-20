/**
 * Hybrid progress hook — feeds the Learn page lesson grid.
 * Now returns workbook levels as lessons mapped to the Hybrid shape.
 */

import { useMemo, useCallback } from 'react';
import { useProgressStore } from '@/stores/progress-store';
import { allLevels } from '@/data/workbook';

export interface HybridLesson {
  id: number;
  title: string;
  unitId: number;
  unitTitle: string;
  unitColor: string;
  isGraph: boolean;
  conceptId?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  prerequisites: number[];
}

export interface HybridUnit {
  unitId: number;
  title: string;
  description: string;
  color: string;
  lessonIds: number[];
  prerequisites: number[];
}

/** Map workbook levels into HybridLesson shape. */
function levelToHybrid(level: typeof allLevels[0], unitId: number, unitTitle: string, unitColor: string): HybridLesson {
  return {
    id: level.id,
    title: level.title,
    unitId,
    unitTitle,
    unitColor,
    isGraph: false,
    difficulty: level.id <= 2 ? 'Beginner' : level.id <= 5 ? 'Intermediate' : 'Advanced',
    description: level.description,
    prerequisites: level.prerequisiteLevelId ? [level.prerequisiteLevelId] : [],
  };
}

/** Static unit definitions that group workbook levels visually. */
const WORKBOOK_UNITS: HybridUnit[] = [
  { unitId: 1, title: 'Foundations', description: 'Marker identification', color: '#3b82f6', lessonIds: [1], prerequisites: [] },
  { unitId: 2, title: 'Core Markers', description: 'waa vs baa vs waxa', color: '#22c55e', lessonIds: [2, 3], prerequisites: [1] },
  { unitId: 3, title: 'Sentence Structure', description: 'SOV word order assembly', color: '#a855f7', lessonIds: [4], prerequisites: [3] },
  { unitId: 4, title: 'Space & Modifiers', description: 'Prepositions and direction', color: '#f59e0b', lessonIds: [5], prerequisites: [4] },
  { unitId: 5, title: 'Complex Grammar', description: 'Connectors and compound sentences', color: '#ec4899', lessonIds: [6], prerequisites: [5] },
  { unitId: 6, title: 'Mastery', description: 'Full sentence construction', color: '#ffa116', lessonIds: [7], prerequisites: [6] },
];

export function useHybridPath() {
  const units = useMemo<HybridUnit[]>(() => WORKBOOK_UNITS, []);

  const lessons = useMemo<HybridLesson[]>(() => {
    return allLevels.map((level) => {
      const unit = WORKBOOK_UNITS.find((u) => u.lessonIds.includes(level.id))!;
      return levelToHybrid(level, unit.unitId, unit.title, unit.color);
    });
  }, []);

  return { lessons, units };
}

export function useHybridProgress() {
  const store = useProgressStore();
  const { lessons, units } = useHybridPath();

  const getLessonStatus = useCallback(
    (lessonId: number): 'completed' | 'current' => {
      const status = store.getWorkbookLevelStatus(lessonId);
      if (status === 'completed') return 'completed';
      return 'current';
    },
    [store]
  );

  const completeLesson = useCallback(
    (lessonId: number) => {
      store.completeWorkbookLevel(lessonId, 100);
    },
    [store]
  );

  const getTopicStatus = useCallback(
    (lessonIds: number[]): 'completed' | 'in-progress' | 'locked' => {
      const allCompleted = lessonIds.every((id) => store.isWorkbookLevelCompleted(id));
      if (allCompleted) return 'completed';
      const someCompleted = lessonIds.some((id) => store.isWorkbookLevelCompleted(id));
      if (someCompleted) return 'in-progress';
      return 'locked';
    },
    [store]
  );

  const getTopicProgress = useCallback(
    (lessonIds: number[]) => {
      const completed = lessonIds.filter((id) => store.isWorkbookLevelCompleted(id)).length;
      return { completed, total: lessonIds.length };
    },
    [store]
  );

  return {
    completedLessons: store.completedWorkbookLevels,
    streak: store.streak,
    xp: store.xp,
    completionPercentage: store.workbookCompletionPercentage,
    getLessonStatus,
    completeLesson,
    getTopicStatus,
    getTopicProgress,
    lessons,
    units,
    hasGraphContent: false,
    graphLessons: [],
  };
}
