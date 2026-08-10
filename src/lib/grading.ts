/**
 * Answer grading — pure functions, deliberately outside the view layer.
 *
 * These used to live inside LessonCards.tsx, where the only way to check them
 * was to drive the UI in a browser. That made a real grading bug (an unscramble
 * whose target was stored in the wrong field) indistinguishable from test-
 * harness flakiness. Keep grading here and unit-test it directly.
 */

import type { PracticeExercise } from '@/data/types';

/**
 * Lowercase, trim, collapse whitespace, drop trailing sentence punctuation.
 *
 * Lets an unscramble assembled by tapping chips ("Wiilku waa macallin") match
 * an authored answer written as a sentence ("Wiilku waa macallin.").
 */
export function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.?!]+$/, '');
}

/** Types whose answer is one of a fixed set of options. */
function isChoiceType(type: PracticeExercise['type']): boolean {
  return type === 'multiple_choice' || type === 'fill_blank' || type === 'matching';
}

/**
 * Is the learner's response correct?
 *
 * Choice types compare against `correctAnswer`; every other type compares
 * against `answer`. An exercise missing the field its type requires can never
 * be graded correct — see the shape assertions in the authored-lessons tests.
 */
export function isAnswerCorrect(exercise: PracticeExercise, answer: string | null): boolean {
  if (answer === null) return false;
  if (isChoiceType(exercise.type)) {
    return answer === exercise.correctAnswer;
  }
  // An array means several forms are genuinely correct — Somali has real
  // variants (gabadha / gabarta). Accept any of them, not just the first.
  const targets = Array.isArray(exercise.answer) ? exercise.answer : [exercise.answer];
  const given = normalizeAnswer(answer);
  return targets.some((t) => typeof t === 'string' && t !== '' && normalizeAnswer(t) === given);
}

/** The answer to show the learner after checking. */
export function displayAnswer(exercise: PracticeExercise): string {
  if (exercise.correctAnswer) return exercise.correctAnswer;
  if (Array.isArray(exercise.answer)) return exercise.answer.join(' · ');
  return exercise.answer ?? '';
}
