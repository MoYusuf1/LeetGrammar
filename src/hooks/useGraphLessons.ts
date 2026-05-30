/**
 * Stub: Graph lessons hook disabled.
 * All curriculum data is now hardcoded static content.
 */

import { useMemo } from 'react';
import type { GraphLesson, LessonView } from '@/lib/supabase/lesson-types';

interface UseGraphLessonsResult {
  lessons: GraphLesson[];
  groupedLessons: Record<string, GraphLesson[]>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseLessonResult {
  lessonView: LessonView | null;
  loading: boolean;
  error: string | null;
}

export function useGraphLessons(): UseGraphLessonsResult {
  const result = useMemo(
    () => ({
      lessons: [],
      groupedLessons: {},
      loading: false,
      error: null,
      refetch: () => {},
    }),
    []
  );

  return result;
}

export function useLesson(): UseLessonResult {
  const result = useMemo(
    () => ({
      lessonView: null,
      loading: false,
      error: null,
    }),
    []
  );

  return result;
}
