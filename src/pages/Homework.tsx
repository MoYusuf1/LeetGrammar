/**
 * Homework — Layer 2 of the three-layer design (COURSE_DESIGN §3.2).
 *
 * Route: /homework/:id  (HashRouter, so #/homework/3)
 *
 * The distinction from the other two layers is the point of it existing:
 *
 *   Layer 1, in-lesson practice — blocked on one point, unlimited attempts,
 *     not scored. Learning.
 *   Layer 2, this — mixed across lessons, ~30% carried back from whatever the
 *     review schedule says is due, recorded but **not scored at the learner**.
 *     Retention.
 *   Layer 3, the unit test — cumulative, 85% criterion, routes to correctives.
 *     Measurement.
 *
 * NO GRADE IS SHOWN HERE. The learner writes these items, so the percentage
 * measures how well they remember their own authoring, not how well they know
 * Somali — and self-assessment bias runs the wrong way at this proficiency
 * (COURSE_DESIGN §3.2). The score is still recorded, because the review schedule
 * needs something to move on; it is simply not reported back as a verdict. What
 * the learner sees instead is what to look at again.
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
import { X, RotateCcw } from 'lucide-react';
import { getLessonContent } from '@/data/authored-lessons';
import { composeHomework, carryBackCount } from '@/lib/homework';
import { dueLessons } from '@/lib/review';
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

  // Carry-back is drawn from the review queue rather than from "any earlier
  // lesson" — one mechanism instead of two (lib/homework.ts, COURSE_DESIGN
  // §1.17). Read once at mount so the set cannot reshuffle mid-attempt when
  // finishing changes what is due.
  const [due] = useState(() => {
    const s = useProgressStore.getState();
    return dueLessons(s.reviewSchedule ?? {}, s.completedLessons ?? []);
  });

  const items = useMemo(
    () => composeHomework(lessonId, attempt, undefined, due),
    [lessonId, attempt, due],
  );
  const current = items[index];
  const carried = useMemo(() => carryBackCount(lessonId, items), [lessonId, items]);
  const [missed, setMissed] = useState<string[]>([]);

  if (!lesson || items.length === 0) {
    return <Centered>There is no homework for that lesson.</Centered>;
  }

  const start = () => {
    setPhase('working');
    setIndex(0);
    setAnswer(null);
    setChecked(false);
    setCorrect(0);
    setMissed([]);
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
    if (isAnswerCorrect(current, answer)) {
      setCorrect((c) => c + 1);
    } else {
      // Kept so the end of the set can say what to look at again. This is the
      // replacement for a score: a list of things to do something about beats a
      // number the learner cannot act on.
      setMissed((m) => [...m, displayAnswer(current)]);
    }
    setChecked(true);
  };

  /* ─── Intro ────────────────────────────────────────────────────────────── */

  if (phase === 'intro') {
    return (
      <Shell onClose={() => navigate('/learn')} title="Practice">
        <h1 className="text-title1 font-bold text-label">{lesson.title}</h1>
        <p className="mt-2 text-title3 text-label-2">
          A mixed set, most of it from this lesson, some from earlier ones so the older
          material does not go quiet.
        </p>

        <dl className="mt-6 overflow-hidden rounded-xl bg-elevated">
          <Row label="Questions" value={`${items.length}`} first />
          <Row label="Due for review" value={`${carried}`} />
          <Row label="Hints" value="On, this is practice" />
          <Row label="Scoring" value="Not marked" />
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
      </Shell>
    );
  }

  /* ─── Done ─────────────────────────────────────────────────────────────── */

  if (phase === 'done') {
    return (
      <Shell onClose={() => navigate('/learn')} title="Practice">
        {/* No percentage, no badge, no ring. The learner wrote these questions;
            a score here would measure recall of their own authoring and would be
            read as a verdict on their Somali. What replaces it is the only part
            they can act on — the forms they did not produce. See the file
            header and COURSE_DESIGN §3.2. */}
        <div className="pt-6">
          <h1 className="text-title1 font-semibold text-label">Practice done</h1>
          <p className="mt-1 text-body text-label-2">
            {items.length} questions. This lesson goes back into the review rota.
          </p>
        </div>

        {missed.length > 0 && (
          <div className="mt-6">
            <p className="text-footnote text-label-2">Worth another look</p>
            <ul className="mt-2 overflow-hidden rounded-xl bg-elevated">
              {missed.map((form, i) => (
                <li
                  key={`${form}-${i}`}
                  className={`px-4 py-3 ${i === 0 ? '' : 'border-t border-separator'}`}
                >
                  <Somali>{form}</Somali>
                </li>
              ))}
            </ul>
          </div>
        )}

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
                Not quite. The answer is{' '}
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
