/**
 * Hybrid progress hook — supports both hardcoded lessons (1–50)
 * and graph-generated lessons (100000+).
 */

import { useMemo, useCallback } from 'react';
import { useProgressStore } from '@/stores/progress-store';
import { allProblems } from '@/data/problems';
import type { ProblemMeta } from '@/data/problems';

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

function problemToHybrid(p: ProblemMeta): HybridLesson {
  return {
    id: p.id,
    title: p.title,
    unitId: p.unitId,
    unitTitle: p.unit,
    unitColor: '', // filled by unit
    isGraph: false,
    conceptId: undefined,
    difficulty: p.difficulty,
    description: p.description,
    prerequisites: p.prerequisites,
  };
}

export function useHybridPath() {
  // Only return hardcoded problem lessons.
  // Graph-generated lessons are kept out of the Learn page.
  const units = useMemo<HybridUnit[]>(() => {
    const unitMap = new Map<number, HybridUnit>();
    for (const p of allProblems) {
      if (!unitMap.has(p.unitId)) {
        unitMap.set(p.unitId, {
          unitId: p.unitId,
          title: p.unit,
          description: '',
          color: '',
          lessonIds: [],
          prerequisites: [],
        });
      }
      unitMap.get(p.unitId)!.lessonIds.push(p.id);
    }
    return Array.from(unitMap.values());
  }, []);

  const lessons = useMemo<HybridLesson[]>(() => {
    return allProblems.map(problemToHybrid);
  }, []);

  return { lessons, units };
}

export function useHybridProgress() {
  const store = useProgressStore();
  const { lessons, units } = useHybridPath();

  const getLessonStatus = useCallback(
    (lessonId: number): 'completed' | 'current' | 'locked' => {
      if (store.completedLessons.includes(lessonId)) return 'completed';
      return 'current';
    },
    [store.completedLessons]
  );

  const completeLesson = useCallback(
    (lessonId: number) => {
      store.completeLesson(lessonId);
    },
    [store]
  );

  const getTopicStatus = useCallback(
    (lessonIds: number[]): 'completed' | 'in-progress' | 'locked' => {
      const allCompleted = lessonIds.every((id) => store.completedLessons.includes(id));
      if (allCompleted) return 'completed';
      const someCompleted = lessonIds.some((id) => store.completedLessons.includes(id));
      if (someCompleted) return 'in-progress';

      // Check if prerequisites for first lesson are met
      const firstLesson = lessons.find((l) => l.id === lessonIds[0]);
      if (firstLesson && firstLesson.prerequisites.every((p) => store.completedLessons.includes(p))) {
        return 'locked'; // ready but not started
      }
      return 'locked';
    },
    [store.completedLessons, lessons]
  );

  const getTopicProgress = useCallback(
    (lessonIds: number[]) => {
      const completed = lessonIds.filter((id) => store.completedLessons.includes(id)).length;
      return { completed, total: lessonIds.length };
    },
    [store.completedLessons]
  );

  return {
    completedLessons: store.completedLessons,
    streak: store.streak,
    xp: store.xp,
    completionPercentage: store.completionPercentage,
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
