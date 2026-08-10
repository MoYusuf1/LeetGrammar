/**
 * Worksheet builder — derives a per-lesson worksheet from data we already have:
 * the lesson's vocabulary set + the lesson's authored practice exercises.
 *
 * No new authored content: the same page renders interactively on screen and
 * prints to paper/PDF, with an answer key.
 */

import { getLessonContent } from '@/data/authored-lessons';
import { getVocabForLesson, type VocabWord } from '@/data/vocabulary';
import type { PracticeExercise } from '@/data/types';

export interface Worksheet {
  lessonId: number;
  title: string;
  vocab: VocabWord[];
  practice: PracticeExercise[];
}

/** Assemble the worksheet for a lesson, or null if the lesson has no content. */
export function buildWorksheet(lessonId: number): Worksheet | null {
  const lesson = getLessonContent(lessonId);
  if (!lesson) return null;

  // Extract practice exercises from cards (notice, complete, produce types have exercises)
  const practice = lesson.cards
    .filter((c) => c.exercise && ['notice', 'complete', 'produce'].includes(c.type))
    .map((c) => c.exercise as PracticeExercise);

  return {
    lessonId,
    title: lesson.title,
    vocab: getVocabForLesson(lessonId),
    practice,
  };
}
