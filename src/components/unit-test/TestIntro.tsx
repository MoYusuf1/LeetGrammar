/**
 * Unit test, intro phase: what the test covers and what passing takes.
 * Stated, not enforced — the unfinished-lessons note is a warning, not a
 * lock (see the page header for why the lock is gone).
 */

import type { TestBank } from '@/data/types';
import type { UnitTestRecord } from '@/domain/progress/types';
import type { PracticeExercise } from '@/data/types';
import { MASTERY_THRESHOLD } from '@/lib/assessment';
import TaskShell from '@/components/shared/TaskShell';
import { FactList, FactRow } from '@/components/shared/FactList';
import { PrimaryButton } from '@/components/shared/buttons';
import { QUESTION_MODE } from './question-mode';

const PASS_MARK = Math.round(MASTERY_THRESHOLD * 100);

export default function TestIntro({
  bank,
  items,
  priorAttempts,
  record,
  unlocked,
  lessonRange,
  onStart,
  onClose,
}: {
  bank: TestBank;
  items: PracticeExercise[];
  priorAttempts: number;
  record: UnitTestRecord | undefined;
  unlocked: boolean;
  lessonRange: [number, number];
  onStart: () => void;
  onClose: () => void;
}) {
  return (
    <TaskShell onClose={onClose} title={bank.name}>
      <h1 className="text-title1 font-bold text-label">{bank.name}</h1>
      <p className="mt-2 text-title3 text-label-2">{bank.description}</p>

      {/* The modes the learner will meet, up front — Knowt shows the test's
          question types before you start; so do we. */}
      <div className="mt-5 flex flex-wrap gap-2">
        {[...new Set(items.map((it) => it.type))].map((t) => (
          <span
            key={t}
            className="rounded-full bg-fill px-3 py-1 text-caption2 font-semibold uppercase tracking-wider text-label-2"
          >
            {QUESTION_MODE[t]}
          </span>
        ))}
      </div>

      <FactList className="mt-6">
        <FactRow label="Questions" value={`${items.length}`} first />
        <FactRow label="Attempt set" value={`${priorAttempts + 1}`} />
        <FactRow label="To pass" value={`${PASS_MARK}%`} />
        <FactRow label="Hints" value="Off, this one is on you" />
        <FactRow label="Answers" value="Shown at the end, with what you missed" />
        {record && (
          <FactRow
            label="Your best"
            value={`${record.bestPercentage}% over ${record.attempts} ${record.attempts === 1 ? 'try' : 'tries'}`}
          />
        )}
      </FactList>

      <p className="mt-4 text-footnote text-label-3">
        Retakes rotate to a different deterministic item order, so the result reflects the language rather than memory of the previous sequence.
      </p>

      <p className="mt-3 text-footnote text-label-3">
        Miss too much of one topic and you will be sent back through a short set of
        questions on that topic alone, not the whole test again.
      </p>

      {/* Stated, not enforced. The criterion is real; the lock is not. */}
      {!unlocked && (
        <p className="mt-3 text-footnote text-label-3">
          You have not finished lessons {lessonRange[0]}–{lessonRange[1]} yet. The
          test only asks about what they teach, so expect to miss what you have not met.
        </p>
      )}

      <PrimaryButton onClick={onStart} className="mt-6">
        Start the test
      </PrimaryButton>
    </TaskShell>
  );
}
