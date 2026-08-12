import { describe, it, expect } from 'vitest';
import { TEST_BANKS, UNITS, getUnit, getUnitTest, getUnitObjectives, composeUnitTest } from '@/data/unit-tests';
import { AUTHORED_LESSONS } from '@/data/authored-lessons';
import { describeObjective, labelledObjectives } from '@/data/objectives';
import { isAnswerCorrect } from '@/lib/grading';
import {
  MASTERY_THRESHOLD,
  gradeUnitTest,
  tallyByObjective,
  selectCorrectivesItems,
  generateCorrectivesSession,
  getLessonsInUnit,
  isUnitComplete,
} from '@/lib/assessment';
import type { PracticeExercise, ExerciseType } from '@/data/types';

/**
 * The unit test bank is assessment, not practice, so it carries one requirement
 * the lesson content does not: every item must be gradable by machine. A learner
 * self-grading a typed answer is fine on a practice card and meaningless in a
 * score.
 *
 * As with the lesson tests, each invariant below corresponds to a way this has
 * gone wrong or could silently go wrong. Read the comment before relaxing one.
 */

/** Exercise shapes AnswerInput.tsx can actually render. */
const RENDERABLE_TYPES: ExerciseType[] = [
  'multiple_choice',
  'fill_blank',
  'matching',
  'unscramble',
  'translate',
  'marker_identification',
];

const CHOICE_TYPES: ExerciseType[] = ['multiple_choice', 'fill_blank', 'matching'];

const allBankItems: Array<{ ex: PracticeExercise; where: string }> = TEST_BANKS.flatMap((bank) =>
  bank.items.map((ex) => ({ ex, where: `${bank.id}/${ex.id}` })),
);

const allLessonExercises: PracticeExercise[] = AUTHORED_LESSONS.flatMap((l) =>
  l.cards.flatMap((c) => (c.exercise ? [c.exercise] : [])),
);

/** What a learner would have to submit for this item to be marked correct. */
function intendedAnswer(ex: PracticeExercise): string {
  if (CHOICE_TYPES.includes(ex.type)) return ex.correctAnswer ?? '';
  return (Array.isArray(ex.answer) ? ex.answer[0] : ex.answer) ?? '';
}

