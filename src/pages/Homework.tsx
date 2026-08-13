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
import { ArrowLeft, Check, X, RotateCcw, Target } from 'lucide-react';
import { getLessonContent } from '@/data/authored-lessons';
import { composeHomework, carryBackCount } from '@/lib/homework';
import { isAnswerCorrect, displayAnswer } from '@/lib/grading';
import { useProgressStore } from '@/stores/progress-store';
import AnswerInput from '@/components/lesson/AnswerInput';

type Phase = 'intro' | 'working' | 'done';

export default function HomeworkPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const store = useProgressStore();

  const lessonId = parseInt(id ?? '1', 10);
  const lesson = getLessonContent(lessonId);

  const [attempt, setAttempt] = useState(0);
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
      <Shell onBack={() => navigate('/learn')}>
        <p className="text-xs font-semibold text-[#22d3ee] uppercase tracking-wider">
          Lesson {lessonId} · Homework
        </p>
        <h1 className="text-2xl font-bold text-[#eff1f6] mt-1">{lesson.title}</h1>
        <p className="text-sm text-[#8c8c8c] mt-2 leading-relaxed">
          A mixed set — most of it from this lesson, some of it from earlier ones so the older
          material does not go quiet.
        </p>

        <div className="mt-6 rounded-xl border border-[#ffffff10] bg-[#141414] p-4 space-y-2.5 text-sm text-[#c8c8c8]">
          <Row label="Questions" value={`${items.length}`} />
          <Row label="From earlier lessons" value={`${carried}`} />
          <Row label="Hints" value="On — this is practice" />
          <Row label="Unlocking" value="Nothing is gated by this" />
          {best !== undefined && <Row label="Your best" value={`${best}%`} />}
        </div>

        <p className="text-xs text-[#5c5c5c] mt-4 leading-relaxed">
          Come back to this a few days after finishing the lesson rather than straight away.
          Spacing it out is most of where the value is.
        </p>

        <button
          onClick={start}
          className="w-full mt-6 py-3.5 rounded-2xl bg-[#22d3ee] text-[#0f0f0f] text-sm font-bold hover:bg-[#22d3eed0] transition-colors active:scale-[0.98]"
        >
          Start
        </button>
      </Shell>
    );
  }

  /* ─── Done ─────────────────────────────────────────────────────────────── */

  if (phase === 'done') {
    const pct = Math.round((correct / items.length) * 100);
    return (
      <Shell onBack={() => navigate('/learn')}>
        <div className="text-center">
          <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center border bg-[#22d3ee15] border-[#22d3ee40]">
            <span className="text-2xl font-bold tabular-nums text-[#22d3ee]">{pct}%</span>
          </div>
          <h1 className="text-xl font-bold text-[#eff1f6] mt-4">Homework done</h1>
          <p className="text-sm text-[#8c8c8c] mt-1">
            {correct} of {items.length} correct · nothing is gated by this
          </p>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => {
              setAttempt((a) => a + 1);
              start();
            }}
            className="flex-1 py-3 rounded-2xl bg-[#ffffff08] text-[#eff1f6] text-sm font-bold hover:bg-[#ffffff15] transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={15} />
            Again, fresh questions
          </button>
          <button
            onClick={() => navigate('/learn')}
            className="flex-1 py-3 rounded-2xl bg-[#22c55e] text-[#0f0f0f] text-sm font-bold hover:bg-[#22c55ed0] transition-colors"
          >
            Done
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
    <Shell onBack={() => setPhase('intro')}>
      <div className="flex items-center justify-between mb-5">
        {fromEarlier ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#a78bfa15] border border-[#a78bfa30] text-[10px] font-bold text-[#a78bfa] uppercase tracking-wider">
            <Target size={11} /> From earlier
          </span>
        ) : (
          <span className="text-[10px] font-bold text-[#22d3ee] uppercase tracking-wider">Homework</span>
        )}
        <span className="text-xs text-[#5c5c5c] tabular-nums">
          {index + 1}/{items.length}
        </span>
      </div>

      <p className="text-lg font-medium text-[#eff1f6] leading-relaxed">
        <RichText text={current.question} />
      </p>
      {current.somali && (
        <div className="bg-[#141414] border border-[#ffffff08] rounded-xl p-4 mt-3">
          <p className="text-xl font-semibold text-[#eff1f6] font-mono">{current.somali}</p>
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

      <div className="rounded-xl bg-[#22d3ee08] border border-[#22d3ee20] p-4 mt-5">
        <p className="text-[10px] font-bold text-[#22d3ee] uppercase tracking-wider mb-1">Hint</p>
        <p className="text-sm text-[#8c8c8c]">
          <RichText text={current.hint} />
        </p>
      </div>

      {checked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border p-4 mt-4 ${
            isRight ? 'bg-[#22c55e10] border-[#22c55e30]' : 'bg-[#ef444410] border-[#ef444430]'
          }`}
        >
          <p className={`text-sm font-bold mb-1 flex items-center gap-1.5 ${isRight ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
            {isRight ? <Check size={15} /> : <X size={15} />}
            {isRight ? 'Correct.' : `Not quite — the answer is: ${displayAnswer(current)}`}
          </p>
          <p className="text-sm text-[#c8c8c8] leading-relaxed">
            <RichText text={current.explanation} />
          </p>
        </motion.div>
      )}

      {checked ? (
        <button
          onClick={next}
          className="w-full mt-6 py-3.5 rounded-2xl bg-[#22c55e] text-[#0f0f0f] text-sm font-bold hover:bg-[#22c55ed0] transition-colors active:scale-[0.98]"
        >
          {index === items.length - 1 ? 'Finish' : 'Continue'}
        </button>
      ) : (
        <button
          onClick={check}
          disabled={!answer}
          className={`w-full mt-6 py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-[0.98] ${
            answer ? 'bg-[#3b82f6] text-white hover:bg-[#3b82f6d0]' : 'bg-[#ffffff08] text-[#5c5c5c] cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      )}
    </Shell>
  );
}

/* ─── Shared bits ────────────────────────────────────────────────────────── */

/** Same `**bold**` handling the lesson cards use. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
        seg.startsWith('**') && seg.endsWith('**') && seg.length > 4 ? (
          <strong key={i} className="font-semibold text-[#eff1f6]">
            {seg.slice(2, -2)}
          </strong>
        ) : (
          seg
        ),
      )}
    </>
  );
}

function Shell({ children, onBack }: { children: React.ReactNode; onBack: () => void }) {
  return (
    <div className="min-h-full bg-[#0f0f0f]">
      <div className="max-w-[600px] mx-auto px-4 py-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-[#8c8c8c] hover:text-[#eff1f6] transition-colors mb-5"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        {children}
      </div>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex items-center justify-center px-4 bg-[#0f0f0f]">
      <div className="text-center text-sm text-[#8c8c8c] max-w-sm">
        {children}
        <div className="mt-4">
          <Link to="/learn" className="text-[#ffa116] hover:underline text-sm">
            Back to lessons
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[#8c8c8c]">{label}</span>
      <span className="text-[#eff1f6] font-medium text-right">{value}</span>
    </div>
  );
}
