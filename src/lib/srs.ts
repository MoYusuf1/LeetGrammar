/**
 * SRS primitives — SM-2 spaced repetition scheduling.
 *
 * Graph-aware scheduling (prerequisite gating, due/new concept queries) was
 * removed along with the knowledge-graph engine. These two functions are
 * generic (no graph dependency) and are kept for a possible future
 * vocab-review feature — see docs/PONYTAIL_DEBT.md.
 */

export interface SrsCard {
  conceptId: string;
  repetition: number;   // times successfully reviewed
  interval: number;     // days until next review
  ef: number;           // easiness factor
  dueDate: string;      // ISO date string
  lastReviewed: string; // ISO date string
  mastery: number;      // 0-5, derived from repetition + performance
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
