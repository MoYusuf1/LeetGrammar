/**
 * Learn Page Data Hook
 *
 * Composes curriculum units, problem progress, SRS states, and graph data
 * into a single source of truth for the composite Learn page.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useProgressStore } from '@/stores/progress-store';
import { useGraphSrs } from '@/hooks/useGraphSrs';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { allProblems, problemSections, type Difficulty } from '@/data/problems';
import type { RoadmapTopic } from '@/types';

export interface UnitProblem {
  id: number;
  title: string;
  difficulty: Difficulty;
  isComplete: boolean;
  isLocked: boolean;
}

export interface CurriculumUnit {
  id: string;
  title: string;
  description: string;
  color: string;
  unitOrder: number;
  problems: UnitProblem[];
  prerequisiteIds: string[];
  isComplete: boolean;
  isLocked: boolean;
  completionPct: number;
}

export type NextActionType = 'review' | 'problem' | 'concept' | 'celebration';

export interface NextAction {
  type: NextActionType;
  label: string;
  sublabel?: string;
  count?: number;
  targetId?: string | number;
  targetPath?: string;
}

export interface LearnData {
  units: CurriculumUnit[];
  loading: boolean;
  error: string | null;
  nextAction: NextAction | null;
  dueReviewCount: number;
  difficultConceptCount: number;
  currentUnitIndex: number;
  refetch: () => void;
}

/** Fetch curriculum units from Supabase or fall back to local problemSections */
async function fetchUnits(): Promise<RoadmapTopic[]> {
  if (!isSupabaseConfigured) {
    // Fallback: derive from hardcoded problemSections
    return problemSections.map((s) => ({
      id: `s${s.id}`,
      title: s.name,
      description: s.description,
      unitId: s.id,
      color: s.color,
      lessonIds: allProblems.filter((p) => p.sectionId === s.id).map((p) => p.id),
      prerequisites: s.id === 0 ? [] : [`s${s.id - 1}`],
    }));
  }

  const { data, error } = await getSupabase().rpc('get_roadmap_topics');
  if (error) throw new Error(error.message);
  // Normalize snake_case → camelCase from Supabase JSON response
  const rows = (data ?? []) as any[];
  return rows.map((u) => ({
    id: u.id,
    title: u.title,
    description: u.description ?? '',
    unitId: u.unit_order,
    color: u.color,
    lessonIds: u.problem_ids ?? [],
    prerequisites: u.prerequisite_ids ?? [],
  }));
}

export function useLearnData(): LearnData {
  const [rawUnits, setRawUnits] = useState<RoadmapTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const progress = useProgressStore();
  const { dueConcepts, learningFrontier, states } = useGraphSrs();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const units = await fetchUnits();
      setRawUnits(units);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load curriculum');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Compute enriched units with completion state
  const units = useMemo((): CurriculumUnit[] => {
    return rawUnits.map((unit) => {
      const problems = unit.lessonIds.map((problemId) => {
        const meta = allProblems.find((p) => p.id === problemId);
        const isComplete = progress.isLessonCompleted(problemId);
        const prereqMet =
          meta?.prerequisites.every((pid) => progress.isLessonCompleted(pid)) ?? true;
        return {
          id: problemId,
          title: meta?.title ?? `Problem ${problemId}`,
          difficulty: meta?.difficulty ?? 'Beginner',
          isComplete,
          isLocked: !prereqMet,
        };
      });

      const completedCount = problems.filter((p) => p.isComplete).length;
      const completionPct = problems.length > 0 ? Math.round((completedCount / problems.length) * 100) : 0;
      const isComplete = completionPct === 100 && problems.length > 0;

      // Unit is locked if any prerequisite unit is incomplete
      const prereqUnitsComplete = unit.prerequisites.every((prereqId) => {
        const prereqUnit = rawUnits.find((u) => u.id === prereqId);
        if (!prereqUnit) return true;
        const prereqProblems = prereqUnit.lessonIds.map((pid) => progress.isLessonCompleted(pid));
        return prereqProblems.every(Boolean);
      });

      return {
        id: unit.id,
        title: unit.title,
        description: unit.description,
        color: unit.color,
        unitOrder: unit.unitId,
        problems,
        prerequisiteIds: unit.prerequisites,
        isComplete,
        isLocked: !prereqUnitsComplete,
        completionPct,
      };
    });
  }, [rawUnits, progress.completedLessons]);

  // Find current unit (first incomplete, unlocked unit)
  const currentUnitIndex = useMemo(() => {
    return units.findIndex((u) => !u.isComplete && !u.isLocked);
  }, [units]);

  // Compute next recommended action
  const nextAction = useMemo((): NextAction | null => {
    // 1. Due reviews = highest priority
    if (dueConcepts.length > 0) {
      return {
        type: 'review',
        label: dueConcepts.length === 1 ? '1 concept due for review' : `${dueConcepts.length} concepts due for review`,
        sublabel: 'Spaced repetition keeps knowledge fresh',
        count: dueConcepts.length,
        targetPath: '/review',
      };
    }

    // 2. Continue current unit
    const currentUnit = units[currentUnitIndex];
    if (currentUnit && !currentUnit.isLocked) {
      const nextProblem = currentUnit.problems.find((p) => !p.isComplete && !p.isLocked);
      if (nextProblem) {
        return {
          type: 'problem',
          label: `Continue: ${currentUnit.title}`,
          sublabel: nextProblem.title,
          targetId: nextProblem.id,
          targetPath: `/problem/${nextProblem.id}`,
        };
      }
    }

    // 3. Learning frontier (new concepts ready to learn)
    if (learningFrontier.length > 0) {
      const top = learningFrontier[0];
      return {
        type: 'concept',
        label: `Learn: ${top.label}`,
        sublabel: 'Ready to learn — all prerequisites met',
        targetId: top.conceptId,
        targetPath: `/study/${top.conceptId}`,
      };
    }

    // 4. All caught up
    if (units.length > 0 && units.every((u) => u.isComplete)) {
      return {
        type: 'celebration',
        label: 'All units complete!',
        sublabel: 'Review past concepts or explore the wiki',
        targetPath: '/concepts',
      };
    }

    return null;
  }, [dueConcepts, units, currentUnitIndex, learningFrontier]);

  // Difficult concepts = low mastery, reviewed at least once
  const difficultConceptCount = useMemo(() => {
    let count = 0;
    for (const state of states.values()) {
      if (state.mastery < 0.4 && state.reviewCount > 0) {
        count++;
      }
    }
    return count;
  }, [states]);

  return {
    units,
    loading,
    error,
    nextAction,
    dueReviewCount: dueConcepts.length,
    difficultConceptCount,
    currentUnitIndex,
    refetch: load,
  };
}
