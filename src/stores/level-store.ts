/**
 * Zustand store for 7-level drill progress.
 * Tracks phase transitions: map → rule → guided → unguided → gate → complete
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'leet-levels-v1';

export type LevelPhase = 'map' | 'rule' | 'guided' | 'unguided' | 'gate' | 'complete';

export interface LevelProgress {
  levelId: number;
  phase: LevelPhase;
  guidedCompleted: boolean;
  unguidedCompleted: boolean;
  gatePassed: boolean;
  bestGateScore: number;
  gateAttempts: number;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function createEmptyProgress(levelId: number): LevelProgress {
  return {
    levelId,
    phase: 'map',
    guidedCompleted: false,
    unguidedCompleted: false,
    gatePassed: false,
    bestGateScore: 0,
    gateAttempts: 0,
  };
}

interface LevelState {
  currentLevel: number;
  phase: LevelPhase;
  levelProgress: Record<number, LevelProgress>;
  decoderOpen: boolean;

  // Actions
  setPhase: (phase: LevelPhase) => void;
  setCurrentLevel: (level: number) => void;
  completeGuided: (level: number) => void;
  completeUnguided: (level: number) => void;
  passGate: (level: number, score: number, total: number) => void;
  resetLevel: (level: number) => void;
  canAccessLevel: (level: number) => boolean;
  getLevelStatus: (level: number) => 'locked' | 'available' | 'in-progress' | 'passed';
  toggleDecoder: () => void;
}

export const useLevelStore = create<LevelState>()(
  persist(
    (set, get) => ({
      currentLevel: 1,
      phase: 'map',
      levelProgress: {},
      decoderOpen: false,

      setPhase: (phase: LevelPhase) => {
        set({ phase });
      },

      setCurrentLevel: (level: number) => {
        set({ currentLevel: level });
      },

      completeGuided: (level: number) => {
        set((state) => {
          const progress = state.levelProgress[level] ?? createEmptyProgress(level);
          const updated: LevelProgress = {
            ...progress,
            levelId: level,
            guidedCompleted: true,
            phase: 'unguided',
          };
          return {
            levelProgress: { ...state.levelProgress, [level]: updated },
            phase: 'unguided',
          };
        });
      },

      completeUnguided: (level: number) => {
        set((state) => {
          const progress = state.levelProgress[level] ?? createEmptyProgress(level);
          const updated: LevelProgress = {
            ...progress,
            levelId: level,
            unguidedCompleted: true,
            phase: 'gate',
          };
          return {
            levelProgress: { ...state.levelProgress, [level]: updated },
            phase: 'gate',
          };
        });
      },

      passGate: (level: number, score: number, total: number) => {
        set((state) => {
          const progress = state.levelProgress[level] ?? createEmptyProgress(level);
          const ratio = total > 0 ? score / total : 0;
          const passed = ratio >= 0.9;
          const bestScore = Math.max(progress.bestGateScore, ratio);
          const updated: LevelProgress = {
            ...progress,
            levelId: level,
            gatePassed: passed,
            bestGateScore: bestScore,
            gateAttempts: progress.gateAttempts + 1,
            phase: passed ? 'complete' : 'gate',
          };
          return {
            levelProgress: { ...state.levelProgress, [level]: updated },
            phase: passed ? 'complete' : 'gate',
          };
        });
      },

      resetLevel: (level: number) => {
        set((state) => {
          const updated = { ...state.levelProgress };
          delete updated[level];
          return {
            levelProgress: updated,
            currentLevel: level,
            phase: 'map',
          };
        });
      },

      canAccessLevel: (level: number): boolean => {
        if (level === 1) return true;
        const prevProgress = get().levelProgress[level - 1];
        return prevProgress?.gatePassed ?? false;
      },

      getLevelStatus: (level: number): 'locked' | 'available' | 'in-progress' | 'passed' => {
        const state = get();
        const canAccess = state.canAccessLevel(level);
        if (!canAccess) return 'locked';

        const progress = state.levelProgress[level];
        if (!progress) return 'available';
        if (progress.gatePassed) return 'passed';
        if (progress.guidedCompleted || progress.unguidedCompleted || progress.gateAttempts > 0) {
          return 'in-progress';
        }
        return 'available';
      },

      toggleDecoder: () => {
        set((state) => ({ decoderOpen: !state.decoderOpen }));
      },
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        currentLevel: state.currentLevel,
        phase: state.phase,
        levelProgress: state.levelProgress,
        decoderOpen: state.decoderOpen,
      }),
    }
  )
);
