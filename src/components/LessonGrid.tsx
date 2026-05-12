/**
 * Lesson Grid — Replaces MockB_BabbelGrid with real graph lessons.
 *
 * Fetches lessons from Supabase, groups by textbook, renders a Babbel-style
 * vertical unit layout with lesson rows.
 */

import { useMemo } from "react";
import { useNavigate } from "react-router";
import { BookOpen, Check, Circle } from "lucide-react";
import { useGraphLessons } from "@/hooks/useGraphLessons";
import { useProgressStore } from "@/stores/progress-store";

const TEXTBOOK_LABELS: Record<string, string> = {
  "colloquial-somali-1995": "Colloquial Somali",
  "zorc-somali-textbook": "Somali Textbook (Zorc)",
  "zorc-iss-1990": "Somali Textbook (Zorc)",
};

const TEXTBOOK_COLORS: Record<string, string> = {
  "colloquial-somali-1995": "#3b82f6",
  "zorc-somali-textbook": "#22c55e",
  "zorc-iss-1990": "#22c55e",
};

function difficultyLabel(difficulty: number): string {
  if (difficulty <= 0.25) return "Beginner";
  if (difficulty <= 0.5) return "Intermediate";
  return "Advanced";
}

function difficultyColor(difficulty: number): string {
  if (difficulty <= 0.25) return "#00b8a3";
  if (difficulty <= 0.5) return "#ffc01e";
  return "#ff375f";
}

export default function LessonGrid() {
  const navigate = useNavigate();
  const { groupedLessons, loading, error, refetch } = useGraphLessons();
  const store = useProgressStore();

  const textbooks = useMemo(() => Object.keys(groupedLessons), [groupedLessons]);

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-8 w-48 bg-[#1a1a1a] rounded-lg animate-pulse" />
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-16 bg-[#141414] rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 space-y-3">
        <p className="text-sm text-[#ef4444]">Failed to load lessons</p>
        <p className="text-xs text-[#5c5c5c] max-w-md mx-auto whitespace-pre-line">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] text-xs text-[#eff1f6] hover:bg-[#222222] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (textbooks.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen size={40} className="text-[#3e3e3e] mx-auto mb-3" />
        <p className="text-sm text-[#8c8c8c]">No lessons available yet.</p>
        <p className="text-xs text-[#5c5c5c] mt-1">Check back soon — content is being digitized.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {textbooks.map((textbookId) => {
        const lessons = groupedLessons[textbookId];
        const color = TEXTBOOK_COLORS[textbookId] ?? "#8c8c8c";
        const label = TEXTBOOK_LABELS[textbookId] ?? textbookId;

        return (
          <div key={textbookId}>
            {/* Textbook header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${color}25 0%, ${color}10 100%)`,
                  border: `1px solid ${color}35`,
                }}
              >
                <BookOpen size={16} style={{ color }} />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[#eff1f6]">{label}</p>
                <span className="text-[10px] text-[#5c5c5c]">{lessons.length} lessons</span>
              </div>
            </div>

            {/* Lesson rows */}
            <div className="space-y-2">
              {lessons.map((lesson) => {
                const isCompleted = store.isGraphLessonCompleted(lesson.id);
                const diffLabel = difficultyLabel(lesson.difficulty);
                const diffColor = difficultyColor(lesson.difficulty);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => navigate(`/lesson/${encodeURIComponent(lesson.id)}`)}
                    className={`w-full flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all ${
                      isCompleted
                        ? "bg-[#ffa11608] border-[#ffa11640] hover:border-[#ffa11660]"
                        : "bg-[#141414] border-[#ffffff08] hover:border-[#ffffff15] hover:bg-[#1a1a1a]"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted ? "bg-[#ffa116]20" : "bg-[#1a1a1a] border border-[#ffffff08]"
                      }`}
                    >
                      {isCompleted ? (
                        <Check size={14} className="text-[#ffa116]" strokeWidth={3} />
                      ) : (
                        <Circle size={12} className="text-[#5c5c5c]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium truncate text-[#eff1f6]">{lesson.title}</p>
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                          style={{ color: diffColor, backgroundColor: diffColor + "15" }}
                        >
                          {diffLabel}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#5c5c5c]">
                        {lesson.chapter}
                        {lesson.page_range ? ` · Pages ${lesson.page_range}` : ""}
                        {lesson.estimated_minutes ? ` · ~${lesson.estimated_minutes} min` : ""}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
