/**
 * Lessons Page — Grid of all course lessons (the 26-module Somali grammar course).
 *
 * Lists every card-based teaching lesson grouped by course phase, linking to
 * /lesson/:id. Source of truth: src/data/teaching-content.ts (generated from
 * COURSE.md). Progress (completed + resume position) comes from the progress store.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, Check, Circle, PlayCircle } from 'lucide-react';
import { LESSON_LIST, type LessonSummary } from '@/data/teaching-content';
import { useProgressStore } from '@/stores/progress-store';

interface Phase {
  name: string;
  blurb: string;
  color: string;
  min: number;
  max: number;
}

const PHASES: Phase[] = [
  { name: 'Foundations & Phonetics', blurb: 'Sounds, nouns, articles, pronouns, adjectives', color: '#3b82f6', min: 1, max: 7 },
  { name: 'Core Verb System', blurb: 'Roots, tense, aspect, mood, voice, irregulars', color: '#8b5cf6', min: 8, max: 12 },
  { name: 'Sentence Structure & Grammar', blurb: 'Word order, clauses, negation, questions, morphology', color: '#06b6d4', min: 13, max: 21 },
  { name: 'Application & Integration', blurb: 'Vocabulary, communication, texts, register, review', color: '#22c55e', min: 22, max: 26 },
];

export default function LessonsPage() {
  const navigate = useNavigate();
  const store = useProgressStore();

  const grouped = useMemo(() => {
    return PHASES.map((phase) => ({
      phase,
      lessons: LESSON_LIST.filter((l) => l.lessonId >= phase.min && l.lessonId <= phase.max),
    }));
  }, []);

  const completed = (store.completedLessons as number[] | undefined) ?? [];
  const isCompleted = (id: number) => completed.includes(id);
  const resumeCard = (id: number): number =>
    store.getLessonCardPosition ? store.getLessonCardPosition(id) : 0;

  const totalLessons = LESSON_LIST.length;
  const doneCount = completed.filter((id) => id >= 1 && id <= totalLessons).length;

  return (
    <div className="h-full overflow-y-auto bg-[#0f0f0f]">
      <div className="max-w-[760px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-5 h-5 text-[#ffa116]" />
            <h1 className="text-xl font-bold text-[#eff1f6]">Lessons</h1>
          </div>
          <p className="text-sm text-[#8c8c8c]">
            The complete Somali grammar course — {totalLessons} lessons across 4 phases.
          </p>
          <div className="mt-3 h-1.5 rounded-full bg-[#1a1a1a] overflow-hidden">
            <div
              className="h-full bg-[#ffa116] transition-all"
              style={{ width: `${totalLessons ? (doneCount / totalLessons) * 100 : 0}%` }}
            />
          </div>
          <p className="text-[11px] text-[#5c5c5c] mt-1">{doneCount} of {totalLessons} complete</p>
        </div>

        {/* Phase groups */}
        <div className="space-y-7">
          {grouped.map(({ phase, lessons }) => (
            <section key={phase.name}>
              <div className="flex items-center gap-2 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: phase.color }} />
                <h2 className="text-sm font-semibold text-[#eff1f6]">{phase.name}</h2>
              </div>
              <p className="text-[11px] text-[#5c5c5c] mb-3 ml-[18px]">{phase.blurb}</p>

              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <LessonRow
                    key={lesson.lessonId}
                    lesson={lesson}
                    color={phase.color}
                    completed={isCompleted(lesson.lessonId)}
                    resumeAt={resumeCard(lesson.lessonId)}
                    onClick={() => navigate(`/lesson/${lesson.lessonId}`)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function LessonRow({
  lesson,
  color,
  completed,
  resumeAt,
  onClick,
}: {
  lesson: LessonSummary;
  color: string;
  completed: boolean;
  resumeAt: number;
  onClick: () => void;
}) {
  const inProgress = !completed && resumeAt > 0;
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#141414] border border-[#ffffff08] hover:border-[#ffffff18] hover:bg-[#181818] transition-colors text-left"
    >
      <div className="flex-shrink-0">
        {completed ? (
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: `${color}22`, border: `1px solid ${color}55` }}
          >
            <Check className="w-4 h-4" style={{ color }} />
          </span>
        ) : inProgress ? (
          <span className="w-7 h-7 rounded-full flex items-center justify-center bg-[#ffa11618] border border-[#ffa11644]">
            <PlayCircle className="w-4 h-4 text-[#ffa116]" />
          </span>
        ) : (
          <span className="w-7 h-7 rounded-full flex items-center justify-center bg-[#1f1f1f] border border-[#ffffff10]">
            <Circle className="w-3.5 h-3.5 text-[#5c5c5c]" />
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#eff1f6] truncate">
          <span className="text-[#5c5c5c] mr-1.5">{lesson.lessonId}.</span>
          {lesson.title}
        </p>
        <p className="text-[11px] text-[#5c5c5c]">
          {lesson.cardCount} cards{inProgress ? ` · resume at card ${resumeAt + 1}` : ''}
        </p>
      </div>
    </button>
  );
}
