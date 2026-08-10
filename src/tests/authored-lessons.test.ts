import { describe, it, expect } from 'vitest';
import {
  MAX_LESSON_ID,
  LESSON_LIST,
  AUTHORED_LESSONS,
  getLessonContent,
} from '@/data/authored-lessons';
import type { PracticeExercise, ExerciseType, CardType } from '@/data/types';
import { getVocabForLesson, TOP_500_WORDS } from '@/data/vocabulary';

/**
 * These invariants exist because each one corresponds to a defect that actually
 * shipped. Read the comment on a failing test before "fixing" it by relaxing it.
 */

/** Exercise shapes that LessonCards.tsx `AnswerInput` can actually render. */
const RENDERABLE_TYPES: ExerciseType[] = [
  'multiple_choice',
  'fill_blank',
  'matching',
  'unscramble',
  'translate',
  'marker_identification',
];

/** Card roles that must carry an exercise. */
const PRACTICE_ROLES: CardType[] = ['notice', 'complete', 'produce'];

describe('authored-lessons: course shape', () => {
  it('LESSON_LIST covers exactly lessons 1..MAX_LESSON_ID with no gaps', () => {
    expect(LESSON_LIST).toHaveLength(MAX_LESSON_ID);
    const ids = LESSON_LIST.map((l) => l.lessonId).sort((a, b) => a - b);
    expect(ids).toEqual(Array.from({ length: MAX_LESSON_ID }, (_, i) => i + 1));
  });

  it('every listed lesson resolves, and cardCount matches the authored cards', () => {
    for (const { lessonId, cardCount } of LESSON_LIST) {
      const lesson = getLessonContent(lessonId);
      expect(lesson, `lesson ${lessonId} missing`).toBeDefined();
      expect(lesson!.cards).toHaveLength(cardCount);
    }
  });

  it('every lesson opens on a blueprint and closes on a summary', () => {
    for (const lesson of AUTHORED_LESSONS) {
      expect(lesson.cards[0]?.type, `lesson ${lesson.id} first card`).toBe('blueprint');
      expect(lesson.cards.at(-1)?.type, `lesson ${lesson.id} last card`).toBe('summary');
    }
  });

  it('card ids are unique within a lesson', () => {
    for (const lesson of AUTHORED_LESSONS) {
      const ids = lesson.cards.map((c) => c.id);
      expect(new Set(ids).size, `lesson ${lesson.id} has duplicate card ids`).toBe(ids.length);
    }
  });
});

describe('authored-lessons: exercises are answerable', () => {
  const allExercises: Array<{ ex: PracticeExercise; where: string }> = [];
  for (const lesson of AUTHORED_LESSONS) {
    lesson.cards.forEach((card, i) => {
      if (card.exercise) allExercises.push({ ex: card.exercise, where: `lesson ${lesson.id} card ${i} (${card.id})` });
    });
  }

  /**
   * REGRESSION: `notice` was briefly both a CardType and an ExerciseType. An
   * exercise typed 'notice' matched no branch in PracticeCard, so no input
   * rendered, `answer` stayed null, and "Check Answer" was disabled forever —
   * Lesson 1 could not be completed.
   */
  it('every exercise uses a type that has an input renderer', () => {
    for (const { ex, where } of allExercises) {
      expect(RENDERABLE_TYPES, `${where}: type "${ex.type}" has no renderer`).toContain(ex.type);
    }
  });

  it('every practice-role card carries an exercise', () => {
    for (const lesson of AUTHORED_LESSONS) {
      for (const card of lesson.cards) {
        if (PRACTICE_ROLES.includes(card.type)) {
          expect(card.exercise, `${card.id} is a ${card.type} card with no exercise`).toBeDefined();
        }
      }
    }
  });

  it('every exercise has a question, hint, and explanation', () => {
    for (const { ex, where } of allExercises) {
      expect(ex.question, `${where}: missing question`).toBeTruthy();
      expect(ex.hint, `${where}: missing hint`).toBeTruthy();
      expect(ex.explanation, `${where}: missing explanation`).toBeTruthy();
    }
  });

  it('every exercise is well-formed for its type', () => {
    for (const { ex, where } of allExercises) {
      switch (ex.type) {
        case 'multiple_choice':
        case 'fill_blank':
        case 'matching':
          expect(ex.options?.length, `${where}: needs options`).toBeGreaterThan(1);
          expect(ex.correctAnswer, `${where}: needs correctAnswer`).toBeTruthy();
          expect(ex.options, `${where}: correctAnswer not among options`).toContain(ex.correctAnswer);
          expect(new Set(ex.options).size, `${where}: duplicate options`).toBe(ex.options!.length);
          break;
        /**
         * REGRESSION: an unscramble once carried its target in `somali`
         * instead of `answer`. `somali` is rendered above the word bank, so
         * the card displayed its own answer — and isAnswerCorrect() reads
         * `answer`, so a correct response was still graded wrong.
         */
        case 'unscramble':
          expect(ex.words?.length, `${where}: needs a word bank`).toBeGreaterThan(1);
          expect(ex.answer, `${where}: needs a target in "answer"`).toBeTruthy();
          expect(ex.somali, `${where}: must NOT set "somali" — it reveals the answer`).toBeUndefined();
          break;
        case 'translate':
          expect(ex.answer, `${where}: needs an answer`).toBeTruthy();
          break;
        case 'marker_identification':
          expect(ex.somali, `${where}: needs a source sentence`).toBeTruthy();
          expect(ex.answer, `${where}: needs an answer`).toBeTruthy();
          break;
      }
    }
  });

  it('exercise ids are unique across the course', () => {
    const ids = allExercises.map((a) => a.ex.id);
    expect(new Set(ids).size, 'duplicate exercise ids').toBe(ids.length);
  });
});

