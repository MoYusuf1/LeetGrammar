/**
 * LevelMap — Vertical level selection with skill targets and listening unlocks.
 * Reflects Mohamed's teaching methodology: each level isolates one grammar skill.
 */

import { Lock, Check, ChevronRight, Zap } from 'lucide-react';
import { LEVELS } from '@/data/drill-content';
import { useLevelStore } from '@/stores/level-store';

interface LevelMapProps {
  onSelectLevel: (id: number) => void;
}

/** What each level unlocks for real listening */
const LISTENING_UNLOCKS: Record<number, string> = {
  1: 'You can scan any sentence and name its type instantly',
  2: 'You hear the difference between "he ate" and "ALI ate" — same words, different weight',
  3: 'Fast speech clicks into place — wuxuu, waxay, baan no longer blur',
  4: 'You can reconstruct scrambled speech in your head on the fly',
  5: 'You follow verbs with u/ku/ka/la and know who did what to whom',
  6: 'You track how ideas chain together across a full sentence',
  7: 'You can produce any Somali sentence from scratch',
};

export default function LevelSelect({ onSelectLevel }: LevelMapProps) {
  const { completedLevelIds, getLevelStatus } = useLevelStore();

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="mb-5">
        <p className="text-xs text-[#5c5c5c] leading-relaxed">
          Each level isolates one grammar skill. Master it at 90% before moving on.
        </p>
      </div>

      {LEVELS.map((level, index) => {
        const status = getLevelStatus(level.id);
        const isLocked = status === 'locked';
        const isPassed = status === 'passed';
        const isInProgress = status === 'in-progress';
        const isCurrent = status === 'available' || isInProgress;

        return (
          <button
            key={level.id}
            onClick={() => { if (!isLocked) onSelectLevel(level.id); }}
            disabled={isLocked}
            className={`w-full rounded-xl border text-left transition-all active:scale-[0.99] ${
              isLocked
                ? 'bg-[#0f0f0f] border-[#ffffff05] cursor-not-allowed opacity-40'
                : isPassed
                ? 'bg-[#141414] border-[#ffffff08] hover:border-[#ffffff12]'
                : isInProgress
                ? 'bg-[#141414] border-[#ffffff12] hover:border-[#ffffff18]'
                : 'bg-[#141414] border-[#ffffff10] hover:border-[#ffffff18] hover:bg-[#171717]'
            }`}
            style={
              isCurrent && !isLocked
                ? { borderColor: `${level.color}30`, boxShadow: `0 0 0 1px ${level.color}10` }
                : {}
            }
          >
            <div className="p-4">
              <div className="flex items-start gap-3.5">
                {/* Node circle */}
                <div className="relative flex-shrink-0 mt-0.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                    style={
                      isPassed
                        ? { backgroundColor: '#22c55e15', border: '1px solid #22c55e40', color: '#22c55e' }
                        : isLocked
                        ? { backgroundColor: '#1a1a1a', border: '1px solid #ffffff08', color: '#5c5c5c' }
                        : { backgroundColor: `${level.color}15`, border: `1px solid ${level.color}40`, color: level.color }
                    }
                  >
                    {isPassed ? <Check size={14} /> : isLocked ? <Lock size={12} /> : level.id}
                  </div>
                  {isCurrent && !isLocked && (
                    <div
                      className="absolute inset-0 rounded-full border-2 animate-ping pointer-events-none opacity-40"
                      style={{ borderColor: level.color }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-sm font-semibold ${isLocked ? 'text-[#5c5c5c]' : 'text-[#eff1f6]'}`}>
                      {level.title}
                    </p>
                    {isInProgress && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#ffa11615] text-[#ffa116] border border-[#ffa11625]">
                        IN PROGRESS
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#5c5c5c] mb-2.5">{level.subtitle}</p>

                  {/* Listening unlock */}
                  {!isLocked && (
                    <div className="flex items-start gap-1.5">
                      <Zap
                        size={10}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: isPassed ? '#22c55e' : level.color }}
                      />
                      <p className="text-[10px] leading-relaxed" style={{ color: isPassed ? '#22c55e' : `${level.color}aa` }}>
                        {LISTENING_UNLOCKS[level.id]}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right action */}
                {!isLocked && (
                  <div className="flex-shrink-0 flex items-center">
                    {isPassed ? (
                      <span className="text-[10px] font-semibold text-[#22c55e] bg-[#22c55e12] px-2 py-1 rounded-md border border-[#22c55e25]">
                        Passed
                      </span>
                    ) : (
                      <div
                        className="flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg"
                        style={{ color: level.color, backgroundColor: `${level.color}12`, border: `1px solid ${level.color}25` }}
                      >
                        {isInProgress ? 'Resume' : 'Start'}
                        <ChevronRight size={12} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom progress bar for in-progress levels */}
            {isInProgress && (
              <div className="h-0.5 bg-[#1a1a1a] rounded-b-xl overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: '40%', backgroundColor: level.color, opacity: 0.5 }}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
