/**
 * LessonCards — the teaching engine.
 *
 * A lesson is a horizontally-paged deck of STEPS. You swipe through it.
 *
 * WHY IT IS NOT A STACK OF CARDS WITH A BUTTON UNDER EACH. It used to be, and
 * finishing a lesson meant pressing "Got it" thirteen times. Two changes fix
 * that, and they work together:
 *
 *   1. Consecutive passive cards MERGE into one step (see steps.ts), so a
 *      13-card lesson is roughly 6 screens.
 *   2. A passive step has NO BUTTON AT ALL. You swipe. A button appears only
 *      where the lesson actually demands something — an exercise, or the end.
 *
 * So a button on screen now means "you have to do something", which is what a
 * button is supposed to mean.
 *
 * THINGS THAT WILL BREAK IF YOU CHANGE THEM CARELESSLY:
 *
 *   • Swipe is DISABLED on exercise steps. Unscramble renders a horizontal row
 *     of tappable word chips, and a drag handler over it eats the taps.
 *   • The deck is inset from the screen edge and drag starts there, because iOS
 *     Safari claims edge swipes for back-navigation. A full-bleed drag surface
 *     means the first swipe leaves the lesson.
 *   • Card POSITION is what gets persisted, not step position. Learn.tsx reports
 *     "Card 4 of 17" from it and existing saved progress predates steps.
 *   • The reduced-motion path renders real Next/Back buttons. Correctness cannot
 *     depend on a gesture or an animation completing — a headless browser fires
 *     neither, and that is how three softlocks reached production. See
 *     lib/reduced-motion.ts and docs/WORKING_AGREEMENT.md.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store';
import { getLessonContent } from '@/data/authored-lessons';
import type { Card as TeachingCard, PracticeExercise } from '@/data/types';
import { isAnswerCorrect, displayAnswer } from '@/lib/grading';
import { getVocabForLesson, type VocabWord } from '@/data/vocabulary';
import AnswerInput from './AnswerInput';
import Blueprint, { stripBoxArt } from './Blueprint';
import LessonMenu from './LessonMenu';
import FeedbackSheet from './FeedbackSheet';
import { buildSteps, stepForCard, isRetrieval, type FlowCard, type VocabFlowCard } from './steps';
import Somali from '@/components/Somali';
import RichText from '@/components/RichText';
import GlossarySheet from '@/components/GlossarySheet';
import { contentStagger } from './motion';
import { prefersNoMotion } from '@/lib/reduced-motion';

interface LessonCardsProps {
  lessonId: number;
}

/** Past this many pixels of drag, the swipe counts. */
const SWIPE_THRESHOLD = 55;

const deckVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 260 : -260, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 260 : -260, opacity: 0 }),
};

