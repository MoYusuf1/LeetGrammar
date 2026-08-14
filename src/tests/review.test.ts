import { describe, it, expect } from 'vitest';
import { seedReview, advanceReview, dueLessons, daysUntilDue, type ReviewSchedule } from '@/lib/review';
import { composeHomework } from '@/lib/homework';

/**
 * Spaced review is the cross-cutting layer of the design's assessment model, and
 * the half of debt 3 that homework alone did not close. Homework made
 * distributed practice possible; this decides *when*, so the learner is told
 * rather than having to remember.
 *
 * §1.4 is specific: fixed intervals (1, 3, 7, 14, 30, 60, 90 days), because
 * expanding schedules are not measurably better and cost far more. The tests
 * below pin that rather than the SM-2 behaviour in lib/srs.ts, which is
 * deliberately unused here.
 */

const DAY = 86_400_000;
const T0 = new Date('2026-01-01T09:00:00Z').getTime();

describe('review: the schedule follows fixed intervals', () => {
  it('a finished lesson comes back one day later, not immediately', () => {
    const e = seedReview(3, T0);
    expect(e.reviewCount).toBe(0);
    expect(daysUntilDue(e, T0)).toBe(1);
    expect(dueLessons({ 3: e }, [3], T0)).toEqual([]);
  });

  it('intervals widen 1 → 3 → 7 → 21 as reviews are done', () => {
    let e = seedReview(3, T0);
    const gaps: number[] = [daysUntilDue(e, T0)];
    let t = T0;
    for (let i = 0; i < 3; i++) {
      t = e.nextReview;
      e = advanceReview(e, t);
      gaps.push(daysUntilDue(e, t));
    }
    expect(gaps).toEqual([1, 3, 7, 21]);
  });

  /**
   * REGRESSION GUARD: nothing graduates.
   *
   * The retention target is permanent (COURSE_DESIGN §2.0b), so the ladder tops
   * out at a year and stays there rather than running off the end of the table
   * or widening without limit. A lesson answered correctly fifty times is still
   * owed an annual return — the alternative is an exit state, and a permanent
   * target does not have one.
   *
   * This guarded 90 days until Aug 2026. Ninety days is the right tail for
   * "know this next summer"; it is the wrong one for "know this for good".
   */
  it('keeps returning forever once the intervals top out', () => {
    let e = seedReview(3, T0);
    let t = T0;
    for (let i = 0; i < 12; i++) {
      t = e.nextReview;
      e = advanceReview(e, t);
    }
    expect(daysUntilDue(e, t)).toBe(365);
    expect(Number.isFinite(e.nextReview)).toBe(true);

    // Still finite and still a year out fifty reviews later — the clamp holds
    // and the lesson never falls out of the rota.
    for (let i = 0; i < 50; i++) {
      t = e.nextReview;
      e = advanceReview(e, t);
    }
    expect(daysUntilDue(e, t)).toBe(365);
    expect(Number.isFinite(e.nextReview)).toBe(true);
  });
});

describe('review: what is due, and in what order', () => {
  it('a lesson becomes due once its interval has passed', () => {
    const e = seedReview(3, T0);
    expect(dueLessons({ 3: e }, [3], T0 + DAY * 0.5)).toEqual([]);
    expect(dueLessons({ 3: e }, [3], T0 + DAY * 1.1)).toEqual([3]);
  });

  it('the most overdue lesson comes first', () => {
    const schedule: ReviewSchedule = {
      2: seedReview(2, T0 - DAY * 10),
      5: seedReview(5, T0 - DAY * 2),
      3: seedReview(3, T0 - DAY * 30),
    };
    expect(dueLessons(schedule, [2, 3, 5], T0)).toEqual([3, 2, 5]);
  });

  /**
   * A lesson nobody has finished cannot be overdue. Without this a stale
   * schedule entry — from a reset, or a lesson later removed — would send the
   * learner to homework for material they have never been taught.
   */
  it('never surfaces a lesson that has not been completed', () => {
    const schedule: ReviewSchedule = { 7: seedReview(7, T0 - DAY * 5) };
    expect(dueLessons(schedule, [], T0)).toEqual([]);
    expect(dueLessons(schedule, [7], T0)).toEqual([7]);
  });

  it('an empty or missing schedule is not an error', () => {
    expect(dueLessons({}, [1, 2], T0)).toEqual([]);
    expect(dueLessons(undefined as unknown as ReviewSchedule, [1], T0)).toEqual([]);
  });

  it('doing the review clears it from the due list', () => {
    const due = seedReview(3, T0 - DAY * 5);
    expect(dueLessons({ 3: due }, [3], T0)).toEqual([3]);
    expect(dueLessons({ 3: advanceReview(due, T0) }, [3], T0)).toEqual([]);
  });
});

/**
 * A review that serves the same questions is a memory test of the last review,
 * not of the language. The review count is passed to composeHomework as the
 * attempt, so each scheduled return is a different set.
 */
describe('review: each return brings different questions', () => {
  it('successive reviews of a lesson serve different sets', () => {
    const first = composeHomework(5, 0).map((i) => i.id);
    const second = composeHomework(5, 1).map((i) => i.id);
    const third = composeHomework(5, 2).map((i) => i.id);
    expect(second).not.toEqual(first);
    expect(third).not.toEqual(second);
  });
});
