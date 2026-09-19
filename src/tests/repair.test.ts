/**
 * The repair queue is the home half of the Repair stage: which slips are
 * still unresolved, and what surface the queue session serves for each.
 */
import { describe, it, expect } from 'vitest';
import { repairQueue, servingForRepair, exerciseIndex } from '@/lib/repair';
import type { ExerciseProgress } from '@/stores/progress-store';

const p = (attempts: number, correct: number, misses: number, at: string): ExerciseProgress => ({
  attempts,
  correct,
  misses,
  lastAttemptAt: at,
});

describe('repairQueue', () => {
  it('is empty with no recorded attempts', () => {
    expect(repairQueue(undefined)).toEqual([]);
    expect(repairQueue({})).toEqual([]);
  });

  it('queues an exercise while its misses outnumber its successes', () => {
    expect(repairQueue({ a: p(1, 0, 1, '2026-09-18T01:00:00Z') })).toEqual(['a']);
  });

  it('clears once a later success balances the slip', () => {
    expect(repairQueue({ a: p(2, 1, 1, '2026-09-18T01:00:00Z') })).toEqual([]);
  });

  it('keeps a doubly-missed item queued after a single success', () => {
    expect(repairQueue({ a: p(3, 1, 2, '2026-09-18T01:00:00Z') })).toEqual(['a']);
  });

  it('serves the oldest unresolved slip first', () => {
    const queue = repairQueue({
      b: p(1, 0, 1, '2026-09-18T03:00:00Z'),
      a: p(1, 0, 1, '2026-09-18T01:00:00Z'),
    });
    expect(queue).toEqual(['a', 'b']);
  });
});

describe('servingForRepair', () => {
  it('serves the repair item for a queued original, never the failed surface', () => {
    const served = servingForRepair('l1-gist-a');
    expect(served).toBeDefined();
    expect(served!.id).toBe('l1-gist-a-r');
  });

  it('serves the parent original for a queued repair item', () => {
    const served = servingForRepair('l1-gist-a-r');
    expect(served).toBeDefined();
    expect(served!.id).toBe('l1-gist-a');
  });

  it('carries a repair behind every course exercise', () => {
    // Design rule: a miss is always met by a fresh parallel item, so the
    // `?? entry.exercise` fallback in servingForRepair has no live specimen
    // left in the course. This is the invariant that replaced it.
    for (const [id, entry] of exerciseIndex()) {
      if (!entry.parentId) {
        expect(entry.exercise.repair, `${id} must carry a repair`).toBeDefined();
      }
    }
  });

  it('returns undefined for ids the course does not carry', () => {
    expect(servingForRepair('not-a-real-exercise')).toBeUndefined();
  });

  it('never serves an item whose queue surface is itself', () => {
    // The whole point of the stage: the surface on screen is not the surface
    // just failed, whenever an alternative exists.
    for (const [id, entry] of exerciseIndex()) {
      const served = servingForRepair(id)!;
      if (entry.parentId || entry.exercise.repair) {
        expect(served.id, `${id} must not be served itself`).not.toBe(id);
      }
    }
  });
});
