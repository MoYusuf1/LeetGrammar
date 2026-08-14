/**
 * Unit Test Page — the mastery check at the end of a unit.
 *
 * Route: /unit-test/:id  (HashRouter, so #/unit-test/1)
 *
 * Four phases:
 *   locked   — the unit's lessons are not finished yet
 *   intro    — what the test covers and what passing takes
 *   test     — one item at a time, no hints and no feedback until the end
 *   results  — score, per-objective breakdown, every missed item, correctives
 *
 * The test deliberately shows less than the lesson player does. A hint on a
 * test item measures the hint; feedback between items lets a learner correct a
 * misreading mid-test and inflates the score the correctives router depends on.
 * Both come back in correctives, which is practice.
 *
 * Grading is `gradeUnitTest()` in lib/assessment.ts — this page decides nothing
 * about right and wrong itself.
 */

import { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { Check, X, RotateCcw } from 'lucide-react';
import { getUnit, getUnitTest, composeUnitTest } from '@/data/unit-tests';
import { describeObjective } from '@/data/objectives';
import type { PracticeExercise } from '@/data/types';
import {
  MASTERY_THRESHOLD,
  gradeUnitTest,
  selectCorrectivesItems,
  tallyByObjective,
  isUnitComplete,
  type UnitTestResult,
} from '@/lib/assessment';
import { isAnswerCorrect, displayAnswer } from '@/lib/grading';
import { useProgressStore } from '@/stores/progress-store';
import AnswerInput from '@/components/lesson/AnswerInput';
import CardProgressDots from '@/components/lesson/CardProgressDots';
import RichText from '@/components/RichText';
import Somali from '@/components/Somali';

type Phase = 'intro' | 'test' | 'results' | 'correctives';

const PASS_MARK = Math.round(MASTERY_THRESHOLD * 100);

export default function UnitTestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useProgressStore();

  const unitId = parseInt(id ?? '1', 10);
  const unit = getUnit(unitId);
  const bank = getUnitTest(unitId);

  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string | null>>({});
  const [result, setResult] = useState<UnitTestResult | null>(null);

  const completedLessons = (store.completedLessons as number[] | undefined) ?? [];
  const unlocked = isUnitComplete(unitId, completedLessons);

  // The composed test, not the raw bank: this unit's items plus carried-back
  // items from earlier units. See composeUnitTest() for why carry-back is
  // composed rather than authored.
  const items = useMemo(() => composeUnitTest(unitId), [unitId]);
  const current = items[index];

  const correctives = useMemo(
    () => (result ? selectCorrectivesItems(items, result.failedObjectives) : []),
    [result, items],
  );

  if (!unit || !bank) {
    return <Centered>No test exists for that unit yet.</Centered>;
  }

  if (!unlocked) {
    return (
      <Centered>
        <p className="mb-1 text-body font-semibold text-label">{bank.name} is locked</p>
        <p className="mb-4">
          Finish lessons {unit.lessonIds[0]}–{unit.lessonIds.at(-1)} first — the test only asks
          about what they teach.
        </p>
        <Link
          to="/learn"
          className="inline-block rounded-xl bg-accent px-5 py-3 text-footnote font-semibold text-accent-ink"
        >
          Back to lessons
        </Link>
      </Centered>
    );
  }

  const answer = current ? responses[current.id] ?? null : null;

  const setAnswer = (value: string) => {
    if (!current) return;
    setResponses((prev) => ({ ...prev, [current.id]: value }));
  };

  const finish = () => {
    const graded = gradeUnitTest(unitId, items, responses);
    store.recordUnitTestResult(graded);
    setResult(graded);
    setPhase('results');
  };

  const restart = () => {
    setResponses({});
    setIndex(0);
    setResult(null);
    setPhase('intro');
  };

  /* ─── Intro ────────────────────────────────────────────────────────────── */

  if (phase === 'intro') {
    const record = store.getUnitTestRecord?.(unitId);
    return (
      <Shell onClose={() => navigate('/learn')} title={bank.name}>
        <h1 className="text-title1 font-bold text-label">{bank.name}</h1>
        <p className="mt-2 text-title3 text-label-2">{bank.description}</p>

        <dl className="mt-6 overflow-hidden rounded-xl bg-elevated">
          <Row label="Questions" value={`${items.length}`} first />
          <Row label="To pass" value={`${PASS_MARK}%`} />
          <Row label="Hints" value="Off — this one is on you" />
          <Row label="Answers" value="Shown at the end, with what you missed" />
          {record && (
            <Row
              label="Your best"
              value={`${record.bestPercentage}% over ${record.attempts} ${record.attempts === 1 ? 'try' : 'tries'}`}
            />
          )}
        </dl>

        <p className="mt-4 text-footnote text-label-3">
          Miss too much of one topic and you will be sent back through a short set of
          questions on that topic alone — not the whole test again.
        </p>

        <button
          onClick={() => setPhase('test')}
          className="pressable mt-6 w-full rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink transition-colors hover:opacity-90"
        >
          Start the test
        </button>
      </Shell>
    );
  }

  /* ─── Test ─────────────────────────────────────────────────────────────── */

  if (phase === 'test' && current) {
    const answered = Object.values(responses).filter((r) => r !== null && r !== '').length;
    const isLast = index === items.length - 1;
    return (
      <Shell
        onClose={() => setPhase('intro')}
        title={bank.name}
        progress={`${index + 1}/${items.length}`}
      >
        <div className="mb-5">
          <CardProgressDots
            total={items.length}
            current={index}
            completed={new Set(items.map((it, i) => (responses[it.id] ? i : -1)).filter((i) => i >= 0))}
            onDotClick={(i) => i < index && setIndex(i)}
          />
        </div>

        <ItemQuestion exercise={current} />
        <div className="mt-5">
          {/* Keyed so each item gets its own input state — a word bank assembled
              on item 5 must not leak into item 6. */}
          <AnswerInput
            key={current.id}
            exercise={current}
            answer={answer}
            checked={false}
            onSelect={setAnswer}
          />
        </div>

        <div className="glass glass-bottom sticky bottom-0 -mx-4 mt-7 px-4 pt-3">
          <div className="flex gap-3">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="rounded-xl bg-fill px-5 py-4 text-body font-medium text-label transition-colors hover:bg-fill disabled:opacity-30"
            >
              Back
            </button>
            {isLast ? (
              <button
                onClick={finish}
                className="pressable flex-1 rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink transition-colors hover:opacity-90"
              >
                Finish · {answered}/{items.length} answered
              </button>
            ) : (
              <button
                onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
                className="pressable flex-1 rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink transition-colors hover:opacity-90"
              >
                Next
              </button>
            )}
          </div>
          <p className="mt-2 text-center text-caption2 text-label-3">
            Skipping is allowed — an unanswered question is marked wrong.
          </p>
        </div>
      </Shell>
    );
  }

  /* ─── Correctives ──────────────────────────────────────────────────────── */

  if (phase === 'correctives') {
    return (
      <Correctives
        items={correctives}
        onDone={() => setPhase('results')}
        onBack={() => setPhase('results')}
      />
    );
  }

  /* ─── Results ──────────────────────────────────────────────────────────── */

  if (phase === 'results' && result) {
    const tally = tallyByObjective(items, responses);
    const missed = items.filter((item) => !isAnswerCorrect(item, responses[item.id] ?? null));

    return (
      <Shell onClose={() => navigate('/learn')} title="Results">
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
                        — Lesson {info.lessonId}: {info.lessonTitle}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => setPhase('correctives')}
              className="pressable w-full rounded-xl bg-accent py-3.5 text-body font-semibold text-accent-ink transition-colors hover:opacity-90"
            >
              Practise these {correctives.length} questions
            </button>
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
                      {responses[item.id]?.trim() ? responses[item.id] : '— left blank —'}
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

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate('/learn')}
            className="pressable w-full rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink transition-colors hover:opacity-90"
          >
            Done
          </button>
          <button
            onClick={restart}
            className="pressable flex w-full items-center justify-center gap-2 rounded-xl py-4 text-body font-semibold text-label transition-colors hover:bg-fill"
          >
            <RotateCcw className="h-4 w-4" />
            Retake
          </button>
        </div>
      </Shell>
    );
  }

  return <Centered>Something went wrong loading the test.</Centered>;
}

