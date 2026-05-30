/**
 * Graph-Aware Spaced Repetition Engine (FIRe-inspired)
 *
 * Replaces independent SRS cards with a graph-aware model where:
 * - Credit travels DOWN prerequisite chains (reviewing advanced concepts helps basics)
 * - Penalties travel UP prerequisite chains (failing basics hurts advanced concepts)
 * - Mastery is continuous [0,1] instead of discrete levels
 *
 * Based on:
 * - FSRS (Free Spaced Repetition Scheduler) by Piotr Woźniak
 * - FIRe (Fractional Implicit Repetition) by Math Academy
 * - Content-aware SRS research by Giacomo Randazzo
 */

import type { GraphEngine } from './graph-engine';

export type ReviewRating = 0 | 1 | 2 | 3; // Again, Hard, Good, Easy

export interface ConceptState {
  conceptId: string;
  mastery: number;        // [0,1] probability of recall
  stability: number;      // days until retrievability = 0.5
  difficulty: number;     // [0,1] intrinsic difficulty
  retrievability: number; // current probability of recall
  lastReviewed: string | null; // ISO date
  nextReviewAt: string | null; // ISO date
  reviewCount: number;
  lapseCount: number;
  totalStudyTimeSeconds: number;
}

export interface ReviewResult {
  conceptId: string;
  rating: ReviewRating;
  oldMastery: number;
  newMastery: number;
  oldStability: number;
  newStability: number;
  nextReviewAt: string;
  implicitUpdates: ImplicitUpdate[];
}

export interface ImplicitUpdate {
  conceptId: string;
  direction: 'down' | 'up';
  credit: number; // [-1, 1], negative = penalty
  oldMastery: number;
  newMastery: number;
}

// ─── Constants ──────────────────────────────────────────────────────────────

/** Stability multipliers for each rating */
const STABILITY_MULTIPLIERS: Record<ReviewRating, number> = {
  0: 0.25,  // Again: stability crashes
  1: 1.0,   // Hard: maintain current
  2: 2.5,   // Good: standard increase
  3: 4.0,   // Easy: big increase
};

/** Mastery increments for each rating */
const MASTERY_INCREMENTS: Record<ReviewRating, number> = {
  0: -0.3,  // Again: big drop
  1: 0.1,   // Hard: small gain
  2: 0.2,   // Good: moderate gain
  3: 0.3,   // Easy: big gain
};

/** Max partial credit fraction for implicit reviews */
const MAX_IMPLICIT_CREDIT = 0.3;

/** Penalty fraction for dependent concepts on failure */
const FAILURE_PENALTY = 0.2;

// ─── Core Algorithm ─────────────────────────────────────────────────────────

/**
 * Compute retrievability R = e^(-t/S) where t=elapsed days, S=stability
 */
function computeRetrievability(stability: number, elapsedDays: number): number {
  if (stability <= 0 || elapsedDays <= 0) return 1.0;
  return Math.exp(-elapsedDays / stability);
}

/**
 * Compute elapsed days since a date.
 */
function elapsedDaysSince(dateIso: string | null): number {
  if (!dateIso) return 0;
  const then = new Date(dateIso).getTime();
  const now = Date.now();
  return Math.max(0, (now - then) / (1000 * 60 * 60 * 24));
}

/**
 * Add days to now, return ISO string.
 */
function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/**
 * Initialize a new concept state.
 */
export function initConceptState(conceptId: string): ConceptState {
  return {
    conceptId,
    mastery: 0.0,
    stability: 1.0,
    difficulty: 0.3,
    retrievability: 1.0,
    lastReviewed: null,
    nextReviewAt: null,
    reviewCount: 0,
    lapseCount: 0,
    totalStudyTimeSeconds: 0,
  };
}

/**
 * Apply a review to a concept state.
 * Returns the updated state and the next review date.
 */
