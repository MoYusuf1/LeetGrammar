/**
 * Quiz Page — interactive exercises generated from graph constructions.
 */

import { useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  BrainCircuit,
  RotateCcw,
  Trophy,
  ChevronRight,
  BookOpen,
  Target,
} from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import { generateQuiz, type QuizQuestion } from '@/engine/quiz-generator';
import { useHybridProgress } from '@/hooks/useHybridProgress';
import { useProgressStore } from '@/stores/progress-store';

export default function Quiz() {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { engine, chunks } = useGraphStore();
  const { completeLesson, lessons } = useHybridProgress();
  const reviewConcept = useProgressStore((s) => s.reviewConcept);

  const quiz = useMemo(() => {
    if (!conceptId) return null;
    return generateQuiz(engine, chunks, conceptId, 8);
  }, [engine, chunks, conceptId]);

  const lessonId = useMemo(() => {
    if (!conceptId) return 0;
    const lesson = lessons.find((l) => l.conceptId === conceptId);
    return lesson?.id ?? 0;
  }, [lessons, conceptId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { correct: boolean; selected: string }>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quiz?.questions[currentIndex];
  const totalQuestions = quiz?.questions.length ?? 0;
  const progress = totalQuestions > 0 ? ((currentIndex + (isRevealed ? 1 : 0)) / totalQuestions) * 100 : 0;

  const handleSelect = useCallback((answer: string) => {
    if (isRevealed) return;
    setSelectedAnswer(answer);
  }, [isRevealed]);

  const handleSubmit = useCallback(() => {
    if (!currentQuestion || !selectedAnswer) return;
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    if (correct) setScore((s) => s + 1);
    setAnswers((prev) => ({ ...prev, [currentIndex]: { correct, selected: selectedAnswer } }));
    setIsRevealed(true);
  }, [currentQuestion, selectedAnswer, currentIndex]);

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
    } else {
      setIsFinished(true);
      const finalScore = score + (answers[currentIndex]?.correct ? 0 : 1);
      if (lessonId > 0 && finalScore >= totalQuestions * 0.7) {
        completeLesson(lessonId);
      }
      // Update SRS with quiz performance (map percentage to 0-5 quality)
      if (conceptId) {
        const pct = finalScore / totalQuestions;
        const quality = pct >= 0.9 ? 5 : pct >= 0.7 ? 4 : pct >= 0.5 ? 3 : pct >= 0.3 ? 2 : pct >= 0.1 ? 1 : 0;
        reviewConcept(conceptId, quality);
      }
    }
  }, [currentIndex, totalQuestions, lessonId, score, answers, completeLesson]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsRevealed(false);
    setScore(0);
    setAnswers({});
    setIsFinished(false);
  }, []);

  if (!quiz || totalQuestions === 0) {
    return (
      <div className="min-h-full bg-[#0f0f0f] px-4 py-8">
        <div className="max-w-[640px] mx-auto text-center">
          <BrainCircuit size={48} className="text-[#3e3e3e] mx-auto mb-4" />
          <h1 className="text-xl font-bold text-[#eff1f6]">No quiz available</h1>
          <p className="text-sm text-[#8c8c8c] mt-2">
            This concept doesn't have enough data to generate questions yet.
          </p>
          <button
            onClick={() => conceptId && navigate(`/study/${conceptId}`)}
            className="mt-4 px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-sm font-semibold"
          >
            Back to Article
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-full bg-[#0f0f0f] px-4 py-8">
        <div className="max-w-[640px] mx-auto">
          <button
            onClick={() => conceptId && navigate(`/study/${conceptId}`)}
            className="flex items-center gap-1.5 text-[#8c8c8c] hover:text-[#eff1f6] transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span className="text-xs font-medium">Back to Article</span>
          </button>

          <div className="text-center mb-8">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${passed ? 'bg-[#22c55e]15' : 'bg-[#ef4444]15'}`}>
              <Trophy size={28} className={passed ? 'text-[#22c55e]' : 'text-[#ef4444]'} />
            </div>
            <h1 className="text-2xl font-bold text-[#eff1f6]">{percentage}%</h1>
            <p className="text-sm text-[#8c8c8c] mt-1">
              {score} / {totalQuestions} correct
            </p>
            {passed ? (
              <p className="text-sm text-[#22c55e] mt-2 font-medium">Great job! Concept mastered.</p>
            ) : (
              <p className="text-sm text-[#ef4444] mt-2 font-medium">Keep practicing! Review the article and try again.</p>
            )}
          </div>

          {/* Review */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Review</p>
            {quiz.questions.map((q, i) => {
              const answer = answers[i];
              if (!answer) return null;
              return (
                <div
                  key={q.id}
                  className={`rounded-xl border p-3.5 ${
                    answer.correct
                      ? 'bg-[#22c55e]08 border-[#22c55e]15'
                      : 'bg-[#ef4444]08 border-[#ef4444]15'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {answer.correct ? (
                      <CheckCircle2 size={14} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={14} className="text-[#ef4444] flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#c8c8c8]">{q.question}</p>
                      {!answer.correct && (
                        <p className="text-[10px] text-[#ef4444] mt-1">
                          Your answer: {answer.selected}
                        </p>
                      )}
                      <p className="text-[10px] text-[#8c8c8c] mt-1">
                        Correct: <span className="text-[#eff1f6]">{q.correctAnswer}</span>
                      </p>
                      <p className="text-[10px] text-[#5c5c5c] mt-1.5 leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleRestart}
              className="flex-1 h-12 rounded-xl bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#222222] transition-colors"
            >
              <RotateCcw size={15} />
              Retry
            </button>
            <button
              onClick={() => conceptId && navigate(`/study/${conceptId}`)}
              className="flex-1 h-12 rounded-xl bg-[#ffa116] text-[#0f0f0f] font-bold text-sm flex items-center justify-center gap-2"
            >
              <BookOpen size={15} />
              Review Article
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[640px] mx-auto">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => conceptId && navigate(`/study/${conceptId}`)}
              className="flex items-center gap-1.5 text-[#8c8c8c] hover:text-[#eff1f6] transition-colors"
            >
              <ArrowLeft size={14} />
              <span className="text-xs font-medium">Quit</span>
            </button>
            <span className="text-xs text-[#5c5c5c]">
              {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#ffa116] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="px-4 py-6">
        <div className="max-w-[640px] mx-auto">
          {currentQuestion && (
            <div className="space-y-6">
              {/* Question text */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={14} className="text-[#ffa116]" />
                  <span className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                    {currentQuestion.type.replace(/_/g, ' ')}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-[#eff1f6] leading-relaxed">
                  <QuestionText question={currentQuestion.question} />
                </h2>
              </div>

              {/* Answer area */}
              <div className="space-y-2.5">
                {currentQuestion.type === 'MATCHING' ? (
                  <MatchingQuestion
                    question={currentQuestion}
                    selected={selectedAnswer}
                    onSelect={handleSelect}
                    isRevealed={isRevealed}
                  />
                ) : currentQuestion.type === 'FILL_BLANK' ? (
                  <FillBlankQuestion
                    question={currentQuestion}
                    selected={selectedAnswer}
                    onSelect={handleSelect}
                    isRevealed={isRevealed}
                  />
                ) : (
                  <MultipleChoiceQuestion
                    question={currentQuestion}
                    selected={selectedAnswer}
                    onSelect={handleSelect}
                    isRevealed={isRevealed}
                  />
                )}
              </div>

              {/* Explanation (after reveal) */}
              {isRevealed && (
                <div
                  className={`rounded-xl border p-3.5 ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'bg-[#22c55e]08 border-[#22c55e]15'
                      : 'bg-[#ef4444]08 border-[#ef4444]15'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <CheckCircle2 size={14} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={14} className="text-[#ef4444] flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-semibold text-[#eff1f6]">
                        {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Not quite'}
                      </p>
                      <p className="text-xs text-[#8c8c8c] mt-1 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action button */}
              <button
                onClick={isRevealed ? handleNext : handleSubmit}
                disabled={!selectedAnswer}
                className="w-full h-12 rounded-xl bg-[#ffa116] text-[#0f0f0f] font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isRevealed ? (
                  <>
                    {currentIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
                    <ChevronRight size={16} />
                  </>
                ) : (
                  'Check Answer'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Question Components ─── */

function QuestionText({ question }: { question: string }) {
  // Render **bold** text
  const parts = question.split(/(\*\*.+?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-[#ffa116]">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function MultipleChoiceQuestion({
  question,
  selected,
  onSelect,
  isRevealed,
}: {
  question: QuizQuestion;
  selected: string | null;
  onSelect: (answer: string) => void;
  isRevealed: boolean;
}) {
  return (
    <>
      {question.options?.map((option) => {
        const isSelected = selected === option;
        const isCorrect = option === question.correctAnswer;
        let borderClass = 'border-[#ffffff08]';
        let bgClass = 'bg-[#141414]';
        let textClass = 'text-[#c8c8c8]';

        if (isRevealed) {
          if (isCorrect) {
            borderClass = 'border-[#22c55e]40';
            bgClass = 'bg-[#22c55e]08';
            textClass = 'text-[#22c55e]';
          } else if (isSelected) {
            borderClass = 'border-[#ef4444]40';
            bgClass = 'bg-[#ef4444]08';
            textClass = 'text-[#ef4444]';
          }
        } else if (isSelected) {
          borderClass = 'border-[#ffa116]50';
          bgClass = 'bg-[#ffa116]10';
          textClass = 'text-[#eff1f6]';
        }

        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            disabled={isRevealed}
            className={`w-full text-left p-3.5 rounded-xl border ${borderClass} ${bgClass} ${textClass} transition-all hover:border-[#ffffff15]`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'border-[#ffa116]' : 'border-[#3e3e3e]'
                }`}
              >
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[#ffa116]" />}
              </div>
              <span className="text-sm">{option}</span>
            </div>
          </button>
        );
      })}
    </>
  );
}

function FillBlankQuestion({
  question,
  selected,
  onSelect,
  isRevealed,
}: {
  question: QuizQuestion;
  selected: string | null;
  onSelect: (answer: string) => void;
  isRevealed: boolean;
}) {
  return <MultipleChoiceQuestion question={question} selected={selected} onSelect={onSelect} isRevealed={isRevealed} />;
}

function MatchingQuestion({
  question,
  selected,
  onSelect,
  isRevealed,
}: {
  question: QuizQuestion;
  selected: string | null;
  onSelect: (answer: string) => void;
  isRevealed: boolean;
}) {
  return <MultipleChoiceQuestion question={question} selected={selected} onSelect={onSelect} isRevealed={isRevealed} />;
}