/* ─── Correctives ────────────────────────────────────────────────────────── */

/**
 * Correctives is practice, not assessment: hints are visible, every answer is
 * checked immediately, and nothing here is scored or stored. The point is to
 * put the missed rule back in front of the learner, not to re-measure them.
 */
function Correctives({
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
      <Shell onClose={onBack} title="Correctives">
        <p className="text-body text-label-2">Nothing to practise.</p>
      </Shell>
    );
  }

  const isLast = index === items.length - 1;
  const correct = isAnswerCorrect(current, answer);

  const next = () => {
    if (isLast) return onDone();
    setIndex((i) => i + 1);
    setAnswer(null);
    setChecked(false);
  };

  return (
    <Shell onClose={onBack} title="Correctives" progress={`${index + 1}/${items.length}`}>
      <ItemQuestion exercise={current} />
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

      {checked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-xl bg-elevated p-4"
        >
          <p className={`mb-1 text-footnote font-semibold ${correct ? 'text-green' : 'text-red'}`}>
            {correct ? (
              'Correct'
            ) : (
              <>
                Not quite — the answer is{' '}
                <Somali inherit>{displayAnswer(current)}</Somali>
              </>
            )}
          </p>
          <p className="text-footnote leading-relaxed text-label">
            <RichText text={current.explanation} />
          </p>
        </motion.div>
      )}

      <div className="glass glass-bottom sticky bottom-0 -mx-4 mt-6 px-4 pt-3">
        {checked ? (
          <button
            onClick={next}
            className="pressable w-full rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink transition-colors hover:opacity-90"
          >
            {isLast ? 'Back to results' : 'Continue'}
          </button>
        ) : (
          <button
            onClick={() => answer && setChecked(true)}
            disabled={!answer}
            className={`pressable w-full rounded-xl py-4 text-body font-semibold transition-colors ${
              answer
                ? 'bg-accent text-accent-ink hover:opacity-90'
                : 'cursor-not-allowed bg-fill text-label-3'
            }`}
          >
            Check answer
          </button>
        )}
      </div>
    </Shell>
  );
}

