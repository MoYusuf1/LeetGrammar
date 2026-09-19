/**
 * Unit test, test phase: one item at a time, no hints and no feedback until
 * the end. The progress bar counts answered questions, not position, so it
 * keeps moving however the learner jumps around. Skipping is allowed and
 * marked wrong — said once under the actions.
 */

import type { PracticeExercise } from '@/data/types';
import AnswerInput from '@/components/lesson/AnswerInput';
import TaskShell from '@/components/shared/TaskShell';
import ExerciseQuestion from '@/components/shared/ExerciseQuestion';
import { PrimaryButton } from '@/components/shared/buttons';
import { QUESTION_MODE } from './question-mode';

export default function TestSession({
  title,
  items,
  index,
  answer,
  answered,
  onClose,
  onBack,
  onNext,
  onFinish,
  onAnswer,
}: {
  title: string;
  items: PracticeExercise[];
  index: number;
  answer: string | null;
  answered: number;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  onAnswer: (value: string) => void;
}) {
  const current = items[index];
  const isLast = index === items.length - 1;
  return (
    <TaskShell
      onClose={onClose}
      title={title}
      below={
        /* Knowt keeps the test's progress on screen at all times. A bar
           that fills as questions are answered; 34 dots rendered as an
           unreadable smudge, so they are gone. */
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={items.length}
          aria-valuenow={answered}
          aria-label={`${answered} of ${items.length} answered`}
          className="h-1.5 overflow-hidden rounded-full bg-fill"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${(answered / items.length) * 100}%` }}
          />
        </div>
      }
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-fill px-3 py-1 text-caption2 font-semibold uppercase tracking-wider text-label-2">
          {QUESTION_MODE[current.type]}
        </span>
        <span className="text-caption2 tabular-nums text-label-3">
          Question {index + 1} of {items.length}
        </span>
      </div>

      <ExerciseQuestion exercise={current} />
      <div className="mt-5">
        {/* Keyed so each item gets its own input state — a word bank assembled
            on item 5 must not leak into item 6. */}
        <AnswerInput
          key={current.id}
          exercise={current}
          answer={answer}
          checked={false}
          onSelect={onAnswer}
          variant="quiz"
        />
      </div>

      <div className="glass glass-bottom sticky bottom-0 -mx-4 mt-7 px-4 pt-3">
        <div className="flex gap-3">
          <button
            onClick={onBack}
            disabled={index === 0}
            className="rounded-xl bg-fill px-5 py-4 text-body font-medium text-label transition-colors hover:bg-fill disabled:opacity-30"
          >
            Back
          </button>
          {isLast ? (
            <PrimaryButton full={false} onClick={onFinish} className="flex-1">
              Finish · {answered}/{items.length} answered
            </PrimaryButton>
          ) : (
            <PrimaryButton full={false} onClick={onNext} className="flex-1">
              Next
            </PrimaryButton>
          )}
        </div>
        <p className="mt-2 text-center text-caption2 text-label-3">
          Skipping is allowed: an unanswered question is marked wrong.
        </p>
      </div>
    </TaskShell>
  );
}
