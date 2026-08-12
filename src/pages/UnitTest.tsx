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
import { ArrowLeft, Check, X, Target, RotateCcw } from 'lucide-react';
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
        <p className="mb-1 text-[#eff1f6] font-semibold">{bank.name} is locked</p>
        <p className="mb-4">
          Finish lessons {unit.lessonIds[0]}–{unit.lessonIds.at(-1)} first — the test only asks
          about what they teach.
        </p>
        <Link
          to="/learn"
          className="inline-block px-4 py-2 rounded-xl bg-[#ffa116] text-[#0f0f0f] text-sm font-bold"
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
      <Shell onBack={() => navigate('/learn')}>
        <p className="text-xs font-semibold text-[#ffa116] uppercase tracking-wider">
          Unit {unit.id} · {unit.name}
        </p>
        <h1 className="text-2xl font-bold text-[#eff1f6] mt-1">{bank.name}</h1>
        <p className="text-sm text-[#8c8c8c] mt-2 leading-relaxed">{bank.description}</p>

        <div className="mt-6 rounded-xl border border-[#ffffff10] bg-[#141414] p-4 space-y-2.5 text-sm text-[#c8c8c8]">
          <Row label="Questions" value={`${items.length}`} />
          <Row label="To pass" value={`${PASS_MARK}%`} />
          <Row label="Hints" value="Off — this one is on you" />
          <Row label="Answers" value="Shown at the end, with what you missed" />
          {record && (
            <Row
              label="Your best"
              value={`${record.bestPercentage}% over ${record.attempts} ${record.attempts === 1 ? 'try' : 'tries'}`}
            />
          )}
        </div>

        <p className="text-xs text-[#5c5c5c] mt-4 leading-relaxed">
          Miss too much of one topic and you will be sent back through a short set of
          questions on that topic alone — not the whole test again.
        </p>

        <button
          onClick={() => setPhase('test')}
          className="w-full mt-6 py-3.5 rounded-2xl bg-[#ffa116] text-[#0f0f0f] text-sm font-bold hover:bg-[#ffa116d0] transition-colors active:scale-[0.98]"
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
      <Shell onBack={() => setPhase('intro')}>
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 min-w-0">
            <CardProgressDots
              total={items.length}
              current={index}
              completed={new Set(items.map((it, i) => (responses[it.id] ? i : -1)).filter((i) => i >= 0))}
              onDotClick={(i) => i < index && setIndex(i)}
            />
          </div>
          <span className="text-xs text-[#5c5c5c] font-medium tabular-nums flex-shrink-0">
            {index + 1}/{items.length}
          </span>
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

        <div className="flex gap-3 mt-7">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="px-4 py-3 rounded-2xl bg-[#ffffff08] text-[#c8c8c8] text-sm font-medium disabled:opacity-30 hover:bg-[#ffffff12] transition-colors"
          >
            Back
          </button>
          {isLast ? (
            <button
              onClick={finish}
              className="flex-1 py-3 rounded-2xl bg-[#22c55e] text-[#0f0f0f] text-sm font-bold hover:bg-[#22c55ed0] transition-colors active:scale-[0.98]"
            >
              Finish · {answered}/{items.length} answered
            </button>
          ) : (
            <button
              onClick={() => setIndex((i) => Math.min(items.length - 1, i + 1))}
              className="flex-1 py-3 rounded-2xl bg-[#ffa116] text-[#0f0f0f] text-sm font-bold hover:bg-[#ffa116d0] transition-colors active:scale-[0.98]"
            >
              Next
            </button>
          )}
        </div>
        <p className="text-[11px] text-[#5c5c5c] mt-3 text-center">
          Skipping is allowed — an unanswered question is marked wrong.
        </p>
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
      <Shell onBack={() => navigate('/learn')}>
        <div className="text-center">
          <div
            className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center border ${
              result.passed
                ? 'bg-[#22c55e15] border-[#22c55e40]'
                : 'bg-[#ffa11615] border-[#ffa11640]'
            }`}
          >
            <span
              className={`text-2xl font-bold tabular-nums ${
                result.passed ? 'text-[#22c55e]' : 'text-[#ffa116]'
              }`}
            >
              {result.percentage}%
            </span>
          </div>
          <h1 className="text-xl font-bold text-[#eff1f6] mt-4">
            {result.passed ? 'Unit passed' : 'Not there yet'}
          </h1>
          <p className="text-sm text-[#8c8c8c] mt-1">
            {result.correctItems} of {result.totalItems} correct · {PASS_MARK}% needed
          </p>
        </div>

        {/* Per-objective breakdown */}
        <h2 className="text-sm font-semibold text-[#eff1f6] mt-7 mb-2.5">How each topic went</h2>
        <div className="space-y-1.5">
          {[...tally.entries()].map(([objectiveId, score]) => {
            const info = describeObjective(objectiveId);
            const failed = result.failedObjectives.includes(objectiveId);
            return (
              <div
                key={objectiveId}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#141414] border border-[#ffffff08]"
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    failed ? 'bg-[#ef444420] text-[#ef4444]' : 'bg-[#22c55e20] text-[#22c55e]'
                  }`}
                >
                  {failed ? <X size={13} /> : <Check size={13} />}
                </span>
                <span className="flex-1 min-w-0 text-sm text-[#c8c8c8]">{info.label}</span>
                <span className="text-xs text-[#5c5c5c] tabular-nums flex-shrink-0">
                  {score.correct}/{score.total}
                </span>
              </div>
            );
          })}
        </div>

        {/* Correctives */}
        {result.failedObjectives.length > 0 && (
          <div className="mt-6 rounded-xl border border-[#ffa11630] bg-[#ffa11608] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target size={15} className="text-[#ffa116]" />
              <p className="text-sm font-bold text-[#ffa116]">Go back over these</p>
            </div>
            <ul className="space-y-1.5 mb-4">
              {result.failedObjectives.map((objectiveId) => {
                const info = describeObjective(objectiveId);
                return (
                  <li key={objectiveId} className="text-sm text-[#c8c8c8]">
                    {info.label}
                    {info.lessonId && (
                      <Link
                        to={`/lesson/${info.lessonId}`}
                        className="text-[#ffa116] hover:underline ml-1.5"
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
              className="w-full py-3 rounded-xl bg-[#ffa116] text-[#0f0f0f] text-sm font-bold hover:bg-[#ffa116d0] transition-colors"
            >
              Practise these {correctives.length} questions
            </button>
          </div>
        )}

        {/* What you missed */}
        {missed.length > 0 && (
          <>
            <h2 className="text-sm font-semibold text-[#eff1f6] mt-7 mb-2.5">
              What you missed ({missed.length})
            </h2>
            <div className="space-y-2.5">
              {missed.map((item) => (
                <div key={item.id} className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
                  <p className="text-sm text-[#eff1f6] font-medium">
                    <RichText text={item.question} />
                  </p>
                  <p className="text-xs text-[#8c8c8c] mt-2">
                    Your answer:{' '}
                    <span className="text-[#ef4444]">
                      {responses[item.id]?.trim() ? responses[item.id] : '— left blank —'}
                    </span>
                  </p>
                  <p className="text-xs text-[#8c8c8c]">
                    Correct: <span className="text-[#22c55e]">{displayAnswer(item)}</span>
                  </p>
                  <p className="text-xs text-[#c8c8c8] mt-2 leading-relaxed">
                    <RichText text={item.explanation} />
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex gap-3 mt-7">
          <button
            onClick={restart}
            className="flex-1 py-3 rounded-2xl bg-[#ffffff08] text-[#eff1f6] text-sm font-bold hover:bg-[#ffffff15] transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw size={15} />
            Retake
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
      <Shell onBack={onBack}>
        <p className="text-sm text-[#8c8c8c]">Nothing to practise.</p>
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
    <Shell onBack={onBack}>
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffa11615] border border-[#ffa11630] text-[10px] font-bold text-[#ffa116] uppercase tracking-wider">
          <Target size={11} /> Correctives
        </span>
        <span className="text-xs text-[#5c5c5c] tabular-nums">
          {index + 1}/{items.length}
        </span>
      </div>

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
            correct ? 'bg-[#22c55e10] border-[#22c55e30]' : 'bg-[#ef444410] border-[#ef444430]'
          }`}
        >
          <p className={`text-sm font-bold mb-1 ${correct ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
            {correct ? 'Correct.' : `Not quite — the answer is: ${displayAnswer(current)}`}
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
          {isLast ? 'Back to results' : 'Continue'}
        </button>
      ) : (
        <button
          onClick={() => answer && setChecked(true)}
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

function ItemQuestion({ exercise }: { exercise: PracticeExercise }) {
  return (
    <div>
      <p className="text-lg font-medium text-[#eff1f6] leading-relaxed">
        <RichText text={exercise.question} />
      </p>
      {exercise.somali && (
        <div className="bg-[#141414] border border-[#ffffff08] rounded-xl p-4 mt-3">
          <p className="text-xl font-semibold text-[#eff1f6] font-mono">{exercise.somali}</p>
        </div>
      )}
    </div>
  );
}

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
      <div className="text-center text-sm text-[#8c8c8c] max-w-sm">{children}</div>
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