/* ─── Shared bits ────────────────────────────────────────────────────────── */

function ItemQuestion({ exercise }: { exercise: PracticeExercise }) {
  return (
    <div>
      <p className="text-title3 font-medium text-label">
        <RichText text={exercise.question} />
      </p>
      {exercise.somali && (
        <div className="mt-3 rounded-xl bg-elevated px-4 py-4 text-center">
          <Somali size="hero">{exercise.somali}</Somali>
        </div>
      )}
    </div>
  );
}

/** A task view: full-screen over /learn, closed rather than navigated back. */
function Shell({
  children,
  onClose,
  title,
  progress,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  progress?: string;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-bg">
      <header className="glass glass-top sticky top-0 z-20 px-4 pt-safe-t">
        <div className="mx-auto flex max-w-column items-center gap-3 py-2.5">
          <button
            onClick={onClose}
            aria-label="Close"
            className="-ml-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-label-3 transition-colors hover:bg-fill hover:text-label"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
          <span className="min-w-0 flex-1 truncate text-footnote font-medium text-label">{title}</span>
          {progress && (
            <span className="flex-shrink-0 text-caption2 tabular-nums text-label-3">{progress}</span>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-column flex-1 px-4 pb-[calc(1.5rem+var(--safe-b))] pt-5">
        {children}
      </main>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-bg px-4">
      <div className="max-w-sm text-center text-body text-label-2">{children}</div>
    </div>
  );
}

function Row({ label, value, first }: { label: string; value: string; first?: boolean }) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 px-4 py-3 ${
        first ? '' : 'border-t border-separator'
      }`}
    >
      <dt className="text-footnote text-label-2">{label}</dt>
      <dd className="text-right text-footnote font-medium text-label">{value}</dd>
    </div>
  );
}
