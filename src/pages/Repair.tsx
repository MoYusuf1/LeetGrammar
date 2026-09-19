/**
 * Repair session — the working surface behind the home repair row.
 *
 * WHAT IT IS. The slips recorded across lessons, served back one at a time:
 * never the surface just failed (the serving rule lives in lib/repair.ts),
 * with the same card, toolbar and feedback sheet as the lesson player so the
 * mode reads as a continuation of the course rather than a separate app.
 *
 * WHAT IT IS NOT. Not a retry loop. A miss here records and moves on; the
 * item stays queued and comes back on a later visit, with spacing, instead
 * of again now — the same answer the Repair stage gives inside a lesson.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X } from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store';
import { repairQueue, servingForRepair } from '@/lib/repair';
import { PracticeCard, FeedbackHeading } from '@/components/lesson/LessonCards';
import { verdictOf } from '@/lib/grading';
import FeedbackSheet from '@/components/lesson/FeedbackSheet';
import LessonToolbar from '@/components/lesson/LessonToolbar';
import RichText from '@/components/RichText';
import type { PracticeExercise } from '@/data/types';

interface QueueItem {
  queueKey: string;
  exercise: PracticeExercise;
}

export default function RepairPage() {
  const navigate = useNavigate();
  const recordExerciseAttempt = useProgressStore((s) => s.recordExerciseAttempt);

  /* Snapshot the queue once at entry: recording attempts changes membership,
     and a list that shrank mid-session would skip items or end early. */
  const [items] = useState<QueueItem[]>(() =>
    repairQueue(useProgressStore.getState().exerciseProgress)
      .map((id) => ({ queueKey: id, exercise: servingForRepair(id) }))
      .filter((i): i is QueueItem => Boolean(i.exercise)),
  );

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const current = items[index];
  const atEnd = !current;

  const next = () => {
    setAnswer(null);
    setChecked(false);
    setIndex((i) => i + 1);
  };

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-bg">
      <button
        onClick={() => navigate('/learn')}
        aria-label="Close repair session"
        className="glass pressable fixed left-4 top-[calc(0.75rem+var(--safe-t))] z-30 flex h-10 w-10 items-center justify-center rounded-full text-label"
      >
        <X className="h-[18px] w-[18px]" />
      </button>

      <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(6rem+var(--safe-b))] pt-[calc(var(--safe-t)+74px)]">
        <div className="mx-auto max-w-column">
          {atEnd ? (
            <div className="space-y-5">
              <h1 className="text-title1 font-bold text-label">
                {items.length === 0 ? 'Nothing waiting.' : 'That is the queue.'}
              </h1>
              <p className="text-body leading-relaxed text-label-2">
                {items.length === 0
                  ? 'Nothing has slipped that is not already balanced. When something does, it waits here.'
                  : 'Anything still unresolved stays queued and comes back here with spacing — today’s misses are not chased twice in one sitting.'}
              </p>
            </div>
          ) : (
            <PracticeCard
              exercise={current.exercise}
              answer={answer}
              checked={checked}
              showHint={false}
              onSelect={(a) => !checked && setAnswer(a)}
            />
          )}
        </div>
      </div>

      {atEnd ? (
        <LessonToolbar
          canBack={false}
          canForward={false}
          onBack={() => {}}
          onForward={() => {}}
          action={{ label: 'Done', onClick: () => navigate('/learn') }}
        />
      ) : (
        !checked && (
          <LessonToolbar
            canBack={false}
            canForward={false}
            onBack={() => {}}
            onForward={() => {}}
            action={{
              label: 'Check',
              onClick: () => {
                if (!answer || !current) return;
                const verdict = verdictOf(current.exercise, answer);
                /* Recorded against the queue key, not the served surface:
                   the queue measures the objective, and a success here is
                   what clears the row from home. */
                recordExerciseAttempt(current.queueKey, verdict !== false);
                setChecked(true);
              },
              disabled: !answer,
            }}
          />
        )
      )}

      {current && checked && (
        <FeedbackSheet
          correct={verdictOf(current.exercise, answer)}
          heading={<FeedbackHeading exercise={current.exercise} answer={answer} />}
          explanation={<RichText text={current.exercise.explanation} />}
          continueLabel={index === items.length - 1 ? 'Finish' : 'Continue'}
          onContinue={next}
        />
      )}
    </div>
  );
}
