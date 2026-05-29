/**
 * LevelSelect — Responsive level picker.
 *
 * Desktop: 2-3 column grid, compact cards
 * Mobile: single column, minimal text
 * Listening unlocks shown on hover/focus only
 */

import { Lock, Check, Zap } from 'lucide-react';
import { LEVELS } from '@/data/drill-content';
import { useLevelStore } from '@/stores/level-store';
import { useState } from 'react';

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
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const completed = completedLevelIds.length;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-[#eff1f6]">{completed}/7 Levels</span>
          <span className="text-xs text-[#5c5c5c]">{Math.round((completed / 7) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-[#0f0f0f] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#ffa116] transition-all duration-300"
            style={{ width: `${(completed / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Level grid — responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LEVELS.map((level) => {
          const status = getLevelStatus(level.id);
          const isLocked = status === 'locked';
          const isPassed = status === 'passed';
          const isAvailable = status === 'available' || status === 'in-progress';
          const showUnlock = hoveredLevel === level.id;

          return (
            <button
              key={level.id}
              onClick={() => !isLocked && onSelectLevel(level.id)}
              disabled={isLocked}
              onMouseEnter={() => !isLocked && setHoveredLevel(level.id)}
              onMouseLeave={() => setHoveredLevel(null)}
              className="p-4 rounded-xl border transition-all active:scale-[0.98] text-left"
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
                {/* Node circle */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    backgroundColor: isPassed ? '#22c55e15' : `${level.color}15`,
                    border: isPassed ? '1px solid #22c55e40' : `1px solid ${level.color}40`,
                    color: isPassed ? '#22c55e' : level.color,
                  }}
                >
                  {isPassed ? <Check size={14} /> : isLocked ? <Lock size={12} /> : level.id}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Title + Subtitle (always visible) */}
                  <p className="text-sm font-bold text-[#eff1f6] leading-snug">{level.title}</p>
                  <p className="text-[10px] text-[#5c5c5c] mt-0.5">{level.subtitle}</p>

                  {/* Listening unlock (show on hover/mobile via toggle, desktop via hover) */}
                  {!isLocked && (
                    <div
                      className={`flex items-start gap-1.5 mt-2 transition-all duration-200 ${
                        showUnlock ? 'opacity-100 max-h-12' : 'opacity-0 max-h-0 overflow-hidden sm:opacity-100 sm:max-h-12'
                      }`}
                    >
                      <Zap
                        size={9}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: isPassed ? '#22c55e' : level.color }}
                      />
                      <p
                        className="text-[9px] leading-tight"
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
      <div className="text-[10px] text-[#3c3c3c] text-center py-2">
        Complete each level at 90%+ to unlock the next
      </div>
    </div>
  );
}
