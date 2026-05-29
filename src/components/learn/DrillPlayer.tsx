/**
 * DrillPlayer — interactive drill practice, guided and unguided phases.
 *
 * Teaching methodology per exercise type:
 *   marker-tap       → tappable word tokens in the sentence
 *   marker-classify  → 4 large colour-coded cards (STATEMENT/QUESTION/FOCUS/SPOTLIGHT)
 *   contraction-*    → MCQ or structured fill
 *   word-scramble    → tap-to-build word ordering
 *   fill-blank       → MCQ options
 *   everything else  → MCQ options or text input
 *
 * Feedback always shows WHY with a mini explanation tied to the rule.
 */

import { useState, useCallback } from 'react';
import { Check, ChevronRight, Eye, EyeOff, X as XIcon } from 'lucide-react';
import type { Exercise } from '@/data/drill-content';

type DrillMode = 'guided' | 'unguided';

interface DrillPlayerProps {
  drills: Exercise[];
  mode: DrillMode;
  levelColor: string;
  onComplete: (score: number) => void;
}

/* ─── Marker type cards ───────────────────────────────────────────────────── */
const MARKER_CARDS = [
  { value: 'STATEMENT', label: 'Statement', tag: 'waa / wuu / way', sub: 'focus on the action', color: '#3b82f6' },
  { value: 'QUESTION',  label: 'Question',  tag: 'ma / miyaa',      sub: 'yes/no question',    color: '#f59e0b' },
  { value: 'FOCUS',     label: 'Focus',     tag: 'baa / ayaa',      sub: 'highlight WHO/WHAT', color: '#a855f7' },
  { value: 'SPOTLIGHT', label: 'Spotlight', tag: 'waxa / waxaan',   sub: '"what ___ was..."',  color: '#06b6d4' },
];

