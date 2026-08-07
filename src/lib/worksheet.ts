/**
 * Worksheet builder — derives a per-lesson worksheet from data we already have:
 * the lesson's vocabulary set + the lesson's authored practice exercises.
 *
 * No new authored content: the same page renders interactively on screen and
 * prints to paper/PDF, with an answer key.
 */

import { getLessonContent, type PracticeExercise } from '@/data/teaching-content';
import { getVocabForLesson, type VocabWord } from '@/data/vocabulary';

export interface Worksheet {
  lessonId: number;
  title: string;
  vocab: VocabWord[];
  practice: PracticeExercise[];
}

/** Assemble the worksheet for a lesson, or null if the lesson has no content. */
export function buildWorksheet(lessonId: number): Worksheet | null {
  const content = getLessonContent(lessonId);
  if (!content) return null;

  const practice = content.cards
    .filter((c) => c.type === 'practice' && c.exercise)
    .map((c) => c.exercise as PracticeExercise);

  return {
    lessonId,
    title: content.title,
    vocab: getVocabForLesson(lessonId),
    practice,
  };
}
