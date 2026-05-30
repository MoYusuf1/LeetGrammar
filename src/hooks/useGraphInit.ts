/**
 * Stub: knowledge graph initialization disabled.
 * All curriculum data is now hardcoded static content.
 * This hook is kept for compatibility with pages that import it.
 */

import { useEffect, useRef } from 'react';
import { useGraphStore } from '@/stores/graph-store';

export function useGraphInit() {
  const hasRun = useRef(false);
  const { setLoading } = useGraphStore();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    setLoading(false);
  }, [setLoading]);
}
