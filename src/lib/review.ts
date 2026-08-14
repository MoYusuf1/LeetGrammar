/**
 * SPACED REVIEW — the cross-cutting layer of the design's assessment model.
 *
 * Homework made distributed practice *possible*. This makes it *happen*: it
 * decides when a lesson should come back, so the learner is told rather than
 * having to remember. Without it, spacing depends on someone choosing to
 * reopen a lesson they finished a fortnight ago, which is exactly the thing
 * people do not do.
 *
 * THREE DECISIONS, ALL FROM §1.4
 *
 * 1. **Fixed intervals, not an expanding schedule.** Kim & Webb (98 effect
 *    sizes) found equal and expanding intervals statistically equivalent, so
 *    the design says plainly: use simple fixed intervals, because expanding
 *    ones cost far more to build and are not better. The intervals live in
 *    `getNextReviewDate` and run 1, 3, 7, 21, 60, 180, 365 days — and then 365
 *    forever, because §2.0b sets the retention target at *permanent* and a
 *    ladder that terminates encodes a target that does not.
 *
 *    Note that the shape and the span are separate questions. §1.4 settles the
 *    shape (fixed beats expanding, or at least ties it); §2.0b settles the span.
 *    Lengthening the tail is not a move back towards SM-2.
 *
 *    An SM-2 implementation used to live in `lib/srs.ts`, unused, and has been
 *    deleted. It was an expanding schedule — the thing §1.4 rules out — and it
 *    needed a self-rated quality score per item that this course has nowhere to
 *    collect.
 *
 * 2. **The unit of review is the lesson**, not the item or the objective.
 *    Homework is already composed per lesson and already carries earlier
 *    lessons back, so "review lesson 3" has a ready-made, production-weighted,
 *    registry-verified set behind it. Scheduling individual items would need a
 *    second selection mechanism to say the same thing.
 *
 * 3. **A review is a homework attempt.** `composeHomework(lessonId, attempt)`
 *    returns a different set per attempt, so passing the review count as the
 *    attempt means the fourth review of Lesson 3 is not the first one again.
 *
 * Everything here is pure. The schedule lives in the progress store; these
 * functions only say what it should become.
 */

import { getNextReviewDate } from './assessment.ts';

/** When a lesson was last revisited, and when it is next owed. */
export interface ReviewEntry {
  lessonId: number;
  /** How many times it has come back. 0 = finished, never yet reviewed. */
  reviewCount: number;
  lastReview: number;
  nextReview: number;
}

export type ReviewSchedule = Record<number, ReviewEntry>;

/**
 * The entry for a lesson the learner has just finished.
 *
 * `reviewCount` is 0, so the first return is one day later — the shortest
 * interval, while the material is still fresh enough to be worth strengthening.
 */
export function seedReview(lessonId: number, now: number = Date.now()): ReviewEntry {
  return {
    lessonId,
    reviewCount: 0,
    lastReview: now,
    nextReview: getNextReviewDate(now, 0),
  };
}

/** The entry after a review has actually been done. */
export function advanceReview(entry: ReviewEntry, now: number = Date.now()): ReviewEntry {
  const reviewCount = entry.reviewCount + 1;
  return {
    lessonId: entry.lessonId,
    reviewCount,
    lastReview: now,
    nextReview: getNextReviewDate(now, reviewCount),
  };
}

/**
 * Lessons owed a review right now, **most overdue first**.
 *
 * Ordering matters: a learner who opens the app with four lessons due should
 * meet the one that has been decaying longest, not the one that happens to sit
 * first in the course. Only completed lessons are ever due — a lesson nobody
 * has finished cannot be overdue.
 */
export function dueLessons(
  schedule: ReviewSchedule,
  completedLessons: number[],
  now: number = Date.now(),
): number[] {
  const done = new Set(completedLessons);
  return Object.values(schedule ?? {})
    .filter((e) => done.has(e.lessonId) && e.nextReview <= now)
    .sort((a, b) => a.nextReview - b.nextReview)
    .map((e) => e.lessonId);
}

/**
 * Whole days until this lesson is next owed; 0 once it is due.
 *
 * Rounds to nearest rather than up, because `getNextReviewDate` schedules in
 * **calendar** days: an interval that spans a daylight-saving change is 90 days
 * plus or minus an hour in milliseconds, and rounding up turned that into "due
 * in 91 days". Anything still owed reads as at least 1, so a lesson due in six
 * hours never displays as due today.
 */
export function daysUntilDue(entry: ReviewEntry | undefined, now: number = Date.now()): number {
  if (!entry) return 0;
  const days = (entry.nextReview - now) / 86_400_000;
  if (days <= 0) return 0;
  return Math.max(1, Math.round(days));
}
