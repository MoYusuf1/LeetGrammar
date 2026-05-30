/**
 * Learn Page Data Hook — Textbook-First
 *
 * Composes graph_lessons, progress, and SRS data for the composite Learn page.
 * The Path shows textbook lessons (not problem sets). Problem sets are legacy
 * and will be overhauled later to match the textbook structure.
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useProgressStore } from '@/stores/progress-store';
import { useGraphSrs } from '@/hooks/useGraphSrs';
import { getAllLessons } from '@/lib/supabase/lesson-queries';
import type { GraphLesson } from '@/lib/supabase/lesson-types';

const TEXTBOOK_LABELS: Record<string, string> = {
  'colloquial-somali-1995': 'Colloquial Somali',
  'zorc-somali-textbook': 'Somali Textbook (Zorc)',
  'zorc-iss-1990': 'Somali Textbook (Zorc)',
};

const TEXTBOOK_COLORS: Record<string, string> = {
  'colloquial-somali-1995': '#3b82f6',
  'zorc-somali-textbook': '#22c55e',
  'zorc-iss-1990': '#22c55e',
};

export interface LessonNode {
  lesson: GraphLesson;
  isComplete: boolean;
  isLocked: boolean;
  isCurrent: boolean;
}

export interface TextbookSection {
  textbookId: string;
  label: string;
  color: string;
  lessons: LessonNode[];
  completionPct: number;
}

export type NextActionType = 'review' | 'lesson' | 'concept' | 'celebration';

export interface NextAction {
  type: NextActionType;
  label: string;
  sublabel?: string;
  count?: number;
  targetId?: string;
  targetPath?: string;
}

export interface LearnData {
  sections: TextbookSection[];
  loading: boolean;
  error: string | null;
  nextAction: NextAction | null;
  dueReviewCount: number;
  difficultConceptCount: number;
  currentLessonId: string | null;
  refetch: () => void;
}

export function useLearnData(): LearnData {
  const [lessons, setLessons] = useState<GraphLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const progress = useProgressStore();
  const { dueConcepts, learningFrontier, states } = useGraphSrs();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllLessons();
      setLessons(data);
    } catch (e: any) {
      setError(e.message ?? 'Failed to load lessons');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Compute lesson states
  const lessonNodes = useMemo((): LessonNode[] => {
    return lessons.map((lesson) => {
      const isComplete = progress.isGraphLessonCompleted(lesson.id);
      const isLocked = lesson.previous_lesson
        ? !progress.isGraphLessonCompleted(lesson.previous_lesson)
        : false;
      const isCurrent = !isComplete && !isLocked;
      return { lesson, isComplete, isLocked, isCurrent };
    });
  }, [lessons, progress.completedGraphLessons]);

  // Group by textbook
  const sections = useMemo((): TextbookSection[] => {
    const grouped = new Map<string, LessonNode[]>();
    for (const node of lessonNodes) {
      const key = node.lesson.textbook_id;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(node);
    }

    return Array.from(grouped.entries()).map(([textbookId, nodes]) => {
      const completed = nodes.filter((n) => n.isComplete).length;
      const pct = nodes.length > 0 ? Math.round((completed / nodes.length) * 100) : 0;
      return {
        textbookId,
        label: TEXTBOOK_LABELS[textbookId] ?? textbookId,
        color: TEXTBOOK_COLORS[textbookId] ?? '#3b82f6',
        lessons: nodes,
        completionPct: pct,
      };
    });
  }, [lessonNodes]);

  // Current lesson = first incomplete, unlocked lesson across all sections
  const currentLessonId = useMemo(() => {
    const current = lessonNodes.find((n) => n.isCurrent);
    return current?.lesson.id ?? null;
  }, [lessonNodes]);

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

    // 2. Continue current lesson
    const current = lessonNodes.find((n) => n.isCurrent);
    if (current) {
      return {
        type: 'lesson',
        label: `Continue: ${current.lesson.title}`,
        sublabel: current.lesson.page_range ? `Pages ${current.lesson.page_range}` : undefined,
        targetId: current.lesson.id,
        targetPath: `/lesson/${current.lesson.id}`,
      };
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
    if (lessonNodes.length > 0 && lessonNodes.every((n) => n.isComplete)) {
      return {
        type: 'celebration',
        label: 'All lessons complete!',
        sublabel: 'Review past concepts or explore the wiki',
        targetPath: '/concepts',
      };
    }

    return null;
  }, [dueConcepts, lessonNodes, learningFrontier]);

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
    sections,
    loading,
    error,
    nextAction,
    dueReviewCount: dueConcepts.length,
    difficultConceptCount,
    currentLessonId,
    refetch: load,
  };
}
