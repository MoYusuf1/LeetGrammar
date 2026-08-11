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
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store';
import { getLessonContent } from '@/data/authored-lessons';
import type { Card as TeachingCard, PracticeExercise } from '@/data/types';
import { isAnswerCorrect, displayAnswer } from '@/lib/grading';
import { getVocabForLesson, type VocabWord } from '@/data/vocabulary';
import CardProgressDots from './CardProgressDots';
import AnswerInput from './AnswerInput';
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

/* ─── Rich text ──────────────────────────────────────────────────────────── */

/**
 * Renders `**bold**` segments as <strong>, everything else as plain text.
 *
 * Authored lesson content uses `**` to mark the Somali form under discussion,
 * which is the single most important thing on the card. Without this the
 * learner reads literal asterisks. Deliberately not a full markdown parser —
 * `**` is the only markup the content uses, and text is never dangerously set.
 */
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
  const [noMotion] = useState(prefersNoMotion);

  /* Persist position to the progress store. */
  useEffect(() => {
    useProgressStore.getState().setLessonCardPosition(lessonId, cardIndex);
  }, [cardIndex, lessonId]);

  /* Card flow = authored cards + an injected vocab deck placed right after the blueprint/intro. */
  const cards: FlowCard[] = useMemo(() => {
    const base: FlowCard[] = content?.cards ?? [];
    const words = getVocabForLesson(lessonId);
    if (!content || words.length === 0) return base;
    const vocabCard: VocabFlowCard = { type: 'vocab', words };
    // Insert vocab card after the first card (blueprint in new structure, intro in old)
    const insertAt = base.length > 0 ? 1 : 0;
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
      <div className="min-h-full bg-[#0f0f0f] flex items-center justify-center px-4">
        <p className="text-[#8c8c8c] text-sm">Lesson content not found.</p>
      </div>
    );
  }

  /* ─── Swipe handlers ───────────────────────────────────────────────────── */

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
    <div className="h-full flex flex-col bg-[#0f0f0f]">
      {/* Top Bar */}
      <div className="flex-shrink-0 px-4 pt-3 pb-2">
        <div className="max-w-[600px] mx-auto flex items-center gap-3">
          <button
            onClick={handleExit}
            className="w-9 h-9 rounded-full bg-[#ffffff08] flex items-center justify-center hover:bg-[#ffffff15] transition-colors flex-shrink-0"
          >
            <X size={18} className="text-[#8c8c8c]" />
          </button>

          <div className="flex-1 min-w-0">
            <CardProgressDots
              total={cards.length}
              current={cardIndex}
              completed={completedCards}
              onDotClick={goToCard}
            />
          </div>

          <span className="text-xs text-[#5c5c5c] font-medium flex-shrink-0 tabular-nums">
            {cardIndex + 1}/{cards.length}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-4">
        <div className="max-w-[600px] mx-auto">
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

      {/* Bottom Action Bar */}
      <div className="flex-shrink-0 px-4 pb-5 pt-2 safe-bottom bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f] to-transparent">
        <div className="max-w-[600px] mx-auto">
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

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#141414] border border-[#ffffff10] rounded-2xl p-6 max-w-sm w-full"
          >
            <h3 className="text-base font-bold text-[#eff1f6] mb-2">Leave Lesson?</h3>
            <p className="text-sm text-[#8c8c8c] mb-5">
              Your progress is saved. You can resume where you left off.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#ffffff08] text-[#eff1f6] text-sm font-medium hover:bg-[#ffffff15] transition-colors"
              >
                Stay
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 py-2.5 rounded-xl bg-[#ef444420] text-[#ef4444] text-sm font-medium hover:bg-[#ef444430] transition-colors"
              >
                Leave
              </button>
            </div>
          </motion.div>
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

/* ─── Intro Card ─────────────────────────────────────────────────────────── */

function IntroCard({ card, lessonTitle }: { card: TeachingCard; lessonTitle: string }) {
  return (
    <div className="space-y-5 pt-4">
      {/* Title */}
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <h1 className="text-2xl font-bold text-[#eff1f6]">{lessonTitle}</h1>
        <p className="text-sm text-[#8c8c8c] mt-1">
          {card.type === 'promise'
            ? 'By lesson end, you\'ll:'
            : card.type === 'blueprint'
              ? 'Learn about:'
              : card.type === 'payoff'
                ? 'You can now:'
                : card.type === 'connect'
                  ? 'Picking up from last time:'
                  : 'In this lesson you will learn:'}
        </p>
      </motion.div>

      {/* Prompt/content (show as text) */}
      {card.prompt && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <p className="text-sm text-[#c8c8c8] leading-relaxed whitespace-pre-wrap"><RichText text={card.prompt} /></p>
        </motion.div>
      )}

      {/* Content (for blueprint ASCII diagrams or longer text) */}
      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <pre className="bg-[#141414] border border-[#ffffff08] rounded-xl p-4 text-xs text-[#c8c8c8] font-mono whitespace-pre-wrap overflow-auto">
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
    <div className="space-y-5 pt-4">
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#00b8a315] border border-[#00b8a330] text-xs font-semibold text-[#00b8a3]">
          Vocabulary · {words.length} words
        </span>
        <p className="text-sm text-[#8c8c8c] mt-3 leading-relaxed">
          Key high-frequency words for this lesson. You&apos;ll meet these again in the practice and worksheet.
        </p>
      </motion.div>

      <motion.div
        custom={1}
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
      >
        {words.map((w) => (
          <div key={w.rank} className="bg-[#141414] border border-[#ffffff08] rounded-xl p-3.5">
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-base font-semibold text-[#eff1f6] font-mono">{w.somali}</p>
              <span className="text-[9px] uppercase tracking-wider text-[#5c5c5c] flex-shrink-0">{w.pos}</span>
            </div>
            <p className="text-sm text-[#8c8c8c] mt-0.5">{w.english}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Teach Card ─────────────────────────────────────────────────────────── */

function TeachCard({ card }: { card: TeachingCard }) {
  return (
    <div className="space-y-5 pt-4">
      {/* Title / Badge */}
      {card.title && (
        <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffa11615] border border-[#ffa11630] text-xs font-semibold text-[#ffa116]">
            {card.title}
          </span>
        </motion.div>
      )}

      {/* Content — formatted text (markdown-style) */}
      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="text-sm text-[#c8c8c8] leading-relaxed whitespace-pre-wrap">
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
    <div className="space-y-5 pt-4">
      {/* Question */}
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#3b82f615] border border-[#3b82f630] text-[10px] font-bold text-[#3b82f6] uppercase tracking-wider mb-3">
          Practice
        </span>
        <p className="text-lg font-medium text-[#eff1f6] leading-relaxed"><RichText text={exercise.question} /></p>
        {exercise.somali && (
          <div className="bg-[#141414] border border-[#ffffff08] rounded-xl p-4 mt-3">
            <p className="text-xl font-semibold text-[#eff1f6] font-mono">{exercise.somali}</p>
          </div>
        )}
      </motion.div>

      {/* Answer input — exhaustive over ExerciseType (see AnswerInput.tsx) */}
      <AnswerInput exercise={exercise} answer={answer} checked={checked} onSelect={onSelect} />

      {/* Typed answers are self-graded here. The unit test grades them instead,
          which is why its items are single words with one spelling. */}
      {(exercise.type === 'translate' || exercise.type === 'marker_identification') && (
        <p className="text-[10px] text-[#5c5c5c] -mt-3">
          Type your best answer, then check — you grade yourself against the explanation below.
        </p>
      )}

      {/* Hint (always visible) */}
      <motion.div
        custom={2}
        variants={contentStagger}
        initial="hidden"
        animate="visible"
        className="rounded-xl bg-[#22d3ee08] border border-[#22d3ee20] p-4"
      >
        <p className="text-[10px] font-bold text-[#22d3ee] uppercase tracking-wider mb-1">Hint</p>
        <p className="text-sm text-[#8c8c8c]"><RichText text={exercise.hint} /></p>
      </motion.div>

      {/* Feedback (after check) */}
      {checked && <PracticeFeedback exercise={exercise} answer={answer} />}
    </div>
  );
}

function PracticeFeedback({ exercise, answer }: { exercise: PracticeExercise; answer: string | null }) {
  const isCorrect = isAnswerCorrect(exercise, answer);
  const isSelfGraded = exercise.type === 'translate' || exercise.type === 'marker_identification';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-4 ${
        isCorrect || isSelfGraded
          ? 'bg-[#22c55e10] border-[#22c55e30]'
          : 'bg-[#ef444410] border-[#ef444430]'
      }`}
    >
      <p className={`text-sm font-bold mb-1 ${isCorrect || isSelfGraded ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
        {isSelfGraded
          ? `Answer: ${displayAnswer(exercise)}`
          : isCorrect
          ? 'Correct! Great job!'
          : `Not quite! The answer is: ${displayAnswer(exercise)}`}
      </p>
      <p className="text-sm text-[#c8c8c8] leading-relaxed"><RichText text={exercise.explanation} /></p>
    </motion.div>
  );
}


/* ─── Summary Card ───────────────────────────────────────────────────────── */

function SummaryCard({ card }: { card: TeachingCard }) {
  return (
    <div className="space-y-5 pt-4 text-center">
      {/* Celebration */}
      <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
        <div className="w-16 h-16 rounded-full bg-[#22c55e15] border border-[#22c55e30] flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-xl font-bold text-[#eff1f6]">{card.title}</h2>
      </motion.div>

      {/* Content summary */}
      {card.content && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="text-left">
          <p className="text-sm text-[#c8c8c8] leading-relaxed whitespace-pre-wrap"><RichText text={card.content} /></p>
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

  if (!isPracticeCard) {
    const label = isLastCard ? 'Complete Lesson' : 'Got it!';
    const bgColor = isLastCard ? 'bg-[#22c55e] hover:bg-[#22c55ed0]' : 'bg-[#ffa116] hover:bg-[#ffa116d0]';

    return (
      <button
        onClick={onPrimary}
        className={`w-full py-3.5 rounded-2xl text-sm font-bold text-[#0f0f0f] transition-all active:scale-[0.98] touch-target ${bgColor}`}
      >
        {label}
      </button>
    );
  }

  /* Practice cards: Check → Continue */
  {
    if (!practiceChecked) {
      return (
        <button
          onClick={onCheck}
          disabled={!practiceAnswer}
          className={`w-full py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-[0.98] touch-target ${
            practiceAnswer
              ? 'bg-[#3b82f6] hover:bg-[#3b82f6d0] text-white'
              : 'bg-[#ffffff08] text-[#5c5c5c] cursor-not-allowed'
          }`}
        >
          Check Answer
        </button>
      );
    }

    return (
      <button
        onClick={onContinue}
        className="w-full py-3.5 rounded-2xl text-sm font-bold text-[#0f0f0f] bg-[#22c55e] hover:bg-[#22c55ed0] transition-all active:scale-[0.98] touch-target"
      >
        {isLastCard ? 'Complete Lesson' : 'Continue'}
      </button>
    );
  }

  return null;
}
