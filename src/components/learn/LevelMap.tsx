/**
 * LevelMap — Vertical stack of 7 level nodes.
 *
 * Each node shows:
 *   - Level number (large, in a circle)
 *   - Level title and subtitle
 *   - Status indicator (locked / current pulsing ring / passed checkmark / available dot)
 *   - Color accent for each level
 *   - A connecting line between nodes
 */

import { Lock, Check, Play } from 'lucide-react';
import { LEVELS } from '@/data/drill-content';
import { useLevelStore } from '@/stores/level-store';

interface LevelMapProps {
  onSelectLevel: (id: number) => void;
}

export default function LevelMap({ onSelectLevel }: LevelMapProps) {
  const { completedLevelIds } = useLevelStore();

  const getLevelStatus = (index: number): 'locked' | 'available' | 'current' | 'passed' => {
    const level = LEVELS[index];
    const isCompleted = completedLevelIds.includes(level.id);
    const prevCompleted = index === 0 || completedLevelIds.includes(LEVELS[index - 1].id);

    if (isCompleted) return 'passed';
    if (prevCompleted) return 'current';
    return 'locked';
  };

  return (
    <div className="relative pl-5">
      {/* Vertical connector line behind all nodes */}
      <div className="absolute left-[22px] top-8 bottom-8 w-0.5 bg-[#ffffff08]" />

      <div className="space-y-4">
        {LEVELS.map((level, index) => {
          const status = getLevelStatus(index);
          const isLocked = status === 'locked';
          const isPassed = status === 'passed';
          const isCurrent = status === 'current';

          return (
            <button
              key={level.id}
              onClick={() => {
                if (!isLocked) onSelectLevel(level.id);
              }}
              disabled={isLocked}
              className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl transition-all text-left ${
                isLocked
                  ? 'bg-[#0f0f0f] border border-[#ffffff05] cursor-not-allowed opacity-50'
                  : isPassed
                  ? 'bg-[#141414] border border-[#ffffff08] hover:bg-[#1a1a1a] hover:border-[#ffffff15] cursor-pointer'
                  : 'bg-[#141414] border border-[#ffffff10] hover:border-[#ffffff18] hover:bg-[#1a1a1a] cursor-pointer'
              }`}
            >
              {/* Node circle */}
              <div className="relative flex-shrink-0">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isLocked
                      ? 'bg-[#1a1a1a] border border-[#ffffff08] text-[#5c5c5c]'
                      : isPassed
                      ? 'bg-[#22c55e15] border border-[#22c55e40] text-[#22c55e]'
                      : isCurrent
                      ? 'bg-[#ffffff08] border border-[#ffa11660] text-[#ffa116]'
                      : 'bg-[#ffffff08] border border-[#ffffff15] text-[#eff1f6]'
                  }`}
                  style={
                    isPassed
                      ? {}
                      : isCurrent
                      ? { borderColor: `${level.color}60`, color: level.color }
                      : {}
                  }
                >
                  {isPassed ? (
                    <Check size={14} />
                  ) : isLocked ? (
                    <Lock size={12} />
                  ) : (
                    <span style={{ color: isCurrent ? level.color : undefined }}>
                      {level.id}
                    </span>
                  )}
                </div>
                {isCurrent && (
                  <div
                    className="absolute inset-0 rounded-full border-2 animate-ping pointer-events-none"
                    style={{ borderColor: `${level.color}40` }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    isLocked ? 'text-[#5c5c5c]' : 'text-[#eff1f6]'
                  }`}
                >
                  {level.title}
                </p>
                <p className="text-[11px] text-[#8c8c8c] truncate">
                  {level.subtitle}
                </p>
              </div>

              {/* Status badge */}
              {!isLocked && (
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {isPassed ? (
                    <span className="text-[10px] font-semibold text-[#22c55e] bg-[#22c55e15] px-2 py-0.5 rounded-md">
                      Passed
                    </span>
                  ) : (
                    <div
                      className="flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-md"
                      style={{
                        color: level.color,
                        backgroundColor: `${level.color}15`,
                      }}
                    >
                      <Play size={9} />
                      Start
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
