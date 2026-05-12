/**
 * Learn Page — Composite Design (Duolingo + Babbel + Memrise + NeetCode)
 *
 * Tabs:
 *   · Today  — single primary CTA, streak, quick actions, stats
 *   · Path   — vertical curriculum path with locked/available/complete nodes
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  BookOpen,
  RotateCcw,
  Zap,
  Target,
  Pencil,
  ChevronRight,
  Flame,
  Lock,
  Check,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { useProgressStore } from '@/stores/progress-store';
import { useGraphSrs } from '@/hooks/useGraphSrs';
import { useLearnData, type CurriculumUnit, type UnitProblem } from '@/hooks/useLearnData';
import { useGraphInit } from '@/hooks/useGraphInit';
import { difficultyConfig } from '@/data/problems';

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

type TabKey = 'today' | 'path';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'path', label: 'Path' },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                                */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function Learn() {
  useGraphInit();
  const [activeTab, setActiveTab] = useState<TabKey>('today');

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-0 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[720px] mx-auto">
          <h1 className="text-xl font-bold text-[#eff1f6] mb-3">Learn</h1>
          <div className="flex items-center gap-1 -mb-px">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                    isActive
                      ? 'text-[#eff1f6] border-[#ffa116]'
                      : 'text-[#8c8c8c] border-transparent hover:text-[#c8c8c8]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5">
        <div className="max-w-[720px] mx-auto">
          {activeTab === 'today' && <TodayTab />}
          {activeTab === 'path' && <PathTab />}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  TODAY TAB                                                                */
/* ═══════════════════════════════════════════════════════════════════════════ */

function TodayTab() {
  const navigate = useNavigate();
  const progress = useProgressStore();
  const { nextAction, dueReviewCount, difficultConceptCount, units, currentUnitIndex } = useLearnData();
  const { learningFrontier } = useGraphSrs();

  const hasStudiedToday = progress.lastStudyDate === getToday();
  const streakAtRisk = !hasStudiedToday && progress.streak > 0;

  const currentUnit = currentUnitIndex >= 0 ? units[currentUnitIndex] : null;

  const handleStart = () => {
    if (!nextAction?.targetPath) return;
    navigate(nextAction.targetPath);
  };

  return (
    <div className="space-y-5">
      {/* Stats Bar */}
      <div className="flex items-center gap-3">
        {/* Streak */}
        <div className="flex-1 rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${streakAtRisk ? 'bg-[#ef444410] border border-[#ef444430]' : 'bg-[#ffa11615]'}`}>
            <Flame size={18} className={streakAtRisk ? 'text-[#ef4444]' : 'text-[#ffa116]'} />
          </div>
          <div>
            <p className="text-lg font-bold text-[#eff1f6] leading-tight">{progress.streak}</p>
            <p className="text-[10px] text-[#8c8c8c]">day streak</p>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="flex-1 rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3b82f615] border border-[#3b82f630] flex items-center justify-center">
            <Zap size={18} className="text-[#3b82f6]" />
          </div>
          <div>
            <p className="text-lg font-bold text-[#eff1f6] leading-tight">
              {hasStudiedToday ? 'Done' : `${progress.dailyGoal} XP`}
            </p>
            <p className="text-[10px] text-[#8c8c8c]">daily goal</p>
          </div>
        </div>
      </div>

      {/* Streak Risk Banner */}
      {streakAtRisk && (
        <div className="rounded-xl bg-[#ef444410] border border-[#ef444430] p-3 flex items-center gap-2.5">
          <AlertTriangle size={16} className="text-[#ef4444] flex-shrink-0" />
          <p className="text-xs text-[#ef4444]">
            Streak at risk! Do one lesson to keep your {progress.streak}-day streak alive.
          </p>
        </div>
      )}

      {/* Primary CTA */}
      {nextAction && (
        <div
          className="relative rounded-2xl border overflow-hidden cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: currentUnit
              ? `linear-gradient(135deg, ${currentUnit.color}12 0%, #141414 60%)`
              : '#141414',
            borderColor: currentUnit ? `${currentUnit.color}40` : '#ffffff10',
          }}
          onClick={handleStart}
        >
          {/* Glow effect for available/current nodes */}
          {nextAction.type !== 'celebration' && (
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ backgroundColor: currentUnit?.color ?? '#ffa116' }}
            />
          )}

          <div className="relative p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c8c8c] mb-1.5">
                  {nextAction.type === 'review' && 'Due for Review'}
                  {nextAction.type === 'problem' && 'Continue Learning'}
                  {nextAction.type === 'concept' && 'Ready to Learn'}
                  {nextAction.type === 'celebration' && 'All Caught Up'}
                </p>
                <h2 className="text-lg font-bold text-[#eff1f6] mb-1">{nextAction.label}</h2>
                {nextAction.sublabel && (
                  <p className="text-sm text-[#8c8c8c]">{nextAction.sublabel}</p>
                )}
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: currentUnit ? `${currentUnit.color}18` : '#1a1a1a',
                  border: `1px solid ${currentUnit ? `${currentUnit.color}30` : '#ffffff10'}`,
                }}
              >
                {nextAction.type === 'review' && <RotateCcw size={20} className="text-[#ef4444]" />}
                {nextAction.type === 'problem' && <BookOpen size={20} style={{ color: currentUnit?.color }} />}
                {nextAction.type === 'concept' && <Sparkles size={20} className="text-[#3b82f6]" />}
                {nextAction.type === 'celebration' && <Check size={20} className="text-[#22c55e]" />}
              </div>
            </div>

            {/* Progress bar for problem CTAs */}
            {nextAction.type === 'problem' && currentUnit && (
              <div className="mt-4">
                <div className="flex justify-between text-[10px] text-[#8c8c8c] mb-1">
                  <span>Unit progress</span>
                  <span>{currentUnit.completionPct}%</span>
                </div>
                <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${currentUnit.completionPct}%`,
                      backgroundColor: currentUnit.color,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Count badge for review CTAs */}
            {nextAction.type === 'review' && nextAction.count && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-md bg-[#ef444415] text-[#ef4444] font-medium">
                  {nextAction.count} due
                </span>
                <span className="text-xs text-[#5c5c5c]">Spaced repetition keeps knowledge fresh</span>
              </div>
            )}

            {/* Start button */}
            <button
              className="mt-4 w-full py-2.5 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
              style={{
                backgroundColor: currentUnit?.color ?? '#ffa116',
                color: '#0f0f0f',
              }}
              onClick={handleStart}
            >
              {nextAction.type === 'review' && 'Start Review Session'}
              {nextAction.type === 'problem' && 'Continue'}
              {nextAction.type === 'concept' && 'Start Learning'}
              {nextAction.type === 'celebration' && 'Explore Concepts'}
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <QuickActionCard
          icon={<RotateCcw size={18} className="text-[#ef4444]" />}
          label="Speed Review"
          count={dueReviewCount}
          onClick={() => navigate('/review')}
          disabled={dueReviewCount === 0}
        />
        <QuickActionCard
          icon={<Target size={18} className="text-[#f97316]" />}
          label="Difficult Words"
          count={difficultConceptCount}
          onClick={() => {
            if (learningFrontier.length > 0) {
              navigate(`/study/${learningFrontier[0].conceptId}`);
            }
          }}
          disabled={difficultConceptCount === 0}
        />
        <QuickActionCard
          icon={<Pencil size={18} className="text-[#3b82f6]" />}
          label="Practice"
          onClick={() => navigate('/problems')}
        />
      </div>

      {/* Weekly Activity */}
      <WeeklyActivity />
    </div>
  );
}

function QuickActionCard({
  icon,
  label,
  count,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  label: string;
  count?: number;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center gap-2 p-3.5 rounded-xl bg-[#141414] border border-[#ffffff08] transition-all ${
        disabled
          ? 'opacity-40 cursor-not-allowed'
          : 'hover:bg-[#1a1a1a] hover:border-[#ffffff15] cursor-pointer'
      }`}
    >
      <div className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] flex items-center justify-center">
        {icon}
      </div>
      <div className="text-center">
        <p className="text-[11px] font-medium text-[#eff1f6]">{label}</p>
        {count !== undefined && <p className="text-[10px] text-[#5c5c5c]">{count}</p>}
      </div>
    </button>
  );
}

