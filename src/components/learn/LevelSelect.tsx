/**
 * LevelSelect — Minimalist level picker.
 *
 * Mobile-first: full width, clean spacing, one level per row.
 */

import { Lock, Check, Zap } from 'lucide-react';
import { LEVELS } from '@/data/drill-content';
import { useLevelStore } from '@/stores/level-store';

interface LevelSelectProps {
  onSelectLevel: (id: number) => void;
}

const LISTENING_UNLOCKS: Record<number, string> = {
  1: 'Recognize any sentence type instantly',
  2: 'Hear the difference between "he ate" and "ALI ate"',
  3: 'Fast speech clicks into place',
  4: 'You always know where the verb lands',
  5: 'Follow who did what, for whom, and from where',
  6: 'Track ideas across full sentences',
  7: 'Build and hear any Somali sentence from scratch',
};

export default function LevelSelect({ onSelectLevel }: LevelSelectProps) {
  const { completedLevelIds, getLevelStatus } = useLevelStore();
  const completed = completedLevelIds.length;

  return (
    <div className="space-y-3">
      {/* Progress */}
      <div className="bg-[#1a1a1a] rounded-xl p-3 flex items-center justify-between">
        <span className="text-sm font-bold text-[#eff1f6]">{completed}/7 Levels</span>
        <div className="w-16 h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#ffa116] transition-all duration-300"
            style={{ width: `${(completed / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Level list */}
      <div className="space-y-2">
        {LEVELS.map((level) => {
          const status = getLevelStatus(level.id);
          const isLocked = status === 'locked';
          const isPassed = status === 'passed';
          const isAvailable = status === 'available' || status === 'in-progress';

          return (
            <button
              key={level.id}
              onClick={() => !isLocked && onSelectLevel(level.id)}
              disabled={isLocked}
              className="w-full p-4 rounded-xl border transition-all active:scale-[0.98]"
              style={{
                borderColor: isLocked
                  ? '#ffffff08'
                  : isPassed
                  ? '#22c55e30'
                  : `${level.color}30`,
                backgroundColor: isLocked
                  ? '#0f0f0f'
                  : isPassed
                  ? '#22c55e08'
                  : isAvailable
                  ? `${level.color}08`
                  : '#1a1a1a',
              }}
            >
              <div className="flex items-start gap-3">
                {/* Node */}
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    backgroundColor: isPassed ? '#22c55e15' : `${level.color}15`,
                    border: isPassed ? '1px solid #22c55e40' : `1px solid ${level.color}40`,
                    color: isPassed ? '#22c55e' : level.color,
                  }}
                >
                  {isPassed ? <Check size={13} /> : isLocked ? <Lock size={11} /> : level.id}
                </div>

                {/* Content */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p
                      className="text-sm font-bold"
                      style={{
                        color: isLocked ? '#3c3c3c' : isPassed ? '#22c55e' : '#eff1f6',
                      }}
                    >
                      {level.title}
                    </p>
                  </div>
                  <p
                    className="text-[11px] mb-1.5"
                    style={{ color: isLocked ? '#2c2c2c' : '#5c5c5c' }}
                  >
                    {level.subtitle}
                  </p>
                  {!isLocked && (
                    <div className="flex items-start gap-1.5">
                      <Zap
                        size={9}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: isPassed ? '#22c55e' : level.color }}
                      />
                      <p
                        className="text-[9px] leading-snug"
                        style={{
                          color: isPassed ? '#22c55e88' : `${level.color}88`,
                        }}
                      >
                        {LISTENING_UNLOCKS[level.id]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="text-[10px] text-[#3c3c3c] text-center py-4">
        Complete each level at 90%+ accuracy to unlock the next
      </div>
    </div>
  );
}
