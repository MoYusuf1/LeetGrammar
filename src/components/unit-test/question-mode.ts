/**
 * What each question mode is called in the UI. Knowt's practice tests name
 * the mode on every question (multiple choice, true/false, written) so the
 * learner always knows what is being asked of them; ours do the same job for
 * this course's exercise shapes.
 *
 * Kept exhaustive over ExerciseType so a new exercise shape fails to compile
 * here rather than rendering an unlabeled test question.
 */

import type { ExerciseType } from '@/data/types';

export const QUESTION_MODE: Record<ExerciseType, string> = {
  multiple_choice: 'Multiple choice',
  fill_blank: 'Fill in the blank',
  matching: 'Matching',
  unscramble: 'Sentence builder',
  translate: 'Written answer',
  marker_identification: 'Spot the marker',
};
