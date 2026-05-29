/**
 * Learn.tsx — Mobile-first, minimalist.
 *
 * Philosophy:
 *   - Full screen width on mobile
 *   - One thing at a time
 *   - No decorative UI
 *   - Large touch targets
 *   - Whitespace > clutter
 */

import { useState, useCallback } from 'react';
import { ChevronLeft, Zap } from 'lucide-react';
import { useLevelStore } from '@/stores/level-store';
import { getLevelById, getNextLevelId, LEVELS } from '@/data/drill-content';
import LevelSelect from '@/components/learn/LevelSelect';
import ExplainCard from '@/components/learn/ExplainCard';
import DrillEngine from '@/components/learn/DrillEngine';
import LevelResult from '@/components/learn/LevelResult';

type Phase = 'select' | 'explain' | 'drill-guided' | 'drill-unguided' | 'gate' | 'result';

export default function Learn() {
  const [phase, setPhase] = useState<Phase>('select');
  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [gateScore, setGateScore] = useState(0);
  const [gateTotal, setGateTotal] = useState(0);

  const { completedLevelIds, recordGateResult, incrementGateAttempt } = useLevelStore();
  const currentLevel = currentLevelId ? getLevelById(currentLevelId) : undefined;

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

  const handleRetry = useCallback(() => setPhase('explain'), []);
  const handleBackToSelect = useCallback(() => {
    setPhase('select');
    setCurrentLevelId(null);
  }, []);

  /* ─── Render ───────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      {/* Top bar — minimal, mobile-optimized */}
      {phase !== 'select' && (
        <div className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-[#ffffff08] px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToSelect}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1a1a1a] hover:bg-[#252525] transition-colors flex-shrink-0"
            >
              <ChevronLeft size={18} className="text-[#eff1f6]" />
            </button>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#eff1f6]">{currentLevel?.title}</p>
              <p className="text-[10px] text-[#3c3c3c]">{currentLevel?.subtitle}</p>
            </div>
            {phase === 'gate' && (
              <div className="text-xs font-bold text-[#ffa116]">
                {gateScore}/{gateTotal || currentLevel?.gateDrills.length}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content — full height, single column */}
      <div className="flex-1 overflow-y-auto px-4 py-5 pb-20">
        <div className="w-full max-w-lg">
          {phase === 'select' && <LevelSelect onSelectLevel={handleSelectLevel} />}

          {phase === 'explain' && currentLevel && (
            <ExplainCard levelId={currentLevel.id} onStart={handleExplainDone} />
          )}

          {phase === 'drill-guided' && currentLevel && (
            <DrillEngine
              drills={currentLevel.guidedDrills}
              mode="guided"
              levelColor={currentLevel.color}
              levelId={currentLevel.id}
              onComplete={handleGuidedDone}
            />
          )}

          {phase === 'drill-unguided' && currentLevel && (
            <DrillEngine
              drills={currentLevel.unguidedDrills}
              mode="unguided"
              levelColor={currentLevel.color}
              levelId={currentLevel.id}
              onComplete={handleUnguidedDone}
            />
          )}

          {phase === 'gate' && currentLevel && (
            <DrillEngine
              drills={currentLevel.gateDrills}
              mode="gate"
              levelColor={currentLevel.color}
              levelId={currentLevel.id}
              onComplete={handleGateDone}
            />
          )}

          {phase === 'result' && currentLevel && (
            <LevelResult
              level={currentLevel}
              score={gateScore}
              total={gateTotal || currentLevel.gateDrills.length}
              onNextLevel={handleNextLevel}
              onRetry={handleRetry}
              onBackToMap={handleBackToSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
}
