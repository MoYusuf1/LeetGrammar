/**
 * LessonCards — the teaching engine.
 *
 * A lesson is a deck of STEPS, paged with the toolbar at the bottom.
 *
 * NO SWIPE. It was tried and removed. Two real bugs made it unreliable — the
 * drag surface was only as tall as its text, so most of the screen did nothing,
 * and the elastic was low enough that the card barely followed the finger — but
 * the deeper problem was that a gesture with no visible control has to be
 * taught, and teaching it needed a hint animation that itself needed rules
 * about when to stop. Safari's back/forward chevrons need none of that. See
 * LessonToolbar.
 *
 * NO EYEBROWS. Every card used to open with a small-caps label — PRACTICE,
 * HINT, HAVE A GUESS FIRST, VOCABULARY. They labelled what was already obvious
 * from the content directly beneath them, and stacked up as visual noise on
 * every screen in the app.
 *
 * THE HINT IS BEHIND THE LIGHTBULB. It used to sit open on the card, which
 * makes it not a hint: a learner reads down the screen and has been told the
 * answer's shape before they have tried. §1.7 wants feedback after an attempt,
 * not before one.
 *
 * STILL LOAD-BEARING, DO NOT DISTURB:
 *   • The vocab deck injects after the SECOND retrieval card (rule S5).
 *   • AnswerInput is keyed by exercise id — the two-unscramble softlock.
 *   • Card POSITION is persisted, not step position; Learn.tsx and older saved
 *     progress both depend on that.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MoreHorizontal, Lightbulb } from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store';
import { getLessonContent } from '@/data/authored-lessons';
import type { Card as TeachingCard, PracticeExercise } from '@/data/types';
import { isAnswerCorrect, displayAnswer } from '@/lib/grading';
import { getVocabForLesson, type VocabWord } from '@/data/vocabulary';
import AnswerInput from './AnswerInput';
import Blueprint, { stripBoxArt } from './Blueprint';
import LessonMenu from './LessonMenu';
import LessonToolbar from './LessonToolbar';
import FeedbackSheet from './FeedbackSheet';
import Prose from './Prose';
import { buildSteps, stepForCard, isRetrieval, type FlowCard, type VocabFlowCard } from './steps';
import Somali from '@/components/Somali';
import RichText from '@/components/RichText';
import GlossarySheet from '@/components/GlossarySheet';
import { contentStagger } from './motion';
import { prefersNoMotion } from '@/lib/reduced-motion';

interface LessonCardsProps {
  lessonId: number;
}

const deckVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 180 : -180, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 180 : -180, opacity: 0 }),
};

export default function LessonCards({ lessonId }: LessonCardsProps) {
  const navigate = useNavigate();
  const progress = useProgressStore();
  const content = getLessonContent(lessonId);

  const [direction, setDirection] = useState(1);
  const [practiceAnswer, setPracticeAnswer] = useState<string | null>(null);
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [noMotion] = useState(prefersNoMotion);

  /*
   * Card flow = the authored cards plus an injected vocabulary deck.
   *
   * The deck lands after the SECOND retrieval card, and where it goes is a
   * pedagogical constraint rather than a layout preference. Design rule S5
   * allows no run of more than three cards without retrieval (§1.16). This used
   * to insert at index 1, straight after the blueprint, which turned the
   * authored opening — blueprint, connect, promise, then a predict card — from
   * a compliant run of three into four. Lessons 5–8 were written to the rule
   * and breached it anyway, and because the breach only existed in the injected
   * flow, nothing looking at `lesson.cards` could see it. Check T2 measures
   * this flow now, not the authored array.
   */
  const cards: FlowCard[] = useMemo(() => {
    const base: FlowCard[] = content?.cards ?? [];
    const words = getVocabForLesson(lessonId);
    if (!content || words.length === 0) return base;
    const vocabCard: VocabFlowCard = { type: 'vocab', words };

    let seen = 0;
    let insertAt = base.length; // no retrieval cards at all: park it at the end
    for (let i = 0; i < base.length; i++) {
      if (isRetrieval(base[i]) && ++seen === 2) {
        insertAt = i + 1;
        break;
      }
    }
    return [...base.slice(0, insertAt), vocabCard, ...base.slice(insertAt)];
  }, [content, lessonId]);

  const steps = useMemo(() => buildSteps(cards), [cards]);

  const [stepIndex, setStepIndex] = useState(() =>
    stepForCard(buildSteps(cards), useProgressStore.getState().getLessonCardPosition(lessonId)),
  );

  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;
  const exercise = step?.exercise;

  /* Persist the card index this step starts at, not the step index. */
  useEffect(() => {
    const start = steps[stepIndex]?.startIndex ?? 0;
    useProgressStore.getState().setLessonCardPosition(lessonId, start);
  }, [stepIndex, steps, lessonId]);

  /* ─── Navigation ───────────────────────────────────────────────────────── */

  const finish = useCallback(() => {
    progress.completeLesson(lessonId);
    progress.clearLessonCardPosition(lessonId);
    navigate('/learn');
  }, [lessonId, navigate, progress]);

  const resetStepState = () => {
    setPracticeAnswer(null);
    setPracticeChecked(false);
    setShowHint(false);
  };

  const goNext = useCallback(() => {
    if (isLastStep) return finish();
    setDirection(1);
    setStepIndex((i) => i + 1);
    resetStepState();
  }, [isLastStep, finish]);

  const goPrev = useCallback(() => {
    if (stepIndex === 0) return;
    setDirection(-1);
    setStepIndex((i) => i - 1);
    resetStepState();
  }, [stepIndex]);

  /* An exercise will not let you past it until it has been answered and
     checked — that gate is the whole point of a retrieval card. */
  const canForward = !exercise || practiceChecked;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showMenu || showGlossary) return;
      if (e.key === 'ArrowRight' && canForward) goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, canForward, showMenu, showGlossary]);

  if (!content || !step) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-bg px-4">
        <p className="text-callout text-label-2">Lesson content not found.</p>
      </div>
    );
  }

  const deck = (
    <StepView
      step={step}
      lessonTitle={content.title}
      practiceAnswer={practiceAnswer}
      practiceChecked={practiceChecked}
      showHint={showHint}
      onPracticeSelect={(a) => !practiceChecked && setPracticeAnswer(a)}
    />
  );

  return (
    <div className="lesson-container flex h-[100dvh] flex-col overflow-hidden bg-bg">
      <div
        className="fixed inset-x-0 top-0 z-30 h-[3px] bg-fill"
        role="progressbar"
        aria-valuenow={stepIndex + 1}
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-label={`Step ${stepIndex + 1} of ${steps.length}`}
      >
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      <button
        onClick={() => navigate('/learn')}
        aria-label="Close lesson"
        className="glass pressable fixed left-4 z-30 flex h-10 w-10 items-center justify-center rounded-full text-label"
        style={{ top: 'calc(var(--safe-t) + 14px)' }}
      >
        <X className="h-[18px] w-[18px]" />
      </button>

      <div
        className="fixed right-4 z-30 flex items-center gap-2"
        style={{ top: 'calc(var(--safe-t) + 14px)' }}
      >
        {/* The hint is a lamp you switch on, not something sitting open on the
            card telling you the answer's shape before you have tried. */}
        {exercise && (
          <button
            onClick={() => setShowHint((s) => !s)}
            aria-label={showHint ? 'Hide hint' : 'Show hint'}
            aria-pressed={showHint}
            className={`glass pressable flex h-10 w-10 items-center justify-center rounded-full ${
              showHint ? 'text-label' : 'text-label-2'
            }`}
          >
            <Lightbulb
              className="h-[18px] w-[18px]"
              fill={showHint ? 'currentColor' : 'none'}
            />
          </button>
        )}

        <button
          onClick={() => setShowMenu(true)}
          aria-label="Lesson options"
          className="glass pressable flex h-10 w-10 items-center justify-center rounded-full text-label"
        >
          <MoreHorizontal className="h-[18px] w-[18px]" />
        </button>
      </div>

      {/* The step area is a fixed pane that scrolls internally, so the toolbar
          never moves between a short step and a long one. */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-[calc(var(--safe-t)+74px)]">
        <div className="mx-auto max-w-column">
          {noMotion ? (
            deck
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={stepIndex}
                custom={direction}
                variants={deckVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              >
                {deck}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      <LessonToolbar
        canBack={stepIndex > 0}
        canForward={canForward && !isLastStep}
        onBack={goPrev}
        onForward={goNext}
        action={
          exercise && !practiceChecked
            ? {
                label: 'Check',
                onClick: () => practiceAnswer && setPracticeChecked(true),
                disabled: !practiceAnswer,
              }
            : isLastStep
              ? { label: 'Finish', onClick: finish }
              : undefined
        }
      />

      {exercise && practiceChecked && (
        <FeedbackSheet
          correct={verdictOf(exercise, practiceAnswer)}
          heading={<FeedbackHeading exercise={exercise} answer={practiceAnswer} />}
          explanation={<RichText text={exercise.explanation} />}
          continueLabel={isLastStep ? 'Finish lesson' : 'Continue'}
          onContinue={goNext}
        />
      )}

      {showMenu && (
        <LessonMenu
          onClose={() => setShowMenu(false)}
          onGlossary={() => {
            setShowMenu(false);
            setShowGlossary(true);
          }}
          onWorksheet={() => navigate(`/worksheet/${lessonId}`)}
          onLeave={() => navigate('/learn')}
        />
      )}

      {showGlossary && <GlossarySheet onClose={() => setShowGlossary(false)} />}
    </div>
  );
}

/* ─── Feedback helpers ───────────────────────────────────────────────────── */

function isSelfGraded(exercise: PracticeExercise): boolean {
  return exercise.type === 'translate' || exercise.type === 'marker_identification';
}

function verdictOf(exercise: PracticeExercise, answer: string | null): boolean | null {
  if (isSelfGraded(exercise)) return null;
  return isAnswerCorrect(exercise, answer);
}

function FeedbackHeading({
  exercise,
  answer,
}: {
  exercise: PracticeExercise;
  answer: string | null;
}) {
  if (isSelfGraded(exercise)) {
    return (
      <>
        Answer: <Somali inherit>{displayAnswer(exercise)}</Somali>
      </>
    );
  }
  if (isAnswerCorrect(exercise, answer)) return <>Correct</>;
  return (
    <>
      Not quite — the answer is <Somali inherit>{displayAnswer(exercise)}</Somali>
    </>
  );
}

/* ─── Step Renderer ──────────────────────────────────────────────────────── */

function StepView({
  step,
  lessonTitle,
  practiceAnswer,
  practiceChecked,
  showHint,
  onPracticeSelect,
}: {
  step: { cards: FlowCard[]; exercise?: TeachingCard['exercise'] };
  lessonTitle: string;
  practiceAnswer: string | null;
  practiceChecked: boolean;
  showHint: boolean;
  onPracticeSelect: (a: string) => void;
}) {
  return (
    <div className="space-y-9">
      {step.cards.map((card, i) => (
        <RenderCard
          key={i}
          card={card}
          lessonTitle={lessonTitle}
          showTitle={i === 0}
          practiceAnswer={practiceAnswer}
          practiceChecked={practiceChecked}
          showHint={showHint}
          onPracticeSelect={onPracticeSelect}
        />
      ))}
    </div>
  );
}

function RenderCard({
  card,
  lessonTitle,
  showTitle,
  practiceAnswer,
  practiceChecked,
  showHint,
  onPracticeSelect,
}: {
  card: FlowCard;
  lessonTitle: string;
  showTitle: boolean;
  practiceAnswer: string | null;
  practiceChecked: boolean;
  showHint: boolean;
  onPracticeSelect: (a: string) => void;
}) {
  switch (card.type) {
    case 'blueprint':
    case 'connect':
    case 'promise':
    case 'payoff':
    case 'predict':
      return <IntroCard card={card} lessonTitle={lessonTitle} showTitle={showTitle} />;

    case 'vocab':
      return <VocabCard words={(card as VocabFlowCard).words} />;

    case 'teach':
    case 'example':
      return <TeachCard card={card} />;

    case 'notice':
    case 'complete':
    case 'produce':
      return card.exercise ? (
        <PracticeCard
          exercise={card.exercise}
          answer={practiceAnswer}
          checked={practiceChecked}
          showHint={showHint}
          onSelect={onPracticeSelect}
        />
      ) : null;

    case 'summary':
      return <SummaryCard card={card} />;

    default:
      return null;
  }
}

/* ─── Intro Card ─────────────────────────────────────────────────────────── */

function IntroCard({
  card,
  lessonTitle,
  showTitle,
}: {
  card: TeachingCard;
  lessonTitle: string;
  showTitle: boolean;
}) {
  return (
    <div className="space-y-5">
      {showTitle && (
        <motion.h1
          custom={0}
          variants={contentStagger}
          initial="hidden"
          animate="visible"
          className="text-title1 font-bold text-label"
        >
          {lessonTitle}
        </motion.h1>
      )}

      {card.prompt && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={card.prompt} />
        </motion.div>
      )}

      {/* Drawn, not typeset — the content still carries the old box-drawing art,
          which is stripped here. See Blueprint.tsx. */}
      {card.type === 'blueprint' && <Blueprint slot={card.blueprintSlot} />}

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={stripBoxArt(card.content)} />
        </motion.div>
      )}
    </div>
  );
}

