/**
 * Hybrid progress hook — supports both hardcoded lessons (1–50)
 * and graph-generated lessons (100000+).
 */

import { useMemo, useCallback } from 'react';
import { useProgressStore } from '@/stores/progress-store';
import { useGraphStore } from '@/stores/graph-store';
import { buildGraphPath, getGraphLessonStatus } from '@/engine/lesson-generator';
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
  const { engine, chunks } = useGraphStore();

  const { lessons: graphLessons, units: graphUnits } = useMemo(
    () => buildGraphPath(engine, chunks),
    [engine, chunks]
  );

  const hasGraphContent = graphLessons.length > 0;

  // Build hybrid units
  const units = useMemo<HybridUnit[]>(() => {
    if (!hasGraphContent) {
      // Fallback to hardcoded units
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
    }

    return graphUnits.map((u) => ({
      ...u,
      lessonIds: u.lessonIds,
    }));
  }, [hasGraphContent, graphUnits]);

  // Build hybrid lessons
  const lessons = useMemo<HybridLesson[]>(() => {
    if (!hasGraphContent) {
      return allProblems.map(problemToHybrid);
    }

    const hardcoded = allProblems.map(problemToHybrid);
    const graph = graphLessons.map((l) => ({
      id: l.id,
      title: l.title,
      unitId: l.unitId,
      unitTitle: l.unitTitle,
      unitColor: l.unitColor,
      isGraph: true,
      conceptId: l.conceptId,
      difficulty: l.difficulty,
      description: l.description,
      prerequisites: l.prerequisites,
    }));

    // Sort: graph lessons first, then hardcoded
    return [...graph, ...hardcoded];
  }, [hasGraphContent, graphLessons]);

  return { lessons, units, hasGraphContent, graphLessons };
}

export function useHybridProgress() {
  const store = useProgressStore();
  const { lessons, units, hasGraphContent, graphLessons } = useHybridPath();

  const getLessonStatus = useCallback(
    (lessonId: number): 'completed' | 'current' | 'locked' => {
      if (store.completedLessons.includes(lessonId)) return 'completed';

      // Graph lessons use prerequisite-based unlocking
      if (lessonId >= 100000) {
        return getGraphLessonStatus(lessonId, store.completedLessons, graphLessons);
      }

      // Hardcoded lessons use sequential unlocking
      const prevLesson = lessonId - 1;
      if (prevLesson === 0 || store.completedLessons.includes(prevLesson)) {
        return 'current';
      }
      return 'locked';
    },
    [store.completedLessons, graphLessons]
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
    hasGraphContent,
    graphLessons,
  };
}
