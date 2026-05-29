/**
 * Learn.tsx — rebuilt from scratch around the teaching methodology.
 *
 * Flow per level:
 *   select → explain → drill (guided) → drill (unguided) → gate → result
 *
 * The explain phase teaches the concept in full before any drills.
 * The drill phases use the existing exercise data from drill-content.ts.
 * The gate enforces 90% — same as the workbook.
 */

import { useState, useCallback } from 'react';
import { Flame, RotateCcw } from 'lucide-react';
import { useLevelStore } from '@/stores/level-store';
import { getLevelById, getNextLevelId, LEVELS } from '@/data/drill-content';
import { useProgressStore } from '@/stores/progress-store';

import LevelSelect from '@/components/learn/LevelSelect';
import ExplainCard from '@/components/learn/ExplainCard';
import DrillEngine from '@/components/learn/DrillEngine';
import LevelResult from '@/components/learn/LevelResult';
import { DecoderPanel } from '@/components/learn';
import VocabBank from '@/components/VocabBank';
import { KeyRound, BookOpen } from 'lucide-react';

type Phase = 'select' | 'explain' | 'drill-guided' | 'drill-unguided' | 'gate' | 'result';

export default function Learn() {
  const [phase, setPhase] = useState<Phase>('select');
  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [gateScore, setGateScore] = useState(0);
  const [gateTotal, setGateTotal] = useState(0);
  const [decoderOpen, setDecoderOpen] = useState(false);
  const [vocabOpen, setVocabOpen] = useState(false);

  const { completedLevelIds, recordGateResult, incrementGateAttempt } = useLevelStore();
  const progress = useProgressStore();

  const currentLevel = currentLevelId ? getLevelById(currentLevelId) : undefined;

  /* ─── Transitions ──────────────────────────────────────────────────────── */

  const handleSelectLevel = useCallback((id: number) => {
    setCurrentLevelId(id);
    setPhase('explain');
  }, []);

  const handleExplainDone = useCallback(() => setPhase('drill-guided'), []);

  const handleGuidedDone = useCallback(() => setPhase('drill-unguided'), []);

  const handleUnguidedDone = useCallback(() => setPhase('gate'), []);

  const handleGateDone = useCallback((score: number) => {
    if (!currentLevelId || !currentLevel) return;
    const total = currentLevel.gateDrills.length;
    incrementGateAttempt(currentLevelId);
    recordGateResult(currentLevelId, score, total);
    setGateScore(score);
    setGateTotal(total);
    setPhase('result');
  }, [currentLevelId, currentLevel, incrementGateAttempt, recordGateResult]);

  const handleNextLevel = useCallback(() => {
    if (!currentLevelId) { setPhase('select'); return; }
    const nextId = getNextLevelId(currentLevelId);
    if (nextId) {
      setCurrentLevelId(nextId);
      setPhase('explain');
    } else {
      setPhase('select');
    }
  }, [currentLevelId]);

  const handleRetry = useCallback(() => {
    setPhase('explain');
  }, []);

  const handleBackToSelect = useCallback(() => {
    setPhase('select');
    setCurrentLevelId(null);
  }, []);

  /* ─── Phase renderer ───────────────────────────────────────────────────── */

  const renderPhase = () => {
    switch (phase) {
      case 'select':
        return <LevelSelect onSelectLevel={handleSelectLevel} />;

      case 'explain':
        return currentLevel ? (
          <ExplainCard levelId={currentLevel.id} onStart={handleExplainDone} />
        ) : null;

      case 'drill-guided':
        return currentLevel ? (
          <DrillEngine
            drills={currentLevel.guidedDrills}
            mode="guided"
            levelColor={currentLevel.color}
            levelId={currentLevel.id}
            onComplete={handleGuidedDone}
          />
        ) : null;

      case 'drill-unguided':
        return currentLevel ? (
          <DrillEngine
            drills={currentLevel.unguidedDrills}
            mode="unguided"
            levelColor={currentLevel.color}
            levelId={currentLevel.id}
            onComplete={handleUnguidedDone}
          />
        ) : null;

      case 'gate':
        return currentLevel ? (
          <DrillEngine
            drills={currentLevel.gateDrills}
            mode="gate"
            levelColor={currentLevel.color}
            levelId={currentLevel.id}
            onComplete={handleGateDone}
          />
        ) : null;

      case 'result':
        return currentLevel ? (
          <LevelResult
            level={currentLevel}
            score={gateScore}
            total={gateTotal || currentLevel.gateDrills.length}
            onNextLevel={handleNextLevel}
            onRetry={handleRetry}
            onBackToMap={handleBackToSelect}
          />
        ) : null;

      default:
        return <LevelSelect onSelectLevel={handleSelectLevel} />;
    }
  };

  /* ─── Phase label strip ────────────────────────────────────────────────── */

  const PHASE_STEPS: { key: Phase; label: string }[] = [
    { key: 'explain', label: 'Learn' },
    { key: 'drill-guided', label: 'Guided' },
    { key: 'drill-unguided', label: 'Unguided' },
    { key: 'gate', label: 'Gate' },
  ];

  const currentStepIdx = PHASE_STEPS.findIndex((s) => s.key === phase);
  const completedCount = completedLevelIds.length;

  /* ─── Render ───────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-0 border-b border-[#ffffff06]">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-[#eff1f6]">Learn</h1>
            <div className="flex items-center gap-2">
              {/* Progress pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ffffff08] border border-[#ffffff0a]">
                <span className="text-xs font-bold text-[#8c8c8c]">{completedCount}/7</span>
              </div>
              {/* Streak */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#ffa11612] border border-[#ffa11625]">
                <Flame size={13} className="text-[#ffa116]" />
                <span className="text-xs font-bold text-[#ffa116]">{progress.streak}</span>
              </div>
            </div>
          </div>

          {/* Phase strip (only when inside a level) */}
          {phase !== 'select' && phase !== 'result' && currentLevel && (
            <div className="flex items-center gap-1 pb-3 overflow-x-auto hide-scrollbar">
              <button
                onClick={handleBackToSelect}
                className="flex items-center gap-1 text-[10px] text-[#3c3c3c] hover:text-[#5c5c5c] transition-colors flex-shrink-0 mr-2"
              >
                <RotateCcw size={9} />
                <span>Levels</span>
              </button>
              <span className="text-[10px] text-[#3c3c3c] mr-2 flex-shrink-0">
                Level {currentLevel.id} ·
              </span>
              {PHASE_STEPS.map((step, i) => {
                const isActive = step.key === phase;
                const isPast = currentStepIdx > i;
                return (
                  <div key={step.key} className="flex items-center gap-1 flex-shrink-0">
                    <div
                      className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium"
                      style={
                        isActive
                          ? { backgroundColor: currentLevel.color, color: '#0f0f0f' }
                          : isPast
                          ? { backgroundColor: '#22c55e15', color: '#22c55e' }
                          : { color: '#3c3c3c' }
                      }
                    >
                      {isPast ? '✓ ' : ''}{step.label}
                    </div>
                    {i < PHASE_STEPS.length - 1 && (
                      <div className="w-2 h-px bg-[#ffffff08] flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="px-4 py-5">
        <div className="max-w-[720px] mx-auto">
          {renderPhase()}
        </div>
      </div>

      {/* Floating tools */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
          onClick={() => setDecoderOpen((o) => !o)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
            decoderOpen ? 'bg-[#ffa116] text-[#0f0f0f]' : 'bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6]'
          }`}
          title="Sentence Decoder"
        >
          <KeyRound size={18} />
        </button>
        <button
          onClick={() => setVocabOpen((o) => !o)}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 ${
            vocabOpen ? 'bg-[#ffa116] text-[#0f0f0f]' : 'bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6]'
          }`}
          title="Vocabulary Bank"
        >
          <BookOpen size={18} />
        </button>
      </div>

      <DecoderPanel open={decoderOpen} onToggle={() => setDecoderOpen(false)} />
      <VocabBank open={vocabOpen} onClose={() => setVocabOpen(false)} />
    </div>
  );
}
// Deploy trigger
