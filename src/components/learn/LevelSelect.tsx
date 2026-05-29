/**
 * LevelSelect — Minimalist level progression.
 *
 * Show only what's needed: next level, or all unlocked levels.
 * No listening unlock text. No color coding. Just one accent color.
 */

import { Lock, Check, ChevronRight } from 'lucide-react';
import { LEVELS } from '@/data/drill-content';
import { useLevelStore } from '@/stores/level-store';

interface LevelSelectProps {
  onSelectLevel: (id: number) => void;
}

export default function LevelSelect({ onSelectLevel }: LevelSelectProps) {
  const { completedLevelIds, getLevelStatus } = useLevelStore();
  const completed = completedLevelIds.length;

  // Find next level or show all completed
  const nextUnlockedLevel = LEVELS.find(l => getLevelStatus(l.id) === 'available' || getLevelStatus(l.id) === 'in-progress');

  return (
    <div className="space-y-5">
      {/* Progress summary */}
      <div className="rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#eff1f6]">{completed}/7 Complete</span>
          <span className="text-xs text-[#5c5c5c]">{Math.round((completed / 7) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-[#ffa116] transition-all duration-300"
            style={{ width: `${(completed / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Next level (prominent) */}
      {nextUnlockedLevel && (
        <div>
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2">Next</p>
          <button
            onClick={() => onSelectLevel(nextUnlockedLevel.id)}
            className="w-full p-4 rounded-xl bg-[#ffa116] text-[#0f0f0f] font-bold transition-all active:scale-[0.98] hover:opacity-90 flex items-center justify-between group"
          >
            <div className="text-left">
              <p className="text-sm font-bold">Level {nextUnlockedLevel.id}</p>
              <p className="text-[10px] opacity-80 mt-0.5">{nextUnlockedLevel.title}</p>
            </div>
            <ChevronRight size={18} className="opacity-80 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      )}

      {/* All levels */}
      <div>
        <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2">All Levels</p>
        <div className="space-y-2">
          {LEVELS.map((level) => {
            const status = getLevelStatus(level.id);
            const isLocked = status === 'locked';
            const isPassed = status === 'passed';
            const isCurrent = status === 'available' || status === 'in-progress';

            return (
              <button
                key={level.id}
                onClick={() => !isLocked && onSelectLevel(level.id)}
                disabled={isLocked}
                className="w-full p-3 rounded-lg border border-[#ffffff08] transition-all active:scale-[0.98] text-left flex items-start gap-3"
                style={{
                  backgroundColor: isLocked ? '#0f0f0f' : isCurrent ? '#ffa11615' : isPassed ? '#22c55e08' : '#1a1a1a',
                  borderColor: isCurrent ? '#ffa11630' : isPassed ? '#22c55e30' : '#ffffff08',
                }}
              >
                {/* Status icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {isPassed ? (
                    <div className="w-5 h-5 rounded-lg bg-[#22c55e] flex items-center justify-center">
                      <Check size={12} className="text-[#0f0f0f]" strokeWidth={3} />
                    </div>
                  ) : isLocked ? (
                    <div className="w-5 h-5 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] flex items-center justify-center">
                      <Lock size={10} className="text-[#3c3c3c]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-lg border-2 border-[#ffa116]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-bold ${isLocked ? 'text-[#3c3c3c]' : 'text-[#eff1f6]'}`}>
                    {level.title}
                  </p>
                  <p className={`text-[9px] mt-0.5 ${isLocked ? 'text-[#2c2c2c]' : 'text-[#5c5c5c]'}`}>
                    {level.subtitle}
                  </p>
                </div>

                {/* Current indicator */}
                {isCurrent && (
                  <span className="text-[9px] font-bold text-[#ffa116] uppercase tracking-wider flex-shrink-0">
                    Current
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="text-[9px] text-[#3c3c3c] text-center py-2">
        Pass each level at 90%+ to advance
      </div>
    </div>
  );
}
