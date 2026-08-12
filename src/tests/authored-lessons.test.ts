import { describe, it, expect } from 'vitest';
// `?raw` gives the file as a string through Vite, so this needs no node types.
import lessonCardsSrc from '@/components/lesson/LessonCards.tsx?raw';
import unitTestSrc from '@/pages/UnitTest.tsx?raw';
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

/**
 * REGRESSION: a card carrying content the player never renders.
 *
 * Lesson 5's payoff card was authored with an `exercise`, but RenderCard maps
 * `payoff` to IntroCard, which reads only `prompt` and `content`. The card
 * rendered as a bare heading — the promised closing question simply was not
 * there — and the build, all tests, and the validator stayed green, because
 * every one of them looks at the data rather than at what the player does with
 * it. That is the same shape as the Lesson 1 softlock.
 *
 * This table mirrors RenderCard in LessonCards.tsx. If a card type gains a
 * renderer branch there, update it here; if these disagree, content goes
 * invisible in exactly the way that is hardest to notice.
 */
describe('authored-lessons: every card renders the content it carries', () => {
  /** Fields RenderCard actually reads, per card type. */
  const RENDERS: Record<string, Array<'prompt' | 'content' | 'exercise' | 'vocab'>> = {
    blueprint: ['prompt', 'content'],
    connect: ['prompt', 'content'],
    promise: ['prompt', 'content'],
    payoff: ['prompt', 'content'],
    predict: ['prompt', 'content'],
    teach: ['content'],
    example: ['content'],
    notice: ['exercise'],
    complete: ['exercise'],
    produce: ['exercise'],
    summary: ['content'],
  };

  it('no card carries a field its own card type does not render', () => {
    const ignored: string[] = [];
    for (const lesson of AUTHORED_LESSONS) {
      for (const card of lesson.cards) {
        const rendered = RENDERS[card.type];
        if (!rendered) {
          ignored.push(`L${lesson.id}/${card.id}: type "${card.type}" has no renderer branch`);
          continue;
        }
        for (const field of ['prompt', 'content', 'exercise'] as const) {
          if (card[field] && !rendered.includes(field)) {
            ignored.push(`L${lesson.id}/${card.id}: "${field}" is set but a ${card.type} card never renders it`);
          }
        }
      }
    }
    expect(ignored).toEqual([]);
  });

  it('every card renders at least one thing', () => {
    const blank: string[] = [];
    for (const lesson of AUTHORED_LESSONS) {
      for (const card of lesson.cards) {
        const rendered = RENDERS[card.type] ?? [];
        if (!rendered.some((f) => f !== 'vocab' && card[f as 'prompt' | 'content' | 'exercise'])) {
          blank.push(`L${lesson.id}/${card.id} (${card.type}) renders nothing`);
        }
      }
    }
    expect(blank).toEqual([]);
  });
});

/**
 * REGRESSION: AnswerInput must be keyed by exercise id, everywhere.
 *
 * AnswerInput keeps the assembled word bank of an `unscramble` in its own
 * state. Rendered without a `key`, React reuses the same instance from one card
 * to the next, so the words tapped on card 13 arrive already-placed on card 14
 * and card 14's own chips render as spent. Check Answer stays disabled and the
 * learner is stuck — the Lesson 1 softlock, in a new costume.
 *
 * It hid for a long time because it only bites when two stateful inputs appear
 * back to back, which no lesson did until Lesson 8. The unit test player was
 * keyed from the start and the lesson player was not, so nothing compared them.
 *
 * This reads the source because the invariant is structural: there is no
 * component-rendering setup here, and an unkeyed AnswerInput is invisible to
 * every data-level check.
 */
describe('lesson player: stateful inputs are keyed', () => {
  it('every <AnswerInput> is keyed by exercise id', () => {
    const roots: Array<[string, string]> = [
      ['LessonCards.tsx', lessonCardsSrc],
      ['UnitTest.tsx', unitTestSrc],
    ];
    const unkeyed: string[] = [];
    for (const [file, src] of roots) {
      for (const m of src.matchAll(/<AnswerInput\b([\s\S]{0,220}?)\/>/g)) {
        if (!/\bkey=\{/.test(m[1])) unkeyed.push(`${file}: an <AnswerInput> has no key`);
      }
    }
    expect(unkeyed).toEqual([]);
  });
});
