/**
 * Learn.tsx — Mobile-first minimalist with desktop sidebar.
 *
 * Mobile:
 *   - Full screen width, one thing at a time
 *   - Top bar with back button when in drill
 *   - LevelSelect full-width cards
 *
 * Desktop (sm:):
 *   - Split layout: sidebar (25%) + content (75%)
 *   - Sidebar shows LevelSelect always visible
 *   - Content area shows current phase
 */

import { useState, useCallback } from 'react';
import { ChevronLeft } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col sm:flex-row">
      {/* ─── MOBILE TOP BAR (sm:hidden) ─────────────────────────────────────── */}
      {phase !== 'select' && (
        <div className="sm:hidden sticky top-0 z-50 bg-[#0f0f0f] border-b border-[#ffffff08] px-4 py-3">
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

      {/* ─── DESKTOP SIDEBAR (hidden sm:flex) ───────────────────────────────── */}
      <aside className="hidden sm:flex sm:w-64 lg:w-72 sm:flex-shrink-0 sm:flex-col bg-[#0f0f0f] border-r border-[#ffffff08] overflow-y-auto sticky top-0 h-screen">
        <div className="p-5">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-4">Levels</p>
          <LevelSelect onSelectLevel={handleSelectLevel} />
        </div>
      </aside>

      {/* ─── MAIN CONTENT ───────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 pb-20 sm:px-8 sm:py-10 sm:pb-10 lg:px-12">
        <div className={`w-full mx-auto ${phase === 'explain' ? 'max-w-5xl' : 'max-w-2xl'}`}>
          {/* Mobile only: LevelSelect */}
          {phase === 'select' && (
            <div className="sm:hidden">
              <LevelSelect onSelectLevel={handleSelectLevel} />
            </div>
          )}

          {/* Content phases */}
          {phase === 'select' && (
            <div className="hidden sm:flex sm:items-center sm:justify-center sm:min-h-[60vh]">
              <p className="text-sm text-[#5c5c5c] text-center">
                Select a level from the sidebar to begin
              </p>
            </div>
          )}

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
