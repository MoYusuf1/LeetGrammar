import { describe, expect, it } from 'vitest';
import { AUTHORED_LESSONS } from '@/data/authored-lessons';
import { ALL_LESSON_OBJECTIVES, COURSE_OUTCOMES } from '@/data/course-outcomes';
import { LESSON_TRANSFER_ITEM_IDS, TEST_BANKS } from '@/data/unit-tests';

describe('course outcomes', () => {
  it('maps every implemented lesson objective to at least one course outcome', () => {
    const mapped = new Set(COURSE_OUTCOMES.flatMap((o) => o.objectiveIds));
    expect(ALL_LESSON_OBJECTIVES.filter((id) => !mapped.has(id))).toEqual([]);
  });

  it('does not map objectives the implemented course never teaches', () => {
    const taught = new Set(AUTHORED_LESSONS.flatMap((l) => l.objectives));
    expect(COURSE_OUTCOMES.flatMap((o) => o.objectiveIds).filter((id) => !taught.has(id))).toEqual([]);
  });

  it('requires every outcome to have implemented direct evidence', () => {
    for (const outcome of COURSE_OUTCOMES) {
      expect(outcome.canDo.startsWith('I can '), outcome.id).toBe(true);
      expect(outcome.evidence.some((e) => e.implemented), outcome.id).toBe(true);
      expect(outcome.evidence.every((e) => e.lessonIds.length > 0 && e.evidenceIds.length > 0), outcome.id).toBe(true);
    }
  });

  it('keeps transfer evidence in the approved vertical-slice lessons', () => {
    const transfer = COURSE_OUTCOMES.flatMap((o) => o.evidence)
      .filter((e) => e.mode === 'unseen-reading' || e.mode === 'written-interaction');
    expect([...new Set(transfer.flatMap((e) => e.lessonIds))].sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('points specific evidence ids at real exercises in the named lessons', () => {
    const generic = new Set(['lesson-production', 'homework-production', 'metalinguistic-feedback']);
    for (const outcome of COURSE_OUTCOMES) {
      for (const evidence of outcome.evidence) {
        for (const evidenceId of evidence.evidenceIds) {
          if (generic.has(evidenceId) || evidenceId.startsWith('homework:') || evidenceId.startsWith('unit-bank:')) continue;
          const foundIn = AUTHORED_LESSONS
            .filter((lesson) => evidence.lessonIds.includes(lesson.id))
            .some((lesson) => lesson.cards.some((card) => card.exercise?.id === evidenceId));
          expect(foundIn, `${outcome.id}: ${evidenceId}`).toBe(true);
        }
      }
    }
  });

  it('keeps bounded connected-writing evidence explicit and implemented', () => {
    const evidence = COURSE_OUTCOMES.flatMap((outcome) => outcome.evidence)
      .filter((item) => item.mode === 'connected-writing' && item.implemented);
    expect(evidence.map((item) => item.evidenceIds).flat()).toContain('l8-connected-write');
  });

});


describe('all-lesson transfer evidence', () => {
  it('assigns each lesson sourced parallel items that are absent from its lesson prompts', () => {
    const bankItems = TEST_BANKS.flatMap((bank) => bank.items);
    for (const lesson of AUTHORED_LESSONS) {
      const ids = LESSON_TRANSFER_ITEM_IDS[lesson.id] ?? [];
      expect(ids.length, `lesson ${lesson.id} has no parallel transfer evidence`).toBeGreaterThan(0);
      const lessonQuestions = new Set(lesson.cards.flatMap((card) => card.exercise ? [card.exercise.question.trim().toLowerCase()] : []));
      for (const id of ids) {
        const item = bankItems.find((candidate) => candidate.id === id);
        expect(item, `${id} is not a bank item`).toBeTruthy();
        expect(lessonQuestions.has(item!.question.trim().toLowerCase()), `${id} repeats lesson ${lesson.id}`).toBe(false);
        expect(item!.objectiveIds.some((objective) => lesson.objectives.includes(objective)), `${id} misses lesson ${lesson.id} objectives`).toBe(true);
      }
    }
  });

  it('records delayed transfer for every lesson without treating immediate practice as evidence', () => {
    const delayed = COURSE_OUTCOMES.flatMap((outcome) => outcome.evidence).filter((e) => e.mode === 'delayed-transfer');
    expect([...new Set(delayed.flatMap((e) => e.lessonIds))].sort()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
