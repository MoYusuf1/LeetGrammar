/**
 * LevelComplete — Shown after a gate attempt.
 *
 * Pass state (score/total >= 0.9):
 *   - Large checkmark in success green
 *   - "Level [N] Passed!" heading
 *   - Score display
 *   - "Next Level" CTA or "Back to Map"
 *
 * Fail state:
 *   - Large X icon in error red
 *   - "Gate Not Cleared" heading
 *   - Score display + "need 90%"
 *   - "Try Again" and "Back to Map" buttons
 */

import { Check, X, ArrowRight, RotateCcw, Map } from 'lucide-react';
import type { LevelData } from '@/data/drill-content';

interface LevelCompleteProps {
  level: LevelData;
  score: number;
  total: number;
  onNextLevel: () => void;
  onRetry: () => void;
  onBackToMap: () => void;
}

export default function LevelComplete({
  level,
  score,
  total,
  onNextLevel,
  onRetry,
  onBackToMap,
}: LevelCompleteProps) {
  const passed = score / total >= 0.9;
  const pct = Math.round((score / total) * 100);
  const isLastLevel = level.id === 7;

  return (
    <div className="flex flex-col items-center text-center space-y-6 py-8">
      {/* Icon */}
      {passed ? (
        <div className="w-20 h-20 rounded-full bg-[#22c55e15] border border-[#22c55e40] flex items-center justify-center">
          <Check size={36} className="text-[#22c55e]" />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-full bg-[#ef444415] border border-[#ef444440] flex items-center justify-center">
          <X size={36} className="text-[#ef4444]" />
        </div>
      )}

      {/* Heading */}
      <div>
        <h2 className="text-xl font-bold text-[#eff1f6]">
          {passed ? `Level ${level.id} Passed!` : 'Gate Not Cleared'}
        </h2>
        <p className="text-sm text-[#8c8c8c] mt-1">
          {passed
            ? 'Great job! You mastered this skill.'
            : 'Review the rule and try again.'}
        </p>
      </div>

      {/* Score card */}
      <div className="w-full rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#8c8c8c]">Score</span>
          <span
            className={`text-lg font-bold ${
              passed ? 'text-[#22c55e]' : 'text-[#ef4444]'
            }`}
          >
            {score}/{total} ({pct}%)
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${pct}%`,
              backgroundColor: passed ? '#22c55e' : '#ef4444',
            }}
          />
        </div>

        {!passed && (
          <p className="text-xs text-[#8c8c8c] mt-3">
            Need 90% to pass — you got {pct}%
          </p>
        )}
      </div>

      {/* Action buttons */}
      <div className="w-full space-y-3">
        {passed ? (
          <>
            {!isLastLevel ? (
              <button
                onClick={onNextLevel}
                className="w-full py-3 rounded-xl font-semibold text-sm bg-[#ffa116] text-[#0f0f0f] transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <span>Next Level</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <div className="rounded-xl bg-[#ffa11615] border border-[#ffa11630] p-4">
                <p className="text-sm font-bold text-[#ffa116] mb-1">
                  All Levels Complete!
                </p>
                <p className="text-xs text-[#8c8c8c]">
                  You have mastered all 7 grammar skills.
                </p>
              </div>
            )}
            <button
              onClick={onBackToMap}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] transition-all hover:bg-[#222222] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Map size={16} />
              <span>Back to Map</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onRetry}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-[#ffa116] text-[#0f0f0f] transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Try Again</span>
            </button>
            <button
              onClick={onBackToMap}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] transition-all hover:bg-[#222222] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Map size={16} />
              <span>Back to Map</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