function WeeklyActivity() {
  const progress = useProgressStore();

  const weekStats = useMemo(() => {
    const today = new Date();
    const days: { date: Date; active: boolean }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().split('T')[0];
      days.push({ date: d, active: progress.activityLog.includes(iso) });
    }
    const activeDays = days.filter((d) => d.active).length;
    return { days, activeDays };
  }, [progress.activityLog]);

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">This Week</p>
        <p className="text-[10px] text-[#8c8c8c]">{weekStats.activeDays}/7 days active</p>
      </div>
      <div className="flex items-center justify-between">
        {weekStats.days.map((day, i) => {
          const label = dayLabels[day.date.getDay()];
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-md transition-colors ${
                  day.active ? 'bg-[#ffa11625]' : 'bg-[#1a1a1a]'
                }`}
              >
                {day.active && (
                  <div className="w-full h-full flex items-center justify-center">
                    <Flame size={12} className="text-[#ffa116]" />
                  </div>
                )}
              </div>
              <span className="text-[9px] text-[#5c5c5c] font-medium">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PATH TAB                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */

function PathTab() {
  const { units, loading, error } = useLearnData();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-[#8c8c8c]">Loading curriculum...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-[#ef4444]">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {units.map((unit, index) => (
        <UnitSection key={unit.id} unit={unit} isLast={index === units.length - 1} />
      ))}
    </div>
  );
}

function UnitSection({ unit, isLast }: { unit: CurriculumUnit; isLast: boolean }) {
  return (
    <div className={`relative ${unit.isLocked ? 'opacity-50' : ''}`}>
      {/* Unit Header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: `${unit.color}15`,
            border: `1px solid ${unit.color}30`,
          }}
        >
          {unit.isLocked ? (
            <Lock size={16} style={{ color: unit.color }} />
          ) : unit.isComplete ? (
            <Check size={16} style={{ color: unit.color }} />
          ) : (
            <BookOpen size={16} style={{ color: unit.color }} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-[#eff1f6]">{unit.title}</h3>
          <p className="text-[11px] text-[#8c8c8c] truncate">{unit.description}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-[#eff1f6]">{unit.completionPct}%</p>
          <p className="text-[9px] text-[#5c5c5c]">
            {unit.problems.filter((p) => p.isComplete).length}/{unit.problems.length}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden mb-4">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${unit.completionPct}%`, backgroundColor: unit.color }}
        />
      </div>

      {/* Problem Nodes */}
      <div className="relative pl-5">
        {/* Vertical connector line */}
        {!isLast && (
          <div
            className="absolute left-[22px] top-8 bottom-[-32px] w-0.5"
            style={{ backgroundColor: `${unit.color}20` }}
          />
        )}

        <div className="space-y-2">
          {unit.problems.map((problem, pi) => (
            <PathNode key={problem.id} problem={problem} index={pi} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PathNode({
  problem,
  index,
}: {
  problem: UnitProblem;
  index: number;
}) {
  const navigate = useNavigate();
  const diff = difficultyConfig[problem.difficulty];

  const handleClick = () => {
    if (problem.isLocked) return;
    navigate(`/problem/${problem.id}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={problem.isLocked}
      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
        problem.isLocked
          ? 'bg-[#0f0f0f] border border-[#ffffff05] cursor-not-allowed'
          : problem.isComplete
          ? 'bg-[#141414] border border-[#ffffff08] hover:bg-[#1a1a1a] cursor-pointer'
          : 'bg-[#141414] border border-[#ffffff10] hover:border-[#ffffff18] hover:bg-[#1a1a1a] cursor-pointer'
      }`}
    >
      {/* Node circle */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
            problem.isLocked
              ? 'bg-[#1a1a1a] border border-[#ffffff08] text-[#5c5c5c]'
              : problem.isComplete
              ? 'bg-[#22c55e15] border border-[#22c55e40] text-[#22c55e]'
              : 'bg-[#ffffff08] border border-[#ffffff15] text-[#eff1f6]'
          }`}
        >
          {problem.isComplete ? <Check size={14} /> : problem.isLocked ? <Lock size={12} /> : index + 1}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${problem.isLocked ? 'text-[#5c5c5c]' : 'text-[#eff1f6]'}`}>
          {problem.title}
        </p>
      </div>

      {/* Difficulty badge */}
      <span
        className="text-[9px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0"
        style={{ color: diff.color, backgroundColor: diff.bg }}
      >
        {diff.label}
      </span>

      <ChevronRight size={14} className={`flex-shrink-0 ${problem.isLocked ? 'text-[#3e3e3e]' : 'text-[#5c5c5c]'}`} />
    </button>
  );
}
