/**
 * Level Store — unified state for the 7-level drill flow.
 * Provides the API Learn.tsx expects plus backward-compat helpers.
 *
 * Phase machine: map → rule → guided → unguided → gate → complete → map
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Phase } from '@/data/drill-content';

export type LevelPhase = Phase;

export interface LevelProgress {
  levelId: number;
  gatePassed: boolean;
  bestGateScore: number;
  gateAttempts: number;
  guidedCompleted: boolean;
  unguidedCompleted: boolean;
}

interface LevelState {
  /* ── observable state ─────────────────────────────────── */
  phase: LevelPhase;
  currentLevelId: number | null;
  completedLevelIds: number[];
  lastGateScore: number;
  lastGateTotal: number | null;
  levelProgress: Record<number, LevelProgress>;

  /* ── actions ──────────────────────────────────────────── */
  /** Select a level and go to rule phase */
  selectLevel: (id: number) => void;
  /** Explicitly set phase (for phase transitions) */
  setPhase: (phase: LevelPhase) => void;
  /** Record gate result and transition to complete */
  recordGateResult: (levelId: number, score: number, total: number) => void;
  /** Increment gate attempt count */
  incrementGateAttempt: (levelId: number) => void;
  /** Mark a level as complete (called externally if needed) */
  markLevelComplete: (levelId: number) => void;
  /** Return to map */
  resetFlow: () => void;

  /* ── read helpers ─────────────────────────────────────── */
  canAccessLevel: (level: number) => boolean;
  getLevelStatus: (level: number) => 'locked' | 'available' | 'in-progress' | 'passed';
}

function emptyProgress(levelId: number): LevelProgress {
  return { levelId, gatePassed: false, bestGateScore: 0, gateAttempts: 0, guidedCompleted: false, unguidedCompleted: false };
}

export const useLevelStore = create<LevelState>()(
  persist(
    (set, get) => ({
      phase: 'map',
      currentLevelId: null,
      completedLevelIds: [],
      lastGateScore: 0,
      lastGateTotal: null,
      levelProgress: {},

      selectLevel: (id) => {
        set({ currentLevelId: id, phase: 'rule' });
      },

      setPhase: (phase) => {
        set({ phase });
        // Track guided/unguided completions
        if (phase === 'unguided') {
          const id = get().currentLevelId;
          if (id != null) {
            set((s) => ({
              levelProgress: {
                ...s.levelProgress,
                [id]: { ...(s.levelProgress[id] ?? emptyProgress(id)), guidedCompleted: true },
              },
            }));
          }
        }
        if (phase === 'gate') {
          const id = get().currentLevelId;
          if (id != null) {
            set((s) => ({
              levelProgress: {
                ...s.levelProgress,
                [id]: { ...(s.levelProgress[id] ?? emptyProgress(id)), unguidedCompleted: true },
              },
            }));
          }
        }
      },

      recordGateResult: (levelId, score, total) => {
        const passed = total > 0 && score / total >= 0.9;
        set((s) => {
          const prev = s.levelProgress[levelId] ?? emptyProgress(levelId);
          const bestGateScore = Math.max(prev.bestGateScore, total > 0 ? score / total : 0);
          const updated: LevelProgress = { ...prev, gatePassed: passed, bestGateScore, gateAttempts: prev.gateAttempts };
          const completedLevelIds = passed && !s.completedLevelIds.includes(levelId)
            ? [...s.completedLevelIds, levelId]
            : s.completedLevelIds;
          return {
            phase: 'complete',
            lastGateScore: score,
            lastGateTotal: total,
            levelProgress: { ...s.levelProgress, [levelId]: updated },
            completedLevelIds,
          };
        });
      },

      incrementGateAttempt: (levelId) => {
        set((s) => {
          const prev = s.levelProgress[levelId] ?? emptyProgress(levelId);
          return {
            levelProgress: { ...s.levelProgress, [levelId]: { ...prev, gateAttempts: prev.gateAttempts + 1 } },
          };
        });
      },

      markLevelComplete: (levelId) => {
        set((s) => {
          const ids = s.completedLevelIds.includes(levelId)
            ? s.completedLevelIds
            : [...s.completedLevelIds, levelId];
          return { completedLevelIds: ids };
        });
      },

      resetFlow: () => {
        set({ phase: 'map', currentLevelId: null, lastGateScore: 0, lastGateTotal: null });
      },

      canAccessLevel: (level) => {
        if (level === 1) return true;
        return get().completedLevelIds.includes(level - 1);
      },

      getLevelStatus: (level) => {
        const s = get();
        if (!s.canAccessLevel(level)) return 'locked';
        if (s.completedLevelIds.includes(level)) return 'passed';
        const prog = s.levelProgress[level];
        if (prog && (prog.gateAttempts > 0 || prog.guidedCompleted)) return 'in-progress';
        return 'available';
      },
    }),
    {
      name: 'leet-levels-v2',
      partialize: (s) => ({
        phase: s.phase,
        currentLevelId: s.currentLevelId,
        completedLevelIds: s.completedLevelIds,
        lastGateScore: s.lastGateScore,
        lastGateTotal: s.lastGateTotal,
        levelProgress: s.levelProgress,
      }),
    }
  )
);
