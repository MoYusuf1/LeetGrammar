import { describe, it, expect } from 'vitest';
import {
  MAX_LESSON_ID,
  LESSON_LIST,
  getLessonContent,
  type PracticeExercise,
} from '@/data/teaching-content';
import { getVocabForLesson } from '@/data/vocabulary';

describe('teaching-content', () => {
  it('LESSON_LIST has exactly MAX_LESSON_ID entries, numbered 1..MAX_LESSON_ID', () => {
    expect(LESSON_LIST).toHaveLength(MAX_LESSON_ID);
    const ids = LESSON_LIST.map((l) => l.lessonId).sort((a, b) => a - b);
    expect(ids).toEqual(Array.from({ length: MAX_LESSON_ID }, (_, i) => i + 1));
  });

  it('every lesson exists and has at least an intro and a summary card', () => {
    for (const { lessonId } of LESSON_LIST) {
      const content = getLessonContent(lessonId);
      expect(content, `lesson ${lessonId} missing`).toBeDefined();
      expect(content!.cards[0]?.type).toBe('intro');
      expect(content!.cards.at(-1)?.type).toBe('summary');
    }
  });

  it('cardCount in LESSON_LIST matches the actual authored card count', () => {
    for (const { lessonId, cardCount } of LESSON_LIST) {
      const content = getLessonContent(lessonId);
      expect(content!.cards).toHaveLength(cardCount);
    }
  });

  function validateExercise(ex: PracticeExercise, where: string) {
    expect(ex.question, where).toBeTruthy();
    expect(ex.hint, where).toBeTruthy();
    expect(ex.explanation, where).toBeTruthy();

    switch (ex.type) {
      case 'multiple_choice':
      case 'fill_blank':
      case 'matching':
        expect(ex.options?.length, where).toBeGreaterThan(0);
        expect(ex.correctAnswer, where).toBeTruthy();
        expect(ex.options, where).toContain(ex.correctAnswer);
        break;
      case 'unscramble':
        expect(ex.words?.length, where).toBeGreaterThan(0);
        expect(typeof ex.answer, where).toBe('string');
        break;
      case 'translate':
        expect(typeof ex.answer, where).toBe('string');
        break;
      case 'marker_identification':
        expect(ex.somali, where).toBeTruthy();
        expect(Array.isArray(ex.answer) && ex.answer.length === 3, where).toBe(true);
        break;
    }
  }

  it('every practice card exercise has a well-formed shape for its type', () => {
    for (const { lessonId } of LESSON_LIST) {
      const content = getLessonContent(lessonId)!;
      content.cards.forEach((card, i) => {
        if (card.type !== 'practice') return;
        expect(card.exercise, `lesson ${lessonId} card ${i}`).toBeDefined();
        validateExercise(card.exercise!, `lesson ${lessonId} card ${i}`);
      });
    }
  });

  it('ported unscramble/translate/marker_identification cards exist in the lessons they were assigned to', () => {
    const typesByLesson: Record<number, string[]> = {};
    for (const { lessonId } of LESSON_LIST) {
      const content = getLessonContent(lessonId)!;
      typesByLesson[lessonId] = content.cards
        .filter((c) => c.type === 'practice')
        .map((c) => c.exercise!.type);
    }
    expect(typesByLesson[7]).toContain('translate'); // Prepositions & Spatial Relations
    expect(typesByLesson[13]).toContain('unscramble'); // Word Order & Simple Sentences
    expect(typesByLesson[17]).toContain('fill_blank'); // Conjunctions & Discourse (connectors)
    expect(typesByLesson[20]).toContain('marker_identification'); // Special Topics (Focus)
    expect(typesByLesson[26]).toContain('translate'); // Comprehensive Review & Mastery
  });

  it('getVocabForLesson only ever returns words tagged for that lesson', () => {
    for (const { lessonId } of LESSON_LIST) {
      const words = getVocabForLesson(lessonId);
      for (const w of words) {
        expect(w.lessonId).toBe(lessonId);
      }
    }
  });
});
