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
import { useNavigate, useParams } from 'react-router';
import { RotateCcw } from 'lucide-react';
import { getLessonContent } from '@/data/authored-lessons';
import { composeHomework, carryBackCount, delayedTransferItems, isDelayedTransferSession } from '@/lib/homework';
import { dueLessons } from '@/lib/review';
import { isAnswerCorrect, displayAnswer } from '@/lib/grading';
import { useProgressStore } from '@/stores/progress-store';
import AnswerInput from '@/components/lesson/AnswerInput';
import RichText from '@/components/RichText';
import Somali from '@/components/Somali';
import TaskShell from '@/components/shared/TaskShell';
import CenteredNotice from '@/components/shared/CenteredNotice';
import { FactList, FactRow } from '@/components/shared/FactList';
import ExerciseQuestion from '@/components/shared/ExerciseQuestion';
import PracticeFeedback from '@/components/shared/PracticeFeedback';
import PracticeActionBar from '@/components/shared/PracticeActionBar';
import { PrimaryButton, SecondaryButton } from '@/components/shared/buttons';

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
    () => useProgressStore.getState().reviewSchedule?.[lessonId]?.reviewCount ?? 0,
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

  // The miss history, snapshotted at mount for the same reason as the queue:
  // a set cannot reprioritize mid-attempt when these very answers record new
  // misses. What the learner gets wrong *here* leads the *next* set.
  const [history] = useState(() => useProgressStore.getState().exerciseProgress ?? {});

  const items = useMemo(
    () => composeHomework(lessonId, attempt, undefined, due, history),
    [lessonId, attempt, due, history],
  );
  const current = items[index];
  const delayed = isDelayedTransferSession(lessonId, due);
  const delayedEvidence = useMemo(
    () => delayedTransferItems(lessonId, attempt, due, history).length,
    [lessonId, attempt, due, history],
  );
  const carried = useMemo(() => carryBackCount(lessonId, items), [lessonId, items]);
  // How many items in this set are back because the learner missed them
  // before. Shown in the intro so a re-served form reads as deliberate, not
  // as the set repeating itself.
  const retried = useMemo(
    () => items.filter((i) => (history[i.id]?.misses ?? 0) > 0).length,
    [items, history],
  );
  const [missed, setMissed] = useState<string[]>([]);

  if (!lesson || items.length === 0) {
    return <CenteredNotice withBackLink>There is no homework for that lesson.</CenteredNotice>;
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
    const right = isAnswerCorrect(current, answer);
    // Homework answers feed the same per-prompt history as lesson answers, so
    // a form missed here is what the next set leads with. Without this call
    // the history only ever learned from Layer 1.
    store.recordExerciseAttempt(current.id, right);
    if (right) {
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
      <TaskShell onClose={() => navigate('/learn')} title="Practice">
        <h1 className="text-title1 font-bold text-label">{lesson.title}</h1>
        <p className="mt-2 text-title3 text-label-2">
          A mixed set, most of it from this lesson, some from earlier ones so the older
          material does not go quiet.
        </p>

        <FactList className="mt-6">
          <FactRow label="Questions" value={`${items.length}`} first />
          <FactRow label="Due for review" value={`${carried}`} />
          <FactRow label="Session" value={delayed ? 'Delayed transfer' : 'Practice'} />
          {delayed && <FactRow label="Fresh transfer items" value={`${delayedEvidence}`} />}
          {retried > 0 && <FactRow label="Back from your misses" value={`${retried}`} />}
          <FactRow label="Hints" value="On, this is practice" />
          <FactRow label="Scoring" value="Not marked" />
        </FactList>

        <p className="mt-4 text-footnote text-label-3">
          {delayed
            ? 'This lesson is due now. The fresh items below count as delayed transfer because the wording is not copied from the lesson.'
            : 'Come back when this lesson is due rather than repeating it straight away. Only a scheduled return counts as delayed transfer.'}
        </p>

        <PrimaryButton onClick={start} className="mt-6">
          Start
        </PrimaryButton>
      </TaskShell>
    );
  }

  /* ─── Done ─────────────────────────────────────────────────────────────── */

  if (phase === 'done') {
    return (
      <TaskShell onClose={() => navigate('/learn')} title="Practice">
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
          <PrimaryButton onClick={() => navigate('/learn')}>Done</PrimaryButton>
          <SecondaryButton
            onClick={() => {
              setAttempt((a) => a + 1);
              start();
            }}
            className="flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Again, fresh questions
          </SecondaryButton>
        </div>
      </TaskShell>
    );
  }

  /* ─── Working ──────────────────────────────────────────────────────────── */

  if (!current) return <CenteredNotice withBackLink>Something went wrong loading the homework.</CenteredNotice>;

  const isLast = index === items.length - 1;
  const fromEarlier = !lesson.objectives.some((o) => current.objectiveIds.includes(o));

  return (
    <TaskShell
      onClose={() => setPhase('intro')}
      title="Practice"
      progress={`${index + 1}/${items.length}`}
    >
      {/* Naming a carried-back item stays, because §1.5 wants the learner to
          notice that practice is interleaved rather than be quietly surprised.
          It is a quiet line now rather than a small-caps eyebrow. */}
      {fromEarlier && (
        <p className="text-footnote text-label-2">From an earlier lesson</p>
      )}

      <ExerciseQuestion exercise={current} className="mt-1.5" />

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

      {checked && <PracticeFeedback exercise={current} answer={answer} />}

      <PracticeActionBar
        checked={checked}
        canCheck={Boolean(answer)}
        onCheck={check}
        onNext={next}
        isLast={isLast}
        lastLabel="Finish"
      />
    </TaskShell>
  );
}
