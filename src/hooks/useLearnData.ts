/**
 * Stub: Learn page data disabled.
 * All curriculum data is now hardcoded static content.
 */

import { useMemo } from 'react';
import type { GraphLesson } from '@/lib/supabase/lesson-types';

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
  const result = useMemo(
    () => ({
      sections: [],
      loading: false,
      error: null,
      nextAction: null,
      dueReviewCount: 0,
      difficultConceptCount: 0,
      currentLessonId: null,
      refetch: () => {},
    }),
    []
  );

  return result;
}
