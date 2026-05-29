/**
 * LevelResult — Mobile-first result screen.
 *
 * Pass or fail, simple CTA. Listening unlock on pass.
 */

import { Check, X, ArrowRight, RotateCcw, ChevronRight, Ear } from 'lucide-react';
import { LEVELS, getLevelById } from '@/data/drill-content';
import type { LevelData } from '@/data/drill-content';

interface LevelResultProps {
  level: LevelData;
  score: number;
  total: number;
  onNextLevel: () => void;
  onRetry: () => void;
  onBackToMap: () => void;
}

const LISTENING_UNLOCKS: Record<number, string> = {
  1: 'You can now type-scan any Somali sentence',
  2: 'The waa / baa / waxa distinction is in your hands',
  3: 'Fast speech clicks into place',
  4: 'You always know where the verb will land',
  5: 'The spatial logic of Somali is yours',
  6: 'You can track ideas across whole sentences',
  7: 'You can build any Somali sentence from scratch',
};

export default function LevelResult({
  level, score, total, onNextLevel, onRetry, onBackToMap,
}: LevelResultProps) {
  const passed = total > 0 && score / total >= 0.9;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const isLastLevel = level.id === 7;
  const nextLevel = getLevelById(level.id + 1);

  return (
    <div className="space-y-4 pb-2">
      {/* Result icon */}
      <div className="flex flex-col items-center text-center gap-3 py-2">
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: passed ? '#22c55e12' : '#ef444412',
            border: passed ? '1px solid #22c55e30' : '1px solid #ef444430',
          }}>
          {passed ? <Check size={24} className="text-[#22c55e]" /> : <X size={24} className="text-[#ef4444]" />}
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#eff1f6]">
            {passed ? `Level ${level.id} Complete` : 'Try Again'}
          </h2>
          <p className="text-xs text-[#5c5c5c] mt-0.5">{score}/{total} correct</p>
        </div>
      </div>

      {/* Score card */}
      <div className="rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#5c5c5c]">Score</span>
          <span className="text-xl font-bold" style={{ color: passed ? '#22c55e' : '#ef4444' }}>
            {pct}%
          </span>
        </div>
        <div className="h-2 bg-[#0f0f0f] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: passed ? '#22c55e' : '#ef4444' }} />
        </div>
        {!passed && (
          <p className="text-[10px] text-[#5c5c5c] mt-2">Need 90% to pass</p>
        )}
      </div>

      {/* Listening unlock (pass only) */}
      {passed && (
        <div className="rounded-xl bg-[#0d1a0d] border border-[#22c55e18] p-3">
          <div className="flex items-start gap-2">
            <Ear size={12} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#22c55e] mb-0.5">Listening Unlock</p>
              <p className="text-[10px] text-[#5a8a5a] leading-relaxed">{LISTENING_UNLOCKS[level.id]}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next level preview */}
      {passed && !isLastLevel && nextLevel && (
        <div className="rounded-xl p-3"
          style={{ backgroundColor: `${nextLevel.color}08`, border: `1px solid ${nextLevel.color}20` }}>
          <p className="text-[10px] font-bold uppercase mb-1" style={{ color: `${nextLevel.color}80` }}>
            Next: Level {nextLevel.id}
          </p>
          <p className="text-sm font-bold text-[#eff1f6]">{nextLevel.title}</p>
        </div>
      )}

      {/* All done */}
      {passed && isLastLevel && (
        <div className="rounded-xl bg-[#ffa11610] border border-[#ffa11630] p-3 text-center">
          <p className="text-xs font-bold text-[#ffa116] mb-1">Workbook 1 Complete</p>
          <p className="text-[10px] text-[#8c8c8c] leading-relaxed">
            Go watch Somali content. Pause every 15 seconds. Decode one sentence.
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="space-y-2">
        {passed ? (
          <>
            {!isLastLevel && (
              <button onClick={onNextLevel}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ backgroundColor: nextLevel?.color ?? '#ffa116', color: '#0f0f0f' }}>
                <span>Level {level.id + 1}</span>
                <ArrowRight size={13} />
              </button>
            )}
            <button onClick={onBackToMap}
              className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#1a1a1a] border border-[#ffffff08] text-[#8c8c8c] hover:text-[#eff1f6] transition-all active:scale-[0.98]">
              Back to Map
            </button>
          </>
        ) : (
          <>
            <button onClick={onRetry}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ backgroundColor: level.color, color: '#0f0f0f' }}>
              <RotateCcw size={14} />
              <span>Try Again</span>
            </button>
            <button onClick={onBackToMap}
              className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#1a1a1a] border border-[#ffffff08] text-[#8c8c8c] hover:text-[#eff1f6] transition-all active:scale-[0.98]">
              Back to Map
            </button>
          </>
        )}
      </div>
    </div>
  );
}
