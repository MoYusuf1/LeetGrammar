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
        <p className="mb-1 text-body font-semibold text-ink">{bank.name} is locked</p>
        <p className="mb-4">
          Finish lessons {unit.lessonIds[0]}–{unit.lessonIds.at(-1)} first — the test only asks
          about what they teach.
        </p>
        <Link
          to="/learn"
          className="inline-block rounded-xl bg-accent-strong px-5 py-3 text-small font-semibold text-white"
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
        <p className="text-micro font-semibold uppercase tracking-wider text-ink-faint">
          Unit {unit.id} · {unit.name}
        </p>
        <h1 className="mt-1.5 text-title font-semibold text-ink">{bank.name}</h1>
        <p className="mt-2 text-lead text-ink-muted">{bank.description}</p>

        <dl className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
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

        <p className="mt-4 text-small text-ink-faint">
          Miss too much of one topic and you will be sent back through a short set of
          questions on that topic alone — not the whole test again.
        </p>

        <button
          onClick={() => setPhase('test')}
          className="tap-scale mt-6 w-full rounded-xl bg-accent-strong py-4 text-body font-semibold text-white transition-colors hover:bg-accent-hover"
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

        <div className="action-bar sticky bottom-0 mt-7 pt-3">
          <div className="flex gap-3">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="rounded-xl border border-border-strong px-5 py-4 text-body font-medium text-ink transition-colors hover:bg-surface-sunken disabled:opacity-30"
            >
              Back
            </button>
            {isLast ? (
              <button
                onClick={finish}
                className="tap-scale flex-1 rounded-xl bg-accent-strong py-4 text-body font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Finish · {answered}/{items.length} answered
              </button>
            ) : (
              <button
                onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
                className="tap-scale flex-1 rounded-xl bg-accent-strong py-4 text-body font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Next
              </button>
            )}
          </div>
          <p className="mt-2 text-center text-micro text-ink-faint">
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
            className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full border ${
              result.passed
                ? 'border-success-line bg-success-wash'
                : 'border-accent-line bg-accent-wash'
            }`}
          >
            <span
              className={`text-title font-semibold tabular-nums ${
                result.passed ? 'text-success' : 'text-accent'
              }`}
            >
              {result.percentage}%
            </span>
          </div>
          <h1 className="mt-5 text-title font-semibold text-ink">
            {result.passed ? 'Unit passed' : 'Not there yet'}
          </h1>
          <p className="mt-1 text-body text-ink-muted">
            {result.correctItems} of {result.totalItems} correct · {PASS_MARK}% needed
          </p>
        </div>

        {/* Per-objective breakdown */}
        <h2 className="mb-2.5 mt-8 text-small font-semibold text-ink">How each topic went</h2>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {[...tally.entries()].map(([objectiveId, score], i) => {
            const info = describeObjective(objectiveId);
            const failed = result.failedObjectives.includes(objectiveId);
            return (
              <div
                key={objectiveId}
                className={`flex items-center gap-3 px-4 py-3 ${
                  i === 0 ? '' : 'border-t border-border'
                }`}
              >
                <span
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                    failed ? 'bg-error-wash text-error' : 'bg-success-wash text-success'
                  }`}
                >
                  {failed ? <X size={13} /> : <Check size={13} />}
                </span>
                <span className="min-w-0 flex-1 text-small text-ink">{info.label}</span>
                <span className="flex-shrink-0 text-micro tabular-nums text-ink-faint">
                  {score.correct}/{score.total}
                </span>
              </div>
            );
          })}
        </div>

        {/* Correctives */}
        {result.failedObjectives.length > 0 && (
          <div className="mt-6 rounded-xl border border-accent-line bg-accent-wash p-4">
            <p className="text-small font-semibold text-accent">Go back over these</p>
            <ul className="mb-4 mt-2 space-y-1.5">
              {result.failedObjectives.map((objectiveId) => {
                const info = describeObjective(objectiveId);
                return (
                  <li key={objectiveId} className="text-small text-ink">
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
              className="tap-scale w-full rounded-xl bg-accent-strong py-3.5 text-body font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Practise these {correctives.length} questions
            </button>
          </div>
        )}

        {/* What you missed */}
        {missed.length > 0 && (
          <>
            <h2 className="mb-2.5 mt-8 text-small font-semibold text-ink">
              What you missed ({missed.length})
            </h2>
            <div className="space-y-2.5">
              {missed.map((item) => (
                <div key={item.id} className="rounded-xl border border-border bg-card p-4">
                  <p className="text-small font-medium text-ink">
                    <RichText text={item.question} />
                  </p>
                  <p className="mt-2 text-small text-ink-muted">
                    Your answer:{' '}
                    <span className="text-error">
                      {responses[item.id]?.trim() ? responses[item.id] : '— left blank —'}
                    </span>
                  </p>
                  <p className="text-small text-ink-muted">
                    Correct:{' '}
                    <span className="text-success">
                      <Somali tone="inherit">{displayAnswer(item)}</Somali>
                    </span>
                  </p>
                  <p className="mt-2 text-small leading-relaxed text-ink-muted">
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
            className="tap-scale w-full rounded-xl bg-accent-strong py-4 text-body font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Done
          </button>
          <button
            onClick={restart}
            className="tap-scale flex w-full items-center justify-center gap-2 rounded-xl border border-border-strong py-4 text-body font-semibold text-ink transition-colors hover:bg-surface-sunken"
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
        <p className="text-body text-ink-muted">Nothing to practise.</p>
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

      <div className="mt-5 rounded-xl border border-border bg-surface-sunken p-4">
        <p className="text-micro font-semibold uppercase tracking-wider text-ink-faint">Hint</p>
        <p className="mt-1 text-small text-ink-muted">
          <RichText text={current.hint} />
        </p>
      </div>

      {checked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 rounded-xl border p-4 ${
            correct ? 'border-success-line bg-success-wash' : 'border-error-line bg-error-wash'
          }`}
        >
          <p className={`mb-1 text-small font-semibold ${correct ? 'text-success' : 'text-error'}`}>
            {correct ? (
              'Correct'
            ) : (
              <>
                Not quite — the answer is{' '}
                <Somali tone="inherit">{displayAnswer(current)}</Somali>
              </>
            )}
          </p>
          <p className="text-small leading-relaxed text-ink">
            <RichText text={current.explanation} />
          </p>
        </motion.div>
      )}

      <div className="action-bar sticky bottom-0 mt-6 pt-3">
        {checked ? (
          <button
            onClick={next}
            className="tap-scale w-full rounded-xl bg-accent-strong py-4 text-body font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            {isLast ? 'Back to results' : 'Continue'}
          </button>
        ) : (
          <button
            onClick={() => answer && setChecked(true)}
            disabled={!answer}
            className={`tap-scale w-full rounded-xl py-4 text-body font-semibold transition-colors ${
              answer
                ? 'bg-accent-strong text-white hover:bg-accent-hover'
                : 'cursor-not-allowed bg-surface-sunken text-ink-faint'
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
      <p className="text-lead font-medium text-ink">
        <RichText text={exercise.question} />
      </p>
      {exercise.somali && (
        <div className="mt-3 rounded-xl border border-border bg-card px-4 py-4 text-center">
          <Somali size="block">{exercise.somali}</Somali>
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
    <div className="flex min-h-[100dvh] flex-col bg-surface">
      <header className="sticky top-0 z-20 border-b border-border bg-surface px-4 pt-safe-t">
        <div className="mx-auto flex max-w-column items-center gap-3 py-2.5">
          <button
            onClick={onClose}
            aria-label="Close"
            className="-ml-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-surface-sunken hover:text-ink"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
          <span className="min-w-0 flex-1 truncate text-small font-medium text-ink">{title}</span>
          {progress && (
            <span className="flex-shrink-0 text-micro tabular-nums text-ink-faint">{progress}</span>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-column flex-1 px-4 pb-[calc(1.5rem+var(--safe-bottom))] pt-5">
        {children}
      </main>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-surface px-4">
      <div className="max-w-sm text-center text-body text-ink-muted">{children}</div>
    </div>
  );
}

function Row({ label, value, first }: { label: string; value: string; first?: boolean }) {
  return (
    <div
      className={`flex items-baseline justify-between gap-3 px-4 py-3 ${
        first ? '' : 'border-t border-border'
      }`}
    >
      <dt className="text-small text-ink-muted">{label}</dt>
      <dd className="text-right text-small font-medium text-ink">{value}</dd>
    </div>
  );
}