export default function LessonCards({ lessonId }: LessonCardsProps) {
  const navigate = useNavigate();
  const progress = useProgressStore();
  const content = getLessonContent(lessonId);

  const [direction, setDirection] = useState(1);
  const [practiceAnswer, setPracticeAnswer] = useState<string | null>(null);
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
   *
   * Landing after the second retrieval also reads better: by then the learner
   * has met the lesson's first new idea, so the deck is a list of words they
   * have just seen used rather than a list to be taken on faith.
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

  /* Resume position is read once on mount; Lesson.tsx keys this component by
     lessonId, so switching lessons remounts and re-reads. The stored value is a
     CARD index, mapped back onto whichever step contains it. */
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

  const goNext = useCallback(() => {
    if (isLastStep) return finish();
    setDirection(1);
    setStepIndex((i) => i + 1);
    setPracticeAnswer(null);
    setPracticeChecked(false);
  }, [isLastStep, finish]);

  const goPrev = useCallback(() => {
    setStepIndex((i) => {
      if (i === 0) return i;
      setDirection(-1);
      return i - 1;
    });
    setPracticeAnswer(null);
    setPracticeChecked(false);
  }, []);

  /* An exercise step will not let you past it until it has been answered and
     checked — that gate is the whole point of a retrieval card. */
  const canSwipeForward = !exercise || practiceChecked;
  /* Drag is off while an exercise is live, because a drag handler over the
     unscramble word chips eats their taps. Once the answer is checked those
     inputs are disabled, so there is nothing left to steal and swiping can
     carry the learner on — which is what removes the second tap per exercise. */
  const canSwipe = !exercise || practiceChecked;

  /* Arrow keys, for anyone on a keyboard. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showMenu || showGlossary || showExitConfirm) return;
      if (e.key === 'ArrowRight' && canSwipeForward) goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, canSwipeForward, showMenu, showGlossary, showExitConfirm]);

  /* All hooks are declared above — safe to bail out for a missing lesson now. */
  if (!content || !step) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-bg px-4">
        <p className="text-footnote text-label-2">Lesson content not found.</p>
      </div>
    );
  }

  const handleExit = () => {
    if (stepIndex > 0) setShowExitConfirm(true);
    else navigate(-1);
  };

  const deck = (
    <StepView
      step={step}
      lessonTitle={content.title}
      practiceAnswer={practiceAnswer}
      practiceChecked={practiceChecked}
      onPracticeSelect={(a) => !practiceChecked && setPracticeAnswer(a)}
    />
  );

  return (
    <div className="lesson-container flex min-h-[100dvh] flex-col overflow-x-hidden bg-bg">
      {/* A hairline of progress, and two floating glass circles. Nothing else
          competes with the card. */}
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
        onClick={handleExit}
        aria-label="Close lesson"
        className="glass pressable fixed left-4 z-30 flex h-10 w-10 items-center justify-center rounded-full text-label"
        style={{ top: 'calc(var(--safe-t) + 14px)' }}
      >
        <X className="h-[18px] w-[18px]" />
      </button>

      <button
        onClick={() => setShowMenu(true)}
        aria-label="Lesson options"
        className="glass pressable fixed right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full text-label"
        style={{ top: 'calc(var(--safe-t) + 14px)' }}
      >
        <MoreHorizontal className="h-[18px] w-[18px]" />
      </button>

      {/* The deck. px-4 keeps the drag surface off the screen edge, where iOS
          Safari would claim the gesture for back-navigation. */}
      <div className="flex-1 px-4 pb-4 pt-[calc(var(--safe-t)+68px)]">
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
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                drag={canSwipe ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD && canSwipeForward) goNext();
                  else if (info.offset.x > SWIPE_THRESHOLD && stepIndex > 0) goPrev();
                }}
                className={canSwipe ? 'cursor-grab active:cursor-grabbing' : ''}
              >
                {deck}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* A button appears ONLY where the lesson demands something. Passive steps
          get a quiet hint instead — except under reduced motion, where the
          gesture cannot be relied on and real controls are required. */}
      <div className="glass glass-bottom sticky bottom-0 z-10 flex-shrink-0 px-4 pt-3">
        <div className="mx-auto max-w-column">
          {exercise && !practiceChecked ? (
            <button
              onClick={() => practiceAnswer && setPracticeChecked(true)}
              disabled={!practiceAnswer}
              className={`pressable min-h-[52px] w-full rounded-xl py-4 text-body font-semibold ${
                practiceAnswer
                  ? 'bg-accent text-accent-ink'
                  : 'cursor-not-allowed bg-fill text-label-3'
              }`}
            >
              Check answer
            </button>
          ) : isLastStep ? (
            <button
              onClick={finish}
              className="pressable min-h-[52px] w-full rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink"
            >
              Finish lesson
            </button>
          ) : noMotion ? (
            <div className="flex gap-3">
              <button
                onClick={goPrev}
                disabled={stepIndex === 0}
                aria-label="Previous"
                className="flex min-h-[52px] w-14 items-center justify-center rounded-xl bg-fill text-label disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={goNext}
                className="pressable min-h-[52px] flex-1 rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink"
              >
                Next
              </button>
            </div>
          ) : (
            <p className="flex min-h-[52px] items-center justify-center gap-1.5 text-footnote text-label-3">
              Swipe to continue
              <ChevronRight className="h-4 w-4" />
            </p>
          )}
        </div>
      </div>

      {/* Feedback rises over the card rather than pushing it down. */}
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
          /* Swiping back exists, but it is invisible; this makes it findable. */
          onBackACard={
            stepIndex > 0
              ? () => {
                  setShowMenu(false);
                  goPrev();
                }
              : undefined
          }
          onGlossary={() => {
            setShowMenu(false);
            setShowGlossary(true);
          }}
          onWorksheet={() => navigate(`/worksheet/${lessonId}`)}
          onLeave={() => {
            setShowMenu(false);
            handleExit();
          }}
        />
      )}

      {showGlossary && <GlossarySheet onClose={() => setShowGlossary(false)} />}

      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="animate-fade-up w-full max-w-sm rounded-2xl bg-elevated p-6">
            <h3 className="mb-1.5 text-title3 font-semibold text-label">Leave this lesson?</h3>
            <p className="mb-5 text-footnote text-label-2">
              Your place is saved — you will come back to this card.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="pressable flex-1 rounded-xl bg-accent py-3 text-footnote font-semibold text-accent-ink"
              >
                Stay
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 rounded-xl bg-fill py-3 text-footnote font-semibold text-label-2"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Feedback helpers ───────────────────────────────────────────────────── */

