/**
 * Correctives is practice, not assessment: hints are visible, every answer is
 * checked immediately, and nothing here is scored or stored. The point is to
 * put the missed rule back in front of the learner, not to re-measure them.
 */

import { useState } from 'react';
import type { PracticeExercise } from '@/data/types';
import AnswerInput from '@/components/lesson/AnswerInput';
import RichText from '@/components/RichText';
import TaskShell from '@/components/shared/TaskShell';
import ExerciseQuestion from '@/components/shared/ExerciseQuestion';
import PracticeFeedback from '@/components/shared/PracticeFeedback';
import PracticeActionBar from '@/components/shared/PracticeActionBar';

export default function Correctives({
  items,
  onDone,
  onBack,
}: {
  items: PracticeExercise[];
  onDone: () => void;
  onBack: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const current = items[index];
  if (!current) {
    return (
      <TaskShell onClose={onBack} title="Correctives">
        <p className="text-body text-label-2">Nothing to practise.</p>
      </TaskShell>
    );
  }

  const isLast = index === items.length - 1;

  const next = () => {
    if (isLast) return onDone();
    setIndex((i) => i + 1);
    setAnswer(null);
    setChecked(false);
  };

  return (
    <TaskShell onClose={onBack} title="Correctives" progress={`${index + 1}/${items.length}`}>
      <ExerciseQuestion exercise={current} />
      <div className="mt-5">
        <AnswerInput
          key={current.id}
          exercise={current}
          answer={answer}
          checked={checked}
          onSelect={(a) => !checked && setAnswer(a)}
        />
      </div>

      <div className="mt-5 rounded-xl bg-fill p-4">
        <p className="text-subhead text-label">
          <RichText text={current.hint} />
        </p>
      </div>

      {checked && <PracticeFeedback exercise={current} answer={answer} />}

      <PracticeActionBar
        checked={checked}
        canCheck={Boolean(answer)}
        onCheck={() => answer && setChecked(true)}
        onNext={next}
        isLast={isLast}
        lastLabel="Back to results"
      />
    </TaskShell>
  );
}
