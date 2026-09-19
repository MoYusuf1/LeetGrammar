/**
 * Unit test, results phase: score, per-objective breakdown, every missed
 * item with its corrective, and the items that went right.
 *
 * Knowt hands back feedback on every question, not only the failures. The
 * right answers are the shorter list to render, so they get a compact
 * section of their own below the misses.
 */

import { Link } from 'react-router';
import { Check, X, RotateCcw } from 'lucide-react';
import { describeObjective } from '@/data/objectives';
import type { PracticeExercise } from '@/data/types';
import {
  MASTERY_THRESHOLD,
  tallyByObjective,
  type UnitTestResult,
} from '@/lib/assessment';
import { isAnswerCorrect, displayAnswer } from '@/lib/grading';
import RichText from '@/components/RichText';
import Somali from '@/components/Somali';
import TaskShell from '@/components/shared/TaskShell';
import { PrimaryButton, SecondaryButton } from '@/components/shared/buttons';

const PASS_MARK = Math.round(MASTERY_THRESHOLD * 100);

export default function TestResults({
  result,
  items,
  responses,
  correctiveCount,
  onCorrectives,
  onRetake,
  onDone,
}: {
  result: UnitTestResult;
  items: PracticeExercise[];
  responses: Record<string, string | null>;
  correctiveCount: number;
  onCorrectives: () => void;
  onRetake: () => void;
  onDone: () => void;
}) {
  const tally = tallyByObjective(items, responses);
  const missed = items.filter((item) => !isAnswerCorrect(item, responses[item.id] ?? null));
  const nailed = items.filter((item) => isAnswerCorrect(item, responses[item.id] ?? null));

  return (
    <TaskShell onClose={onDone} title="Results">
      <div className="pt-2 text-center">
        <div
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-fill"
        >
          <span
            className={`text-title1 font-semibold tabular-nums ${
              result.passed ? 'text-green' : 'text-accent'
            }`}
          >
            {result.percentage}%
          </span>
        </div>
        <h1 className="mt-5 text-title1 font-semibold text-label">
          {result.passed ? 'Unit passed' : 'Not there yet'}
        </h1>
        <p className="mt-1 text-body text-label-2">
          {result.correctItems} of {result.totalItems} correct · {PASS_MARK}% needed
        </p>
      </div>

      {/* Per-objective breakdown */}
      <h2 className="mb-2.5 mt-8 text-footnote font-semibold text-label">How each topic went</h2>
      <div className="overflow-hidden rounded-xl bg-elevated">
        {[...tally.entries()].map(([objectiveId, score], i) => {
          const info = describeObjective(objectiveId);
          const failed = result.failedObjectives.includes(objectiveId);
          return (
            <div
              key={objectiveId}
              className={`flex items-center gap-3 px-4 py-3 ${
                i === 0 ? '' : 'border-t border-separator'
              }`}
            >
              <span
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                  failed ? 'bg-fill text-red' : 'bg-fill text-green'
                }`}
              >
                {failed ? <X size={13} /> : <Check size={13} />}
              </span>
              <span className="min-w-0 flex-1 text-footnote text-label">{info.label}</span>
              <span className="flex-shrink-0 text-caption2 tabular-nums text-label-3">
                {score.correct}/{score.total}
              </span>
            </div>
          );
        })}
      </div>

      <h2 className="mb-2.5 mt-8 text-footnote font-semibold text-label">What you can do</h2>
      <div className="overflow-hidden rounded-xl bg-elevated">
        {result.outcomeScores.map((outcome, i) => (
          <div key={outcome.outcomeId} className={`px-4 py-3 ${i === 0 ? '' : 'border-t border-separator'}`}>
            <div className="flex items-center gap-3">
              <span className="min-w-0 flex-1 text-footnote text-label">{outcome.canDo}</span>
              <span className="flex-shrink-0 text-caption2 tabular-nums text-label-3">{outcome.percentage}%</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-fill">
              <div className="h-full rounded-full bg-accent" style={{ width: `${outcome.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Correctives */}
      {result.failedObjectives.length > 0 && (
        <div className="mt-6 rounded-xl bg-fill p-4">
          <p className="text-footnote font-semibold text-accent">Go back over these</p>
          <ul className="mb-4 mt-2 space-y-1.5">
            {result.failedObjectives.map((objectiveId) => {
              const info = describeObjective(objectiveId);
              return (
                <li key={objectiveId} className="text-footnote text-label">
                  {info.label}
                  {info.lessonId && (
                    <Link
                      to={`/lesson/${info.lessonId}`}
                      className="ml-1.5 font-medium text-accent hover:underline"
                    >
                      Lesson {info.lessonId}: {info.lessonTitle}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
          <PrimaryButton onClick={onCorrectives} className="py-3.5">
            Review incorrect only · {correctiveCount} {correctiveCount === 1 ? 'question' : 'questions'}
          </PrimaryButton>
        </div>
      )}

      {/* What you missed */}
      {missed.length > 0 && (
        <>
          <h2 className="mb-2.5 mt-8 text-footnote font-semibold text-label">
            What you missed ({missed.length})
          </h2>
          <div className="space-y-2.5">
            {missed.map((item) => (
              <div key={item.id} className="rounded-xl bg-elevated p-4">
                <p className="text-footnote font-medium text-label">
                  <RichText text={item.question} />
                </p>
                <p className="mt-2 text-footnote text-label-2">
                  Your answer:{' '}
                  <span className="text-red">
                    {responses[item.id]?.trim() ? responses[item.id] : '(left blank)'}
                  </span>
                </p>
                <p className="text-footnote text-label-2">
                  Correct:{' '}
                  <span className="text-green">
                    <Somali inherit>{displayAnswer(item)}</Somali>
                  </span>
                </p>
                <p className="mt-2 text-footnote leading-relaxed text-label-2">
                  <RichText text={item.explanation} />
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* What you got right — feedback on every question, not only misses. */}
      {nailed.length > 0 && (
        <>
          <h2 className="mb-2.5 mt-8 text-footnote font-semibold text-label">
            What you got right ({nailed.length})
          </h2>
          <div className="overflow-hidden rounded-xl bg-elevated">
            {nailed.map((item, i) => (
              <div
                key={item.id}
                className={`flex items-start gap-3 px-4 py-3 ${i === 0 ? '' : 'border-t border-separator'}`}
              >
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-fill text-green">
                  <Check size={13} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-footnote font-medium text-label">
                    <RichText text={item.question} />
                  </p>
                  <p className="mt-1 text-footnote text-label-2">
                    <Somali inherit>{displayAnswer(item)}</Somali>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-8 space-y-3">
        <PrimaryButton onClick={onRetake} className="flex items-center justify-center gap-2">
          <RotateCcw className="h-4 w-4" />
          Retake the test
        </PrimaryButton>
        <SecondaryButton onClick={onDone}>Done</SecondaryButton>
      </div>
    </TaskShell>
  );
}
