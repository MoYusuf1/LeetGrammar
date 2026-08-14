/**
 * Grouping the card flow into swipeable STEPS.
 *
 * THE PROBLEM THIS SOLVES. A lesson is ~13 cards and most of them are prose,
 * so finishing one meant pressing "Got it" a dozen times. That is a slideshow,
 * not an app.
 *
 * THE RULE. A retrieval card is always its own step. Consecutive passive cards
 * merge into one step, which the learner reads as a single screen and swipes
 * past.
 *
 * WHY MERGING IS SAFE AGAINST CHECK T2. Design rule S5 allows no run of more
 * than three cards without retrieval (§1.16), and T2 fails the build on a
 * breach. Merging only ever groups a *maximal passive run*, and T2 already
 * caps those runs at three — so a merged step is bounded at three cards by
 * construction, and the number of passive screens between retrievals can only
 * go down, never up. Compliance is preserved rather than assumed.
 *
 * `isRetrieval` must stay identical to the definition the vocab-deck injection
 * uses in LessonCards. If the two drift, the deck lands in one place and the
 * steps are computed around another — which is exactly the class of bug that
 * hid the original S5 breach: it existed only in the injected flow, so nothing
 * reading `lesson.cards` could see it.
 */

import type { Card as TeachingCard } from '@/data/types';

/** A vocab deck injected into the lesson flow (not part of the authored cards). */
export interface VocabFlowCard {
  type: 'vocab';
  words: import('@/data/vocabulary').VocabWord[];
}

export type FlowCard = TeachingCard | VocabFlowCard;

/**
 * A card that demands something of the learner: any card carrying an exercise,
 * plus `predict`, which asks for a guess before the answer is shown.
 */
export function isRetrieval(card: FlowCard): boolean {
  return Boolean((card as TeachingCard).exercise) || card.type === 'predict';
}

export interface Step {
  cards: FlowCard[];
  /** Index in the flat card array of this step's first card. */
  startIndex: number;
  /** The exercise this step gates on, if any. */
  exercise?: TeachingCard['exercise'];
}

/** Groups a flat card flow into steps, merging maximal runs of passive cards. */
export function buildSteps(cards: FlowCard[]): Step[] {
  const steps: Step[] = [];
  let run: FlowCard[] = [];
  let runStart = 0;

  const flushRun = () => {
    if (run.length > 0) {
      steps.push({ cards: run, startIndex: runStart });
      run = [];
    }
  };

  cards.forEach((card, i) => {
    if (isRetrieval(card)) {
      flushRun();
      steps.push({
        cards: [card],
        startIndex: i,
        exercise: (card as TeachingCard).exercise,
      });
    } else {
      if (run.length === 0) runStart = i;
      run.push(card);
    }
  });
  flushRun();

  return steps;
}

/**
 * Which step contains a given card index.
 *
 * Card position is what gets persisted, not step position — Learn.tsx reports
 * "Card 4 of 17" from it, and a learner's stored progress predates steps
 * existing. Resuming maps the stored card back onto its step.
 */
export function stepForCard(steps: Step[], cardIndex: number): number {
  for (let i = steps.length - 1; i >= 0; i--) {
    if (cardIndex >= steps[i].startIndex) return i;
  }
  return 0;
}
