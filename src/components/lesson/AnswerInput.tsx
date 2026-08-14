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
 *
 * The warm-paper rewrite changed presentation only. Every piece of state
 * handling below carries a comment explaining a bug it fixed — leave it alone.
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { PracticeExercise } from '@/data/types';
import Somali from '@/components/Somali';
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

/*
 * Options are NOT rendered with <Somali>. Some are Somali forms and some are
 * English propositions ("gender is a grammar label, not a fact about the
 * object") — nothing in the data distinguishes them, and marking an English
 * sentence as Somali is worse than marking neither.
 */
function ChoiceExercise({ exercise, answer, checked, onSelect }: AnswerInputProps) {
  const isCorrect = checked && answer === exercise.correctAnswer;
  return (
    <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="space-y-2.5">
      {(exercise.options ?? []).map((option, i) => {
        const isSelected = answer === option;
        const isCorrectOption = checked && option === exercise.correctAnswer;
        const isWrongOption = checked && isSelected && !isCorrect;

        let tone = 'border-border bg-card';
        if (isCorrectOption) tone = 'border-success-line bg-success-wash';
        else if (isWrongOption) tone = 'border-error-line bg-error-wash';
        else if (isSelected && !checked) tone = 'border-accent bg-accent-wash';

        return (
          <button
            key={i}
            onClick={() => onSelect(option)}
            disabled={checked}
            className={`w-full rounded-xl border p-4 text-left transition-colors ${tone} ${
              checked ? 'cursor-default' : 'tap-scale cursor-pointer hover:border-border-strong'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-micro font-bold ${
                  isCorrectOption
                    ? 'border-success bg-success text-white'
                    : isWrongOption
                      ? 'border-error bg-error text-white'
                      : isSelected
                        ? 'border-accent text-accent'
                        : 'border-border-strong text-ink-faint'
                }`}
              >
                {isCorrectOption ? '✓' : isWrongOption ? '✕' : String.fromCharCode(65 + i)}
              </span>
              <span
                className={`text-body font-medium ${
                  isCorrectOption ? 'text-success' : isWrongOption ? 'text-error' : 'text-ink'
                }`}
              >
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
      {/* The sentence being assembled. Words here are always Somali — an
          unscramble reorders a Somali sentence — so the serif applies. */}
      <div className="flex min-h-[60px] flex-wrap items-center gap-2 rounded-xl border border-dashed border-border-strong bg-card p-3">
        {placed.length === 0 ? (
          <span className="text-small text-ink-faint">Tap the words below, in order…</span>
        ) : (
          placed.map((w, i) => (
            <span
              key={i}
              className="rounded-lg border border-accent-line bg-accent-wash px-2.5 py-1"
            >
              <Somali>{w}</Somali>
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
            className={`rounded-lg border px-3 py-2 transition-colors ${
              used[i]
                ? 'cursor-not-allowed border-border bg-surface-sunken opacity-40'
                : 'tap-scale border-border-strong bg-card hover:border-accent'
            }`}
          >
            <Somali>{word}</Somali>
          </button>
        ))}
      </div>

      {!checked && placed.length > 0 && (
        <button
          onClick={reset}
          className="text-small text-ink-faint underline underline-offset-4 transition-colors hover:text-ink"
        >
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
      {/* What gets typed here is Somali in both cases — a translation into
          Somali, or the marker itself — so the field uses the serif. It also
          reinforces that the learner is producing the target language rather
          than talking about it. */}
      <input
        type="text"
        value={answer ?? ''}
        disabled={checked}
        onChange={(e) => onSelect(e.target.value)}
        lang="so"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        placeholder={exercise.type === 'marker_identification' ? 'Type the marker…' : 'Type your answer in Somali…'}
        className="somali somali-lg w-full rounded-xl border border-border bg-card p-4 placeholder:font-sans placeholder:text-body placeholder:font-normal placeholder:tracking-normal placeholder:text-ink-faint focus:border-accent focus:outline-none disabled:opacity-70"
      />
    </motion.div>
  );
}
