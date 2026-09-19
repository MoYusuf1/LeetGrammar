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
import { getContextualVocabForLesson, getVocabForLesson, TOP_500_WORDS } from '@/data/vocabulary';

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
      if (card.exercise) {
        allExercises.push({ ex: card.exercise, where: `lesson ${lesson.id} card ${i} (${card.id})` });
        /* Repair items are served to learners exactly like their parents, so
           every shape gate below applies to them too. */
        if (card.exercise.repair) {
          allExercises.push({ ex: card.exercise.repair, where: `lesson ${lesson.id} card ${i} (${card.id})/repair` });
        }
      }
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



  it('contextual decks are bounded and only draw from each lesson source set', () => {
    for (const { lessonId } of LESSON_LIST) {
      const source = new Set(getVocabForLesson(lessonId).map((word) => word.somali));
      const contextual = getContextualVocabForLesson(lessonId);
      expect(contextual.length, `lesson ${lessonId} has no contextual vocabulary`).toBeGreaterThan(0);
      expect(contextual.length, `lesson ${lessonId} contextual deck is oversized`).toBeLessThanOrEqual(12);
      for (const word of contextual) expect(source.has(word.somali)).toBe(true);
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
  const RENDERS: Record<string, Array<'prompt' | 'content' | 'exercise' | 'vocab' | 'passage'>> = {
    passage: ['passage', 'content'],
    blueprint: ['prompt', 'content'],
    connect: ['prompt', 'content'],
    promise: ['prompt', 'content'],
    payoff: ['prompt', 'content'],
    predict: ['prompt', 'content'],
    teach: ['content'],
    coach: ['content'],
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
        for (const field of ['prompt', 'content', 'exercise', 'passage'] as const) {
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
        if (!rendered.some((f) => f !== 'vocab' && card[f as 'prompt' | 'content' | 'exercise' | 'passage'])) {
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


describe('authored-lessons: reusable learning moves', () => {
  it('every lesson in the proven text-first curriculum teaches a coach move', () => {
    for (const lesson of AUTHORED_LESSONS) {
      const coaches = lesson.cards.filter((card) => card.type === 'coach');
      expect(coaches.length, `lesson ${lesson.id} has no Learning move`).toBeGreaterThan(0);
      for (const coach of coaches) {
        expect(coach.title, `lesson ${lesson.id} coach has no title`).toBeTruthy();
        expect(coach.content?.length ?? 0, `lesson ${lesson.id} coach is too thin`).toBeGreaterThan(120);
      }
    }
  });
});

describe('authored-lessons: flow-2 architecture (Learn→Repair→Retention)', () => {
  const flow2 = AUTHORED_LESSONS.filter((l) => l.flowVersion === 2);
  const passagesOf = (lesson: (typeof AUTHORED_LESSONS)[number]) =>
    lesson.cards.filter((c) => c.type === 'passage' && c.passage);

  it('every flow-2 lesson carries an original and a lexically distinct transfer passage', () => {
    for (const lesson of flow2) {
      const passages = passagesOf(lesson);
      expect(passages.length, `lesson ${lesson.id}: needs two passages`).toBeGreaterThanOrEqual(2);
      const tokens = (card: (typeof passages)[number]) =>
        new Set(
          card.passage!.lines.flatMap((l) => l.somali.toLowerCase().replace(/[.?!,]+$/, '').split(/\s+/)),
        );
      const distinct = passages.some((a, i) =>
        passages.slice(i + 1).some((b) => {
          const ta = tokens(a);
          const tb = tokens(b);
          return [...ta].filter((t) => !tb.has(t)).length + [...tb].filter((t) => !ta.has(t)).length >= 2;
        }),
      );
      expect(distinct, `lesson ${lesson.id}: transfer passage must differ from the original by at least two tokens`).toBe(true);
    }
  });

  it('in flow-2 lessons the text and its gist question precede rule talk', () => {
    for (const lesson of flow2) {
      const firstPassage = lesson.cards.findIndex((c) => c.type === 'passage');
      const firstGist = lesson.cards.findIndex((c) => c.exercise?.id.includes('gist'));
      const firstTeach = lesson.cards.findIndex((c) => (c.type === 'teach' || c.type === 'example') && c.isNew);
      expect(firstPassage, `lesson ${lesson.id}: no passage`).toBeGreaterThanOrEqual(0);
      expect(firstGist, `lesson ${lesson.id}: no gist exercise`).toBeGreaterThan(firstPassage);
      if (firstTeach !== -1) {
        expect(firstTeach, `lesson ${lesson.id}: explanation before gist`).toBeGreaterThan(firstGist);
      }
    }
  });

  it('every exercise in a flow-2 lesson has a fresh repair item on a shared objective', () => {
    for (const lesson of flow2) {
      const mainIds = new Set(lesson.cards.filter((c) => c.exercise).map((c) => c.exercise!.id));
      for (const card of lesson.cards) {
        if (!card.exercise) continue;
        const repair = card.exercise.repair;
        expect(repair, `${card.id}: missing repair item`).toBeDefined();
        expect(mainIds.has(repair!.id), `${card.id}: repair id collides`).toBe(false);
        expect(repair!.id, `${card.id}: repair reuses parent id`).not.toBe(card.exercise.id);
        expect(
          repair!.objectiveIds.some((o) => card.exercise!.objectiveIds.includes(o)),
          `${card.id}: repair shares no objective with its parent`,
        ).toBe(true);
        expect(repair!.question, `${card.id}: repair repeats the parent question`).not.toBe(card.exercise.question);
expect('repair' in repair!, `${card.id}: repair items must not nest`).toBe(false);
      }
    }
  });

  it('passage cards are real microtexts: a label, 1-4 lines, a gloss per line', () => {
    for (const lesson of flow2) {
      for (const card of passagesOf(lesson)) {
        expect(card.passage!.label, `${card.id}: no label`).toBeTruthy();
        expect(card.passage!.lines.length, `${card.id}: a microtext is 1-4 lines`).toBeGreaterThanOrEqual(1);
        expect(card.passage!.lines.length, `${card.id}: a microtext is 1-4 lines`).toBeLessThanOrEqual(4);
        for (const line of card.passage!.lines) {
          expect(line.gloss, `${card.id}: unglossed line "${line.somali}"`).toBeTruthy();
        }
      }
    }
  });
});
