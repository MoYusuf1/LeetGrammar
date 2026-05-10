import { useNavigate } from 'react-router';
import { Check, Sparkles, ChevronRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { allProblems } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';
import type { RoadmapTopic } from '@/types';

interface TopicDialogProps {
  topic: RoadmapTopic | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TopicDialog({ topic, open, onOpenChange }: TopicDialogProps) {
  const navigate = useNavigate();
  const { getLessonStatus, getTopicProgress } = useProgress();

  if (!topic) return null;

  const lessons = topic.lessonIds
    .map((id) => allProblems.find((p) => p.id === id))
    .filter(Boolean);

  const { completed, total } = getTopicProgress(topic.lessonIds);
  const progressPct = Math.round((completed / total) * 100);

  // Find first non-completed lesson for "Continue" button
  const nextLesson = lessons.find((l) => {
    if (!l) return false;
    return getLessonStatus(l.id) !== 'completed';
  }) ?? lessons[0];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-[#0f0f0f] border-l border-[#ffffff10] p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="p-6 pb-4 border-b border-[#ffffff10]">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: topic.color }}
            />
            <SheetTitle className="text-lg font-semibold text-[#eff1f6]">
              {topic.title}
            </SheetTitle>
          </div>
          <SheetDescription className="text-sm text-[#8c8c8c] leading-relaxed">
            {topic.description}
          </SheetDescription>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-[#8c8c8c]">Progress</span>
              <span className="text-[#eff1f6] font-medium">{completed}/{total}</span>
            </div>
            <div className="h-1.5 bg-[#282828] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: topic.color,
                }}
              />
            </div>
          </div>
        </SheetHeader>

        {/* Lesson List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          <div className="px-2 mb-2">
            <span className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">{lessons.length} Lessons</span>
          </div>
          {lessons.map((lesson) => {
            if (!lesson) return null;
            const status = getLessonStatus(lesson.id);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';

            return (
              <button
                key={lesson.id}
                onClick={() => {
                  onOpenChange(false);
                  navigate(`/lesson/${lesson.id}`);
                }}
                className={`w-full text-left rounded-lg border transition-all duration-150 group cursor-pointer
                  border-[#ffffff08] bg-[#141414] hover:border-[#ffffff18] hover:bg-[#1c1c1c] hover:shadow-sm
                  ${isCurrent ? 'ring-1 ring-[#ffa11630]' : ''}
                `}
              >
                <div className="flex items-center gap-3 px-4 py-3">
                  {/* Status icon */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: isCompleted
                        ? `${topic.color}20`
                        : isCurrent
                        ? 'rgba(255, 161, 22, 0.12)'
                        : '#1a1a1a',
                      border: `1.5px solid ${
                        isCompleted ? topic.color : isCurrent ? '#ffa116' : '#282828'
                      }`,
                    }}
                  >
                    {isCompleted && <Check size={12} style={{ color: topic.color }} strokeWidth={3} />}
                    {isCurrent && <Sparkles size={12} className="text-[#ffa116]" />}
                    {!isCompleted && !isCurrent && <span className="text-[10px] text-[#5c5c5c]">○</span>}
                  </div>

                  {/* Number + Title */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-[#5c5c5c]">{String(lesson.id).padStart(2, '0')}</span>
                      <span className="text-sm font-medium truncate text-[#eff1f6]">
                        {lesson.title}
                      </span>
                    </div>
                  </div>

                  {/* Difficulty badge */}
                  <span
                    className="text-[10px] font-medium px-1.5 py-0.5 rounded flex-shrink-0"
                    style={{
                      color:
                        lesson.difficulty === 'Beginner'
                          ? '#00b8a3'
                          : lesson.difficulty === 'Intermediate'
                          ? '#ffc01e'
                          : '#ff375f',
                      backgroundColor:
                        lesson.difficulty === 'Beginner'
                          ? 'rgba(0, 184, 163, 0.1)'
                          : lesson.difficulty === 'Intermediate'
                          ? 'rgba(255, 192, 30, 0.1)'
                          : 'rgba(255, 55, 95, 0.1)',
                    }}
                  >
                    {lesson.difficulty[0]}
                  </span>

                  <ChevronRight size={14} className="text-[#3e3e3e] group-hover:text-[#8c8c8c] flex-shrink-0 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <SheetFooter className="p-4 border-t border-[#ffffff10]">
          <button
            onClick={() => {
              if (nextLesson) {
                onOpenChange(false);
                navigate(`/lesson/${nextLesson.id}`);
              }
            }}
            className="w-full py-2.5 rounded-lg font-medium text-sm transition-colors text-[#0f0f0f] hover:opacity-90"
            style={{ backgroundColor: topic.color }}
          >
            {completed === total
              ? 'Review Lessons'
              : completed > 0
              ? 'Continue Learning'
              : 'Start Learning'}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
