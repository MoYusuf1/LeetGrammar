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

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MoreHorizontal, Lightbulb } from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store';
import { getLessonContent } from '@/data/authored-lessons';
import type { Card as TeachingCard, PracticeExercise } from '@/data/types';
import { displayAnswer, isAnswerCorrect, isSelfGraded, verdictOf } from '@/lib/grading';
import { getContextualVocabForLesson, type VocabWord } from '@/data/vocabulary';
import AnswerInput from './AnswerInput';
import { stripBoxArt } from './box-art';
import LessonMenu from './LessonMenu';
import LessonToolbar from './LessonToolbar';
import FeedbackSheet from './FeedbackSheet';
import Prose from './Prose';
import { buildSteps, stepForCard, isRetrieval, type FlowCard, type Step, type VocabFlowCard } from './steps';
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
  // Which blueprint boxes earlier lessons already filled. Derived from the
  // course, so it stays true as lessons are added or retagged.

  const [direction, setDirection] = useState(1);
  const [practiceAnswer, setPracticeAnswer] = useState<string | null>(null);
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [noMotion] = useState(prefersNoMotion);
  const stepScrollRef = useRef<HTMLDivElement>(null);

  /* ─── Repair + end-of-lesson retry ──────────────────────────────────────
     Two mechanisms, one source (Busuu's Mistake Repair; Knowt's rounds-to-
     mastery):
     • REPAIR. A missed exercise with a `repair` item swaps to that FRESH
       parallel item instead of offering the same one again — a retry on the
       item just failed is recognition of an answer just revealed.
     • RETRY ROUND. Every first-attempt miss is remembered; when the learner
       reaches the end of the authored lesson, the missed items come back
       once each, after the whole lesson as spacing. That is the retrieval
       that actually fixes them, and it is what separates "finished the
       cards" from "can still do it at the end". */
  const [servingRepair, setServingRepair] = useState(false);
  const [sessionMisses, setSessionMisses] = useState<string[]>([]);
  const [retrySteps, setRetrySteps] = useState<Step[]>([]);

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
    const words = getContextualVocabForLesson(lessonId);
    if (!content || words.length === 0) return base;
    const vocabCard: VocabFlowCard = { type: 'vocab', words, lessonTitle: content.title };

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
  const allSteps = useMemo(() => [...steps, ...retrySteps], [steps, retrySteps]);

  const [stepIndex, setStepIndex] = useState(() =>
    stepForCard(buildSteps(cards), useProgressStore.getState().getLessonCardPosition(lessonId)),
  );
  /** True once the learner is past the authored flow, in the retry round. */
  const inRetryRound = stepIndex >= steps.length;

  const step = allSteps[stepIndex];
  const isLastStep = stepIndex === allSteps.length - 1;
  const exercise = step?.exercise;
  /** The item actually on screen: the step's exercise, or its fresh repair
      after a miss. Repair items carry their own hint and explanation. */
  const activeExercise = servingRepair && exercise?.repair ? exercise.repair : exercise;

  /* Persist the card index this step starts at, not the step index. */
  useEffect(() => {
    const start = allSteps[stepIndex]?.startIndex ?? 0;
    useProgressStore.getState().setLessonCardPosition(lessonId, start);
  }, [stepIndex, allSteps, lessonId]);

  // Each step is a new page. A long vocabulary step can leave this internal
  // pane scrolled far below the top; reset it so the next card never opens as
  // an apparently blank screen.
  useEffect(() => {
    stepScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [stepIndex]);

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
    setServingRepair(false);
  };

  const goNext = useCallback(() => {
    if (isLastStep) {
      /* End of the authored flow: missed items come back once each before
         the lesson is allowed to end. Built here, not upfront, because the
         queue depends on what the learner missed. */
      if (sessionMisses.length > 0 && retrySteps.length === 0 && content) {
        const byId = new Map(
          content.cards.filter((c) => c.exercise).map((c) => [c.exercise!.id, c.exercise!]),
        );
        const base = cards.length;
        const intro: TeachingCard = {
          id: 'retry-intro',
          type: 'coach',
          title: 'Once more, from memory',
          content:
            'A few items slipped earlier. They come back now, once each — no hints this time unless you ask. This round is the one that makes them stay.',
        };
        const extra: Step[] = [{ cards: [intro], startIndex: base }];
        sessionMisses.forEach((id, k) => {
          const ex = byId.get(id);
          if (!ex) return;
          extra.push({
            cards: [{ id: `retry-${ex.id}`, type: 'produce', exercise: ex }],
            startIndex: base + 1 + k,
            exercise: ex,
          });
        });
        setRetrySteps(extra);
        setDirection(1);
        setStepIndex((i) => i + 1);
        resetStepState();
        return;
      }
      return finish();
    }
    setDirection(1);
    setStepIndex((i) => i + 1);
    resetStepState();
  }, [isLastStep, finish, sessionMisses, retrySteps.length, content, cards.length]);

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
      activeExercise={activeExercise}
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
        aria-valuemax={allSteps.length}
        aria-label={`Step ${stepIndex + 1} of ${allSteps.length}`}
      >
        <div
          className="h-full bg-accent transition-[width] duration-300"
          style={{ width: `${((stepIndex + 1) / allSteps.length) * 100}%` }}
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
      {/* Bottom padding clears the floating toolbar, which no longer occupies
          layout space now that it is fixed. */}
      <div ref={stepScrollRef} className="flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(6rem+var(--safe-b))] pt-[calc(var(--safe-t)+74px)]">
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
          activeExercise && !practiceChecked
            ? {
                label: 'Check',
                onClick: () => {
                  if (!practiceAnswer || !activeExercise) return;
                  const verdict = verdictOf(activeExercise, practiceAnswer);
                  progress.recordExerciseAttempt(activeExercise.id, verdict !== false);
                  /* A first-attempt miss on an authored exercise joins the
                     end-of-lesson retry round — including a miss that a
                     repair item later fixes, because one fresh success does
                     not undo the original slip. Retry-round items are not
                     re-queued (the round runs once). */
                  if (verdict === false && exercise && !inRetryRound) {
                    setSessionMisses((m) => (m.includes(exercise.id) ? m : [...m, exercise.id]));
                  }
                  setPracticeChecked(true);
                },
                disabled: !practiceAnswer,
              }
            : isLastStep
              ? { label: 'Finish', onClick: finish }
              : undefined
        }
      />

      {activeExercise && practiceChecked && (
        <FeedbackSheet
          correct={verdictOf(activeExercise, practiceAnswer)}
          heading={<FeedbackHeading exercise={activeExercise} answer={practiceAnswer} />}
          explanation={<RichText text={activeExercise.explanation} />}
          continueLabel={
            verdictOf(activeExercise, practiceAnswer) === false
              ? !servingRepair && !inRetryRound && exercise?.repair
                ? 'Try a fresh one'
                : 'Try again'
              : isLastStep
                ? 'Finish lesson'
                : 'Continue'
          }
          onContinue={
            verdictOf(activeExercise, practiceAnswer) === false
              ? !servingRepair && !inRetryRound && exercise?.repair
                ? () => {
                    resetStepState();
                    setServingRepair(true);
                  }
                : resetStepState
              : goNext
          }
        />
      )}

      {showMenu && (
        <LessonMenu
          onClose={() => setShowMenu(false)}
          onGlossary={() => {
            setShowMenu(false);
            setShowGlossary(true);
          }}
        />
      )}

      {showGlossary && <GlossarySheet onClose={() => setShowGlossary(false)} />}
    </div>
  );
}

