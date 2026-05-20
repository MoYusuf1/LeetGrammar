/**
 * SRS Engine — Spaced Repetition with graph-aware scheduling.
 *
 * Uses SM-2 algorithm for intervals, but respects REQUIRES edges:
 * a concept is only "due" if all its prerequisites have mastery ≥ 3.
 */

import type { GraphEngine } from './graph-engine';

export interface SrsCard {
  conceptId: string;
  repetition: number;   // times successfully reviewed
  interval: number;     // days until next review
  ef: number;           // easiness factor
  dueDate: string;      // ISO date string
  lastReviewed: string; // ISO date string
  mastery: number;      // 0-5, derived from repetition + performance
}

export interface ReviewSession {
  conceptId: string;
  questionType: 'recall' | 'recognition' | 'production';
  prompt: string;
  answer: string;
  context?: string;
}

const DEFAULT_EF = 2.5;
const MIN_EF = 1.3;

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Initialize a new SRS card for a concept.
 */
export function createCard(conceptId: string): SrsCard {
  const today = getToday();
  return {
    conceptId,
    repetition: 0,
    interval: 0,
    ef: DEFAULT_EF,
    dueDate: today,
    lastReviewed: '',
    mastery: 0,
  };
}

/**
 * Review a card with a quality score (0-5).
 * 5 = perfect, 4 = correct with hesitation, 3 = correct with difficulty,
 * 2 = incorrect but familiar, 1 = incorrect, 0 = complete blackout.
 */
export function reviewCard(card: SrsCard, quality: number): SrsCard {
  const today = getToday();
  let { repetition, interval, ef } = card;

  // Update easiness factor
  ef = ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ef < MIN_EF) ef = MIN_EF;

  // Update interval and repetition
  if (quality >= 3) {
    if (repetition === 0) interval = 1;
    else if (repetition === 1) interval = 6;
    else interval = Math.round(interval * ef);
    repetition++;
  } else {
    repetition = 0;
    interval = 1;
  }

  // Calculate due date
  const due = new Date(today);
  due.setDate(due.getDate() + interval);

  // Mastery = min(5, repetition + quality bonus)
  const mastery = Math.min(5, repetition + Math.max(0, quality - 3));

  return {
    ...card,
    repetition,
    interval,
    ef,
    dueDate: due.toISOString().split('T')[0],
    lastReviewed: today,
    mastery,
  };
}

/**
 * Check if a concept's prerequisites are sufficiently mastered.
 * Returns true if ALL REQUIRES prerequisites have mastery ≥ minMastery.
 */
export function prerequisitesMet(
  engine: GraphEngine,
  cards: Map<string, SrsCard>,
  conceptId: string,
  minMastery = 3
): boolean {
  const prereqEdges = engine.getEdgesTo(conceptId).filter((e) => e.type === 'REQUIRES');
  if (prereqEdges.length === 0) return true;

  return prereqEdges.every((e) => {
    const card = cards.get(e.from);
    return card && card.mastery >= minMastery;
  });
}

/**
 * Get all concepts that are due for review today.
 * Respects prerequisite mastery gating.
 */
export function getDueConcepts(
  engine: GraphEngine,
  cards: Map<string, SrsCard>
): string[] {
  const today = getToday();
  const due: string[] = [];

  for (const [conceptId, card] of cards) {
    if (card.dueDate <= today && prerequisitesMet(engine, cards, conceptId)) {
      due.push(conceptId);
    }
  }

  // Sort by mastery (lower first = harder concepts prioritized)
  due.sort((a, b) => {
    const ma = cards.get(a)?.mastery ?? 0;
    const mb = cards.get(b)?.mastery ?? 0;
    if (ma !== mb) return ma - mb;
    return (cards.get(a)?.interval ?? 0) - (cards.get(b)?.interval ?? 0);
  });

  return due;
}

/**
 * Get learning recommendations: concepts that are NOT yet in the SRS
 * but have all prerequisites mastered.
 */
export function getNewConcepts(
  engine: GraphEngine,
  cards: Map<string, SrsCard>
): string[] {
  const allConcepts = engine.getAllNodes().filter((n) => n.type === 'CONCEPT');
  const newConcepts: string[] = [];

  for (const concept of allConcepts) {
    if (cards.has(concept.id)) continue;
    if (prerequisitesMet(engine, cards, concept.id, 3)) {
      newConcepts.push(concept.id);
    }
  }

  return newConcepts;
}

/**
 * Get overall stats.
 */
export function getSrsStats(cards: Map<string, SrsCard>) {
  const today = getToday();
  let dueToday = 0;
  let learning = 0; // mastery < 3
  let mastered = 0; // mastery >= 3

  for (const card of cards.values()) {
    if (card.dueDate <= today) dueToday++;
    if (card.mastery >= 3) mastered++;
    else learning++;
  }

  return { dueToday, learning, mastered, total: cards.size };
}
