/**
 * Learn Page — Lessons Tab (Babbel-style Grid)
 *
 * Clean vertical sections per unit. Each lesson is a wide horizontal card.
 * Completed lessons highlighted in yellow. Difficulty shown on unit level.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  Check,
  BookOpen,
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

  const masteryMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const [conceptId, state] of states.entries()) {
      map.set(conceptId, state.mastery);
    }
    return map;
  }, [states]);

  return { lessons, units, getLessonStatus, hasGraphContent, engine, masteryMap };
}

const DIFFICULTY_LABELS: Record<string, string> = {
  Beginner: 'Easy',
  Intermediate: 'Medium',
  Advanced: 'Hard',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: '#00b8a3',
  Intermediate: '#ffc01e',
  Advanced: '#ff375f',
};

function getUnitDifficulty(lessons: Array<{ difficulty: string }>) {
  const diffs = lessons.map((l) => l.difficulty);
  if (diffs.includes('Advanced')) return 'Advanced';
  if (diffs.includes('Intermediate')) return 'Intermediate';
  return 'Beginner';
}

export function MockB_BabbelGrid() {
  useGraphInit();
  const navigate = useNavigate();
  const { lessons, units, getLessonStatus } = useLessonData();

  return (
    <div className="space-y-8">
      {/* Units */}
      {units.map((unit) => {
        const unitLessons = lessons.filter((l) => l.unitId === unit.unitId);
        const unitCompleted = unitLessons.filter((l) => getLessonStatus(l.id) === 'completed').length;
        const allCompleted = unitCompleted === unitLessons.length;
        const rawDifficulty = getUnitDifficulty(unitLessons);
        const diffColor = DIFFICULTY_COLORS[rawDifficulty] ?? '#8c8c8c';
        const diffLabel = DIFFICULTY_LABELS[rawDifficulty] ?? rawDifficulty;

        return (
          <div key={unit.unitId}>
            {/* Unit header — title + difficulty inline */}
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
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#eff1f6]">{unit.title}</p>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    style={{ color: diffColor, backgroundColor: diffColor + '15' }}
                  >
                    {diffLabel}
                  </span>
                </div>
              </div>
              {allCompleted && (
                <span className="text-[10px] font-bold text-[#00b8a3]">Complete</span>
              )}
            </div>

            {/* Lesson rows */}
            <div className="space-y-2">
              {unitLessons.map((lesson) => {
                const status = getLessonStatus(lesson.id);
                const isCompleted = status === 'completed';

                return (
                  <button
                    key={lesson.id}
                    onClick={() => navigate(`/workbook/level/${lesson.id}`)}
                    className={`w-full flex items-center gap-4 p-3.5 rounded-xl border text-left transition-all ${
                      isCompleted
                        ? 'bg-[#ffa11608] border-[#ffa11640] hover:border-[#ffa11660]'
                        : 'bg-[#141414] border-[#ffffff08] hover:border-[#ffffff15] hover:bg-[#1a1a1a]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-[#ffa116]20' : 'bg-[#1a1a1a] border border-[#ffffff08]'}`}>
                      {isCompleted ? (
                        <Check size={14} className="text-[#ffa116]" strokeWidth={3} />
                      ) : (
                        <Circle size={12} className="text-[#5c5c5c]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-[#eff1f6]">
                        {lesson.title}
                      </p>
                      <p className="text-[10px] text-[#5c5c5c]">{lesson.description}</p>
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

/* ────────────────────────────────────────────────────────────────────────── */
/*  KEEP OTHER MOCKS FOR INTERNAL USE / FUTURE                              */
/* ────────────────────────────────────────────────────────────────────────── */

export function MockA_DuolingoPath() { return <MockB_BabbelGrid />; }
export function MockC_SkillTree() { return <MockB_BabbelGrid />; }
export function MockD_MasteryRings() { return <MockB_BabbelGrid />; }
export function MockE_GraphMap() { return <MockB_BabbelGrid />; }