function applyReview(
  state: ConceptState,
  rating: ReviewRating,
  studyTimeSeconds: number = 0
): { state: ConceptState; nextReviewAt: string } {
  const elapsed = elapsedDaysSince(state.lastReviewed);
  const retrievability = computeRetrievability(state.stability, elapsed);

  let newStability: number;
  let newMastery: number;

  if (rating === 0) {
    // Again: failure
    newStability = state.stability * STABILITY_MULTIPLIERS[0];
    newMastery = Math.max(0, state.mastery + MASTERY_INCREMENTS[0]);
  } else {
    // Success: hard, good, or easy
    const multiplier = STABILITY_MULTIPLIERS[rating];
    const difficultyBonus = 1 + state.difficulty * 0.1;
    newStability = state.stability * multiplier * difficultyBonus;
    newMastery = Math.min(1, state.mastery + MASTERY_INCREMENTS[rating]);
  }

  // Cap stability to reasonable bounds
  newStability = Math.max(0.1, Math.min(365, newStability));

  const nextReviewAt = addDays(newStability);

  return {
    state: {
      ...state,
      mastery: newMastery,
      stability: newStability,
      retrievability,
      lastReviewed: new Date().toISOString(),
      nextReviewAt,
      reviewCount: state.reviewCount + 1,
      lapseCount: rating === 0 ? state.lapseCount + 1 : state.lapseCount,
      totalStudyTimeSeconds: state.totalStudyTimeSeconds + studyTimeSeconds,
    },
    nextReviewAt,
  };
}

// ─── Graph-Aware Implicit Updates ───────────────────────────────────────────

/**
 * When reviewing concept C, propagate credit/penalties through the graph.
 *
 * Credit travels DOWN (prerequisites get partial credit):
 *   "Reviewing C implies reviewing its prerequisites"
 *
 * Penalties travel UP (dependents get penalized on failure):
 *   "Failing C means you probably forgot things that build on C"
 */
function computeImplicitUpdates(
  engine: GraphEngine,
  conceptId: string,
  rating: ReviewRating,
  states: Map<string, ConceptState>
): ImplicitUpdate[] {
  const updates: ImplicitUpdate[] = [];

  if (rating === 0) {
    // ─── Penalty travels UP (dependents) ──────────────────────────────────
    const dependents = engine.getEdgesFrom(conceptId, { type: 'REQUIRES' });
    for (const edge of dependents) {
      const dependentId = edge.to;
      const weight = edge.weight ?? 1.0;
      const depState = states.get(dependentId);
      if (!depState) continue;

      const penalty = weight * FAILURE_PENALTY;
      const newMastery = Math.max(0, depState.mastery - penalty);

      updates.push({
        conceptId: dependentId,
        direction: 'up',
        credit: -penalty,
        oldMastery: depState.mastery,
        newMastery,
      });

      // Update the state in-place
      states.set(dependentId, {
        ...depState,
        mastery: newMastery,
        stability: depState.stability * 0.9, // slight stability hit too
      });
    }
  } else {
    // ─── Credit travels DOWN (prerequisites) ──────────────────────────────
    const prerequisites = engine.getEdgesTo(conceptId, { type: 'REQUIRES' });
    for (const edge of prerequisites) {
      const prereqId = edge.from;
      const weight = edge.weight ?? 1.0;
      const prereqState = states.get(prereqId);

      // Time discount: more credit if prereq was almost due
      let timeDiscount = 1.0;
      if (prereqState?.nextReviewAt) {
        const daysUntilDue = elapsedDaysSince(prereqState.nextReviewAt);
        // If nextReviewAt is in the future, daysUntilDue is negative
        // If it's in the past, daysUntilDue is positive
        timeDiscount = daysUntilDue < 0
          ? 1.0 // already due = full credit
          : Math.max(0, 1 - daysUntilDue / prereqState.stability);
      }

      const credit = Math.min(MAX_IMPLICIT_CREDIT, weight * timeDiscount * 0.3);
      if (credit < 0.05) continue; // Too small to matter

      if (prereqState) {
        const newMastery = Math.min(1, prereqState.mastery + credit * 0.2);
        const newStability = prereqState.stability * (1 + credit * 0.5);

        updates.push({
          conceptId: prereqId,
          direction: 'down',
          credit,
          oldMastery: prereqState.mastery,
          newMastery,
        });

        states.set(prereqId, {
          ...prereqState,
          mastery: newMastery,
          stability: Math.min(365, newStability),
        });
      } else {
        // Initialize prerequisite with partial credit
        const newState = initConceptState(prereqId);
        newState.mastery = credit * 0.5;
        newState.stability = 2.0;
        states.set(prereqId, newState);

        updates.push({
          conceptId: prereqId,
          direction: 'down',
          credit,
          oldMastery: 0,
          newMastery: newState.mastery,
        });
      }
    }
  }

  return updates;
}