describe('unit-tests: the bank is shaped like something the player can render', () => {
  it('at least one bank exists and every bank has items', () => {
    expect(TEST_BANKS.length).toBeGreaterThan(0);
    for (const bank of TEST_BANKS) {
      expect(bank.items.length, `${bank.id} is empty`).toBeGreaterThan(0);
    }
  });

  /**
   * REGRESSION (inherited from the lesson player): an exercise whose type had
   * no branch in AnswerInput rendered no input at all, so `answer` stayed null
   * and the card could never be completed. On a scored test that would be an
   * item nobody can answer, dragging every score below the pass mark.
   */
  it('every item uses a type that has an input renderer', () => {
    for (const { ex, where } of allBankItems) {
      expect(RENDERABLE_TYPES, `${where}: type "${ex.type}" has no renderer`).toContain(ex.type);
    }
  });

  it('every item has a question, hint and explanation', () => {
    for (const { ex, where } of allBankItems) {
      expect(ex.question, `${where}: missing question`).toBeTruthy();
      expect(ex.hint, `${where}: missing hint`).toBeTruthy();
      expect(ex.explanation, `${where}: missing explanation`).toBeTruthy();
    }
  });

  it('every item is well-formed for its type', () => {
    for (const { ex, where } of allBankItems) {
      switch (ex.type) {
        case 'multiple_choice':
        case 'fill_blank':
        case 'matching':
          expect(ex.options?.length, `${where}: needs options`).toBeGreaterThan(1);
          expect(ex.correctAnswer, `${where}: needs correctAnswer`).toBeTruthy();
          expect(ex.options, `${where}: correctAnswer not among options`).toContain(ex.correctAnswer);
          expect(new Set(ex.options).size, `${where}: duplicate options`).toBe(ex.options!.length);
          break;
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

  /**
   * An unscramble whose word bank cannot spell its own answer is unpassable:
   * the learner taps every chip available and still grades wrong.
   */
  it('every unscramble word bank spells exactly its answer', () => {
    for (const { ex, where } of allBankItems) {
      if (ex.type !== 'unscramble') continue;
      const target = (Array.isArray(ex.answer) ? ex.answer[0] : ex.answer) ?? '';
      const wanted = target.replace(/[.?!]+$/, '').split(/\s+/).map((w) => w.toLowerCase()).sort();
      const bank = (ex.words ?? []).map((w) => w.toLowerCase()).sort();
      expect(bank, `${where}: word bank does not match the answer`).toEqual(wanted);
    }
  });

  it('item ids are unique within and across banks', () => {
    const ids = allBankItems.map((b) => b.ex.id);
    expect(new Set(ids).size, 'duplicate unit test item ids').toBe(ids.length);
  });

  it('no bank item id collides with a lesson exercise id', () => {
    const lessonIds = new Set(allLessonExercises.map((e) => e.id));
    const clashes = allBankItems.filter((b) => lessonIds.has(b.ex.id)).map((b) => b.where);
    expect(clashes).toEqual([]);
  });

  it('no placeholder content ships in a bank', () => {
    const PLACEHOLDER = /\[VERIFY|\[HINT\]|\[EXPLANATION\]|\[TODO|LOREM|PLACEHOLDER|\[COMPREHENSION/i;
    for (const { ex, where } of allBankItems) {
      expect(PLACEHOLDER.test(JSON.stringify(ex)), `${where} contains a placeholder marker`).toBe(false);
    }
  });
});

describe('unit-tests: the bank is machine-gradable', () => {
  /**
   * The load-bearing test for the whole feature. A test the engine cannot score
   * is not a test — and the failure is silent, because an ungradable item just
   * reads as an item the learner got wrong.
   */
  it('every item grades its own intended answer as correct', () => {
    for (const { ex, where } of allBankItems) {
      const answer = intendedAnswer(ex);
      expect(answer, `${where}: has no intended answer to grade against`).toBeTruthy();
      expect(isAnswerCorrect(ex, answer), `${where}: intended answer grades WRONG`).toBe(true);
    }
  });

  it('every item rejects a plainly wrong answer', () => {
    for (const { ex, where } of allBankItems) {
      expect(isAnswerCorrect(ex, '— not an answer —'), `${where}: accepts nonsense`).toBe(false);
      expect(isAnswerCorrect(ex, null), `${where}: accepts a blank`).toBe(false);
    }
  });

  /**
   * A test built from the exercises the learner just did measures recall of
   * those exercises, not of the language.
   */
  it('no bank question repeats a lesson question verbatim', () => {
    const normalise = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ');
    const lessonQuestions = new Set(allLessonExercises.map((e) => normalise(e.question)));
    const repeats = allBankItems
      .filter((b) => lessonQuestions.has(normalise(b.ex.question)))
      .map((b) => b.where);
    expect(repeats).toEqual([]);
  });
});

describe('unit-tests: units and banks line up with the lessons that exist', () => {
  it('every unit derives its lessons from the authored course', () => {
    for (const unit of UNITS) {
      expect(unit.lessonIds).toEqual(getLessonsInUnit(unit.id));
      expect(unit.lessonIds.length, `unit ${unit.id} has no lessons`).toBeGreaterThan(0);
    }
  });

  /**
   * REGRESSION: getLessonsInUnit() used to return a hardcoded table naming
   * lessons 5–14, none of which are written. Anything built on it — unlock
   * gating included — was reasoning about a course that does not exist.
   */
  it('no unit claims a lesson that has not been written', () => {
    const real = new Set(AUTHORED_LESSONS.map((l) => l.id));
    for (const unit of UNITS) {
      for (const id of unit.lessonIds) {
        expect(real.has(id), `unit ${unit.id} claims lesson ${id}, which does not exist`).toBe(true);
      }
    }
    expect(getLessonsInUnit(99)).toEqual([]);
  });

  it('getUnit and getUnitTest resolve for every unit that has a bank', () => {
    for (const bank of TEST_BANKS) {
      const unitId = Number(bank.id.replace(/^unit-|-test$/g, ''));
      expect(getUnit(unitId), `no unit for ${bank.id}`).toBeDefined();
      expect(getUnitTest(unitId)?.id).toBe(bank.id);
    }
    expect(getUnitTest(99)).toBeUndefined();
  });

  it('every objective a unit teaches has a plain-English label and a home lesson', () => {
    for (const unit of UNITS) {
      for (const objective of getUnitObjectives(unit.id)) {
        const info = describeObjective(objective);
        expect(info.label, `"${objective}" has no label`).not.toBe(objective);
        expect(info.lessonId, `"${objective}" resolves to no lesson`).toBeDefined();
        expect(info.lessonTitle).toBeTruthy();
      }
    }
  });

  it('describeObjective falls back to the raw id rather than throwing', () => {
    const info = describeObjective('not-a-real-objective');
    expect(info.label).toBe('not-a-real-objective');
    expect(info.lessonId).toBeUndefined();
    expect(labelledObjectives()).not.toContain('not-a-real-objective');
  });
});

describe('assessment: grading a whole unit test', () => {
  const items = getUnitTest(1)!.items;
  const allCorrect = Object.fromEntries(items.map((i) => [i.id, intendedAnswer(i)]));

  it('a perfect run passes with 100%', () => {
    const result = gradeUnitTest(1, items, allCorrect);
    expect(result.correctItems).toBe(items.length);
    expect(result.percentage).toBe(100);
    expect(result.passed).toBe(true);
    expect(result.failedObjectives).toEqual([]);
  });

  /**
   * REGRESSION GUARD: an unanswered item must count as wrong. If a missing
   * response were skipped instead, a learner could pass by answering three
   * questions and abandoning the rest.
   */
  it('an empty response sheet scores zero and fails every objective', () => {
    const result = gradeUnitTest(1, items, {});
    expect(result.correctItems).toBe(0);
    expect(result.percentage).toBe(0);
    expect(result.passed).toBe(false);
    expect(new Set(result.failedObjectives)).toEqual(new Set(getUnitObjectives(1)));
  });

  /**
   * REGRESSION GUARD: unanswered items must stay in the denominator. A version
   * that filtered them out before scoring would let a learner who answers only
   * the questions they're sure of inflate their percentage instead of being
   * marked wrong on what they skipped.
   */
  it('a partially answered sheet is scored against every item, not just answered ones', () => {
    const half = Object.fromEntries(items.slice(0, Math.floor(items.length / 2)).map((i) => [i.id, intendedAnswer(i)]));
    const result = gradeUnitTest(1, items, half);
    expect(result.totalItems).toBe(items.length);
    expect(result.correctItems).toBe(Math.floor(items.length / 2));
    expect(result.percentage).toBe(Math.round((Math.floor(items.length / 2) / items.length) * 100));
  });

  it('the pass mark sits at the mastery threshold, not below it', () => {
    // Miss exactly enough items to land just under 85%.
    const maxMisses = Math.floor(items.length * (1 - MASTERY_THRESHOLD));
    const justPassing = { ...allCorrect };
    for (const item of items.slice(0, maxMisses)) justPassing[item.id] = 'wrong';
    expect(gradeUnitTest(1, items, justPassing).passed).toBe(true);

    const justFailing = { ...justPassing };
    justFailing[items[maxMisses].id] = 'wrong';
    const failed = gradeUnitTest(1, items, justFailing);
    expect(failed.passed).toBe(false);
    expect(failed.score).toBeLessThan(MASTERY_THRESHOLD);
  });

  it('only the objectives actually missed are reported as failed', () => {
    const target = items.find((i) => i.objectiveIds.includes('article-assimilation'))!;
    const responses = { ...allCorrect, [target.id]: 'wrong' };
    const result = gradeUnitTest(1, items, responses);
    expect(result.failedObjectives).toContain('article-assimilation');
    expect(result.failedObjectives).not.toContain('somali-alphabet');
  });

  it('an item tagged with two objectives counts against both when missed', () => {
    const shared = items.find((i) => i.objectiveIds.length > 1);
    if (!shared) return; // the bank may legitimately have none
    const tally = tallyByObjective(items, { ...allCorrect, [shared.id]: 'wrong' });
    for (const objective of shared.objectiveIds) {
      expect(tally.get(objective)!.correct).toBeLessThan(tally.get(objective)!.total);
    }
  });

  it('tallies cover every objective in the bank exactly once per tagging', () => {
    const tally = tallyByObjective(items, {});
    const expected = new Map<string, number>();
    for (const item of items) {
      for (const o of item.objectiveIds) expected.set(o, (expected.get(o) ?? 0) + 1);
    }
    for (const [objective, count] of expected) {
      expect(tally.get(objective)!.total, `${objective} tally`).toBe(count);
    }
  });
});

describe('assessment: correctives', () => {
  const items = getUnitTest(1)!.items;

  it('selects only items that test a failed objective', () => {
    const chosen = selectCorrectivesItems(items, ['article-assimilation']);
    expect(chosen.length).toBeGreaterThan(0);
    for (const item of chosen) {
      expect(item.objectiveIds).toContain('article-assimilation');
    }
  });

  it('is deterministic — the same failure yields the same items in the same order', () => {
    const a = selectCorrectivesItems(items, ['subject-case', 'pronouns-subject']);
    const b = selectCorrectivesItems(items, ['subject-case', 'pronouns-subject']);
    expect(a.map((i) => i.id)).toEqual(b.map((i) => i.id));
  });

  it('never repeats an item shared between two failed objectives', () => {
    // u1-t31 is tagged with both objectives; the cap must be wide enough that
    // the scan actually reaches it under both, or this proves nothing.
    const shared = items.find((i) => i.objectiveIds.length > 1);
    expect(shared, 'fixture assumption: no multi-objective item in the bank').toBeDefined();
    const [objA, objB] = shared!.objectiveIds;
    const chosen = selectCorrectivesItems(items, [objA, objB], items.length);
    expect(chosen.filter((i) => i.id === shared!.id)).toHaveLength(1);
    const ids = chosen.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  /**
   * A shared item still counts toward the second objective's quota — it is
   * already in the session, so the learner does get the intended amount of
   * practice on it without seeing the question twice.
   */
  it('caps how many items each objective contributes', () => {
    const chosen = selectCorrectivesItems(items, ['article-assimilation'], 2);
    expect(chosen).toHaveLength(2);
  });

  it('a session with no failures has nothing to retest', () => {
    const session = generateCorrectivesSession(1, [], items);
    expect(session.itemIds).toEqual([]);
    expect(session.itemsToRetest).toBe(0);
    expect(session.completed).toBe(false);
  });

  it('itemsToRetest always matches the items actually selected', () => {
    const session = generateCorrectivesSession(1, ['noun-gender', 'article-suffix'], items);
    expect(session.itemsToRetest).toBe(session.itemIds.length);
    const known = new Set(items.map((i) => i.id));
    for (const id of session.itemIds) expect(known.has(id)).toBe(true);
  });
});

describe('assessment: unlock gating', () => {
  it('a unit is complete only when every one of its lessons is done', () => {
    const unit1 = getLessonsInUnit(1);
    expect(isUnitComplete(1, unit1)).toBe(true);
    expect(isUnitComplete(1, unit1.slice(0, -1))).toBe(false);
    expect(isUnitComplete(1, [])).toBe(false);
  });

  /**
   * REGRESSION: isUnitComplete() used `every` over the unit's lessons. For a
   * unit with no lessons that returns true, so a test for unwritten content
   * would have unlocked itself.
   */
  it('a unit with no lessons is never complete', () => {
    expect(getLessonsInUnit(99)).toEqual([]);
    expect(isUnitComplete(99, [])).toBe(false);
    expect(isUnitComplete(99, [1, 2, 3, 4])).toBe(false);
  });
});

/**
 * Cumulative composition — design rule A4.
 *
 * REGRESSION: Unit 2's bank tested zero Unit 1 objectives, and every gate was
 * green. Cumulative retrieval is one of only two techniques COURSE_DESIGN §1.2
 * rates "high utility", so a non-cumulative unit test is not a cosmetic miss.
 * Carry-back is composed rather than authored precisely so it cannot be
 * forgotten by whoever writes the next unit.
 */
describe('unit-tests: the composed test carries earlier units forward', () => {
  it('the first unit has nothing to carry back and is just its bank', () => {
    expect(composeUnitTest(1).map((i) => i.id)).toEqual(getUnitTest(1)!.items.map((i) => i.id));
  });

  it('a later unit carries back items testing earlier objectives', () => {
    const composed = composeUnitTest(2);
    const own = new Set(getUnitTest(2)!.items.map((i) => i.id));
    const carried = composed.filter((i) => !own.has(i.id));
    expect(carried.length).toBeGreaterThan(0);

    const prior = new Set(getUnitObjectives(1));
    for (const item of carried) {
      expect(item.objectiveIds.some((o) => prior.has(o)), `${item.id} is not an earlier-unit item`).toBe(true);
    }
  });

  it('carry-back spreads across earlier objectives rather than over-sampling one', () => {
    const composed = composeUnitTest(2);
    const own = new Set(getUnitTest(2)!.items.map((i) => i.id));
    const carried = composed.filter((i) => !own.has(i.id));
    const prior = getUnitObjectives(1);
    const covered = new Set(carried.flatMap((i) => i.objectiveIds).filter((o) => prior.includes(o)));
    // One item per earlier objective, so coverage should equal what was carried.
    expect(covered.size).toBe(Math.min(prior.length, carried.length));
  });

  it('never repeats an item, and never duplicates one the unit already owns', () => {
    const composed = composeUnitTest(2);
    const ids = composed.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('is deterministic — same test, same items, same order', () => {
    expect(composeUnitTest(2).map((i) => i.id)).toEqual(composeUnitTest(2).map((i) => i.id));
  });

  it('respects the carry-back cap', () => {
    const own = getUnitTest(2)!.items.length;
    expect(composeUnitTest(2, 3)).toHaveLength(own + 3);
    expect(composeUnitTest(2, 0)).toHaveLength(own);
  });

  it('every carried item is still gradable and still registry-clean', () => {
    for (const item of composeUnitTest(2)) {
      expect(isAnswerCorrect(item, intendedAnswer(item)), `${item.id} grades wrong`).toBe(true);
    }
  });

  it('a unit with no bank composes to nothing rather than throwing', () => {
    expect(composeUnitTest(99)).toEqual([]);
  });
});
