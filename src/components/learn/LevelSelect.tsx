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
    <div className="space-y-1.5">
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
            className={`group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
              isLocked
                ? 'cursor-not-allowed'
                : isNext
                ? 'bg-[#ffa11614]'
                : 'hover:bg-[#ffffff08]'
            }`}
          >
            {/* Status indicator */}
            <div className="flex-shrink-0">
              {isPassed ? (
                <div className="w-7 h-7 rounded-full bg-[#22c55e] flex items-center justify-center">
                  <Check size={14} className="text-[#0f0f0f]" strokeWidth={3} />
                </div>
              ) : isLocked ? (
                <div className="w-7 h-7 rounded-full bg-[#161616] flex items-center justify-center">
                  <Lock size={12} className="text-[#3c3c3c]" />
                </div>
              ) : (
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    isNext
                      ? 'bg-[#ffa116] text-[#0f0f0f]'
                      : 'bg-[#161616] text-[#8c8c8c]'
                  }`}
                >
                  {level.id}
                </div>
              )}
            </div>

            {/* Label */}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-semibold truncate ${
                  isLocked ? 'text-[#3c3c3c]' : isNext ? 'text-[#ffa116]' : 'text-[#e5e7eb]'
                }`}
              >
                {level.title}
              </p>
              <p className={`text-xs truncate ${isLocked ? 'text-[#2c2c2c]' : 'text-[#5c5c5c]'}`}>
                {level.subtitle}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
