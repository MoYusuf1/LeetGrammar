/**
 * LevelSelect — Ultra-minimalist level progression.
 *
 * Next level highlighted with focus ring.
 * All previous levels unlocked and clickable.
 * Nothing else.
 */

import { Lock, Check } from 'lucide-react';
import { LEVELS } from '@/data/drill-content';
import { useLevelStore } from '@/stores/level-store';

interface LevelSelectProps {
  onSelectLevel: (id: number) => void;
}

export default function LevelSelect({ onSelectLevel }: LevelSelectProps) {
  const { completedLevelIds, getLevelStatus } = useLevelStore();

  // Find next level
  const nextLevel = LEVELS.find(l => getLevelStatus(l.id) === 'available' || getLevelStatus(l.id) === 'in-progress');

  return (
    <div className="space-y-3">
      {/* All levels - next one has focus ring */}
      {LEVELS.map((level) => {
        const status = getLevelStatus(level.id);
        const isLocked = status === 'locked';
        const isPassed = status === 'passed';
        const isNext = level.id === nextLevel?.id;

        return (
          <button
            key={level.id}
            onClick={() => !isLocked && onSelectLevel(level.id)}
            disabled={isLocked}
            className={`w-full p-4 rounded-xl text-left transition-all active:scale-[0.98] ${
              isNext
                ? 'ring-2 ring-[#ffa116] bg-[#ffa11615] border-[#ffa11630]'
                : isLocked
                ? 'bg-[#0f0f0f] border-[#ffffff08] opacity-40 cursor-not-allowed'
                : isPassed
                ? 'bg-[#22c55e08] border-[#22c55e30]'
                : 'bg-[#1a1a1a] border-[#ffffff08]'
            } border`}
          >
            <div className="flex items-start gap-3">
              {/* Status icon */}
              <div className="flex-shrink-0 mt-0.5">
                {isPassed ? (
                  <div className="w-6 h-6 rounded-lg bg-[#22c55e] flex items-center justify-center">
                    <Check size={13} className="text-[#0f0f0f]" strokeWidth={3} />
                  </div>
                ) : isLocked ? (
                  <div className="w-6 h-6 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] flex items-center justify-center">
                    <Lock size={11} className="text-[#3c3c3c]" />
                  </div>
                ) : (
                  <div className={`w-6 h-6 rounded-lg border-2 ${isNext ? 'border-[#ffa116] bg-[#ffa11610]' : 'border-[#ffffff20]'}`} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className={`text-sm font-bold ${isLocked ? 'text-[#3c3c3c]' : 'text-[#eff1f6]'}`}>
                  Level {level.id}: {level.title}
                </p>
                <p className={`text-xs mt-1 ${isLocked ? 'text-[#2c2c2c]' : 'text-[#5c5c5c]'}`}>
                  {level.subtitle}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
