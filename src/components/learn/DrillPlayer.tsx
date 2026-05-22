/**
 * DrillPlayer — Interactive drill practice for guided and unguided phases.
 *
 * Shows one drill at a time with answer input, Check/Continue flow,
 * and a progress bar. Guided mode shows hints; unguided hides them.
 */

import { useState, useCallback } from 'react';
import { Check, ChevronRight, Eye, EyeOff } from 'lucide-react';
import type { Exercise } from '@/data/drill-content';

type DrillMode = 'guided' | 'unguided';

interface DrillPlayerProps {
  drills: Exercise[];
  mode: DrillMode;
  levelColor: string;
  onComplete: (score: number) => void;
}

export default function DrillPlayer({
  drills,
  mode,
  levelColor,
  onComplete,
}: DrillPlayerProps) {
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(mode === 'guided');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInputs, setTextInputs] = useState<string[]>(['', '', '']);

  const drill = drills[index];
  const isLast = index === drills.length - 1;
  const progress = ((index + (checked ? 1 : 0)) / drills.length) * 100;

  const isCorrect = useCallback((answer: string): boolean => {
    const correct = Array.isArray(drill.correctAnswer)
      ? drill.correctAnswer
      : [drill.correctAnswer];
    return correct.some(
      (c) => c.trim().toLowerCase() === answer.trim().toLowerCase()
    );
  }, [drill]);

  const handleCheck = () => {
    const answer = selectedOption ?? userAnswer;
    if (!answer.trim()) return;
    const correct = isCorrect(answer);
    setChecked(true);
    if (correct) setScore((s) => s + 1);
  };

  const handleContinue = () => {
    if (isLast) {
      const finalCorrect = checked && isCorrect(selectedOption ?? userAnswer) ? 1 : 0;
      onComplete(score + finalCorrect);
      return;
    }
    setIndex((i) => i + 1);
    setUserAnswer('');
    setChecked(false);
    setSelectedOption(null);
    setTextInputs(['', '', '']);
    setShowHint(mode === 'guided');
  };

  if (!drill) {
    onComplete(0);
    return null;
  }

  const hasOptions = !!drill.options && drill.options.length > 0;
  const hasScramble = drill.type === 'word-scramble' && !!drill.scrambledWords;
  const currentAnswer = selectedOption ?? userAnswer;
  const answerCorrect = checked && isCorrect(currentAnswer);
  const typeLabel = drill.type.replace(/-/g, ' ');

  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-[10px] text-[#8c8c8c] mb-1.5">
          <span className="font-medium">
            {mode === 'guided' ? 'Guided Practice' : 'Unguided Practice'}
          </span>
          <span>
            {index + 1} / {drills.length}
          </span>
        </div>
        <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: levelColor }}
          />
        </div>
      </div>

      {/* Drill prompt card */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-4">
        {/* Type badge + prompt */}
        <div>
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2"
            style={{
              backgroundColor: `${levelColor}15`,
              color: levelColor,
              border: `1px solid ${levelColor}30`,
            }}
          >
            {typeLabel}
          </span>
          <p className="text-sm font-medium text-[#eff1f6] leading-relaxed">
            {drill.prompt}
          </p>
        </div>

        {/* Somali sentence */}
        {drill.somaliSentence && (
          <div className="rounded-lg bg-[#1a1a1a] border border-[#ffffff08] p-3">
            <p className="text-sm font-medium text-[#eff1f6] font-mono">
              {drill.somaliSentence}
            </p>
          </div>
        )}

        {/* Hint with toggle for unguided mode */}
        {drill.englishHint && (
          <div className="flex items-center justify-between">
            {(showHint || mode === 'guided') ? (
              <p className="text-xs text-[#8c8c8c]">
                <span className="text-[#5c5c5c]">Hint: </span>
                {drill.englishHint}
              </p>
            ) : (
              <span />
            )}
            {mode === 'unguided' && (
              <button
                onClick={() => setShowHint((s) => !s)}
                className="flex items-center gap-1 text-[10px] text-[#5c5c5c] hover:text-[#8c8c8c] transition-colors"
              >
                {showHint ? <EyeOff size={12} /> : <Eye size={12} />}
                {showHint ? 'Hide hint' : 'Show hint'}
              </button>
            )}
          </div>
        )}

        {/* Blueprint slots */}
        {drill.blueprint && (
          <div className="flex flex-wrap items-center gap-2">
            {drill.blueprint.subject && (
              <div className="flex items-center gap-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] px-3 py-2">
                <span className="text-[10px] font-bold text-[#5c5c5c] uppercase">Subject</span>
                <span className="text-xs text-[#eff1f6]">{drill.blueprint.subject}</span>
              </div>
            )}
            {drill.blueprint.marker && (
              <div className="flex items-center gap-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] px-3 py-2">
                <span className="text-[10px] font-bold text-[#5c5c5c] uppercase">Marker</span>
                <span className="text-xs text-[#eff1f6]">{drill.blueprint.marker}</span>
              </div>
            )}
            {drill.blueprint.object && (
              <div className="flex items-center gap-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] px-3 py-2">
                <span className="text-[10px] font-bold text-[#5c5c5c] uppercase">Object</span>
                <span className="text-xs text-[#eff1f6]">{drill.blueprint.object}</span>
              </div>
            )}
            {drill.blueprint.verb && (
              <div className="flex items-center gap-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] px-3 py-2">
                <span className="text-[10px] font-bold text-[#5c5c5c] uppercase">Verb</span>
                <span className="text-xs text-[#eff1f6]">{drill.blueprint.verb}</span>
              </div>
            )}
          </div>
        )}

        {/* Scrambled words */}
        {hasScramble && drill.scrambledWords && (
          <div className="flex flex-wrap gap-2">
            {drill.scrambledWords.map((word, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-md bg-[#1a1a1a] border border-[#ffffff10] text-xs text-[#eff1f6] font-mono"
              >
                {word}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Answer area */}
      <div className="space-y-3">
        {/* Multiple choice options */}
        {hasOptions && !checked && (
          <div className="space-y-2">
            {drill.options!.map((option, i) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#ffa116] bg-[#ffa11610]'
                      : 'border-[#ffffff08] bg-[#141414] hover:border-[#ffffff15] hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        isSelected
                          ? 'border-[#ffa116] text-[#ffa116]'
                          : 'border-[#ffffff15] text-[#5c5c5c]'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span
                      className={`text-sm ${
                        isSelected ? 'text-[#ffa116]' : 'text-[#eff1f6]'
                      }`}
                    >
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Free text input (when no options) */}
        {!hasOptions && !checked && (
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#ffffff10] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa11660] transition-colors"
          />
        )}

        {/* Feedback after check */}
        {checked && (
          <div
            className={`rounded-xl border p-4 ${
              answerCorrect
                ? 'bg-[#22c55e10] border-[#22c55e30]'
                : 'bg-[#ef444410] border-[#ef444430]'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {answerCorrect ? (
                <>
                  <Check size={16} className="text-[#22c55e]" />
                  <span className="text-sm font-bold text-[#22c55e]">Correct!</span>
                </>
              ) : (
                <>
                  <XIcon />
                  <span className="text-sm font-bold text-[#ef4444]">Not quite</span>
                </>
              )}
            </div>
            {!answerCorrect && (
              <p className="text-xs text-[#eff1f6] mb-2">
                <span className="text-[#5c5c5c]">Correct answer: </span>
                <span className="font-medium">
                  {Array.isArray(drill.correctAnswer)
                    ? drill.correctAnswer.join(' / ')
                    : drill.correctAnswer}
                </span>
              </p>
            )}
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              {drill.explanation}
            </p>
          </div>
        )}

        {/* Action button */}
        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={!currentAnswer.trim()}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
              currentAnswer.trim()
                ? 'bg-[#ffa116] text-[#0f0f0f] hover:opacity-90'
                : 'bg-[#ffffff08] text-[#5c5c5c] cursor-not-allowed'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-xl text-sm font-semibold bg-[#22c55e] text-[#0f0f0f] hover:bg-[#22c55ed0] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>{isLast ? 'Finish' : 'Continue'}</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#ef4444]">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