/** Typed answers are self-graded, so there is no verdict to assert. */
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

/** A step is one screen: either a merged run of passive cards, or one exercise. */
function StepView({
  step,
  lessonTitle,
  practiceAnswer,
  practiceChecked,
  onPracticeSelect,
}: {
  step: { cards: FlowCard[]; exercise?: TeachingCard['exercise'] };
  lessonTitle: string;
  practiceAnswer: string | null;
  practiceChecked: boolean;
  onPracticeSelect: (a: string) => void;
}) {
  return (
    <div className="space-y-8">
      {step.cards.map((card, i) => (
        <RenderCard
          key={i}
          card={card}
          lessonTitle={lessonTitle}
          /* Only the first card of a merged step carries the lesson title, or
             it repeats three times down one screen. */
          showTitle={i === 0}
          practiceAnswer={practiceAnswer}
          practiceChecked={practiceChecked}
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
  onPracticeSelect,
}: {
  card: FlowCard;
  lessonTitle: string;
  showTitle: boolean;
  practiceAnswer: string | null;
  practiceChecked: boolean;
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
          onSelect={onPracticeSelect}
        />
      ) : null;

    case 'summary':
      return <SummaryCard card={card} />;

    default:
      return null;
  }
}

/** Small caps label above a card. One shape for every card role. */
function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-caption2 font-semibold uppercase tracking-wider text-label-3">
      {children}
    </p>
  );
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
    <div className="space-y-4">
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <CardLabel>
          {card.type === 'promise'
            ? "By lesson end, you'll:"
            : card.type === 'blueprint'
              ? 'Learn about:'
              : card.type === 'payoff'
                ? 'You can now:'
                : card.type === 'connect'
                  ? 'Picking up from last time:'
                  : card.type === 'predict'
                    ? 'Have a guess first:'
                    : 'In this lesson you will learn:'}
        </CardLabel>
        {showTitle && (
          <h1 className="mt-1.5 text-title1 font-semibold text-label">{lessonTitle}</h1>
        )}
      </motion.div>

      {card.prompt && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={card.prompt} />
        </motion.div>
      )}

      {/* The blueprint is drawn, not typeset. The content string still carries
          the old box-drawing art, so it is stripped here and replaced with real
          segments that highlight the slot this lesson fills — see Blueprint.tsx.
          It used to render in a monospace <pre> that overflowed a phone screen
          and cut the sentence beside it in half. */}
      {card.type === 'blueprint' && <Blueprint slot={card.blueprintSlot} />}

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={stripBoxArt(card.content)} />
        </motion.div>
      )}
    </div>
  );
}

/**
 * Body copy. Blank-line-separated paragraphs, single newlines preserved as
 * line breaks — matching how the lesson content is authored.
 */
