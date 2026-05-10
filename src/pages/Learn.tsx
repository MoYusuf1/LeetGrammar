/**
 * Learn Page — Topic grid for guided grammar learning.
 *
 * Organized by units. Each lesson teaches a concept and
 * prepares the user for the corresponding LeetGrammar problem.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Check,
  Lock,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Zap,
  Target,
} from 'lucide-react';
import { useHybridProgress, type HybridUnit } from '@/hooks/useHybridProgress';


export default function Learn() {
  const navigate = useNavigate();
  const { lessons, units, getLessonStatus, hasGraphContent } = useHybridProgress();
  const [expandedUnits, setExpandedUnits] = useState<Set<number>>(new Set([0]));

  const toggleUnit = (unitId: number) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(unitId)) next.delete(unitId);
      else next.add(unitId);
      return next;
    });
  };

  // Stats
  const totalLessons = lessons.length;
  const completedCount = lessons.filter((l) => getLessonStatus(l.id) === 'completed').length;
  const currentLesson = lessons.find((l) => getLessonStatus(l.id) === 'current');

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-[#eff1f6]">Learn Somali Grammar</h1>
              <p className="text-xs text-[#8c8c8c] mt-1">
                {hasGraphContent
                  ? `${completedCount} / ${totalLessons} concepts mastered`
                  : `${completedCount} / ${totalLessons} lessons completed`}
              </p>
            </div>
            {currentLesson && (
              <button
                onClick={() => navigate(`/lesson/${currentLesson.id}`)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ffa116] text-[#0f0f0f] text-xs font-bold hover:bg-[#ffb800] transition-colors"
              >
                <Zap size={13} />
                Continue
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-[#ffa116] transition-all"
                style={{ width: `${totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Units */}
      <div className="px-4 py-5">
        <div className="max-w-[720px] mx-auto space-y-4">
          {units.map((unit) => (
            <UnitSection
              key={unit.unitId}
              unit={unit}
              lessons={lessons.filter((l) => l.unitId === unit.unitId)}
              expanded={expandedUnits.has(unit.unitId)}
              onToggle={() => toggleUnit(unit.unitId)}
              getLessonStatus={getLessonStatus}
              onLessonClick={(id, isGraph, conceptId) => {
                if (isGraph && conceptId) {
                  navigate(`/wiki/${conceptId}`);
                } else {
                  navigate(`/lesson/${id}`);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function UnitSection({
  unit,
  lessons,
  expanded,
  onToggle,
  getLessonStatus,
  onLessonClick,
}: {
  unit: HybridUnit;
  lessons: Array<{
    id: number;
    title: string;
    unitId: number;
    unitTitle: string;
    unitColor: string;
    isGraph: boolean;
    conceptId?: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
    prerequisites: number[];
  }>;
  expanded: boolean;
  onToggle: () => void;
  getLessonStatus: (id: number) => 'completed' | 'current' | 'locked';
  onLessonClick: (id: number, isGraph: boolean, conceptId?: string) => void;
}) {
  const completed = lessons.filter((l) => getLessonStatus(l.id) === 'completed').length;
  const total = lessons.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] overflow-hidden">
      {/* Unit header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-[#1a1a1a] transition-colors"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${unit.color}25 0%, ${unit.color}10 100%)`,
            border: `1px solid ${unit.color}35`,
          }}
        >
          <BookOpen size={18} style={{ color: unit.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#eff1f6]">{unit.title}</h2>
            {pct === 100 && (
              <span className="flex items-center gap-0.5 text-[10px] text-[#22c55e]">
                <Check size={10} strokeWidth={3} />
                Done
              </span>
            )}
          </div>
          <p className="text-[10px] text-[#8c8c8c] mt-0.5 truncate">{unit.description}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-1 bg-[#0f0f0f] rounded-full overflow-hidden max-w-[120px]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: unit.color }}
              />
            </div>
            <span className="text-[10px] text-[#5c5c5c]">
              {completed}/{total}
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={16} className="text-[#5c5c5c] flex-shrink-0" />
        ) : (
          <ChevronDown size={16} className="text-[#5c5c5c] flex-shrink-0" />
        )}
      </button>

      {/* Lessons grid */}
      {expanded && (
        <div className="px-3 pb-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {lessons.map((lesson) => {
              const status = getLessonStatus(lesson.id);
              const isCompleted = status === 'completed';
              const isCurrent = status === 'current';
              const isLocked = status === 'locked';

              const diffColor =
                lesson.difficulty === 'Beginner'
                  ? '#22c55e'
                  : lesson.difficulty === 'Intermediate'
                  ? '#eab308'
                  : '#ef4444';

              return (
                <button
                  key={lesson.id}
                  onClick={() => !isLocked && onLessonClick(lesson.id, lesson.isGraph, lesson.conceptId)}
                  disabled={isLocked}
                  className={`relative flex items-start gap-3 p-3.5 rounded-lg border text-left transition-all ${
                    isLocked
                      ? 'bg-[#0f0f0f] border-[#ffffff04] opacity-50 cursor-not-allowed'
                      : isCurrent
                      ? 'bg-[#1a1a1a] border-[#ffa116]30 hover:border-[#ffa116]50'
                      : isCompleted
                      ? 'bg-[#0f0f0f] border-[#ffffff06] hover:border-[#ffffff10]'
                      : 'bg-[#141414] border-[#ffffff06] hover:border-[#ffffff12] hover:bg-[#1a1a1a]'
                  }`}
                >
                  {/* Status icon */}
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-[#22c55e]15 border border-[#22c55e]25'
                        : isCurrent
                        ? 'bg-[#ffa116]15 border border-[#ffa116]25'
                        : 'bg-[#1a1a1a] border border-[#ffffff08]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={14} className="text-[#22c55e]" strokeWidth={3} />
                    ) : isCurrent ? (
                      <Target size={14} className="text-[#ffa116]" />
                    ) : (
                      <Lock size={12} className="text-[#3e3e3e]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-xs font-semibold truncate ${isCompleted ? 'text-[#8c8c8c]' : 'text-[#eff1f6]'}`}>
                        {lesson.title}
                      </p>
                      {lesson.isGraph && (
                        <span className="text-[9px] text-[#5c5c5c] bg-[#1a1a1a] px-1 py-0.5 rounded">Textbook</span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#5c5c5c] mt-0.5 line-clamp-1">{lesson.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          color: diffColor,
                          backgroundColor: diffColor + '15',
                        }}
                      >
                        {lesson.difficulty}
                      </span>
                      {isCurrent && (
                        <span className="text-[9px] text-[#ffa116] font-medium flex items-center gap-0.5">
                          <ArrowRight size={9} />
                          Start
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
