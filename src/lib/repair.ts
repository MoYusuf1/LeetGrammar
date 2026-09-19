/**
 * REPAIR QUEUE — the home half of the Repair stage.
 *
 * In-lesson, a miss is answered with a fresh parallel item right away. That
 * fixes the moment, not the month: a slip the repair did not close still
 * needs spaced retrieval, and the end-of-lesson retry round only runs while
 * the learner is inside that lesson. The queue is where unresolved slips
 * wait, and home carries one row that leads to them — the next-best action
 * of the Learn → Repair → Retention system.
 *
 * MEMBERSHIP RULE. An exercise belongs to the queue while its recorded
 * misses outnumber its recorded successes. One later success balances one
 * earlier slip; two slips need two. The rule errs toward more retrieval,
 * which is the cheap direction to err in.
 *
 * SERVING RULE. The item on screen is never the surface just failed — that
 * is the same-item retry the Repair stage exists to replace. An original
 * exercise with a repair serves its repair; a repair item (it can land in
 * the queue by being missed in-lesson) serves its parent original; anything
 * else serves itself. Attempts are recorded against the queue key, so a
 * success here is what clears the row from home.
 */

import { AUTHORED_LESSONS } from '@/data/authored-lessons';
import type { PracticeExercise } from '@/data/types';
import type { ExerciseProgress } from '@/domain/progress/types';

/** Queued ids, oldest unresolved slip first. */
export function repairQueue(progress: Record<string, ExerciseProgress> | undefined): string[] {
  if (!progress) return [];
  return Object.entries(progress)
    .filter(([, p]) => p.misses > p.correct)
    .sort(([, a], [, b]) => a.lastAttemptAt.localeCompare(b.lastAttemptAt))
    .map(([id]) => id);
}

interface IndexEntry {
  exercise: PracticeExercise;
  /** Set when this entry is a repair item: the original it parallels. */
  parentId?: string;
}

let cached: Map<string, IndexEntry> | undefined;

/** Every authored exercise and repair item in the course, by id. */
export function exerciseIndex(): Map<string, IndexEntry> {
  if (cached) return cached;
  cached = new Map();
  for (const lesson of AUTHORED_LESSONS) {
    for (const card of lesson.cards) {
      const ex = card.exercise;
      if (!ex) continue;
      cached.set(ex.id, { exercise: ex });
      if (ex.repair) cached.set(ex.repair.id, { exercise: ex.repair, parentId: ex.id });
    }
  }
  return cached;
}

/** What the queue session puts on screen for a queued id. */
export function servingForRepair(id: string): PracticeExercise | undefined {
  const entry = exerciseIndex().get(id);
  if (!entry) return undefined;
  if (entry.parentId) return exerciseIndex().get(entry.parentId)?.exercise;
  return entry.exercise.repair ?? entry.exercise;
}
