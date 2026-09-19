import { describe, expect, it } from 'vitest';
import { AUTHORED_LESSONS } from '@/data/authored-lessons';
import { ALL_LESSON_OBJECTIVES, COURSE_OUTCOMES } from '@/data/course-outcomes';

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
    expect([...new Set(transfer.flatMap((e) => e.lessonIds))].sort()).toEqual([5, 8]);
  });

  it('points specific evidence ids at real exercises in the named lessons', () => {
    const generic = new Set(['lesson-production', 'homework-production', 'metalinguistic-feedback']);
    for (const outcome of COURSE_OUTCOMES) {
      for (const evidence of outcome.evidence) {
        for (const evidenceId of evidence.evidenceIds) {
          if (generic.has(evidenceId) || evidenceId.startsWith('homework:')) continue;
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
