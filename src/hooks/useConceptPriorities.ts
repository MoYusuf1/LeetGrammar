/**
 * Stub: Concept priorities hook disabled.
 * All curriculum data is now hardcoded static content.
 */

import { useMemo } from 'react';
import type { GraphNode } from '@/lib/supabase/lesson-types';

interface ConceptPriority extends Omit<GraphNode, 'labels' | 'attributes'> {
  pagerank: number;
}

interface UseConceptPrioritiesResult {
  concepts: ConceptPriority[];
  loading: boolean;
  error: string | null;
}

export function useConceptPriorities(): UseConceptPrioritiesResult {
  const result = useMemo(
    () => ({
      concepts: [],
      loading: false,
      error: null,
    }),
    []
  );

  return result;
}