/* ─── Vocab Card ─────────────────────────────────────────────────────────── */

function VocabCard({ words }: { words: VocabWord[] }) {
  return (
    <motion.div
      custom={0}
      variants={contentStagger}
      initial="hidden"
      animate="visible"
      className="list-group"
    >
      {words.map((w) => (
        <div key={w.rank} className="list-row flex items-baseline justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <Somali size="lg">{w.somali}</Somali>
            <p className="mt-0.5 text-subhead text-label-2">{w.english}</p>
          </div>
          <span className="flex-shrink-0 text-caption2 uppercase tracking-wider text-label-3">
            {w.pos}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Teach Card ─────────────────────────────────────────────────────────── */

function TeachCard({ card }: { card: TeachingCard }) {
  return (
    <div className="space-y-4">
      {/* The card's own title is a real heading now, not a grey eyebrow. */}
      {card.title && (
        <motion.h2
          custom={0}
          variants={contentStagger}
          initial="hidden"
          animate="visible"
          className="text-title2 font-semibold text-label"
        >
          {card.title}
        </motion.h2>
      )}

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          {/* Renders white. It rendered grey for the whole life of the previous
              version because `text-label-2` in this component's own class list
              outranked the `text-label` the caller passed — Tailwind emits
              `.text-label` first, and class strings have no specificity. */}
          <Prose text={card.content} />
        </motion.div>
      )}
    </div>
  );
}

/* ─── Practice Card ──────────────────────────────────────────────────────── */

function PracticeCard({
  exercise,
  answer,
  checked,
  showHint,
  onSelect,
}: {
  exercise: PracticeExercise;
  answer: string | null;
  checked: boolean;
  showHint: boolean;
  onSelect: (a: string) => void;
}) {
  return (
    <div className="space-y-6">
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <p className="text-title2 font-semibold leading-[1.3] text-label">
          <RichText text={exercise.question} />
        </p>
        {exercise.somali && (
          <div className="mt-5 text-center">
            <Somali size="hero">{exercise.somali}</Somali>
          </div>
        )}
      </motion.div>

      {/* Keyed by exercise id, and it must stay keyed. AnswerInput holds the
          assembled word bank for an unscramble in its own state; without a key
          React reuses the instance across cards, so the words tapped on one
          card arrive already-placed on the next and its own chips render as
          spent. Check then stays disabled forever — a softlock the learner can
          only escape via Reset. It went unnoticed until Lesson 8 became the
          first lesson with two unscrambles in a row. */}
      <AnswerInput key={exercise.id} exercise={exercise} answer={answer} checked={checked} onSelect={onSelect} />

      {(exercise.type === 'translate' || exercise.type === 'marker_identification') && (
        <p className="text-footnote text-label-3">
          Type your best answer, then check — you grade yourself against the explanation.
        </p>
      )}

      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-fill p-4"
        >
          <p className="text-subhead text-label">
            <RichText text={exercise.hint} />
          </p>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Summary Card ───────────────────────────────────────────────────────── */

function SummaryCard({ card }: { card: TeachingCard }) {
  return (
    <div className="space-y-5">
      <motion.h2
        custom={0}
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="text-title1 font-bold text-label"
      >
        {card.title}
      </motion.h2>

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={card.content} />
        </motion.div>
      )}
    </div>
  );
}
