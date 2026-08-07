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
import { X, Volume2, Check } from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store';
import { getLessonContent, type TeachingCard, type PracticeExercise } from '@/data/teaching-content';
import { getVocabForLesson, type VocabWord } from '@/data/vocabulary';
import CardProgressDots from './CardProgressDots';


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

const contentStagger = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: 'easeOut' as const },
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

  /* Persist position to the progress store. */
  useEffect(() => {
    useProgressStore.getState().setLessonCardPosition(lessonId, cardIndex);
  }, [cardIndex, lessonId]);

  /* Card flow = authored cards + an injected vocab deck placed right after the intro. */
  const cards: FlowCard[] = useMemo(() => {
    const base: FlowCard[] = content?.cards ?? [];
    const words = getVocabForLesson(lessonId);
    if (!content || words.length === 0) return base;
    const vocabCard: VocabFlowCard = { type: 'vocab', words };
    const insertAt = base[0]?.type === 'intro' ? 1 : 0;
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
    case 'intro':
      return <IntroCard card={card} lessonTitle={lessonTitle} />;
    case 'vocab':
      return <VocabCard words={card.words} />;
    case 'teach':
      return <TeachCard card={card} />;
    case 'practice':
      return (
        <PracticeCard
          exercise={card.exercise!}
          answer={practiceAnswer}
          checked={practiceChecked}
          onSelect={onPracticeSelect}
        />
      );
    case 'summary':
      return <SummaryCard card={card} />;
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
        <p className="text-sm text-[#8c8c8c] mt-1">In this lesson you will learn:</p>
      </motion.div>

      {/* Bullet points */}
      <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="space-y-2.5">
        {card.bullets?.map((bullet, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#ffa11615] border border-[#ffa11630] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-[#ffa116]">{i + 1}</span>
            </div>
            <p className="text-sm text-[#c8c8c8] leading-relaxed">{bullet}</p>
          </div>
        ))}
      </motion.div>

      {/* Cultural Note */}
      {card.culturalNote && (
        <motion.div
          custom={2}
          variants={contentStagger}
          initial="hidden"
          animate="visible"
          className="rounded-xl bg-[#a855f710] border border-[#a855f730] p-4"
        >
          <p className="text-[10px] font-bold text-[#a855f7] uppercase tracking-wider mb-1.5">Cultural Note</p>
          <p className="text-sm text-[#c8c8c8] leading-relaxed">{card.culturalNote}</p>
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
      {/* Concept Badge */}
      {card.conceptBadge && (
        <motion.div custom={0} variants={contentStagger} initial="hidden" animate="visible">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#ffa11615] border border-[#ffa11630] text-xs font-semibold text-[#ffa116]">
            {card.conceptBadge}
          </span>
        </motion.div>
      )}

      {/* Somali Text — large and prominent */}
      {card.somaliText && (
        <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
          <div className="bg-[#141414] border border-[#ffffff08] rounded-2xl p-6 text-center">
            <p className="text-3xl font-bold text-[#eff1f6] leading-relaxed tracking-wide">
              {card.somaliText}
            </p>
          </div>
        </motion.div>
      )}

      {/* English Translation */}
      {card.englishText && (
        <motion.p custom={2} variants={contentStagger} initial="hidden" animate="visible" className="text-base text-[#8c8c8c] text-center">
          {card.englishText}
        </motion.p>
      )}

      {/* Explanation */}
      {card.explanation && (
        <motion.div custom={3} variants={contentStagger} initial="hidden" animate="visible">
          <p className="text-sm text-[#c8c8c8] leading-relaxed">{card.explanation}</p>
        </motion.div>
      )}

      {/* Pronunciation Guide */}
      {card.pronunciation && (
        <motion.div
          custom={4}
          variants={contentStagger}
          initial="hidden"
          animate="visible"
          className="rounded-xl bg-[#8b949e10] border border-[#ffffff10] p-4"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Volume2 size={14} className="text-[#8b949e]" />
            <p className="text-[10px] font-bold text-[#8b949e] uppercase tracking-wider">Pronunciation</p>
          </div>
          <p className="text-sm text-[#c8c8c8]">{card.pronunciation}</p>
        </motion.div>
      )}

      {/* Examples */}
      {card.examples && card.examples.length > 0 && (
        <motion.div custom={5} variants={contentStagger} initial="hidden" animate="visible" className="space-y-3">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Examples</p>
          {card.examples.map((ex, i) => (
            <div key={i} className="bg-[#141414] border border-[#ffffff06] rounded-xl p-4">
              <p className="text-base font-medium text-[#eff1f6]">{ex.somali}</p>
              <p className="text-sm text-[#8c8c8c] mt-1">{ex.english}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Tip */}
      {card.tip && (
        <motion.div
          custom={6}
          variants={contentStagger}
          initial="hidden"
          animate="visible"
          className="rounded-xl bg-[#ffa11608] border border-[#ffa11625] p-4"
        >
          <div className="flex items-start gap-2.5">
            <span className="text-lg flex-shrink-0">💡</span>
            <p className="text-sm text-[#c8c8c8] leading-relaxed">{card.tip}</p>
          </div>
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
        <p className="text-lg font-medium text-[#eff1f6] leading-relaxed">{exercise.question}</p>
        {exercise.somali && (
          <div className="bg-[#141414] border border-[#ffffff08] rounded-xl p-4 mt-3">
            <p className="text-xl font-semibold text-[#eff1f6] font-mono">{exercise.somali}</p>
          </div>
        )}
      </motion.div>

      {/* Answer input — varies by exercise type */}
      {(exercise.type === 'multiple_choice' || exercise.type === 'fill_blank' || exercise.type === 'matching') && (
        <ChoiceExercise exercise={exercise} answer={answer} checked={checked} onSelect={onSelect} />
      )}
      {exercise.type === 'unscramble' && (
        <UnscrambleExercise exercise={exercise} answer={answer} checked={checked} onSelect={onSelect} />
      )}
      {(exercise.type === 'translate' || exercise.type === 'marker_identification') && (
        <FreeResponseExercise exercise={exercise} answer={answer} checked={checked} onSelect={onSelect} />
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
        <p className="text-sm text-[#8c8c8c]">{exercise.hint}</p>
      </motion.div>

      {/* Feedback (after check) */}
      {checked && <PracticeFeedback exercise={exercise} answer={answer} />}
    </div>
  );
}

/** Correctness check shared across exercise types that have a single canonical answer. */
/** Lowercase, trim, collapse whitespace, and drop trailing sentence punctuation —
 * so e.g. an unscramble built by tapping word chips ("Cali wuu cunay") matches an
 * authored answer with a trailing period ("Cali wuu cunay."). */
function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.?!]+$/, '');
}

function isAnswerCorrect(exercise: PracticeExercise, answer: string | null): boolean {
  if (answer === null) return false;
  if (exercise.type === 'multiple_choice' || exercise.type === 'fill_blank' || exercise.type === 'matching') {
    return answer === exercise.correctAnswer;
  }
  const target = Array.isArray(exercise.answer) ? exercise.answer[0] : exercise.answer;
  if (!target) return false;
  return normalizeAnswer(answer) === normalizeAnswer(target);
}

function displayAnswer(exercise: PracticeExercise): string {
  if (exercise.correctAnswer) return exercise.correctAnswer;
  if (Array.isArray(exercise.answer)) return exercise.answer.join(' · ');
  return exercise.answer ?? '';
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
      <p className="text-sm text-[#c8c8c8] leading-relaxed">{exercise.explanation}</p>
    </motion.div>
  );
}

/* ─── Choice Exercise (multiple_choice / fill_blank / matching) ─────────────── */

function ChoiceExercise({
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
  const isCorrect = checked && answer === exercise.correctAnswer;
  return (
    <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="space-y-2.5">
      {(exercise.options ?? []).map((option, i) => {
        const isSelected = answer === option;
        const isCorrectOption = checked && option === exercise.correctAnswer;
        const isWrongOption = checked && isSelected && !isCorrect;

        let borderColor = 'border-[#ffffff08]';
        let bgColor = 'bg-[#141414]';
        if (isCorrectOption) { borderColor = 'border-[#22c55e]'; bgColor = 'bg-[#22c55e15]'; }
        else if (isWrongOption) { borderColor = 'border-[#ef4444]'; bgColor = 'bg-[#ef444415]'; }
        else if (isSelected && !checked) { borderColor = 'border-[#ffa116]'; bgColor = 'bg-[#ffa11610]'; }

        return (
          <button
            key={i}
            onClick={() => onSelect(option)}
            disabled={checked}
            className={`w-full p-4 rounded-xl border ${borderColor} ${bgColor} text-left transition-all duration-200 ${
              checked ? 'cursor-default' : 'cursor-pointer hover:border-[#ffffff15] active:scale-[0.98]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                isCorrectOption
                  ? 'border-[#22c55e] bg-[#22c55e] text-[#0f0f0f]'
                  : isWrongOption
                  ? 'border-[#ef4444] bg-[#ef4444] text-[#0f0f0f]'
                  : isSelected
                  ? 'border-[#ffa116] text-[#ffa116]'
                  : 'border-[#ffffff15] text-[#5c5c5c]'
              }`}>
                {isCorrectOption ? '✓' : isWrongOption ? '✕' : String.fromCharCode(65 + i)}
              </span>
              <span className={`text-sm font-medium ${
                isCorrectOption ? 'text-[#22c55e]' : isWrongOption ? 'text-[#ef4444]' : 'text-[#eff1f6]'
              }`}>
                {option}
              </span>
            </div>
          </button>
        );
      })}
    </motion.div>
  );
}

/* ─── Unscramble Exercise ────────────────────────────────────────────────── */

function UnscrambleExercise({
  exercise,
  checked,
  onSelect,
}: {
  exercise: PracticeExercise;
  answer: string | null;
  checked: boolean;
  onSelect: (a: string) => void;
}) {
  const bank = exercise.words ?? [];
  const [placed, setPlaced] = useState<string[]>([]);
  const [used, setUsed] = useState<boolean[]>(() => bank.map(() => false));

  // Functional updates (not the closed-over `placed`/`used` values) so rapid
  // consecutive taps can't be dropped via stale closures; onSelect syncs from
  // the resulting state via effect rather than being computed in the handler.
  useEffect(() => {
    onSelect(placed.join(' '));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placed]);

  const tap = (word: string, i: number) => {
    if (checked) return;
    setUsed((prev) => (prev[i] ? prev : prev.map((u, idx) => (idx === i ? true : u))));
    setPlaced((prev) => (used[i] ? prev : [...prev, word]));
  };

  const reset = () => {
    if (checked) return;
    setPlaced([]);
    setUsed(bank.map(() => false));
  };

  return (
    <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="space-y-3">
      {/* Assembled sentence */}
      <div className="min-h-[52px] rounded-xl bg-[#141414] border border-[#ffffff08] p-3 flex flex-wrap gap-2 items-center">
        {placed.length === 0 ? (
          <span className="text-sm text-[#5c5c5c]">Tap words below in order…</span>
        ) : (
          placed.map((w, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-[#ffa11615] border border-[#ffa11630] text-sm font-medium text-[#eff1f6]">
              {w}
            </span>
          ))
        )}
      </div>

      {/* Word bank */}
      <div className="flex flex-wrap gap-2">
        {bank.map((word, i) => (
          <button
            key={i}
            onClick={() => tap(word, i)}
            disabled={checked || used[i]}
            className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
              used[i]
                ? 'opacity-30 border-[#ffffff08] bg-[#0f0f0f] text-[#5c5c5c] cursor-not-allowed'
                : 'border-[#ffffff15] bg-[#1a1a1a] text-[#eff1f6] hover:border-[#ffffff25] active:scale-[0.95]'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {!checked && placed.length > 0 && (
        <button onClick={reset} className="text-xs text-[#5c5c5c] hover:text-[#8c8c8c] transition-colors">
          Reset
        </button>
      )}
    </motion.div>
  );
}

/* ─── Free Response Exercise (translate / marker_identification) ────────────── */

function FreeResponseExercise({
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
    <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible">
      <input
        type="text"
        value={answer ?? ''}
        disabled={checked}
        onChange={(e) => onSelect(e.target.value)}
        placeholder={exercise.type === 'marker_identification' ? 'Type the marker…' : 'Type your answer in Somali…'}
        className="w-full p-4 rounded-xl bg-[#141414] border border-[#ffffff08] text-[#eff1f6] text-sm placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa11640]"
      />
      <p className="text-[10px] text-[#5c5c5c] mt-2">
        Type your best answer, then check — you grade yourself against the explanation below.
      </p>
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

      {/* Takeaways */}
      <motion.div custom={1} variants={contentStagger} initial="hidden" animate="visible" className="text-left space-y-3">
        {card.takeaways?.map((t, i) => (
          <div key={i} className="flex items-start gap-3 bg-[#141414] border border-[#ffffff06] rounded-xl p-4">
            <div className="w-5 h-5 rounded-full bg-[#22c55e15] border border-[#22c55e30] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={10} className="text-[#22c55e]" />
            </div>
            <p className="text-sm text-[#c8c8c8] leading-relaxed">{t}</p>
          </div>
        ))}
      </motion.div>
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
  /* Intro / Vocab / Teach / Summary cards: "Got it!" / "Continue" */
  if (card.type === 'intro' || card.type === 'vocab' || card.type === 'teach' || card.type === 'summary') {
    const label =
      card.type === 'intro' ? 'Start Learning' : isLastCard ? 'Complete Lesson' : 'Got it!';
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

  /* Practice card: Check / Continue flow */
  if (card.type === 'practice') {
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