// ─── Main API ───────────────────────────────────────────────────────────────

/**
 * Process a review for a concept.
 *
 * @param engine The graph engine (for prerequisite lookups)
 * @param states Map of conceptId → ConceptState (mutated in place)
 * @param conceptId The concept being reviewed
 * @param rating 0=Again, 1=Hard, 2=Good, 3=Easy
 * @param studyTimeSeconds How long the user spent (optional)
 * @returns ReviewResult with the update + all implicit graph updates
 */
export function processReview(
  engine: GraphEngine,
  states: Map<string, ConceptState>,
  conceptId: string,
  rating: ReviewRating,
  studyTimeSeconds: number = 0
): ReviewResult {
  // Get or init state
  let state = states.get(conceptId);
  if (!state) {
    state = initConceptState(conceptId);
    states.set(conceptId, state);
  }

  const oldMastery = state.mastery;
  const oldStability = state.stability;

  // Apply direct review
  const { state: newState, nextReviewAt } = applyReview(state, rating, studyTimeSeconds);
  states.set(conceptId, newState);

  // Apply graph-aware implicit updates
  const implicitUpdates = computeImplicitUpdates(engine, conceptId, rating, states);

  return {
    conceptId,
    rating,
    oldMastery,
    newMastery: newState.mastery,
    oldStability,
    newStability: newState.stability,
    nextReviewAt,
    implicitUpdates,
  };
}

/**
 * Get concepts due for review right now.
 */
export function getDueConcepts(states: Map<string, ConceptState>): ConceptState[] {
  const now = Date.now();
  const due: ConceptState[] = [];

  for (const state of states.values()) {
    if (!state.nextReviewAt) {
      // Never reviewed = due immediately
      due.push(state);
      continue;
    }
    if (new Date(state.nextReviewAt).getTime() <= now) {
      due.push(state);
    }
  }

  // Sort by retrievability (most likely to be forgotten first)
  return due.sort((a, b) => a.retrievability - b.retrievability);
}

/**
 * Get the learning frontier: concepts ready to learn.
 * A concept is ready when all hard prerequisites (weight > 0.7) have mastery >= 0.5.
 */
export function getLearningFrontier(
  engine: GraphEngine,
  states: Map<string, ConceptState>
): { conceptId: string; label: string; depth: number }[] {
  const frontier: { conceptId: string; label: string; depth: number }[] = [];

  for (const node of engine.getAllNodes()) {
    if (node.type !== 'CONCEPT') continue;

    const prereqEdges = engine.getEdgesTo(node.id, { type: 'REQUIRES' });
    if (prereqEdges.length === 0) continue;

    // Check if already mastered
    const state = states.get(node.id);
    if (state && state.mastery >= 0.7) continue;

    // Check prerequisites
    const hardPrereqs = prereqEdges.filter(e => (e.weight ?? 1.0) > 0.7);
    const allReady = hardPrereqs.every(e => {
      const ps = states.get(e.from);
      return ps && ps.mastery >= 0.5;
    });

    if (allReady) {
      frontier.push({
        conceptId: node.id,
        label: node.labels.default,
        depth: prereqEdges.length,
      });
    }
  }

  return frontier.sort((a, b) => a.depth - b.depth);
}

/**
 * Estimate total daily review load (in minutes) given current states.
 */
export function estimateDailyLoad(
  states: Map<string, ConceptState>,
  secondsPerReview: number = 15
): { count: number; minutes: number } {
  const due = getDueConcepts(states);
  return {
    count: due.length,
    minutes: Math.round((due.length * secondsPerReview) / 60),
  };
}