function Prose({ text, className = '' }: { text: string; className?: string }) {
  const paragraphs = text.split('\n\n').filter((p) => p.trim().length > 0);
  return (
    <div className={`space-y-4 text-title3 text-label-2 ${className}`}>
      {paragraphs.map((para, i) => (
        <p key={i}>
          {para.split('\n').map((line, j, all) => (
            <span key={j}>
              <RichText text={line} />
              {j < all.length - 1 && <br />}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

/* ─── Vocab Card ─────────────────────────────────────────────────────────── */

function VocabCard({ words }: { words: VocabWord[] }) {
  return (
    <div className="space-y-4">
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <CardLabel>Vocabulary · {words.length} words</CardLabel>
        <p className="mt-1.5 text-title3 text-label-2">
          Words for this lesson. You will meet them again in the practice.
        </p>
      </motion.div>

      <motion.div
        custom={1}
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="list-group"
      >
        {words.map((w) => (
          <div
            key={w.rank}
            className="list-row flex items-baseline justify-between gap-3 px-4 py-3"
          >
            <div className="min-w-0">
              <Somali size="lg">{w.somali}</Somali>
              <p className="mt-0.5 text-footnote text-label-2">{w.english}</p>
            </div>
            <span className="flex-shrink-0 text-caption2 uppercase tracking-wider text-label-3">
              {w.pos}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Teach Card ─────────────────────────────────────────────────────────── */

function TeachCard({ card }: { card: TeachingCard }) {
  return (
    <div className="space-y-4">
      {card.title && (
        <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
          <CardLabel>{card.title}</CardLabel>
        </motion.div>
      )}

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={card.content} className="text-label" />
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
  onSelect,
}: {
  exercise: PracticeExercise;
  answer: string | null;
  checked: boolean;
  onSelect: (a: string) => void;
}) {
  return (
    <div className="space-y-5">
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <CardLabel>Practice</CardLabel>
        <p className="mt-1.5 text-title3 font-medium text-label">
          <RichText text={exercise.question} />
        </p>
        {/* A typed field on the exercise, so this is guaranteed Somali — safe
            to give the serif treatment. */}
        {exercise.somali && (
          <div className="mt-3 rounded-xl bg-elevated px-4 py-5 text-center">
            <Somali size="hero">{exercise.somali}</Somali>
          </div>
        )}
      </motion.div>

      {/* Answer input — exhaustive over ExerciseType (see AnswerInput.tsx).
          Keyed by exercise id, and it must stay keyed. AnswerInput holds the
          assembled word bank for an unscramble in its own state; without a key
          React reuses the instance across cards, so the words tapped on one
          card arrive already-placed on the next and its own chips render as
          spent. Check Answer then stays disabled forever — a softlock the
          learner can only escape via Reset. It went unnoticed until Lesson 8
          became the first lesson with two unscrambles in a row. */}
      <AnswerInput key={exercise.id} exercise={exercise} answer={answer} checked={checked} onSelect={onSelect} />

      {/* Typed answers are self-graded here. The unit test grades them instead,
          which is why its items are single words with one spelling. */}
      {(exercise.type === 'translate' || exercise.type === 'marker_identification') && (
        <p className="-mt-3 text-caption2 text-label-3">
          Type your best answer, then check — you grade yourself against the explanation.
        </p>
      )}

      <motion.div
        custom={2}
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="rounded-xl bg-fill p-4"
      >
        <CardLabel>Hint</CardLabel>
        <p className="mt-1 text-footnote text-label-2">
          <RichText text={exercise.hint} />
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Summary Card ───────────────────────────────────────────────────────── */

function SummaryCard({ card }: { card: TeachingCard }) {
  return (
    <div className="space-y-4">
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <CardLabel>Lesson complete</CardLabel>
        <h2 className="mt-1.5 text-title1 font-semibold text-label">{card.title}</h2>
      </motion.div>

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={card.content} />
        </motion.div>
      )}
    </div>
  );
}
