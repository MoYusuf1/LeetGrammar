/**
 * Homework — Layer 2 of the three-layer design (COURSE_DESIGN §3.2).
 *
 * Route: /homework/:id  (HashRouter, so #/homework/3)
 *
 * The distinction from the other two layers is the point of it existing:
 *
 *   Layer 1, in-lesson practice — blocked on one point, unlimited attempts,
 *     not scored. Learning.
 *   Layer 2, this — mixed across lessons, ~30% carried back from earlier ones,
 *     scored and recorded, **gates nothing**. Retention.
 *   Layer 3, the unit test — cumulative, 85%, gates the next unit. Measurement.
 *
 * Feedback is immediate here, unlike the unit test. Homework is still learning,
 * and §1.7 wants metalinguistic feedback every time; withholding it until the
 * end would waste the one moment the learner is guaranteed to be paying
 * attention. Hints are shown for the same reason.
 *
 * Items come from `composeHomework()`, which assembles them from material that
 * already exists rather than from a hand-authored bank. Retrying serves a
 * different set.
 */

import { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import { X, RotateCcw, Printer } from 'lucide-react';
import { getLessonContent } from '@/data/authored-lessons';
import { composeHomework, carryBackCount } from '@/lib/homework';
import { isAnswerCorrect, displayAnswer } from '@/lib/grading';
import { useProgressStore } from '@/stores/progress-store';
import AnswerInput from '@/components/lesson/AnswerInput';
import RichText from '@/components/RichText';
import Somali from '@/components/Somali';

type Phase = 'intro' | 'working' | 'done';

export default function HomeworkPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useProgressStore();

  const lessonId = parseInt(id ?? '1', 10);
  const lesson = getLessonContent(lessonId);

  // Each scheduled return should be a different set, so the attempt starts at
  // however many times this lesson has already come back.
  const [attempt, setAttempt] = useState(
    () => useProgressStore.getState().reviewSchedule?.[parseInt(id ?? '1', 10)]?.reviewCount ?? 0,
  );
  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);

  const items = useMemo(() => composeHomework(lessonId, attempt), [lessonId, attempt]);
  const current = items[index];
  const carried = useMemo(() => carryBackCount(lessonId, items), [lessonId, items]);

  if (!lesson || items.length === 0) {
    return <Centered>There is no homework for that lesson.</Centered>;
  }

  const best = store.practiceScores?.[lessonId];

  const start = () => {
    setPhase('working');
    setIndex(0);
    setAnswer(null);
    setChecked(false);
    setCorrect(0);
  };

  const next = () => {
    if (index === items.length - 1) {
      const pct = Math.round((correct / items.length) * 100);
      store.recordPracticeScore(lessonId, pct);
      // Doing the homework *is* the review — push this lesson to its next
      // interval so it stops being due and comes back later. See lib/review.ts.
      store.recordLessonReviewed(lessonId);
      setPhase('done');
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
    setChecked(false);
  };

  const check = () => {
    if (!answer || !current) return;
    if (isAnswerCorrect(current, answer)) setCorrect((c) => c + 1);
    setChecked(true);
  };

  /* ─── Intro ────────────────────────────────────────────────────────────── */

  if (phase === 'intro') {
    return (
      <Shell onClose={() => navigate('/learn')} title="Practice">
        <h1 className="text-title1 font-bold text-label">{lesson.title}</h1>
        <p className="mt-2 text-title3 text-label-2">
          A mixed set — most of it from this lesson, some from earlier ones so the older
          material does not go quiet.
        </p>

        <dl className="mt-6 overflow-hidden rounded-xl bg-elevated">
          <Row label="Questions" value={`${items.length}`} first />
          <Row label="From earlier lessons" value={`${carried}`} />
          <Row label="Hints" value="On — this is practice" />
          <Row label="Unlocking" value="Nothing is gated by this" />
          {best !== undefined && <Row label="Your best" value={`${best}%`} />}
        </dl>

        <p className="mt-4 text-footnote text-label-3">
          Come back to this a few days after finishing the lesson rather than straight away.
          Spacing it out is most of where the value is.
        </p>

        <button
          onClick={start}
          className="pressable mt-6 w-full rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink transition-colors hover:opacity-90"
        >
          Start
        </button>

        {/* The only way into the worksheet now that it is not a nav destination.
            It sits here because offline practice is the same intent as this
            screen, one step further out. */}
        <button
          onClick={() => navigate(`/worksheet/${lessonId}`)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-body font-medium text-label transition-colors hover:bg-fill"
        >
          <Printer className="h-4 w-4" />
          Print a worksheet instead
        </button>
      </Shell>
    );
  }

  /* ─── Done ─────────────────────────────────────────────────────────────── */

  if (phase === 'done') {
    const pct = Math.round((correct / items.length) * 100);
    return (
      <Shell onClose={() => navigate('/learn')} title="Practice">
        <div className="pt-6 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-fill">
            <span className="text-title1 font-semibold tabular-nums text-accent">{pct}%</span>
          </div>
          <h1 className="mt-5 text-title1 font-semibold text-label">Practice done</h1>
          <p className="mt-1 text-body text-label-2">
            {correct} of {items.length} correct — nothing is gated by this
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate('/learn')}
            className="pressable w-full rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink transition-colors hover:opacity-90"
          >
            Done
          </button>
          <button
            onClick={() => {
              setAttempt((a) => a + 1);
              start();
            }}
            className="pressable flex w-full items-center justify-center gap-2 rounded-xl py-4 text-body font-semibold text-label transition-colors hover:bg-fill"
          >
            <RotateCcw className="h-4 w-4" />
            Again, fresh questions
          </button>
        </div>
      </Shell>
    );
  }

  /* ─── Working ──────────────────────────────────────────────────────────── */

  if (!current) return <Centered>Something went wrong loading the homework.</Centered>;

  const isRight = isAnswerCorrect(current, answer);
  const fromEarlier = !lesson.objectives.some((o) => current.objectiveIds.includes(o));

  return (
    <Shell
      onClose={() => setPhase('intro')}
      title="Practice"
      progress={`${index + 1}/${items.length}`}
    >
      {/* Naming a carried-back item is deliberate: §1.5 wants the learner to
          notice that practice is interleaved, not to be quietly surprised. */}
      {/* Naming a carried-back item stays, because §1.5 wants the learner to
          notice that practice is interleaved rather than be quietly surprised.
          It is a quiet line now rather than a small-caps eyebrow. */}
      {fromEarlier && (
        <p className="text-footnote text-label-2">From an earlier lesson</p>
      )}

      <p className="mt-1.5 text-title3 font-medium text-label">
        <RichText text={current.question} />
      </p>
      {current.somali && (
        <div className="mt-3 rounded-xl bg-elevated px-4 py-4 text-center">
          <Somali size="hero">{current.somali}</Somali>
        </div>
      )}

      <div className="mt-5">
        {/* Keyed so an assembled word bank cannot leak into the next item. */}
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
          <p className={`mb-1 text-footnote font-semibold ${isRight ? 'text-green' : 'text-red'}`}>
            {isRight ? (
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
            {index === items.length - 1 ? 'Finish' : 'Continue'}
          </button>
        ) : (
          <button
            onClick={check}
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

/**
 * A task view: full-screen over /learn, closed rather than navigated back from.
 * The X is the affordance because this is a thing you finish or abandon, not a
 * page in a hierarchy.
 */
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
          <span className="flex-1 text-footnote font-medium text-label">{title}</span>
          {progress && (
            <span className="text-caption2 tabular-nums text-label-3">{progress}</span>
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
      <div className="max-w-sm text-center text-body text-label-2">
        {children}
        <div className="mt-4">
          <Link to="/learn" className="text-body font-medium text-accent hover:underline">
            Back to lessons
          </Link>
        </div>
      </div>
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
