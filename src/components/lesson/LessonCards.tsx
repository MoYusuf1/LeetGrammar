/**
 * LessonCards — Card-based teaching engine.
 *
 * Teaches Somali grammar one card at a time:
 *   Intro → Teach cards → Practice cards → Summary
 *
 * Integrates with the existing progress store for:
 *   - Card position persistence (resume where you left off)
 *   - Lesson completion tracking
 *   - XP and streak updates
 *
 * Presentation is the warm-paper system (see src/index.css). Only styling
 * changed in the rewrite — the flow, the vocab-injection point, the AnswerInput
 * key and the motion fallback are all load-bearing and are unchanged. Read the
 * comments before touching any of them.
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookA } from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store';
import { getLessonContent } from '@/data/authored-lessons';
import type { Card as TeachingCard, PracticeExercise } from '@/data/types';
import { isAnswerCorrect, displayAnswer } from '@/lib/grading';
import { getVocabForLesson, type VocabWord } from '@/data/vocabulary';
import CardProgressDots from './CardProgressDots';
import AnswerInput from './AnswerInput';
import Somali from '@/components/Somali';
import RichText from '@/components/RichText';
import GlossarySheet from '@/components/GlossarySheet';
import { contentStagger } from './motion';
import { prefersNoMotion } from '@/lib/reduced-motion';


/* ─── Types ──────────────────────────────────────────────────────────────── */

interface LessonCardsProps {
  lessonId: number;
}

/** A vocab deck injected into the lesson flow (not part of the authored cards). */
interface VocabFlowCard {
  type: 'vocab';
  words: VocabWord[];
}

type FlowCard = TeachingCard | VocabFlowCard;

