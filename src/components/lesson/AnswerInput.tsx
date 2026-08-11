/**
 * ANSWER INPUTS — one renderer per ExerciseType, shared by the lesson player
 * and the unit test.
 *
 * These lived inside LessonCards.tsx until the unit test needed the same
 * inputs without the lesson framing (no hint, no immediate feedback). Copying
 * them would have meant two sets of inputs drifting apart, and the input layer
 * is exactly where this project's worst bug lived: an exercise type with no
 * matching branch rendered nothing, so the learner could never answer and the
 * "Check" button stayed disabled forever.
 *
 * The `never` default below is what prevents that recurring — a new
 * ExerciseType with no case here fails the build.
 *
 * Nothing in this file knows whether it is inside a lesson or a test. Framing
 * (hints, feedback, self-grading notes) belongs to the caller.
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { PracticeExercise } from '@/data/types';
import { contentStagger } from './motion';

export interface AnswerInputProps {
  exercise: PracticeExercise;
  /** The learner's current answer, or null if they have not answered yet. */
  answer: string | null;
  /** True once the answer is locked — inputs go read-only and choices reveal. */
  checked: boolean;
  onSelect: (a: string) => void;
}

/**
 * Routes an exercise to its input renderer, exhaustively over ExerciseType.
 */
export default function AnswerInput(props: AnswerInputProps) {
  const { exercise } = props;
  switch (exercise.type) {
    case 'multiple_choice':
    case 'fill_blank':
    case 'matching':
      return <ChoiceExercise {...props} />;
    case 'unscramble':
      return <UnscrambleExercise {...props} />;
    case 'translate':
    case 'marker_identification':
      return <FreeResponseExercise {...props} />;
    default: {
      const unhandled: never = exercise.type;
      throw new Error(`No input renderer for exercise type: ${String(unhandled)}`);
    }
  }
}

/* ─── Choice Exercise (multiple_choice / fill_blank / matching) ─────────────── */

function ChoiceExercise({ exercise, answer, checked, onSelect }: AnswerInputProps) {
  const isCorrect = checked && answer === exercise.correctAnswer;
  return (
    <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="space-y-2.5">
      {(exercise.options ?? []).map((option, i) => {
        const isSelected = answer === option;
        const isCorrectOption = checked && option === exercise.correctAnswer;
        const isWrongOption = checked && isSelected && !isCorrect;

        let borderColor = 'border-[#ffffff08]';
        let bgColor = 'bg-[#141414]';
        if (isCorrectOption) { borderColor = 'border-[#22c55e]'; bgColor = 'bg-[#22c55e15]'; }
        else if (isWrongOption) { borderColor = 'border-[#ef4444]'; bgColor = 'bg-[#ef444415]'; }
        else if (isSelected && !checked) { borderColor = 'border-[#ffa116]'; bgColor = 'bg-[#ffa11610]'; }

        return (
          <button
            key={i}
            onClick={() => onSelect(option)}
            disabled={checked}
            className={`w-full p-4 rounded-xl border ${borderColor} ${bgColor} text-left transition-all duration-200 ${
              checked ? 'cursor-default' : 'cursor-pointer hover:border-[#ffffff15] active:scale-[0.98]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                isCorrectOption
                  ? 'border-[#22c55e] bg-[#22c55e] text-[#0f0f0f]'
                  : isWrongOption
                  ? 'border-[#ef4444] bg-[#ef4444] text-[#0f0f0f]'
                  : isSelected
                  ? 'border-[#ffa116] text-[#ffa116]'
                  : 'border-[#ffffff15] text-[#5c5c5c]'
              }`}>
                {isCorrectOption ? '✓' : isWrongOption ? '✕' : String.fromCharCode(65 + i)}
              </span>
              <span className={`text-sm font-medium ${
                isCorrectOption ? 'text-[#22c55e]' : isWrongOption ? 'text-[#ef4444]' : 'text-[#eff1f6]'
              }`}>
                {option}
              </span>
            </div>
          </button>
        );
      })}
    </motion.div>
  );
}

/* ─── Unscramble Exercise ────────────────────────────────────────────────── */

/** Which bank slots a previously-assembled answer used up. */
function usedFlags(bank: string[], placed: string[]): boolean[] {
  const flags = bank.map(() => false);
  for (const word of placed) {
    const i = bank.findIndex((b, idx) => b === word && !flags[idx]);
    if (i >= 0) flags[i] = true;
  }
  return flags;
}

function UnscrambleExercise({ exercise, answer, checked, onSelect }: AnswerInputProps) {
  const bank = exercise.words ?? [];
  /* Seeded from the answer already given, so stepping back to an earlier test
     item shows the sentence the learner built rather than an empty tray. */
  const [placed, setPlaced] = useState<string[]>(() => (answer ? answer.split(' ').filter(Boolean) : []));
  const [used, setUsed] = useState<boolean[]>(() => usedFlags(bank, answer ? answer.split(' ').filter(Boolean) : []));

  // Functional updates (not the closed-over `placed`/`used` values) so rapid
  // consecutive taps can't be dropped via stale closures; onSelect syncs from
  // the resulting state via effect rather than being computed in the handler.
  useEffect(() => {
    onSelect(placed.join(' '));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placed]);

  const tap = (word: string, i: number) => {
    if (checked) return;
    setUsed((prev) => (prev[i] ? prev : prev.map((u, idx) => (idx === i ? true : u))));
    setPlaced((prev) => (used[i] ? prev : [...prev, word]));
  };

  const reset = () => {
    if (checked) return;
    setPlaced([]);
    setUsed(bank.map(() => false));
  };

  return (
    <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="space-y-3">
      {/* Assembled sentence */}
      <div className="min-h-[52px] rounded-xl bg-[#141414] border border-[#ffffff08] p-3 flex flex-wrap gap-2 items-center">
        {placed.length === 0 ? (
          <span className="text-sm text-[#5c5c5c]">Tap words below in order…</span>
        ) : (
          placed.map((w, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-[#ffa11615] border border-[#ffa11630] text-sm font-medium text-[#eff1f6]">
              {w}
            </span>
          ))
        )}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2">
        {bank.map((word, i) => (
          <button
            key={i}
            onClick={() => tap(word, i)}
            disabled={checked || used[i]}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
              used[i]
                ? 'opacity-30 border-[#ffffff08] bg-[#0f0f0f] text-[#5c5c5c] cursor-not-allowed'
                : 'border-[#ffffff15] bg-[#1a1a1a] text-[#eff1f6] hover:border-[#ffffff25] active:scale-[0.95]'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {!checked && placed.length > 0 && (
        <button onClick={reset} className="text-xs text-[#5c5c5c] hover:text-[#8c8c8c] transition-colors">
          Reset
        </button>
      )}
    </motion.div>
  );
}

/* ─── Free Response Exercise (translate / marker_identification) ────────────── */

function FreeResponseExercise({ exercise, answer, checked, onSelect }: AnswerInputProps) {
  return (
    <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
      <input
        type="text"
        value={answer ?? ''}
        disabled={checked}
        onChange={(e) => onSelect(e.target.value)}
        placeholder={exercise.type === 'marker_identification' ? 'Type the marker…' : 'Type your answer in Somali…'}
        className="w-full p-4 rounded-xl bg-[#141414] border border-[#ffffff08] text-[#eff1f6] text-sm placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa11640]"
      />
    </motion.div>
  );
}