/* ─── Feedback helpers ───────────────────────────────────────────────────── */

export function FeedbackHeading({
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
      Not quite. The answer is <Somali inherit>{displayAnswer(exercise)}</Somali>
    </>
  );
}

/* ─── Step Renderer ──────────────────────────────────────────────────────── */

function StepView({
  step,
  lessonTitle,
  activeExercise,
  practiceAnswer,
  practiceChecked,
  showHint,
  onPracticeSelect,
}: {
  step: { cards: FlowCard[]; exercise?: TeachingCard['exercise'] };
  lessonTitle: string;
  /** The item actually served: the step exercise, or its repair after a miss. */
  activeExercise?: TeachingCard['exercise'];
  practiceAnswer: string | null;
  practiceChecked: boolean;
  showHint: boolean;
  onPracticeSelect: (a: string) => void;
}) {
  return (
    <article className="lesson-article space-y-9">
      {step.cards.map((card, i) => (
        <RenderCard
          key={i}
          card={card}
          lessonTitle={lessonTitle}
          showTitle={i === 0}
          activeExercise={activeExercise}
          practiceAnswer={practiceAnswer}
          practiceChecked={practiceChecked}
          showHint={showHint}
          onPracticeSelect={onPracticeSelect}
        />
      ))}
    </article>
  );
}

