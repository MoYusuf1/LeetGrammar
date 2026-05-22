/**
 * Learn Page — State machine-driven learning flow.
 *
 * Phases:
 *   map → rule → guided → unguided → gate → complete → map
 *
 * - 'map':     Show LevelMap, user selects a level
 * - 'rule':    Show RuleCard for the selected level
 * - 'guided':  Show DrillPlayer with guidedDrills (hints visible)
 * - 'unguided': Show DrillPlayer with unguidedDrills (hints hidden)
 * - 'gate':    Show GatePlayer with gateDrills (no hints, need 90%)
 * - 'complete': Show LevelComplete (pass or fail)
 */

import { useState, useCallback } from 'react';
import { Flame, BookOpen, KeyRound, RotateCcw } from 'lucide-react';
import { useLevelStore } from '@/stores/level-store';
import { LEVELS, getLevelById, getNextLevelId, type Phase } from '@/data/drill-content';
import {
  LevelMap,
  RuleCard,
  DrillPlayer,
  GatePlayer,
  LevelComplete,
  DecoderPanel,
} from '@/components/learn';
import VocabBank from '@/components/VocabBank';
import { useProgressStore } from '@/stores/progress-store';

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                                */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function Learn() {
  const {
    phase,
    currentLevelId,
    lastGateScore,
    lastGateTotal,
    setPhase,
    selectLevel,
    markLevelComplete,
    recordGateResult,
    incrementGateAttempt,
    resetFlow,
  } = useLevelStore();

  const progress = useProgressStore();

  const [decoderOpen, setDecoderOpen] = useState(false);
  const [vocabOpen, setVocabOpen] = useState(false);

  const currentLevel = currentLevelId ? getLevelById(currentLevelId) : undefined;
  const completedCount = useLevelStore((s) => s.completedLevelIds.length);

  /* ─── Phase transitions ──────────────────────────────────────────────── */

  const handleSelectLevel = useCallback(
    (id: number) => {
      selectLevel(id);
    },
    [selectLevel]
  );

  const handleRuleStart = useCallback(() => {
    setPhase('guided');
  }, [setPhase]);

  const handleGuidedComplete = useCallback(() => {
    setPhase('unguided');
  }, [setPhase]);

  const handleUnguidedComplete = useCallback(() => {
    setPhase('gate');
  }, [setPhase]);

  const handleGateComplete = useCallback(
    (score: number) => {
      if (currentLevelId) {
        incrementGateAttempt(currentLevelId);
        recordGateResult(currentLevelId, score, currentLevel?.gateDrills.length ?? 1);
      }
    },
    [currentLevelId, currentLevel, incrementGateAttempt, recordGateResult]
  );

  const handleNextLevel = useCallback(() => {
    if (!currentLevelId) {
      resetFlow();
      return;
    }
    const nextId = getNextLevelId(currentLevelId);
    if (nextId) {
      selectLevel(nextId);
    } else {
      resetFlow();
    }
  }, [currentLevelId, selectLevel, resetFlow]);

  const handleRetry = useCallback(() => {
    if (currentLevelId) {
      // Reset to guided phase for the same level
      selectLevel(currentLevelId);
    }
  }, [currentLevelId, selectLevel]);

  const handleBackToMap = useCallback(() => {
    resetFlow();
  }, [resetFlow]);

  /* ─── Render phase ───────────────────────────────────────────────────── */

  const renderPhase = () => {
    switch (phase) {
      case 'map':
        return <LevelMap onSelectLevel={handleSelectLevel} />;

      case 'rule':
        return currentLevel ? (
          <RuleCard level={currentLevel} onStart={handleRuleStart} />
        ) : null;

      case 'guided':
        return currentLevel ? (
          <DrillPlayer
            drills={currentLevel.guidedDrills}
            mode="guided"
            levelColor={currentLevel.color}
            onComplete={handleGuidedComplete}
          />
        ) : null;

      case 'unguided':
        return currentLevel ? (
          <DrillPlayer
            drills={currentLevel.unguidedDrills}
            mode="unguided"
            levelColor={currentLevel.color}
            onComplete={handleUnguidedComplete}
          />
        ) : null;

      case 'gate':
        return currentLevel ? (
          <GatePlayer
            drills={currentLevel.gateDrills}
            levelColor={currentLevel.color}
            levelId={currentLevel.id}
            onComplete={handleGateComplete}
          />
        ) : null;

      case 'complete':
        return currentLevel ? (
          <LevelComplete
            level={currentLevel}
            score={lastGateScore}
            total={lastGateTotal || currentLevel.gateDrills.length}
            onNextLevel={handleNextLevel}
            onRetry={handleRetry}
            onBackToMap={handleBackToMap}
          />
        ) : null;

      default:
        return <LevelMap onSelectLevel={handleSelectLevel} />;
    }
  };

  /* ─── Page layout ────────────────────────────────────────────────────── */

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-0 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-[#eff1f6]">Learn</h1>

            {/* Streak badge */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ffa11615] border border-[#ffa11630]">
                <Flame size={14} className="text-[#ffa116]" />
                <span className="text-xs font-bold text-[#ffa116]">
                  {progress.streak}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-4 pt-4 bg-[#0f0f0f]">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center gap-3 mb-5">
            {/* Current level */}
            <div className="flex-1 rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#141414] border border-[#ffffff10] flex items-center justify-center">
                <BookOpen size={18} className="text-[#3b82f6]" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#eff1f6] leading-tight">
                  {currentLevel ? `Level ${currentLevel.id}` : 'Ready'}
                </p>
                <p className="text-[10px] text-[#8c8c8c]">
                  {currentLevel ? currentLevel.title : 'Select a level to begin'}
                </p>
              </div>
            </div>

            {/* Overall progress */}
            <div className="flex-1 rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#141414] border border-[#ffffff10] flex items-center justify-center">
                <span className="text-xs font-bold text-[#eff1f6]">
                  {completedCount}/7
                </span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-[#8c8c8c] mb-1">Overall Progress</p>
                <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all bg-[#ffa116]"
                    style={{ width: `${(completedCount / 7) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Phase indicator (when in a flow) */}
          {phase !== 'map' && (
            <PhaseIndicator
              currentPhase={phase}
              levelColor={currentLevel?.color ?? '#ffa116'}
              onBackToMap={handleBackToMap}
            />
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 py-5">
        <div className="max-w-[720px] mx-auto">
          {renderPhase()}
        </div>
      </div>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Decoder toggle */}
        <button
          onClick={() => setDecoderOpen((o) => !o)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
            decoderOpen
              ? 'bg-[#ffa116] text-[#0f0f0f]'
              : 'bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] hover:bg-[#222222]'
          }`}
          title="Sentence Decoder"
        >
          <KeyRound size={20} />
        </button>

        {/* Vocab bank toggle */}
        <button
          onClick={() => setVocabOpen((o) => !o)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
            vocabOpen
              ? 'bg-[#ffa116] text-[#0f0f0f]'
              : 'bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] hover:bg-[#222222]'
          }`}
          title="Vocabulary Bank"
        >
          <BookOpen size={20} />
        </button>
      </div>

      {/* Overlays */}
      <DecoderPanel open={decoderOpen} onToggle={() => setDecoderOpen(false)} />
      <VocabBank open={vocabOpen} onClose={() => setVocabOpen(false)} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PHASE INDICATOR                                                          */
/* ═══════════════════════════════════════════════════════════════════════════ */

const PHASES: { key: Phase; label: string }[] = [
  { key: 'rule', label: 'Rule' },
  { key: 'guided', label: 'Guided' },
  { key: 'unguided', label: 'Unguided' },
  { key: 'gate', label: 'Gate' },
];

function PhaseIndicator({
  currentPhase,
  levelColor,
  onBackToMap,
}: {
  currentPhase: Phase;
  levelColor: string;
  onBackToMap: () => void;
}) {
  // Map 'complete' to show as after 'gate'
  const effectivePhase = currentPhase === 'complete' ? 'gate' : currentPhase;

  return (
    <div className="flex items-center gap-2 mb-5 overflow-x-auto hide-scrollbar">
      <button
        onClick={onBackToMap}
        className="flex items-center gap-1 text-[10px] text-[#5c5c5c] hover:text-[#8c8c8c] transition-colors flex-shrink-0 mr-2"
      >
        <RotateCcw size={10} />
        <span>Map</span>
      </button>

      {PHASES.map((p, i) => {
        const isActive = p.key === effectivePhase;
        const isPast =
          PHASES.findIndex((ph) => ph.key === effectivePhase) > i;

        return (
          <div key={p.key} className="flex items-center gap-2 flex-shrink-0">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium ${
                isActive
                  ? 'text-[#0f0f0f]'
                  : isPast
                  ? 'text-[#8c8c8c] bg-[#ffffff08]'
                  : 'text-[#5c5c5c] bg-[#ffffff04]'
              }`}
              style={
                isActive
                  ? { backgroundColor: levelColor }
                  : {}
              }
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  isPast
                    ? 'bg-[#22c55e20] text-[#22c55e]'
                    : isActive
                    ? 'bg-[#0f0f0f20] text-[#0f0f0f]'
                    : 'bg-[#ffffff08] text-[#5c5c5c]'
                }`}
              >
                {isPast ? '✓' : i + 1}
              </span>
              {p.label}
            </div>

            {i < PHASES.length - 1 && (
              <div className="w-3 h-px bg-[#ffffff10] flex-shrink-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}