/* ─── Card Animation Variants ────────────────────────────────────────────── */

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function LessonCards({ lessonId }: LessonCardsProps) {
  const navigate = useNavigate();
  const progress = useProgressStore();
  const content = getLessonContent(lessonId);

  /* Local state. Resume position is read once from the store on mount; Lesson.tsx
     keys this component by lessonId, so switching lessons remounts and re-reads. */
  const [cardIndex, setCardIndex] = useState(
    () => useProgressStore.getState().getLessonCardPosition(lessonId),
  );
  const [direction, setDirection] = useState(1);
  const [completedCards, setCompletedCards] = useState<Set<number>>(() => {
    const pos = useProgressStore.getState().getLessonCardPosition(lessonId);
    return new Set(Array.from({ length: pos }, (_, i) => i));
  });
  const [practiceAnswer, setPracticeAnswer] = useState<string | null>(null);
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showGlossary, setShowGlossary] = useState(false);
  const [noMotion] = useState(prefersNoMotion);

  /* Persist position to the progress store. */
  useEffect(() => {
    useProgressStore.getState().setLessonCardPosition(lessonId, cardIndex);
  }, [cardIndex, lessonId]);

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

    const isRetrieval = (c: FlowCard) => Boolean((c as TeachingCard).exercise) || c.type === 'predict';
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

  const currentCard = cards[cardIndex];
  const isLastCard = cardIndex === cards.length - 1;

  /* ─── Navigation ───────────────────────────────────────────────────────── */

  const goNext = useCallback(() => {
    if (isLastCard) {
      /* Complete the lesson */
      progress.completeLesson(lessonId);
      progress.clearLessonCardPosition(lessonId);
      navigate('/learn');
      return;
    }
    setDirection(1);
    setCompletedCards((prev) => new Set(prev).add(cardIndex));
    setCardIndex((i) => i + 1);
    setPracticeAnswer(null);
    setPracticeChecked(false);
  }, [isLastCard, cardIndex, lessonId, navigate, progress]);

  const goToCard = useCallback((index: number) => {
    if (index >= cardIndex) return;
    setDirection(index < cardIndex ? -1 : 1);
    setCardIndex(index);
    setPracticeAnswer(null);
    setPracticeChecked(false);
  }, [cardIndex]);

  /* All hooks are declared above — safe to bail out for a missing lesson now. */
  if (!content) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-surface px-4">
        <p className="text-small text-ink-muted">Lesson content not found.</p>
      </div>
    );
  }

  /* ─── Practice handlers ────────────────────────────────────────────────── */

  const handlePracticeSelect = (answer: string) => {
    if (practiceChecked) return;
    setPracticeAnswer(answer);
  };

  const handlePracticeCheck = () => {
    if (!practiceAnswer) return;
    setPracticeChecked(true);
  };

  const handlePracticeContinue = () => {
    goNext();
  };

  /* ─── Exit ─────────────────────────────────────────────────────────────── */

  const handleExit = () => {
    if (completedCards.size > 0) {
      setShowExitConfirm(true);
    } else {
      navigate(-1);
    }
  };

  /* ─── Render ───────────────────────────────────────────────────────────── */

  return (
    <div className="lesson-container flex min-h-[100dvh] flex-col bg-surface">
      {/* Top bar */}
      <header className="sticky top-0 z-20 flex-shrink-0 border-b border-border bg-surface px-4 pt-safe-t">
        <div className="mx-auto flex max-w-column items-center gap-3 py-2.5">
          <button
            onClick={handleExit}
            aria-label="Close lesson"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-surface-sunken hover:text-ink"
          >
            <X className="h-[18px] w-[18px]" />
          </button>

          <div className="min-w-0 flex-1">
            <CardProgressDots
              total={cards.length}
              current={cardIndex}
              completed={completedCards}
              onDotClick={goToCard}
            />
          </div>

          <span className="flex-shrink-0 text-micro font-medium tabular-nums text-ink-faint">
            {cardIndex + 1}/{cards.length}
          </span>

          {/* The glossary lives here rather than in a nav, because the moment a
              learner wants it is the moment they are mid-lesson. */}
          <button
            onClick={() => setShowGlossary(true)}
            aria-label="Open glossary"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-surface-sunken hover:text-ink"
          >
            <BookA className="h-[18px] w-[18px]" />
          </button>
        </div>
      </header>

      {/* Card content */}
      <div className="flex-1 px-4 pb-4">
        <div className="mx-auto max-w-column">
          {/* With motion off the card renders directly. `AnimatePresence
              mode="wait"` holds the outgoing card until its exit animation
              finishes, and that animation needs requestAnimationFrame — which
              a hidden or headless browser never fires, leaving the counter
              advancing over frozen content. Correctness cannot depend on an
              animation completing. See lib/reduced-motion.ts. */}
          {noMotion ? (
            <RenderCard
              card={currentCard}
              lessonTitle={content.title}
              practiceAnswer={practiceAnswer}
              practiceChecked={practiceChecked}
              onPracticeSelect={handlePracticeSelect}
            />
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={cardIndex}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <RenderCard
                  card={currentCard}
                  lessonTitle={content.title}
                  practiceAnswer={practiceAnswer}
                  practiceChecked={practiceChecked}
                  onPracticeSelect={handlePracticeSelect}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Bottom action — in the thumb zone, clear of the home indicator. */}
      <div className="action-bar sticky bottom-0 z-10 flex-shrink-0 px-4 pt-3">
        <div className="mx-auto max-w-column">
          <BottomAction
            card={currentCard}
            isLastCard={isLastCard}
            practiceAnswer={practiceAnswer}
            practiceChecked={practiceChecked}
            onPrimary={goNext}
            onCheck={handlePracticeCheck}
            onContinue={handlePracticeContinue}
          />
        </div>
      </div>

      {showGlossary && <GlossarySheet onClose={() => setShowGlossary(false)} />}

      {/* Exit confirmation */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-raised animate-fade-in">
            <h3 className="mb-1.5 text-heading font-semibold text-ink">Leave this lesson?</h3>
            <p className="mb-5 text-small text-ink-muted">
              Your place is saved — you will come back to this card.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 rounded-xl bg-accent-strong py-3 text-small font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                Stay
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 rounded-xl border border-border-strong py-3 text-small font-semibold text-ink-muted transition-colors hover:bg-surface-sunken"
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

/* ─── Card Renderer ──────────────────────────────────────────────────────── */

function RenderCard({
  card,
  lessonTitle,
  practiceAnswer,
  practiceChecked,
  onPracticeSelect,
}: {
  card: FlowCard;
  lessonTitle: string;
  practiceAnswer: string | null;
  practiceChecked: boolean;
  onPracticeSelect: (a: string) => void;
}) {
  switch (card.type) {
    // Intro-like cards
    case 'blueprint':
    case 'connect':
    case 'promise':
    case 'payoff':
      return <IntroCard card={card} lessonTitle={lessonTitle} />;

    case 'vocab':
      return card.type === 'vocab' ? <VocabCard words={(card as VocabFlowCard).words} /> : null;

    // Teach cards
    case 'teach':
    case 'example':
      return <TeachCard card={card} />;

    // Practice cards
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

    // Predict card (also shows content/prompt)
    case 'predict':
      return <IntroCard card={card} lessonTitle={lessonTitle} />;

    default:
      return null;
  }
}

/** Small caps label above a card. One shape for every card role. */
function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-micro font-semibold uppercase tracking-wider text-ink-faint">
      {children}
    </p>
  );
}

/* ─── Intro Card ─────────────────────────────────────────────────────────── */

function IntroCard({ card, lessonTitle }: { card: TeachingCard; lessonTitle: string }) {
  return (
    <div className="space-y-5 pt-6">
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
        <h1 className="mt-1.5 text-title font-semibold text-ink">{lessonTitle}</h1>
      </motion.div>

      {card.prompt && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <p className="whitespace-pre-wrap text-lead text-ink-muted">
            <RichText text={card.prompt} />
          </p>
        </motion.div>
      )}

      {/* Blueprint diagrams are drawn with box characters and must stay
          monospaced — the alignment is the diagram. */}
      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <pre className="overflow-auto rounded-xl border border-border bg-card p-4 font-mono text-micro text-ink-muted">
            {card.content}
          </pre>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Vocab Card ─────────────────────────────────────────────────────────── */

function VocabCard({ words }: { words: VocabWord[] }) {
  return (
    <div className="space-y-5 pt-6">
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <CardLabel>Vocabulary · {words.length} words</CardLabel>
        <p className="mt-1.5 text-lead text-ink-muted">
          Words for this lesson. You will meet them again in the practice.
        </p>
      </motion.div>

      <motion.div
        custom={1}
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="overflow-hidden rounded-xl border border-border bg-card"
      >
        {words.map((w, i) => (
          <div
            key={w.rank}
            className={`flex items-baseline justify-between gap-3 px-4 py-3 ${
              i === 0 ? '' : 'border-t border-border'
            }`}
          >
            <div className="min-w-0">
              <Somali size="lg">{w.somali}</Somali>
              <p className="mt-0.5 text-small text-ink-muted">{w.english}</p>
            </div>
            <span className="flex-shrink-0 text-micro uppercase tracking-wider text-ink-faint">
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
    <div className="space-y-5 pt-6">
      {card.title && (
        <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
          <CardLabel>{card.title}</CardLabel>
        </motion.div>
      )}

      {card.content && (
        <motion.div
          custom={1}
          variants={contentStagger}
          initial="hidden"
          animate="visible"
          className="text-lead text-ink"
        >
          {card.content.split('\n\n').map((para, i) => (
            <p key={i} className="mb-4">
              {para.split('\n').map((line, j) => (
                <span key={j}>
                  <RichText text={line} />
                  <br />
                </span>
              ))}
            </p>
          ))}
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
    <div className="space-y-5 pt-6">
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <CardLabel>Practice</CardLabel>
        <p className="mt-1.5 text-lead font-medium text-ink">
          <RichText text={exercise.question} />
        </p>
        {/* A typed field on the exercise, so this is guaranteed Somali — safe
            to give the serif treatment. */}
        {exercise.somali && (
          <div className="mt-3 rounded-xl border border-border bg-card px-4 py-4 text-center">
            <Somali size="block">{exercise.somali}</Somali>
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
        <p className="-mt-3 text-micro text-ink-faint">
          Type your best answer, then check — you grade yourself against the explanation below.
        </p>
      )}

      <motion.div
        custom={2}
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="rounded-xl border border-border bg-surface-sunken p-4"
      >
        <CardLabel>Hint</CardLabel>
        <p className="mt-1 text-small text-ink-muted">
          <RichText text={exercise.hint} />
        </p>
      </motion.div>

      {checked && <PracticeFeedback exercise={exercise} answer={answer} />}
    </div>
  );
}

function PracticeFeedback({ exercise, answer }: { exercise: PracticeExercise; answer: string | null }) {
  const isCorrect = isAnswerCorrect(exercise, answer);
  const isSelfGraded = exercise.type === 'translate' || exercise.type === 'marker_identification';
  const positive = isCorrect || isSelfGraded;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-4 ${
        positive ? 'border-success-line bg-success-wash' : 'border-error-line bg-error-wash'
      }`}
    >
      <p className={`mb-1 text-small font-semibold ${positive ? 'text-success' : 'text-error'}`}>
        {isSelfGraded ? (
          <>
            Answer: <Somali tone="inherit">{displayAnswer(exercise)}</Somali>
          </>
        ) : isCorrect ? (
          'Correct'
        ) : (
          <>
            Not quite — the answer is{' '}
            <Somali tone="inherit">{displayAnswer(exercise)}</Somali>
          </>
        )}
      </p>
      <p className="text-small leading-relaxed text-ink">
        <RichText text={exercise.explanation} />
      </p>
    </motion.div>
  );
}


/* ─── Summary Card ───────────────────────────────────────────────────────── */

function SummaryCard({ card }: { card: TeachingCard }) {
  return (
    <div className="space-y-5 pt-6">
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <CardLabel>Lesson complete</CardLabel>
        <h2 className="mt-1.5 text-title font-semibold text-ink">{card.title}</h2>
      </motion.div>

      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <p className="whitespace-pre-wrap text-lead text-ink-muted">
            <RichText text={card.content} />
          </p>
        </motion.div>
      )}
    </div>
  );
}

/* ─── Bottom Action Button ───────────────────────────────────────────────── */

function BottomAction({
  card,
  isLastCard,
  practiceAnswer,
  practiceChecked,
  onPrimary,
  onCheck,
  onContinue,
}: {
  card: FlowCard;
  isLastCard: boolean;
  practiceAnswer: string | null;
  practiceChecked: boolean;
  onPrimary: () => void;
  onCheck: () => void;
  onContinue: () => void;
}) {
  /* Practice-role cards gate on Check/Continue; everything else just advances. */
  const cardType = card.type;
  const isPracticeCard =
    cardType === 'notice' || cardType === 'complete' || cardType === 'produce';

  const base =
    'tap-scale w-full rounded-xl py-4 text-body font-semibold transition-colors min-h-[52px]';

  if (!isPracticeCard) {
    return (
      <button
        onClick={onPrimary}
        className={`${base} bg-accent-strong text-white hover:bg-accent-hover`}
      >
        {isLastCard ? 'Finish lesson' : 'Got it'}
      </button>
    );
  }

  /* Practice cards: Check → Continue */
  if (!practiceChecked) {
    return (
      <button
        onClick={onCheck}
        disabled={!practiceAnswer}
        className={`${base} ${
          practiceAnswer
            ? 'bg-accent-strong text-white hover:bg-accent-hover'
            : 'cursor-not-allowed bg-surface-sunken text-ink-faint'
        }`}
      >
        Check answer
      </button>
    );
  }

  return (
    <button
      onClick={onContinue}
      className={`${base} bg-accent-strong text-white hover:bg-accent-hover`}
    >
      {isLastCard ? 'Finish lesson' : 'Continue'}
    </button>
  );
}
