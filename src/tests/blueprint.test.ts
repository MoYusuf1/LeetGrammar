import { describe, it, expect } from 'vitest';
import {
  AUTHORED_LESSONS,
  slotsFilledBy,
  slotsCompletedBefore,
} from '@/data/authored-lessons';
import { BLUEPRINT_SLOTS } from '@/data/types';

/**
 * THE BLUEPRINT IS THE COURSE'S SPINE, AND IT USED TO LIE.
 *
 * `blueprintSlot` was a single value, so a lesson could claim exactly one box.
 * COURSE_DESIGN §4B.1's progression table says Lesson 2 adds "WHO / WHAT can
 * hold a noun" and Lesson 3 "those boxes can be made definite" — both plural —
 * so WHAT was never claimed by anything, while Lesson 8's blueprint card told
 * the learner "Every box is filled."
 *
 * These guard the two properties that were actually broken: every box gets
 * filled by something, and the claim Lesson 8 makes is true by the time it
 * makes it.
 */
describe('blueprint: every box is filled by some lesson', () => {
  it('no slot is left unclaimed across the whole course', () => {
    const claimed = new Set(AUTHORED_LESSONS.flatMap(slotsFilledBy));
    for (const slot of BLUEPRINT_SLOTS) {
      expect(claimed.has(slot), `${slot} is drawn on every blueprint but no lesson fills it`).toBe(
        true,
      );
    }
  });

  it('Lesson 8 can honestly say "every box is filled"', () => {
    const last = AUTHORED_LESSONS.reduce((a, b) => (a.id > b.id ? a : b));
    const byThen = new Set([...slotsCompletedBefore(last.id), ...slotsFilledBy(last)]);
    for (const slot of BLUEPRINT_SLOTS) {
      expect(byThen.has(slot), `${slot} still empty at the final lesson`).toBe(true);
    }
  });
});

describe('blueprint: the done state is derived, and monotonic', () => {
  it('a lesson never counts its own boxes as already done', () => {
    for (const lesson of AUTHORED_LESSONS) {
      const own = slotsFilledBy(lesson);
      const before = slotsCompletedBefore(lesson.id);
      for (const slot of own) {
        // Legitimate when an earlier lesson also filled it — SIGNAL spans 5 and
        // 6, DO spans 7 and 8. The component resolves the overlap by letting
        // `current` win; this only records that the data can overlap.
        const alsoEarlier = AUTHORED_LESSONS.some(
          (l) => l.id < lesson.id && slotsFilledBy(l).includes(slot),
        );
        if (!alsoEarlier) {
          expect(before, `L${lesson.id} counts its own ${slot} as previously done`).not.toContain(
            slot,
          );
        }
      }
    }
  });

  it('completed slots only ever accumulate', () => {
    const ids = AUTHORED_LESSONS.map((l) => l.id).sort((a, b) => a - b);
    let previous: string[] = [];
    for (const id of ids) {
      const now = slotsCompletedBefore(id);
      for (const slot of previous) {
        expect(now, `${slot} was done before L${id} and then stopped being done`).toContain(slot);
      }
      previous = now;
    }
  });

  it('the first lesson has nothing behind it', () => {
    const first = AUTHORED_LESSONS.reduce((a, b) => (a.id < b.id ? a : b));
    expect(slotsCompletedBefore(first.id)).toEqual([]);
  });

  it('at Lesson 5, WHO is done and DO is not', () => {
    const done = slotsCompletedBefore(5);
    // The exact case the three-state rendering exists for: WHO is finished and
    // DO has not been met, and before this they rendered identically.
    expect(done).toContain('WHO');
    expect(done).toContain('WHAT');
    expect(done).not.toContain('DO');
  });
});
