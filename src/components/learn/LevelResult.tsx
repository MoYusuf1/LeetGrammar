/**
 * LevelComplete — shown after a gate attempt.
 *
 * Pass: celebrates, shows the "listening unlock" + preview of next level.
 * Fail: shows score, clear retry CTA, no shame messaging.
 */

import { Check, X, ArrowRight, RotateCcw, Map, Ear, ChevronRight } from 'lucide-react';
import { LEVELS, getLevelById } from '@/data/drill-content';
import type { LevelData } from '@/data/drill-content';

interface LevelCompleteProps {
  level: LevelData;
  score: number;
  total: number;
  onNextLevel: () => void;
  onRetry: () => void;
  onBackToMap: () => void;
}

/** What passing this level lets you hear */
const LISTENING_UNLOCKS: Record<number, { headline: string; detail: string }> = {
  1: {
    headline: 'You can now type-scan any Somali sentence',
    detail: 'Statement, question, focus, or spotlight — your brain now labels them before meaning arrives.',
  },
  2: {
    headline: 'The waa / baa / waxa distinction is in your hands',
    detail: '"He ate" vs "ALI ate" vs "What he ate was..." — you hear the difference every time.',
  },
  3: {
    headline: 'Fast speech clicks into place',
    detail: 'Wuxuu, waxay, baan no longer blur. You instantly know marker + subject from a single fused sound.',
  },
  4: {
    headline: 'You always know where the verb will land',
    detail: 'SOV order is in your bones. You stop chasing the verb and wait for it at the end.',
  },
  5: {
    headline: 'The spatial logic of Somali is yours',
    detail: 'u / ku / ka / la + soo / sii — you now follow who did what, for whom, and from where.',
  },
  6: {
    headline: 'You can track ideas across whole sentences',
    detail: 'iyo / -na / -se / oo — the threads between clauses no longer snap.',
  },
  7: {
    headline: 'You can build any Somali sentence from scratch',
    detail: 'Production and comprehension are now locked together. If you can build it, you can hear it.',
  },
};

export default function LevelComplete({
  level, score, total, onNextLevel, onRetry, onBackToMap,
}: LevelCompleteProps) {
  const passed = total > 0 && score / total >= 0.9;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const isLastLevel = level.id === 7;
  const nextLevel = getLevelById(level.id + 1);
  const unlock = LISTENING_UNLOCKS[level.id];

  return (
    <div className="space-y-5 py-4">
      {/* Result icon */}
      <div className="flex flex-col items-center text-center gap-3 pb-2">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={
            passed
              ? { backgroundColor: '#22c55e12', border: '1px solid #22c55e30' }
              : { backgroundColor: '#ef444412', border: '1px solid #ef444430' }
          }
        >
          {passed
            ? <Check size={28} className="text-[#22c55e]" />
            : <X size={28} className="text-[#ef4444]" />}
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#eff1f6]">
            {passed ? `Level ${level.id} Passed!` : 'Not quite there yet'}
          </h2>
          <p className="text-sm text-[#5c5c5c] mt-1">
            {passed ? level.title : `Review the rule and try again`}
          </p>
        </div>
      </div>

      {/* Score card */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#5c5c5c]">Score</span>
          <span
            className="text-lg font-bold"
            style={{ color: passed ? '#22c55e' : '#ef4444' }}
          >
            {score}/{total} · {pct}%
          </span>
        </div>
        <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, backgroundColor: passed ? '#22c55e' : '#ef4444' }}
          />
        </div>
        {!passed && (
          <p className="text-xs text-[#5c5c5c] mt-2.5">Need 90% to pass — you scored {pct}%</p>
        )}
      </div>

      {/* Listening unlock (pass only) */}
      {passed && unlock && (
        <div className="rounded-xl bg-[#0f1a0f] border border-[#22c55e18] p-4">
          <div className="flex items-start gap-2.5">
            <Ear size={14} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#22c55e] mb-1">{unlock.headline}</p>
              <p className="text-xs text-[#5a8a5a] leading-relaxed">{unlock.detail}</p>
            </div>
          </div>
        </div>
      )}

      {/* Next level preview (pass, not last) */}
      {passed && !isLastLevel && nextLevel && (
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: `${nextLevel.color}08`, border: `1px solid ${nextLevel.color}20` }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: `${nextLevel.color}80` }}>
            Up next — Level {nextLevel.id}
          </p>
          <p className="text-sm font-semibold text-[#eff1f6]">{nextLevel.title}</p>
          <p className="text-xs mt-0.5" style={{ color: `${nextLevel.color}99` }}>{nextLevel.subtitle}</p>
        </div>
      )}

      {/* All done */}
      {passed && isLastLevel && (
        <div className="rounded-xl bg-[#ffa11610] border border-[#ffa11630] p-4 text-center">
          <p className="text-sm font-bold text-[#ffa116] mb-1">Workbook 1 Complete</p>
          <p className="text-xs text-[#8c8c8c] leading-relaxed">
            Your grammar skeleton is solid. Go watch Somali content with your Listening Guide open. Pause every 15 seconds and decode one sentence. You are not guessing anymore — you are parsing.
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="space-y-2.5">
        {passed ? (
          <>
            {!isLastLevel ? (
              <button
                onClick={onNextLevel}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ backgroundColor: nextLevel?.color ?? '#ffa116', color: '#0f0f0f' }}
              >
                <span>Start Level {level.id + 1}</span>
                <ArrowRight size={15} />
              </button>
            ) : null}
            <button
              onClick={onBackToMap}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-[#1a1a1a] border border-[#ffffff08] text-[#8c8c8c] hover:text-[#eff1f6] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Map size={14} />
              <span>Back to Map</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onRetry}
              className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ backgroundColor: level.color, color: '#0f0f0f' }}
            >
              <RotateCcw size={14} />
              <span>Try Again</span>
            </button>
            <button
              onClick={onBackToMap}
              className="w-full py-3 rounded-xl font-semibold text-sm bg-[#1a1a1a] border border-[#ffffff08] text-[#8c8c8c] hover:text-[#eff1f6] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Map size={14} />
              <span>Back to Map</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