function RenderCard({
  card,
  lessonTitle,
  showTitle,
  activeExercise,
  practiceAnswer,
  practiceChecked,
  showHint,
  onPracticeSelect,
}: {
  card: FlowCard;
  lessonTitle: string;
  showTitle: boolean;
  activeExercise?: TeachingCard['exercise'];
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
      return (
        <IntroCard
          card={card}
          lessonTitle={lessonTitle}
          showTitle={showTitle}
        />
      );

    case 'vocab':
      return <VocabCard words={(card as VocabFlowCard).words} lessonTitle={(card as VocabFlowCard).lessonTitle} />;

    case 'passage':
      return card.passage ? <PassageCard card={card} /> : null;

    case 'teach':
    case 'example':
      return <TeachCard card={card} />;

    case 'coach':
      return <CoachCard card={card} />;

    case 'notice':
    case 'complete':
    case 'produce': {
      /* After a miss the player serves the repair, and the repair must be what
         the learner SEES — grading against the fresh item while the original
         stays on screen is the regression this override fixes. */
      const served =
        card.exercise && activeExercise &&
        (activeExercise.id === card.exercise.id || card.exercise.repair?.id === activeExercise.id)
          ? activeExercise
          : card.exercise;
      return served ? (
        <PracticeCard
          exercise={served}
          answer={practiceAnswer}
          checked={practiceChecked}
          showHint={showHint}
          onSelect={onPracticeSelect}
        />
      ) : null;
    }

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

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={stripBoxArt(card.content)} />
        </motion.div>
      )}
    </div>
  );
}

/* ─── Vocab Card ─────────────────────────────────────────────────────────── */

function VocabCard({ words, lessonTitle }: { words: VocabWord[]; lessonTitle: string }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-caption uppercase tracking-wider text-label-3">Vocabulary in context</p>
        <h2 className="mt-1 text-title2 font-semibold text-label">Words used in {lessonTitle}</h2>
        <p className="mt-2 text-subhead text-label-2">These are the words this lesson uses to carry its pattern. Read them here, then meet them again in the examples and questions.</p>
      </div>
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
    </div>
  );
}

/* ─── Passage Card ─────────────────────────────────────────────────────── */

/**
 * A short, real text — the unit the whole lesson is built around.
 *
 * Glosses sit behind a tap, per line. That is LingQ's in-context help rather
 * than a parallel translation: the learner commits to the gist first (the
 * very next card asks for it), and help is available but costs a deliberate
 * action. Showing the English open would make every gist question answerable
 * without reading any Somali at all.
 */
function PassageCard({ card }: { card: TeachingCard }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const passage = card.passage!;
  return (
    <div className="space-y-5">
      <motion.p
        custom={0}
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="text-caption1 font-semibold uppercase tracking-[0.14em] text-label-3"
      >
        {passage.label}
      </motion.p>

      <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="list-group">
        {passage.lines.map((line, i) => {
          const shown = Boolean(revealed[i]);
          return (
            <div key={i} className="list-row px-4 py-4">
              <button
                onClick={() => setRevealed((r) => ({ ...r, [i]: !r[i] }))}
                aria-expanded={shown}
                aria-label={shown ? `Hide the meaning of line ${i + 1}` : `Show the meaning of line ${i + 1}`}
                className="w-full text-left"
              >
                <Somali size="lg">{line.somali}</Somali>
                {shown ? (
                  <p className="mt-1.5 text-subhead text-label-2">{line.gloss}</p>
                ) : (
                  <p className="mt-1.5 text-footnote text-label-3">Tap for the meaning</p>
                )}
                {shown && line.note && <p className="mt-1 text-footnote text-label-3">{line.note}</p>}
              </button>
            </div>
          );
        })}
      </motion.div>

      {card.content && (
        <motion.div custom={2} variants={contentStagger} initial="hidden" animate="visible">
          <Prose text={card.content} />
        </motion.div>
      )}
    </div>
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

/* ─── Learning move ─────────────────────────────────────────────────────── */

function CoachCard({ card }: { card: TeachingCard }) {
  return (
    <motion.aside
      custom={0}
      variants={contentStagger}
      initial="hidden"
      animate="visible"
      className="learning-move rounded-2xl border border-accent/20 bg-accent/[0.08] p-5 sm:p-6"
    >
      <p className="mb-2 text-caption1 font-semibold uppercase tracking-[0.14em] text-accent">
        Learning move
      </p>
      {card.title && <h2 className="text-title2 font-semibold text-label">{card.title}</h2>}
      {card.content && (
        <div className="mt-3">
          <Prose text={card.content} />
        </div>
      )}
    </motion.aside>
  );
}

/* ─── Practice Card ──────────────────────────────────────────────────────── */

export function PracticeCard({
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
          Type your best answer, then check: you grade yourself against the explanation.
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
