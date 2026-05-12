/**
 * Lesson Page — renders a full pedagogical lesson from graph_lessons.
 *
 * Fetches lesson metadata, ordered chunks, exercises, and concept links.
 */

import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Clock,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { useLesson } from "@/hooks/useGraphLessons";
import { useProgressStore } from "@/stores/progress-store";
import { getExerciseItems } from "@/lib/supabase/lesson-queries";
import { useState, useEffect } from "react";
import LessonContent from "@/components/LessonContent";
import type { ExerciseItem } from "@/lib/supabase/lesson-types";

export default function Lesson() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lessonId = id ? decodeURIComponent(id) : undefined;
  const { lessonView, loading, error } = useLesson(lessonId);
  const store = useProgressStore();
  const isCompleted = lessonId ? store.isGraphLessonCompleted(lessonId) : false;

  if (loading) {
    return (
      <div className="min-h-full bg-[#0f0f0f] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !lessonView) {
    return (
      <div className="min-h-full bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="text-center">
          <BookOpen size={40} className="text-[#3e3e3e] mx-auto mb-3" />
          <h1 className="text-lg font-bold text-[#eff1f6]">Lesson not found</h1>
          <p className="text-sm text-[#8c8c8c] mt-1">
            {error ?? "This lesson doesn't exist or hasn't been digitized yet."}
          </p>
          <button
            onClick={() => navigate("/learn")}
            className="mt-4 px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-sm font-semibold"
          >
            Back to Learn
          </button>
        </div>
      </div>
    );
  }

  const { lesson, sections, vocabulary, exercises } = lessonView;

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      <div className="max-w-[720px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/learn")}
            className="p-2 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] hover:bg-[#222222] transition-colors"
          >
            <ArrowLeft size={16} className="text-[#8c8c8c]" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-[#5c5c5c] uppercase tracking-wider">
              {lesson.textbook_id}
            </p>
            <h1 className="text-lg font-bold text-[#eff1f6] truncate">{lesson.title}</h1>
          </div>
          <button
            onClick={() => lessonId && store.completeGraphLesson(lessonId)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              isCompleted
                ? "bg-[#ffa11620] text-[#ffa116] border border-[#ffa11640]"
                : "bg-[#1a1a1a] border border-[#ffffff08] text-[#8c8c8c] hover:text-[#eff1f6]"
            }`}
          >
            <Check size={14} />
            {isCompleted ? "Completed" : "Mark Done"}
          </button>
        </div>

        {/* Meta bar */}
        <div className="flex items-center gap-4 mb-6 text-[10px] text-[#5c5c5c]">
          <span className="flex items-center gap-1">
            <BookOpen size={12} />
            {lesson.chapter}
          </span>
          {lesson.page_range && (
            <span className="flex items-center gap-1">
              <GraduationCap size={12} />
              Pages {lesson.page_range}
            </span>
          )}
          {lesson.estimated_minutes && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              ~{lesson.estimated_minutes} min
            </span>
          )}
        </div>

        {/* Sections */}
        <div className="space-y-4 mb-8">
          {sections.map((section) => (
            <LessonContent
              key={section.chunk.cid}
              chunk={section.chunk}
              title={section.title}
            />
          ))}
        </div>

        {/* Vocabulary */}
        {vocabulary.length > 0 && (
          <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#22c55e] mb-3">
              Vocabulary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vocabulary.map((word) => (
                <div
                  key={word.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#1a1a1a]"
                >
                  <span className="text-sm font-medium text-[#eff1f6]">
                    {word.label_default}
                  </span>
                  <span className="text-xs text-[#8c8c8c]">{word.label_english}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exercises */}
        {exercises.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#ef4444] mb-3">
              Exercises
            </h3>
            <div className="space-y-2">
              {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-[#ffffff08]">
          {lesson.previous_lesson ? (
            <button
              onClick={() => navigate(`/lesson/${encodeURIComponent(lesson.previous_lesson)}`)}
              className="flex items-center gap-2 text-sm text-[#8c8c8c] hover:text-[#eff1f6] transition-colors"
            >
              <ArrowLeft size={14} />
              Previous
            </button>
          ) : (
            <div />
          )}
          {lesson.next_lesson ? (
            <button
              onClick={() => navigate(`/lesson/${encodeURIComponent(lesson.next_lesson)}`)}
              className="flex items-center gap-2 text-sm text-[#8c8c8c] hover:text-[#eff1f6] transition-colors"
            >
              Next
              <ArrowRight size={14} />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: { id: string; title: string; instruction: string | null; difficulty: number } }) {
  const [items, setItems] = useState<ExerciseItem[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    getExerciseItems(exercise.id).then(setItems).catch(() => setItems([]));
  }, [expanded, exercise.id]);

  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] overflow-hidden">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between p-3.5 text-left hover:bg-[#1a1a1a] transition-colors"
      >
        <div>
          <p className="text-sm font-medium text-[#eff1f6]">{exercise.title}</p>
          {exercise.instruction && (
            <p className="text-[10px] text-[#5c5c5c] mt-0.5">{exercise.instruction}</p>
          )}
        </div>
        <ChevronRight
          size={14}
          className={`text-[#3e3e3e] transition-transform ${expanded ? "rotate-90" : ""}`}
        />
      </button>
      {expanded && (
        <div className="px-3.5 pb-3.5 space-y-2">
          {items.length === 0 ? (
            <p className="text-xs text-[#5c5c5c]">Loading exercises...</p>
          ) : (
            items.map((item, i) => (
              <div key={item.id} className="p-2.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff06]">
                <div className="flex items-start gap-2">
                  <span className="text-[10px] font-bold text-[#5c5c5c] flex-shrink-0 mt-0.5">
                    {i + 1}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#eff1f6]">{item.prompt}</p>
                    {item.answer && (
                      <p className="text-xs text-[#8c8c8c] mt-1">Answer: {item.answer}</p>
                    )}
                    {item.hint && (
                      <p className="text-[10px] text-[#5c5c5c] mt-1">Hint: {item.hint}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
