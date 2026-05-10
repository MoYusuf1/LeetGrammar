/**
 * Learn Page — Lessons Tab (Babbel-style Grid)
 *
 * Clean vertical sections per unit. Each lesson is a wide horizontal card.
 * All lessons are unlocked. Completed lessons show a green checkmark.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  Check,
  Zap,
  BookOpen,
  Clock,
  Circle,
} from 'lucide-react';
import { useHybridProgress } from '@/hooks/useHybridProgress';
import { useGraphStore } from '@/stores/graph-store';
import { useGraphSrs } from '@/hooks/useGraphSrs';
import { useGraphInit } from '@/hooks/useGraphInit';

function useLessonData() {
  const { lessons, units, getLessonStatus, hasGraphContent } = useHybridProgress();
  const { engine } = useGraphStore();
  const { states } = useGraphSrs();

  const totalLessons = lessons.length;
  const completedCount = lessons.filter((l) => getLessonStatus(l.id) === 'completed').length;
  const currentLesson = lessons.find((l) => getLessonStatus(l.id) === 'current');

  const masteryMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const [conceptId, state] of states.entries()) {
      map.set(conceptId, state.mastery);
    }
    return map;
  }, [states]);

  return { lessons, units, getLessonStatus, hasGraphContent, engine, totalLessons, completedCount, currentLesson, masteryMap };
}

export function MockB_BabbelGrid() {
  useGraphInit();
  const navigate = useNavigate();
  const { lessons, units, getLessonStatus, totalLessons, completedCount, currentLesson } = useLessonData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-[#8c8c8c]">{completedCount} / {totalLessons} completed</p>
          <div className="h-2 w-40 bg-[#1a1a1a] rounded-full overflow-hidden mt-2">
            <div className="h-full rounded-full bg-[#ffa116] transition-all" style={{ width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%` }} />
          </div>
        </div>
        {currentLesson && (
          <button
            onClick={() => navigate(`/lesson/${currentLesson.id}`)}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ffa116] text-[#0f0f0f] text-xs font-bold hover:bg-[#ffb800] transition-colors"
          >
            <Zap size={13} /> Continue
          </button>
        )}
      </div>

      {/* Units */}
      <div className="space-y-6">
        {units.map((unit) => {
          const unitLessons = lessons.filter((l) => l.unitId === unit.unitId);
          const unitCompleted = unitLessons.filter((l) => getLessonStatus(l.id) === 'completed').length;

          return (
            <div key={unit.unitId}>
              {/* Unit header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${unit.color}25 0%, ${unit.color}10 100%)`,
                      border: `1px solid ${unit.color}35`,
                    }}
                  >
                    <BookOpen size={16} style={{ color: unit.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#eff1f6]">{unit.title}</p>
                    <p className="text-[10px] text-[#8c8c8c]">{unitCompleted}/{unitLessons.length} lessons</p>
                  </div>
                </div>
                <div className="h-1.5 w-20 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${unitLessons.length > 0 ? (unitCompleted / unitLessons.length) * 100 : 0}%`, backgroundColor: unit.color }} />
                </div>
              </div>

              {/* Lesson rows */}
              <div className="space-y-2">
                {unitLessons.map((lesson) => {
                  const status = getLessonStatus(lesson.id);
                  const isCompleted = status === 'completed';
                  const diffColor = lesson.difficulty === 'Beginner' ? '#00b8a3' : lesson.difficulty === 'Intermediate' ? '#ffc01e' : '#ff375f';

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => navigate(`/lesson/${lesson.id}`)}
                      className={`w-full flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all ${
                        isCompleted
                          ? 'bg-[#141414] border-[#ffffff06] hover:border-[#ffffff10]'
                          : 'bg-[#141414] border-[#ffffff08] hover:border-[#ffffff15] hover:bg-[#1a1a1a]'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-[#22c55e]20' : 'bg-[#1a1a1a] border border-[#ffffff08]'}`}>
                        {isCompleted ? (
                          <Check size={14} className="text-[#22c55e]" strokeWidth={3} />
                        ) : (
                          <Circle size={12} className="text-[#ffa116]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isCompleted ? 'text-[#8c8c8c] line-through' : 'text-[#eff1f6]'}`}>
                          {lesson.title}
                        </p>
                        <p className="text-[10px] text-[#5c5c5c]">{lesson.description}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ color: diffColor, backgroundColor: diffColor + '15' }}>
                          {lesson.difficulty}
                        </span>
                        {!isCompleted && (
                          <span className="text-[10px] text-[#5c5c5c] flex items-center gap-0.5">
                            <Clock size={10} /> 5m
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-[9px] text-[#22c55e] font-medium">Done</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  KEEP OTHER MOCKS FOR INTERNAL USE / FUTURE                              */
/* ────────────────────────────────────────────────────────────────────────── */

export function MockA_DuolingoPath() { return <MockB_BabbelGrid />; }
export function MockC_SkillTree() { return <MockB_BabbelGrid />; }
export function MockD_MasteryRings() { return <MockB_BabbelGrid />; }
export function MockE_GraphMap() { return <MockB_BabbelGrid />; }