/* ─── Normalise answer ───────────────────────────────────────────────────── */
function isMatch(user: string, correct: string | string[]): boolean {
  const u = user.trim().toLowerCase();
  const cs = Array.isArray(correct) ? correct : [correct];
  return cs.some((c) => c.trim().toLowerCase() === u);
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */

/** Sentence displayed as tappable word tokens */
function TappableTokens({
  sentence,
  selected,
  onSelect,
  checked,
  correctAnswer,
  color,
}: {
  sentence: string;
  selected: string | null;
  onSelect: (word: string) => void;
  checked: boolean;
  correctAnswer: string | string[];
  color: string;
}) {
  const tokens = sentence.split(/\s+/);
  return (
    <div className="flex flex-wrap gap-2 py-1">
      {tokens.map((token, i) => {
        const clean = token.replace(/[.?!,]$/, '');
        const isSelected = selected === token || selected === clean;
        const correct = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
        const isCorrectToken = correct.some(
          (c) => c.toLowerCase() === clean.toLowerCase() || c.toLowerCase() === token.toLowerCase()
        );
        const showResult = checked && (isSelected || isCorrectToken);

        let borderCol = '#ffffff10';
        let bgCol = '#1a1a1a';
        let textCol = '#eff1f6';

        if (!checked && isSelected) {
          borderCol = color;
          bgCol = `${color}15`;
          textCol = color;
        } else if (checked && isSelected && isCorrectToken) {
          borderCol = '#22c55e';
          bgCol = '#22c55e15';
          textCol = '#22c55e';
        } else if (checked && isSelected && !isCorrectToken) {
          borderCol = '#ef4444';
          bgCol = '#ef444415';
          textCol = '#ef4444';
        } else if (checked && isCorrectToken && !isSelected) {
          borderCol = '#22c55e50';
          bgCol = '#22c55e08';
          textCol = '#22c55e80';
        }

        return (
          <button
            key={i}
            onClick={() => !checked && onSelect(token)}
            disabled={checked}
            className="px-3 py-2 rounded-lg text-sm font-mono font-medium transition-all active:scale-95"
            style={{ border: `1.5px solid ${borderCol}`, backgroundColor: bgCol, color: textCol }}
          >
            {token}
          </button>
        );
      })}
    </div>
  );
}

/** 4-card classify picker */
function ClassifyPicker({
  selected,
  onSelect,
  checked,
  correctAnswer,
}: {
  selected: string | null;
  onSelect: (v: string) => void;
  checked: boolean;
  correctAnswer: string | string[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {MARKER_CARDS.map((card) => {
        const isSelected = selected === card.value;
        const isCorrect = isMatch(card.value, correctAnswer);
        const showWrong = checked && isSelected && !isCorrect;
        const showRight = checked && isCorrect;

        let borderCol = '#ffffff08';
        let bgCol = '#141414';
        let labelCol = '#8c8c8c';
        let tagCol = '#5c5c5c';

        if (!checked && isSelected) {
          borderCol = card.color;
          bgCol = `${card.color}12`;
          labelCol = card.color;
          tagCol = `${card.color}99`;
        } else if (showRight) {
          borderCol = '#22c55e40';
          bgCol = '#22c55e10';
          labelCol = '#22c55e';
          tagCol = '#22c55e80';
        } else if (showWrong) {
          borderCol = '#ef444440';
          bgCol = '#ef444410';
          labelCol = '#ef4444';
          tagCol = '#ef444480';
        }

        return (
          <button
            key={card.value}
            onClick={() => !checked && onSelect(card.value)}
            disabled={checked}
            className="p-3 rounded-xl text-left transition-all active:scale-[0.97]"
            style={{ border: `1.5px solid ${borderCol}`, backgroundColor: bgCol }}
          >
            <div
              className="text-[9px] font-bold uppercase tracking-wider mb-1"
              style={{ color: tagCol }}
            >
              {card.tag}
            </div>
            <div className="text-sm font-bold" style={{ color: labelCol }}>
              {card.label}
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: tagCol }}>
              {card.sub}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/** Word scramble: tap to build sentence in order */
function WordScramble({
  words,
  onAnswer,
  checked,
  correctAnswer,
  color,
}: {
  words: string[];
  onAnswer: (answer: string) => void;
  checked: boolean;
  correctAnswer: string | string[];
  color: string;
}) {
  const [placed, setPlaced] = useState<string[]>([]);
  const [available, setAvailable] = useState<string[]>([...words]);

  const addWord = (word: string, idx: number) => {
    if (checked) return;
    const newAvail = [...available];
    newAvail.splice(idx, 1);
    const newPlaced = [...placed, word];
    setAvailable(newAvail);
    setPlaced(newPlaced);
    onAnswer(newPlaced.join(' '));
  };

  const removeWord = (word: string, idx: number) => {
    if (checked) return;
    const newPlaced = [...placed];
    newPlaced.splice(idx, 1);
    const newAvail = [...available, word];
    setPlaced(newPlaced);
    setAvailable(newAvail);
    onAnswer(newPlaced.join(' '));
  };

  return (
    <div className="space-y-3">
      {/* Answer zone */}
      <div
        className="min-h-[48px] p-3 rounded-xl border flex flex-wrap gap-2 items-center"
        style={{ borderColor: placed.length > 0 ? `${color}30` : '#ffffff08', backgroundColor: '#141414' }}
      >
        {placed.length === 0 ? (
          <span className="text-xs text-[#3c3c3c]">Tap words below to build the sentence...</span>
        ) : (
          placed.map((word, i) => (
            <button
              key={i}
              onClick={() => removeWord(word, i)}
              disabled={checked}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all active:scale-95"
              style={{ border: `1.5px solid ${color}40`, backgroundColor: `${color}10`, color: color }}
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available word pool */}
      {!checked && (
        <div className="flex flex-wrap gap-2">
          {available.map((word, i) => (
            <button
              key={i}
              onClick={() => addWord(word, i)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] transition-all active:scale-95 hover:border-[#ffffff20]"
            >
              {word}
            </button>
          ))}
        </div>
      )}

      {/* Correct answer display when done */}
      {checked && (
        <div className="text-xs text-[#5c5c5c]">
          Your answer: <span className="text-[#8c8c8c] font-mono">{placed.join(' ')}</span>
        </div>
      )}
    </div>
  );
}

/** Standard MCQ options */
function MCQOptions({
  options,
  selected,
  onSelect,
  checked,
  correctAnswer,
  color,
}: {
  options: string[];
  selected: string | null;
  onSelect: (o: string) => void;
  checked: boolean;
  correctAnswer: string | string[];
  color: string;
}) {
  return (
    <div className="space-y-2">
      {options.map((option, i) => {
        const isSelected = selected === option;
        const isCorrect = isMatch(option, correctAnswer);
        const showWrong = checked && isSelected && !isCorrect;
        const showRight = checked && isCorrect;

        let borderCol = '#ffffff08';
        let bgCol = '#141414';
        let textCol = '#eff1f6';

        if (!checked && isSelected) {
          borderCol = color;
          bgCol = `${color}12`;
          textCol = color;
        } else if (showRight) {
          borderCol = '#22c55e40';
          bgCol = '#22c55e10';
          textCol = '#22c55e';
        } else if (showWrong) {
          borderCol = '#ef444440';
          bgCol = '#ef444410';
          textCol = '#ef4444';
        }

        return (
          <button
            key={i}
            onClick={() => !checked && onSelect(option)}
            disabled={checked}
            className="w-full p-3.5 rounded-xl text-left transition-all active:scale-[0.98]"
            style={{ border: `1.5px solid ${borderCol}`, backgroundColor: bgCol }}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{ borderColor: borderCol, color: textCol }}
              >
                {showRight ? '✓' : showWrong ? '✗' : String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm" style={{ color: textCol }}>{option}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */

export default function DrillPlayer({ drills, mode, levelColor, onComplete }: DrillPlayerProps) {
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(mode === 'guided');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const drill = drills[index];
  const isLast = index === drills.length - 1;
  const progress = ((index + (checked ? 1 : 0)) / drills.length) * 100;

  const currentAnswer = selectedOption ?? userAnswer;
  const answerCorrect = checked && isMatch(currentAnswer, drill?.correctAnswer ?? '');

  const handleCheck = useCallback(() => {
    const answer = selectedOption ?? userAnswer;
    if (!answer.trim()) return;
    setChecked(true);
    if (isMatch(answer, drill.correctAnswer)) setScore((s) => s + 1);
  }, [selectedOption, userAnswer, drill]);

  const handleContinue = useCallback(() => {
    if (isLast) {
      onComplete(score);
      return;
    }
    setIndex((i) => i + 1);
    setUserAnswer('');
    setChecked(false);
    setSelectedOption(null);
    setShowHint(mode === 'guided');
  }, [isLast, checked, selectedOption, userAnswer, drill, score, mode, onComplete]);

  if (!drill) { onComplete(score); return null; }

  const hasOptions = !!drill.options && drill.options.length > 0;
  const isMarkerTap = drill.type === 'marker-tap';
  const isMarkerClassify = drill.type === 'marker-classify';
  const isWordScramble = drill.type === 'word-scramble' && !!drill.scrambledWords;
  const typeLabel = drill.type.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-[10px] text-[#5c5c5c] mb-1.5">
          <span className="font-medium">
            {mode === 'guided' ? 'Guided Practice' : 'Unguided Practice'}
          </span>
          <span>{index + 1} / {drills.length}</span>
        </div>
        <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, backgroundColor: levelColor }}
          />
        </div>
      </div>

      {/* Prompt card */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-4">
        {/* Type badge */}
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: `${levelColor}15`, color: levelColor, border: `1px solid ${levelColor}30` }}
          >
            {typeLabel}
          </span>
          {mode === 'unguided' && drill.englishHint && (
            <button
              onClick={() => setShowHint((s) => !s)}
              className="flex items-center gap-1 text-[10px] text-[#3c3c3c] hover:text-[#5c5c5c] transition-colors ml-auto"
            >
              {showHint ? <EyeOff size={11} /> : <Eye size={11} />}
              {showHint ? 'hide hint' : 'hint'}
            </button>
          )}
        </div>

        {/* Prompt text */}
        <p className="text-sm font-medium text-[#eff1f6] leading-relaxed">{drill.prompt}</p>

        {/* Somali sentence (not for marker-tap — shown separately as tokens) */}
        {drill.somaliSentence && !isMarkerTap && (
          <div className="rounded-lg bg-[#1a1a1a] border border-[#ffffff06] p-3">
            <p className="text-sm font-medium text-[#eff1f6] font-mono">{drill.somaliSentence}</p>
          </div>
        )}

        {/* Hint */}
        {drill.englishHint && (mode === 'guided' || showHint) && (
          <p className="text-xs text-[#5c5c5c]">
            <span className="text-[#3c3c3c]">Hint: </span>
            {drill.englishHint}
          </p>
        )}

        {/* Blueprint slots */}
        {drill.blueprint && (
          <div className="flex flex-wrap items-center gap-2">
            {['subject', 'marker', 'object', 'verb'].map((slot) => {
              const val = drill.blueprint![slot as keyof typeof drill.blueprint];
              if (!val) return null;
              return (
                <div
                  key={slot}
                  className="flex items-center gap-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] px-3 py-1.5"
                >
                  <span className="text-[9px] font-bold text-[#3c3c3c] uppercase">{slot}</span>
                  <span className="text-xs text-[#eff1f6]">{val}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Sentence A + B for combine exercises */}
        {drill.sentenceA && (
          <div className="space-y-1.5">
            <div className="rounded-lg bg-[#1a1a1a] border border-[#ffffff06] p-2.5">
              <p className="text-xs font-mono text-[#eff1f6]">{drill.sentenceA}</p>
            </div>
            {drill.sentenceB && (
              <div className="rounded-lg bg-[#1a1a1a] border border-[#ffffff06] p-2.5">
                <p className="text-xs font-mono text-[#eff1f6]">{drill.sentenceB}</p>
              </div>
            )}
            {drill.connectorType && (
              <p className="text-[10px] text-[#5c5c5c]">
                Connector: <span className="font-bold" style={{ color: levelColor }}>{drill.connectorType}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Interaction area */}
      {!checked && (
        <div className="space-y-3">
          {/* Marker-tap: tappable word tokens */}
          {isMarkerTap && drill.somaliSentence && (
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
              <p className="text-[10px] text-[#3c3c3c] mb-3 uppercase tracking-wider font-bold">
                Tap the marker word
              </p>
              <TappableTokens
                sentence={drill.somaliSentence}
                selected={selectedOption}
                onSelect={setSelectedOption}
                checked={false}
                correctAnswer={drill.correctAnswer}
                color={levelColor}
              />
            </div>
          )}

          {/* Marker-classify: 4 big cards */}
          {isMarkerClassify && (
            <ClassifyPicker
              selected={selectedOption}
              onSelect={setSelectedOption}
              checked={false}
              correctAnswer={drill.correctAnswer}
            />
          )}

          {/* Word scramble */}
          {isWordScramble && drill.scrambledWords && (
            <WordScramble
              words={drill.scrambledWords}
              onAnswer={(ans) => setUserAnswer(ans)}
              checked={false}
              correctAnswer={drill.correctAnswer}
              color={levelColor}
            />
          )}

          {/* MCQ options */}
          {hasOptions && !isMarkerClassify && !isMarkerTap && !isWordScramble && (
            <MCQOptions
              options={drill.options!}
              selected={selectedOption}
              onSelect={setSelectedOption}
              checked={false}
              correctAnswer={drill.correctAnswer}
              color={levelColor}
            />
          )}

          {/* Text input fallback */}
          {!hasOptions && !isMarkerTap && !isMarkerClassify && !isWordScramble && (
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && currentAnswer.trim() && handleCheck()}
              placeholder="Type your answer..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#141414] border border-[#ffffff10] text-sm text-[#eff1f6] placeholder:text-[#3c3c3c] focus:outline-none transition-colors"
              style={{ borderColor: userAnswer ? `${levelColor}40` : undefined }}
            />
          )}
        </div>
      )}

      {/* Post-check: show tapped tokens in result state */}
      {checked && isMarkerTap && drill.somaliSentence && (
        <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
          <TappableTokens
            sentence={drill.somaliSentence}
            selected={selectedOption}
            onSelect={() => {}}
            checked={true}
            correctAnswer={drill.correctAnswer}
            color={levelColor}
          />
        </div>
      )}

      {/* Post-check: classify result */}
      {checked && isMarkerClassify && (
        <ClassifyPicker
          selected={selectedOption}
          onSelect={() => {}}
          checked={true}
          correctAnswer={drill.correctAnswer}
        />
      )}

      {/* Post-check: scramble result */}
      {checked && isWordScramble && drill.scrambledWords && (
        <WordScramble
          words={drill.scrambledWords}
          onAnswer={() => {}}
          checked={true}
          correctAnswer={drill.correctAnswer}
          color={levelColor}
        />
      )}

      {/* Post-check: MCQ result */}
      {checked && hasOptions && !isMarkerClassify && !isMarkerTap && !isWordScramble && (
        <MCQOptions
          options={drill.options!}
          selected={selectedOption}
          onSelect={() => {}}
          checked={true}
          correctAnswer={drill.correctAnswer}
          color={levelColor}
        />
      )}

      {/* Feedback panel */}
      {checked && (
        <div
          className="rounded-xl border p-4 space-y-2"
          style={{
            backgroundColor: answerCorrect ? '#22c55e0a' : '#ef44440a',
            borderColor: answerCorrect ? '#22c55e30' : '#ef444430',
          }}
        >
          <div className="flex items-center gap-2">
            {answerCorrect ? (
              <>
                <Check size={15} className="text-[#22c55e]" />
                <span className="text-sm font-bold text-[#22c55e]">Correct</span>
              </>
            ) : (
              <>
                <XIcon size={15} className="text-[#ef4444]" />
                <span className="text-sm font-bold text-[#ef4444]">Not quite</span>
              </>
            )}
          </div>
          {!answerCorrect && (
            <p className="text-xs text-[#eff1f6]">
              <span className="text-[#5c5c5c]">Correct: </span>
              <span className="font-medium font-mono">
                {Array.isArray(drill.correctAnswer)
                  ? drill.correctAnswer.join(' / ')
                  : drill.correctAnswer}
              </span>
            </p>
          )}
          <p className="text-xs text-[#6a6a6a] leading-relaxed">{drill.explanation}</p>
        </div>
      )}

      {/* Action button */}
      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={!currentAnswer.trim()}
          className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98]"
          style={
            currentAnswer.trim()
              ? { backgroundColor: levelColor, color: '#0f0f0f' }
              : { backgroundColor: '#1a1a1a', color: '#3c3c3c', cursor: 'not-allowed' }
          }
        >
          Check Answer
        </button>
      ) : (
        <button
          onClick={handleContinue}
          className="w-full py-3.5 rounded-xl text-sm font-semibold bg-[#22c55e] text-[#0f0f0f] hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <span>{isLast ? 'Finish Practice' : 'Continue'}</span>
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
