/**
 * Knowledge Frontier — concepts the student is ready to learn.
 *
 * A concept is in the frontier when:
 * 1. It has at least one REQUIRES edge (it's teachable)
 * 2. ALL its prerequisite concepts are mastered (SRS mastery ≥ 3 or in completedLessons)
 *
 * This replaces hardcoded lesson ordering with dynamic graph traversal.
 */

import { useMemo } from 'react';
import { useGraphStore } from '@/stores/graph-store';
import { useProgressStore } from '@/stores/progress-store';

export interface FrontierConcept {
  id: string;
  label: string;
  type: string;
  depth: number;
  prerequisiteCount: number;
  masteredPrerequisiteCount: number;
}

function isMastered(conceptId: string, srsCards: Record<string, { mastery: number }>) {
  // Check SRS mastery
  const card = srsCards[conceptId];
  if (card && card.mastery >= 3) return true;

  // Check if any problem mapped to this concept is completed
  // (We'd need the reverse mapping for this; for now, SRS mastery is the signal)
  return false;
}

export function useKnowledgeFrontier(): FrontierConcept[] {
  const { engine } = useGraphStore();
  const { srsCards } = useProgressStore();

  return useMemo(() => {
    const frontier: FrontierConcept[] = [];

    for (const node of engine.getAllNodes()) {
      if (node.type !== 'CONCEPT') continue;

      const prereqEdges = engine.getEdgesTo(node.id, { type: 'REQUIRES' });
      if (prereqEdges.length === 0) continue; // No prerequisites = not a learnable concept in our curriculum

      const masteredCount = prereqEdges.filter((e) =>
        isMastered(e.from, srsCards)
      ).length;

      // Only include if ALL prerequisites are mastered
      if (masteredCount === prereqEdges.length) {
        frontier.push({
          id: node.id,
          label: node.labels.default,
          type: node.type,
          depth: prereqEdges.length,
          prerequisiteCount: prereqEdges.length,
          masteredPrerequisiteCount: masteredCount,
        });
      }
    }

    // Sort by depth (shallower first = more fundamental)
    return frontier.sort((a, b) => a.depth - b.depth);
  }, [engine, srsCards]);
}

/**
 * Get the learning status of a concept:
 * - 'mastered': SRS mastery ≥ 3
 * - 'ready': All prerequisites mastered, but this concept not yet mastered
 * - 'locked': Some prerequisites not mastered
 */
export function useConceptStatus(conceptId: string): 'mastered' | 'ready' | 'locked' {
  const { engine } = useGraphStore();
  const { srsCards } = useProgressStore();

  return useMemo(() => {
    const card = srsCards[conceptId];
    if (card && card.mastery >= 3) return 'mastered';

    const prereqEdges = engine.getEdgesTo(conceptId, { type: 'REQUIRES' });
    if (prereqEdges.length === 0) return 'ready';

    const allMastered = prereqEdges.every((e) => {
      const prereqCard = srsCards[e.from];
      return prereqCard && prereqCard.mastery >= 3;
    });

    return allMastered ? 'ready' : 'locked';
  }, [engine, srsCards, conceptId]);
}
