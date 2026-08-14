/**
 * Step grouping — guards the claim that merging passive cards cannot breach
 * design rule S5.
 *
 * S5 allows no run of more than three cards without retrieval (§1.16), and
 * validator check T2 fails the build on a breach. The lesson player merges
 * consecutive passive cards into one swipeable step, and the safety argument is
 * that a merged step is exactly a maximal passive run — so T2's existing cap
 * bounds it at three by construction.
 *
 * That argument is only true if `isRetrieval` here stays identical to the one
 * the vocab-deck injection uses. If they drift, the deck lands in one place and
 * the steps are computed around another — which is the exact shape of the bug
 * that hid the original S5 breach, since it existed only in the injected flow
 * and nothing reading `lesson.cards` could see it.
 */

import { describe, it, expect } from 'vitest';
import { AUTHORED_LESSONS } from '@/data/authored-lessons';
import { getVocabForLesson } from '@/data/vocabulary';
import { buildSteps, isRetrieval, stepForCard, type FlowCard } from '@/components/lesson/steps';

/** Mirrors the injection in LessonCards so tests measure the real flow. */
function flowFor(lessonId: number): FlowCard[] {
  const lesson = AUTHORED_LESSONS.find((l) => l.id === lessonId)!;
  const base: FlowCard[] = lesson.cards;
  const words = getVocabForLesson(lessonId);
  if (words.length === 0) return base;

  let seen = 0;
  let insertAt = base.length;
  for (let i = 0; i < base.length; i++) {
    if (isRetrieval(base[i]) && ++seen === 2) {
      insertAt = i + 1;
      break;
    }
  }
  return [...base.slice(0, insertAt), { type: 'vocab', words }, ...base.slice(insertAt)];
}

describe('buildSteps', () => {
  it('never merges more than three cards into one step, in any lesson', () => {
    for (const lesson of AUTHORED_LESSONS) {
      const steps = buildSteps(flowFor(lesson.id));
      const largest = Math.max(...steps.map((s) => s.cards.length));
      expect(largest, `lesson ${lesson.id} merged ${largest} cards into one step`).toBeLessThanOrEqual(3);
    }
  });

  it('gives every retrieval card a step of its own', () => {
    for (const lesson of AUTHORED_LESSONS) {
      for (const step of buildSteps(flowFor(lesson.id))) {
        if (step.cards.some(isRetrieval)) {
          expect(step.cards).toHaveLength(1);
        }
      }
    }
  });

  it('loses no cards and keeps them in order', () => {
    for (const lesson of AUTHORED_LESSONS) {
      const flow = flowFor(lesson.id);
      const flattened = buildSteps(flow).flatMap((s) => s.cards);
      expect(flattened).toEqual(flow);
    }
  });

  it('exposes the exercise on the step that gates on it', () => {
    for (const lesson of AUTHORED_LESSONS) {
      for (const step of buildSteps(flowFor(lesson.id))) {
        const card = step.cards[0] as { exercise?: unknown };
        if (step.cards.length === 1 && card.exercise) {
          expect(step.exercise).toBe(card.exercise);
        }
      }
    }
  });

  it('maps a persisted card position back onto its step', () => {
    /* Card position, not step position, is what gets stored — Learn.tsx reports
       "Card 4 of 17" from it and saved progress predates steps existing. */
    for (const lesson of AUTHORED_LESSONS) {
      const flow = flowFor(lesson.id);
      const steps = buildSteps(flow);
      flow.forEach((_, cardIndex) => {
        const s = stepForCard(steps, cardIndex);
        const step = steps[s];
        expect(cardIndex).toBeGreaterThanOrEqual(step.startIndex);
        expect(cardIndex).toBeLessThan(step.startIndex + step.cards.length);
      });
    }
  });

  it('starts at step 0 for an unseen lesson', () => {
    const steps = buildSteps(flowFor(1));
    expect(stepForCard(steps, 0)).toBe(0);
  });
});
