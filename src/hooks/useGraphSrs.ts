/**
 * Graph-Aware SRS Hook
 *
 * Integrates the FIRe-style graph SRS engine with React + Supabase.
 * Loads learner states, computes due reviews, and handles graph-aware updates.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useGraphStore } from '@/stores/graph-store';
import { useAuthStore } from '@/stores/auth-store';
import { isSupabaseConfigured } from '@/lib/supabase';
import {
  getConceptStates,
  upsertConceptStates,
  insertReviewLog,
} from '@/lib/supabase/lesson-queries';
import {
  processReview,
  getDueConcepts,
  getLearningFrontier,
  initConceptState,
  type ReviewRating,
  type ReviewResult,
  type ConceptState,
} from '@/engine/graph-srs';

/** Serialize Map → Record for localStorage */
function serializeStates(states: Map<string, ConceptState>): Record<string, ConceptState> {
  const record: Record<string, ConceptState> = {};
  for (const [id, state] of states) {
    record[id] = state;
  }
  return record;
}

/** Deserialize Record → Map */
function deserializeStates(record: Record<string, ConceptState>): Map<string, ConceptState> {
  const map = new Map<string, ConceptState>();
  for (const [id, state] of Object.entries(record)) {
    map.set(id, state);
  }
  return map;
}

/** Load from localStorage cache */
function loadLocalCache(): Map<string, ConceptState> {
  try {
    const raw = localStorage.getItem('leetgrammar-srs-v2');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return deserializeStates(parsed);
      }
    }
  } catch {
    // ignore
  }
  return new Map();
}

/** Save to localStorage cache */
function saveLocalCache(states: Map<string, ConceptState>) {
  try {
    localStorage.setItem('leetgrammar-srs-v2', JSON.stringify(serializeStates(states)));
  } catch {
    // ignore (quota exceeded)
  }
}

export function useGraphSrs() {
  const { engine } = useGraphStore();
  const { user } = useAuthStore();
  const [states, setStates] = useState<Map<string, ConceptState>>(loadLocalCache);
  const [loading, setLoading] = useState(true);
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from Supabase on login
  useEffect(() => {
    if (!user || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const userId = user.id;
    async function load() {
      setLoading(true);
      try {
        const data = await getConceptStates(userId);

        if (data && data.length > 0) {
          const loaded = new Map(states);
          for (const row of data) {
            loaded.set(row.concept_id, {
              conceptId: row.concept_id,
              mastery: row.mastery,
              stability: row.stability,
              difficulty: row.difficulty,
              retrievability: row.retrievability,
              lastReviewed: row.last_reviewed,
              nextReviewAt: row.next_review_at,
              reviewCount: row.review_count,
              lapseCount: row.lapse_count,
              totalStudyTimeSeconds: row.total_study_time_seconds,
            });
          }
          setStates(loaded);
          saveLocalCache(loaded);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user?.id]);

  // Debounced sync to Supabase
  const syncToCloud = useCallback(
    async (updatedStates: Map<string, ConceptState>) => {
      if (!user || !isSupabaseConfigured) return;

      const rows = [];
      for (const state of updatedStates.values()) {
        rows.push({
          concept_id: state.conceptId,
          mastery: state.mastery,
          stability: state.stability,
          difficulty: state.difficulty,
          retrievability: state.retrievability,
          last_reviewed: state.lastReviewed,
          next_review_at: state.nextReviewAt,
          review_count: state.reviewCount,
          lapse_count: state.lapseCount,
          total_study_time_seconds: state.totalStudyTimeSeconds,
        });
      }

      // Upsert in batches of 100
      for (let i = 0; i < rows.length; i += 100) {
        const batch = rows.slice(i, i + 100);
        try {
          await upsertConceptStates(user.id, batch as any);
        } catch {
          // Sync failed — local state is still valid
        }
      }
    },
    [user?.id]
  );

  // Review a concept
  const review = useCallback(
    (conceptId: string, rating: ReviewRating, studyTimeSeconds: number = 0): ReviewResult => {
      const result = processReview(engine, states, conceptId, rating, studyTimeSeconds);

      // Create new Map to trigger React re-render
      const newStates = new Map(states);
      setStates(newStates);
      saveLocalCache(newStates);

      // Debounced cloud sync
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = setTimeout(() => syncToCloud(newStates), 2000);

      // Also log the review
      if (user && isSupabaseConfigured) {
        insertReviewLog({
          userId: user.id,
          conceptId: result.conceptId,
          rating: result.rating,
          oldMastery: result.oldMastery,
          newMastery: result.newMastery,
          oldStability: result.oldStability,
          newStability: result.newStability,
          studyTimeSeconds: studyTimeSeconds,
        }).catch(() => {
          // Review logging failed, but review is still local
        });
      }

      return result;
    },
    [engine, states, user?.id, syncToCloud]
  );

  // Initialize a concept for review
  const initConcept = useCallback(
    (conceptId: string) => {
      if (states.has(conceptId)) return;
      const newStates = new Map(states);
      newStates.set(conceptId, initConceptState(conceptId));
      setStates(newStates);
      saveLocalCache(newStates);
    },
    [states]
  );

  // Computed values
  const dueConcepts = useMemo(() => getDueConcepts(states), [states]);
  const learningFrontier = useMemo(
    () => getLearningFrontier(engine, states),
    [engine, states]
  );

  const stats = useMemo(() => {
    let totalMastery = 0;
    let totalReviews = 0;
    let totalLapses = 0;
    let masteredCount = 0;

    for (const state of states.values()) {
      totalMastery += state.mastery;
      totalReviews += state.reviewCount;
      totalLapses += state.lapseCount;
      if (state.mastery >= 0.7) masteredCount++;
    }

    const count = states.size;
    return {
      totalConcepts: count,
      mastered: masteredCount,
      learning: count - masteredCount,
      avgMastery: count > 0 ? totalMastery / count : 0,
      totalReviews,
      totalLapses,
      dueToday: dueConcepts.length,
    };
  }, [states, dueConcepts.length]);

  return {
    states,
    dueConcepts,
    learningFrontier,
    stats,
    review,
    initConcept,
    loading,
  };
}
