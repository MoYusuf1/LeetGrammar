/**
 * Lessons Page — grid of the built course lessons.
 *
 * Lists every card-based teaching lesson grouped by unit, linking to /lesson/:id.
 * Source of truth: src/data/authored-lessons.ts. Progress (completed + resume
 * position) comes from the progress store.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, Check, Circle, PlayCircle, FileText } from 'lucide-react';
import { LESSON_LIST, type LessonSummary } from '@/data/authored-lessons';
import { useProgressStore } from '@/stores/progress-store';

interface Phase {
  name: string;
  min: number;
  max: number;
}

/** Only phases whose lessons actually exist. Adding a phase here without
 *  building its lessons puts empty sections in the UI — don't. */
const PHASES: Phase[] = [
  { name: 'Unit 1: Foundations', min: 1, max: 4 },
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
            {totalLessons} lessons across {PHASES.length} {PHASES.length === 1 ? 'unit' : 'units'}.
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
          {grouped.map(({ phase, lessons }, phaseIdx) => (
            <section key={phase.name}>
              <h2 className="text-sm font-semibold text-[#eff1f6] mb-3">{phaseIdx + 1}. {phase.name}</h2>

              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <LessonRow
                    key={lesson.lessonId}
                    lesson={lesson}
                    completed={isCompleted(lesson.lessonId)}
                    resumeAt={resumeCard(lesson.lessonId)}
                    onClick={() => navigate(`/lesson/${lesson.lessonId}`)}
                    onWorksheet={() => navigate(`/worksheet/${lesson.lessonId}`)}
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
  completed,
  resumeAt,
  onClick,
  onWorksheet,
}: {
  lesson: LessonSummary;
  completed: boolean;
  resumeAt: number;
  onClick: () => void;
  onWorksheet: () => void;
}) {
  const inProgress = !completed && resumeAt > 0;
  return (
    <div className="w-full flex items-center gap-2">
      <button
        onClick={onClick}
        className="flex-1 min-w-0 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#141414] border border-[#ffffff08] hover:border-[#ffffff18] hover:bg-[#181818] transition-colors text-left"
      >
        <div className="flex-shrink-0">
          {completed ? (
            <span className="w-7 h-7 rounded-full flex items-center justify-center bg-[#ffa11622] border border-[#ffa11644]">
              <Check className="w-4 h-4 text-[#ffa116]" />
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

      <button
        onClick={onWorksheet}
        title="Open worksheet"
        aria-label={`Worksheet for lesson ${lesson.lessonId}`}
        className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#141414] border border-[#ffffff08] flex items-center justify-center text-[#8c8c8c] hover:text-[#ffa116] hover:border-[#ffffff18] transition-colors"
      >
        <FileText className="w-4 h-4" />
      </button>
    </div>
  );
}