describe('authored-lessons: no placeholder content ships', () => {
  /**
   * REGRESSION: a previous pass shipped ten auto-generated items reading
   * "[VERIFY SOMALI]" / "[HINT]" / "[EXPLANATION]" purely to pad an item count
   * past a validator threshold.
   */
  const PLACEHOLDER = /\[VERIFY|\[HINT\]|\[EXPLANATION\]|\[TODO|LOREM|PLACEHOLDER|\[COMPREHENSION/i;

  it('no lesson card contains placeholder markers', () => {
    for (const lesson of AUTHORED_LESSONS) {
      for (const card of lesson.cards) {
        const blob = JSON.stringify(card);
        expect(PLACEHOLDER.test(blob), `${card.id} contains a placeholder marker`).toBe(false);
      }
    }
  });

  it('no vocabulary entry contains placeholder markers', () => {
    for (const w of TOP_500_WORDS) {
      expect(PLACEHOLDER.test(w.somali + w.english), `vocab "${w.somali}" contains a placeholder`).toBe(false);
    }
  });
});

describe('authored-lessons: vocabulary alignment', () => {
  it('getVocabForLesson only returns words tagged for that lesson', () => {
    for (const { lessonId } of LESSON_LIST) {
      for (const w of getVocabForLesson(lessonId)) {
        expect(w.lessonId).toBe(lessonId);
      }
    }
  });

  /**
   * REGRESSION: vocabulary carried entries for lessons 15-26 long after those
   * lessons stopped existing, so words were tagged to lessons no learner could
   * ever reach.
   */
  it('no vocabulary is tagged to a lesson that does not exist', () => {
    const orphans = TOP_500_WORDS.filter((w) => w.lessonId < 1 || w.lessonId > MAX_LESSON_ID);
    expect(orphans.map((w) => `${w.somali}→L${w.lessonId}`)).toEqual([]);
  });

  it('every built lesson has vocabulary', () => {
    for (const { lessonId } of LESSON_LIST) {
      expect(getVocabForLesson(lessonId).length, `lesson ${lessonId} has no vocab`).toBeGreaterThan(0);
    }
  });

  it('no duplicate Somali headwords', () => {
    const seen = new Map<string, number>();
    const dupes: string[] = [];
    for (const w of TOP_500_WORDS) {
      if (seen.has(w.somali)) dupes.push(`${w.somali} (L${seen.get(w.somali)} & L${w.lessonId})`);
      else seen.set(w.somali, w.lessonId);
    }
    expect(dupes).toEqual([]);
  });
});
