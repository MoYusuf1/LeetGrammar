import { describe, it, expect } from 'vitest';
import { composeHomework, carryBackCount, HOMEWORK_SIZE, CARRY_BACK_SHARE } from '@/lib/homework';
import { AUTHORED_LESSONS } from '@/data/authored-lessons';
import { isAnswerCorrect } from '@/lib/grading';
import type { PracticeExercise, ExerciseType } from '@/data/types';

/**
 * Homework is Layer 2 of the design's three-layer assessment, and the course ran
 * eight lessons without it. §1.2 rates exactly two techniques "high utility":
 * practice testing and distributed practice. Layers 1 and 3 are both the former.
 * This layer is the only thing that distributes anything, so the invariants
 * below are about *retention*, not about scoring.
 */

const CHOICE: ExerciseType[] = ['multiple_choice', 'fill_blank', 'matching'];
const PRODUCTION: ExerciseType[] = ['translate', 'unscramble', 'marker_identification'];

const intended = (ex: PracticeExercise): string =>
  CHOICE.includes(ex.type) ? ex.correctAnswer ?? '' : (Array.isArray(ex.answer) ? ex.answer[0] : ex.answer) ?? '';

const laterLessons = AUTHORED_LESSONS.filter((l) => AUTHORED_LESSONS.some((e) => e.id < l.id));

describe('homework: it exists for every lesson and is gradable', () => {
  it('composes a set for every lesson', () => {
    for (const lesson of AUTHORED_LESSONS) {
      expect(composeHomework(lesson.id).length, `L${lesson.id} composes nothing`).toBeGreaterThan(0);
    }
  });

  it('every item grades its own intended answer', () => {
    for (const lesson of AUTHORED_LESSONS) {
      for (const item of composeHomework(lesson.id)) {
        expect(isAnswerCorrect(item, intended(item)), `L${lesson.id}/${item.id} grades wrong`).toBe(true);
      }
    }
  });

  it('never repeats an item within one set', () => {
    for (const lesson of AUTHORED_LESSONS) {
      const ids = composeHomework(lesson.id).map((i) => i.id);
      expect(new Set(ids).size, `L${lesson.id} has duplicates`).toBe(ids.length);
    }
  });

  it('a lesson that does not exist composes nothing rather than throwing', () => {
    expect(composeHomework(99)).toEqual([]);
  });
});

/**
 * REGRESSION GUARD: the whole point of Layer 2. Homework built only from the
 * lesson just finished is a third helping of blocked practice — design rule A3
 * asks for ≥30% carry-back, and §1.5 puts the first interleaving here.
 */
describe('homework: it carries earlier lessons forward', () => {
  it('every lesson after the first carries back at least 30%', () => {
    for (const lesson of laterLessons) {
      const items = composeHomework(lesson.id);
      const share = carryBackCount(lesson.id, items) / items.length;
      expect(share, `L${lesson.id} carries back only ${Math.round(share * 100)}%`).toBeGreaterThanOrEqual(
        CARRY_BACK_SHARE,
      );
    }
  });

  it('the first lesson carries back nothing, having nothing to carry', () => {
    const first = AUTHORED_LESSONS.reduce((a, b) => (a.id < b.id ? a : b));
    expect(carryBackCount(first.id, composeHomework(first.id))).toBe(0);
  });

  it('carried items really do come from earlier lessons', () => {
    const own = new Set(AUTHORED_LESSONS.find((l) => l.id === 5)!.objectives);
    const carried = composeHomework(5).filter((i) => !i.objectiveIds.some((o) => own.has(o)));
    const earlier = new Set(AUTHORED_LESSONS.filter((l) => l.id < 5).flatMap((l) => l.objectives));
    for (const item of carried) {
      expect(item.objectiveIds.some((o) => earlier.has(o)), `${item.id} is from neither this lesson nor an earlier one`).toBe(true);
    }
  });
});

/**
 * §3.2 asks homework to be "retryable with fresh items". This is also the
 * mechanism that answers the unit-test complaint — a retry that serves the same
 * questions lets a learner pass by recalling the answer screen.
 */
describe('homework: retrying serves different items', () => {
  it('a second attempt is not the first attempt again', () => {
    for (const lesson of laterLessons) {
      const a = composeHomework(lesson.id, 0).map((i) => i.id);
      const b = composeHomework(lesson.id, 1).map((i) => i.id);
      expect(b, `L${lesson.id} serves an identical retry`).not.toEqual(a);
    }
  });

  it('is deterministic — the same attempt gives the same set', () => {
    expect(composeHomework(5, 2).map((i) => i.id)).toEqual(composeHomework(5, 2).map((i) => i.id));
  });
});

/**
 * §3.2: "production-weighted; minimal MCQ". Lessons 1 and 2 cannot reach this —
 * their objectives are facts about the language with nothing to type — so the
 * assertion is scoped to lessons whose material can actually be produced.
 */
describe('homework: it leans on production', () => {
  it('lessons 3 and up are majority production', () => {
    for (const lesson of AUTHORED_LESSONS.filter((l) => l.id >= 3)) {
      const items = composeHomework(lesson.id);
      const share = items.filter((i) => PRODUCTION.includes(i.type)).length / items.length;
      expect(share, `L${lesson.id} is only ${Math.round(share * 100)}% production`).toBeGreaterThan(0.5);
    }
  });

  it('aims for the size the design asks for', () => {
    for (const lesson of laterLessons) {
      expect(composeHomework(lesson.id)).toHaveLength(HOMEWORK_SIZE);
    }
  });
});
