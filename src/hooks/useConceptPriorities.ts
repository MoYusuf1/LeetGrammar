/**
 * Hook for fetching concepts ordered by PageRank centrality.
 *
 * PageRank answers: "Which concepts are most foundational?"
 * Higher PageRank = more prerequisites point to it = more important to learn early.
 */

import { useState, useEffect, useRef } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getConceptPriorities as fetchConceptPriorities } from '@/lib/supabase/lesson-queries';
import type { GraphNode } from '@/lib/supabase/lesson-types';

interface ConceptPriority extends Omit<GraphNode, 'labels' | 'attributes'> {
  pagerank: number;
}

interface UseConceptPrioritiesResult {
  concepts: ConceptPriority[];
  loading: boolean;
  error: string | null;
}

export function useConceptPriorities(limit = 50): UseConceptPrioritiesResult {
  const [concepts, setConcepts] = useState<ConceptPriority[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function load() {
      if (!isSupabaseConfigured) {
        setError('Supabase not configured');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchConceptPriorities(limit);
        setConcepts(data as ConceptPriority[]);
      } catch (e: any) {
        setError(e.message ?? 'Failed to load concept priorities');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [limit]);

  return { concepts, loading, error };
}
