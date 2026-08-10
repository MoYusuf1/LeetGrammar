import { describe, it, expect } from 'vitest';
import { isAnswerCorrect, normalizeAnswer, displayAnswer } from '@/lib/grading';
import type { PracticeExercise } from '@/data/types';
import { AUTHORED_LESSONS } from '@/data/authored-lessons';

const ex = (over: Partial<PracticeExercise>): PracticeExercise => ({
  id: 't',
  type: 'multiple_choice',
  question: 'q',
  hint: 'h',
  explanation: 'e',
  objectiveIds: ['o'],
  ...over,
});

describe('normalizeAnswer', () => {
  it('ignores case, padding, repeated spaces and trailing punctuation', () => {
    expect(normalizeAnswer('  Wiilku   waa  macallin. ')).toBe('wiilku waa macallin');
  });

  it('does not strip internal punctuation', () => {
    expect(normalizeAnswer("su'aal")).toBe("su'aal");
  });
});

describe('isAnswerCorrect — choice types', () => {
  const mcq = ex({ type: 'multiple_choice', options: ['a', 'b'], correctAnswer: 'b' });

  it('accepts the correct option and rejects the wrong one', () => {
    expect(isAnswerCorrect(mcq, 'b')).toBe(true);
    expect(isAnswerCorrect(mcq, 'a')).toBe(false);
  });

  it('rejects a null answer', () => {
    expect(isAnswerCorrect(mcq, null)).toBe(false);
  });

  it('is exact for choice types — no normalisation', () => {
    expect(isAnswerCorrect(mcq, 'B')).toBe(false);
  });
});

describe('isAnswerCorrect — unscramble', () => {
  const unscramble = ex({
    type: 'unscramble',
    words: ['macallin', 'Wiilku', 'waa'],
    answer: 'Wiilku waa macallin',
  });

  it('accepts the correct word order', () => {
    expect(isAnswerCorrect(unscramble, 'Wiilku waa macallin')).toBe(true);
  });

  it('accepts it regardless of case and trailing period', () => {
    expect(isAnswerCorrect(unscramble, 'wiilku waa macallin.')).toBe(true);
  });

  it('rejects a wrong order', () => {
    expect(isAnswerCorrect(unscramble, 'waa Wiilku macallin')).toBe(false);
  });

  it('rejects a partial answer', () => {
    expect(isAnswerCorrect(unscramble, 'waa macallin')).toBe(false);
  });

  it('rejects the empty string the component emits before any word is tapped', () => {
    expect(isAnswerCorrect(unscramble, '')).toBe(false);
  });

  /**
   * REGRESSION: the target was once stored in `somali` rather than `answer`.
   * `somali` is rendered above the word bank, so the card both showed its own
   * answer and graded every correct response as wrong — isAnswerCorrect only
   * ever reads `answer`.
   */
  it('can never be correct if the target is in `somali` instead of `answer`', () => {
    const misauthored = ex({
      type: 'unscramble',
      words: ['macallin', 'Wiilku', 'waa'],
      somali: 'Wiilku waa macallin',
    });
    expect(isAnswerCorrect(misauthored, 'Wiilku waa macallin')).toBe(false);
  });
});

describe('isAnswerCorrect — free response', () => {
  it('accepts a translate answer up to normalisation', () => {
    const t = ex({ type: 'translate', answer: 'mindida' });
    expect(isAnswerCorrect(t, ' Mindida ')).toBe(true);
    expect(isAnswerCorrect(t, 'mindita')).toBe(false);
  });

  /**
   * Somali has genuine variants — Nilsson gives both "gabadh/gabar" for girl,
   * so both definite forms are correct. Accepting only the first would mark a
   * correct learner answer wrong.
   */
  it('accepts ANY of several allowed answers, not just the first', () => {
    const t = ex({ type: 'translate', answer: ['gabadha', 'gabarta'] });
    expect(isAnswerCorrect(t, 'gabadha')).toBe(true);
    expect(isAnswerCorrect(t, 'gabarta')).toBe(true);
    expect(isAnswerCorrect(t, 'gabadhta')).toBe(false);
  });
});

describe('displayAnswer', () => {
  it('prefers correctAnswer, then answer, joining arrays', () => {
    expect(displayAnswer(ex({ correctAnswer: 'b' }))).toBe('b');
    expect(displayAnswer(ex({ type: 'translate', answer: 'mindida' }))).toBe('mindida');
    expect(displayAnswer(ex({ type: 'translate', answer: ['a', 'b'] }))).toBe('a · b');
  });
});

describe('every authored exercise is actually gradable', () => {
  /**
   * The end-to-end guarantee: for each exercise in the shipped course, feeding
   * its own stated answer back in must grade as correct. This is what catches
   * an answer stored in the wrong field, which type-checking cannot.
   */
  it('grades its own stated answer as correct', () => {
    const failures: string[] = [];
    for (const lesson of AUTHORED_LESSONS) {
      for (const card of lesson.cards) {
        const e = card.exercise;
        if (!e) continue;
        const own =
          e.correctAnswer ?? (Array.isArray(e.answer) ? e.answer[0] : e.answer);
        if (own === undefined) {
          failures.push(`${e.id}: no answer of any kind`);
          continue;
        }
        if (!isAnswerCorrect(e, own)) failures.push(`${e.id}: own answer graded wrong`);
      }
    }
    expect(failures).toEqual([]);
  });
});
