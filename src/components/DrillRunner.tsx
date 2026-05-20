import { useState, useCallback } from 'react';
import { Check, X, RotateCcw, ChevronRight, Trophy, Eye, Dumbbell } from 'lucide-react';
export interface Exercise {
  id?: string | number;
  type: string;
  question?: string;
  prompt?: string;
  options?: string[];
  answer?: string;
  correctAnswer?: string | number;
  words?: string[];
  correctOrder?: string[];
  parts?: [string, string] | { part: string; answer: string }[];
  partLabels?: [string, string];
  explanation?: string;
}

interface DrillRunnerProps {
  drills: Exercise[];
  onComplete?: (score: number, total: number, passed: boolean) => void;
  onRetry?: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  multiple_choice: 'Multiple Choice',
  recognize: 'Recognize',
  choose: 'Choose',
  fill_blank: 'Fill in the Blank',
  ordering: 'Word Order',
  decomposition: 'Break It Down',
};

/** Shuffle an array (Fisher-Yates) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function DrillRunner({ drills, onComplete, onRetry }: DrillRunnerProps) {
  const [drillSet, setDrillSet] = useState(() => shuffle(drills));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);

  // Per-drill local state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [orderedWords, setOrderedWords] = useState<string[]>([]);
  const [partA, setPartA] = useState('');
  const [partB, setPartB] = useState('');
  const [revealed, setRevealed] = useState(false);

  const current = drillSet[index];
  const total = drillSet.length;
  const isLast = index === total - 1;

  // Normalize old Drill vs new Exercise format
  const qText = current?.question ?? current?.prompt ?? '';
  const correctAnswer = (() => {
    if (current?.answer !== undefined) return current.answer;
    if (typeof current?.correctAnswer === 'number') {
      return current.options?.[current.correctAnswer] ?? '';
    }
    return current?.correctAnswer ?? '';
  })();
  const wordBank = current?.words ?? current?.correctOrder;
  const decompParts = (() => {
    const p = current?.parts;
    if (!p) return undefined as [string, string] | undefined;
    if (Array.isArray(p) && p.length === 2 && typeof p[0] === 'string') {
      return p as [string, string];
    }
    if (Array.isArray(p) && p.length > 0 && typeof (p[0] as any).answer === 'string') {
      const arr = p as { answer: string }[];
      return [arr[0]?.answer ?? '', arr[1]?.answer ?? ''] as [string, string];
    }
    return undefined;
  })();

  const resetLocal = useCallback(() => {
    setSelectedOption(null);
    setOrderedWords([]);
    setPartA('');
    setPartB('');
    setRevealed(false);
  }, []);

  const handleCheck = useCallback(() => {
    if (revealed || !current) return;
    let correct = false;

    switch (current.type) {
      case 'multiple_choice':
      case 'recognize':
      case 'choose':
      case 'fill_blank':
        correct = selectedOption === correctAnswer;
        break;
      case 'ordering':
        correct = orderedWords.join(' ') === correctAnswer;
        break;
      case 'decomposition':
        correct =
          partA.trim().toLowerCase() === (decompParts?.[0] ?? '').toLowerCase() &&
          partB.trim().toLowerCase() === (decompParts?.[1] ?? '').toLowerCase();
        break;
    }

    if (correct) setScore((s) => s + 1);
    setResults((prev) => ({ ...prev, [index]: correct }));
    setRevealed(true);
  }, [current, revealed, index, selectedOption, orderedWords, partA, partB]);

  const handleNext = useCallback(() => {
    if (isLast) {
      const finalScore = score + (results[index] ? 0 : 1);
      const passed = finalScore / total >= 0.8;
      setFinished(true);
      onComplete?.(finalScore, total, passed);
    } else {
      setIndex((i) => i + 1);
      resetLocal();
    }
  }, [isLast, score, results, index, total, onComplete, resetLocal]);

  const handleRetry = useCallback(() => {
    const shuffled = shuffle(drills);
    setDrillSet(shuffled);
    setIndex(0);
    setScore(0);
    setResults({});
    setFinished(false);
    resetLocal();
    onRetry?.();
  }, [drills, onRetry, resetLocal]);

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  if (finished) {
    const passed = score / total >= 0.8;
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 py-8 text-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${passed ? 'bg-[#22c55e]15' : 'bg-[#ef4444]15'}`}>
          <Trophy size={28} className={passed ? 'text-[#22c55e]' : 'text-[#ef4444]'} />
        </div>
        <h2 className="text-2xl font-bold text-[#eff1f6]">{percentage}%</h2>
        <p className="text-sm text-[#8c8c8c] mt-1">
          {score} / {total} correct
        </p>
        <p className={`text-sm mt-2 font-medium ${passed ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
          {passed ? 'Drill set passed! Nice work.' : 'Need 80%+ to pass. Review and try again.'}
        </p>

        {/* Review list */}
        <div className="w-full max-w-md mt-6 space-y-2 text-left">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Review</p>
          {drillSet.map((d, i) => {
            const ok = results[i];
            return (
              <div
                key={i}
                className={`rounded-lg border p-3 ${ok ? 'bg-[#22c55e]08 border-[#22c55e15]' : 'bg-[#ef4444]08 border-[#ef4444]15'}`}
              >
                <div className="flex items-start gap-2">
                  {ok ? <Check size={13} className="text-[#22c55e] flex-shrink-0 mt-0.5" /> : <X size={13} className="text-[#ef4444] flex-shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-[#c8c8c8] line-clamp-2">{d.question ?? d.prompt}</p>
                    <p className="text-[10px] text-[#5c5c5c] mt-1">{d.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRetry}
          className="mt-6 h-10 px-5 rounded-xl bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] text-sm font-semibold flex items-center gap-2 hover:bg-[#222222] transition-colors"
        >
          <RotateCcw size={14} />
          Retry Drill Set
        </button>
      </div>
    );
  }

  if (!current) return null;

  const progressPct = ((index + (revealed ? 1 : 0)) / total) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Dumbbell size={13} className="text-[#ffa116]" />
            <span className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
              {TYPE_LABELS[current.type]}
            </span>
          </div>
          <span className="text-[11px] text-[#5c5c5c]">
            {index + 1} / {total}
          </span>
        </div>
        <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full bg-[#ffa116] rounded-full transition-all" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Drill body */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        <div className="max-w-[560px] mx-auto space-y-5">
          {/* Question */}
          <div>
            <p className="text-[15px] font-medium text-[#eff1f6] leading-relaxed">{qText}</p>
            {current.prompt && (
              <p className="mt-2 text-sm text-[#d4d4d4] font-mono bg-[#1a1a1a] rounded-lg px-3 py-2 border border-[#ffffff08]">
                {current.prompt}
              </p>
            )}
          </div>

          {/* ── multiple_choice / fill_blank ── */}
          {((current.type === 'multiple_choice' || current.type === 'recognize' || current.type === 'choose' || current.type === 'fill_blank') && current.options) && (
            <div className="space-y-2">
              {current.options.map((opt) => {
                let bg = 'bg-[#1a1a1a] border border-[#ffffff15] hover:border-[#ffa11650]';
                if (revealed) {
                  if (opt === correctAnswer) bg = 'bg-[#00b8a315] border border-[#00b8a3]';
                  else if (opt === selectedOption) bg = 'bg-[#ff375f15] border border-[#ff375f]';
                  else bg = 'bg-[#1a1a1a] border border-[#ffffff08] opacity-50';
                } else if (opt === selectedOption) {
                  bg = 'bg-[#ffa11615] border border-[#ffa116]';
                }
                return (
                  <button
                    key={opt}
                    disabled={revealed}
                    onClick={() => setSelectedOption(opt)}
                    className={`${bg} w-full text-left px-4 py-3 rounded-lg text-sm transition-all flex items-center gap-3`}
                  >
                    <span className="flex-1 text-[#eff1f6]">{opt}</span>
                    {revealed && opt === correctAnswer && <Check size={15} className="text-[#00b8a3] flex-shrink-0" />}
                    {revealed && opt === selectedOption && opt !== correctAnswer && <X size={15} className="text-[#ff375f] flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── ordering ── */}
          {current.type === 'ordering' && wordBank && (
            <div className="space-y-4">
              {/* Built sentence */}
              <div className="min-h-[44px] bg-[#0f0f0f] rounded-lg border border-[#ffffff10] px-3 py-2 flex flex-wrap gap-2 items-center">
                {orderedWords.length === 0 ? (
                  <span className="text-xs text-[#5c5c5c]">Click words below in the correct order...</span>
                ) : (
                  orderedWords.map((w, i) => (
                    <button
                      key={`${w}-${i}`}
                      onClick={() => setOrderedWords((prev) => prev.filter((_, idx) => idx !== i))}
                      className="px-2.5 py-1 rounded-md bg-[#ffa11620] text-[#ffa116] text-sm border border-[#ffa11630] hover:bg-[#ffa11630] transition-colors"
                    >
                      {w}
                    </button>
                  ))
                )}
              </div>

              {/* Word bank */}
              <div className="flex flex-wrap gap-2">
                {wordBank
                  .filter((w) => !orderedWords.includes(w) || orderedWords.filter((x) => x === w).length < wordBank!.filter((x) => x === w).length)
                  .map((w, i) => (
                    <button
                      key={`${w}-${i}`}
                      onClick={() => setOrderedWords((prev) => [...prev, w])}
                      disabled={revealed}
                      className="px-3 py-1.5 rounded-md bg-[#1a1a1a] border border-[#ffffff10] text-sm text-[#c8c8c8] hover:border-[#ffa11650] hover:text-[#eff1f6] transition-colors disabled:opacity-40"
                    >
                      {w}
                    </button>
                  ))}
              </div>

              {revealed && (
                <div className={`rounded-lg p-3 text-sm border ${orderedWords.join(' ') === correctAnswer ? 'bg-[#00b8a310] border-[#00b8a330] text-[#00b8a3]' : 'bg-[#ff375f10] border-[#ff375f30] text-[#ff7b7b]'}`}>
                  <p className="font-semibold">
                    {orderedWords.join(' ') === correctAnswer ? 'Correct!' : 'Not quite'}
                  </p>
                  <p className="text-[#c8c8c8] mt-1">Correct order: <span className="text-[#eff1f6] font-mono">{correctAnswer}</span></p>
                </div>
              )}
            </div>
          )}

          {/* ── decomposition ── */}
          {current.type === 'decomposition' && decompParts && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm text-[#8c8c8c]">{current.partLabels?.[0] ?? 'Part 1'}:</span>
                <input
                  type="text"
                  value={partA}
                  onChange={(e) => setPartA(e.target.value)}
                  disabled={revealed}
                  placeholder="?"
                  className="w-24 h-9 px-3 rounded-lg bg-[#1a1a1a] border border-[#ffffff15] text-sm text-[#eff1f6] text-center focus:outline-none focus:border-[#ffa116] disabled:opacity-50"
                />
                <span className="text-sm text-[#8c8c8c]">+</span>
                <span className="text-sm text-[#8c8c8c]">{current.partLabels?.[1] ?? 'Part 2'}:</span>
                <input
                  type="text"
                  value={partB}
                  onChange={(e) => setPartB(e.target.value)}
                  disabled={revealed}
                  placeholder="?"
                  className="w-24 h-9 px-3 rounded-lg bg-[#1a1a1a] border border-[#ffffff15] text-sm text-[#eff1f6] text-center focus:outline-none focus:border-[#ffa116] disabled:opacity-50"
                />
              </div>

              {revealed && (
                <div className={`rounded-lg p-3 text-sm border ${(partA.trim().toLowerCase() === decompParts[0].toLowerCase() && partB.trim().toLowerCase() === decompParts[1].toLowerCase()) ? 'bg-[#00b8a310] border-[#00b8a330] text-[#00b8a3]' : 'bg-[#ff375f10] border-[#ff375f30] text-[#ff7b7b]'}`}>
                  <p className="font-semibold">
                    {(partA.trim().toLowerCase() === decompParts[0].toLowerCase() && partB.trim().toLowerCase() === decompParts[1].toLowerCase()) ? 'Correct!' : 'Not quite'}
                  </p>
                  <p className="text-[#c8c8c8] mt-1">
                    Answer: <span className="text-[#eff1f6]">{decompParts[0]}</span> + <span className="text-[#eff1f6]">{decompParts[1]}</span>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Explanation (shown after reveal) */}
          {revealed && current.type !== 'ordering' && current.type !== 'decomposition' && (
            <div className={`rounded-lg p-3.5 text-sm border ${results[index] ? 'bg-[#00b8a310] border-[#00b8a330] text-[#00b8a3]' : 'bg-[#ff375f10] border-[#ff375f30] text-[#ff7b7b]'}`}>
              <p className="font-semibold mb-1">{results[index] ? 'Correct!' : `The answer was: ${correctAnswer}`}</p>
              <p className="text-[#c8c8c8]">{current.explanation}</p>
            </div>
          )}
        </div>
      </div>

      {/* Action bar */}
      <div className="h-[52px] bg-[#1a1a1a] border-t border-[#ffffff10] flex items-center px-4 gap-3 flex-shrink-0">
        {!revealed ? (
          <button
            onClick={handleCheck}
            disabled={
              ((current.type === 'multiple_choice' || current.type === 'recognize' || current.type === 'choose' || current.type === 'fill_blank') && !selectedOption)
              || current.type === 'ordering' && orderedWords.length === 0
              || current.type === 'decomposition' && (!partA || !partB)
            }
            className="h-9 px-5 rounded-lg bg-[#ffa116] text-[#0f0f0f] font-semibold text-sm flex items-center gap-1.5 hover:bg-[#ffb84d] transition-colors disabled:bg-[#282828] disabled:text-[#5c5c5c] disabled:cursor-not-allowed"
          >
            <Eye size={13} />
            Check
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="h-9 px-5 rounded-lg bg-[#ffa116] text-[#0f0f0f] font-semibold text-sm flex items-center gap-1.5 hover:bg-[#ffb84d] transition-colors"
          >
            {isLast ? 'Finish' : 'Next'}
            <ChevronRight size={13} />
          </button>
        )}

        <span className="ml-auto text-[11px] text-[#5c5c5c]">
          Score: <span className="text-[#eff1f6] font-semibold">{score}</span> / {total}
        </span>
      </div>
    </div>
  );
}

export { DrillRunner };
