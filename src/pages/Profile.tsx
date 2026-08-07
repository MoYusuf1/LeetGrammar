/**
 * Profile Page — local-only stats + settings.
 *
 * No accounts, no cloud sync — everything here reads from progress-store.ts
 * (persisted to localStorage). Folds in what used to be a separate
 * Settings page (daily-goal picker, reset progress) since there's no
 * account/admin surface left to justify a second page.
 */

import { useMemo, useState } from 'react';
import { RotateCcw, Trophy, Calendar, Target, BookOpen } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { LESSON_LIST } from '@/data/teaching-content';

const RANK_COLORS = [
  { max: 100, label: 'Novice', color: '#5c5c5c', bg: '#1a1a1a' },
  { max: 300, label: 'Learner', color: '#22c55e', bg: '#22c55e15' },
  { max: 600, label: 'Scholar', color: '#3b82f6', bg: '#3b82f615' },
  { max: 1000, label: 'Expert', color: '#a855f7', bg: '#a855f715' },
  { max: 1500, label: 'Master', color: '#ffc01e', bg: '#ffc01e15' },
  { max: Infinity, label: 'Grandmaster', color: '#ef4444', bg: '#ef444515' },
];

const DAILY_GOALS = [15, 30, 50];

function getRank(xp: number) {
  return RANK_COLORS.find((r) => xp < r.max) ?? RANK_COLORS[RANK_COLORS.length - 1];
}

/* ────────────────────────────────────────────────────────────────────────── */

export default function Profile() {
  const { progress, completionPercentage, resetProgress } = useProgress();
  const [dailyGoal, setDailyGoal] = useState(30);

  const rank = getRank(progress.xp);
  const totalLessons = LESSON_LIST.length;

  // Real activity heatmap from activityLog
  const heatmap = useMemo(() => {
    const days = 49; // 7 weeks
    const logSet = new Set(progress.activityLog);
    const cells = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const dateStr = date.toISOString().split('T')[0];
      const count = logSet.has(dateStr) ? 1 : 0;
      cells.push({ date: dateStr, intensity: count });
    }
    return cells;
  }, [progress.activityLog]);

  const heatmapByWeek = useMemo(() => {
    const weeks: typeof heatmap[] = [];
    for (let i = 0; i < heatmap.length; i += 7) {
      weeks.push(heatmap.slice(i, i + 7));
    }
    return weeks;
  }, [heatmap]);

  // Month labels for heatmap
  const monthLabels = useMemo(() => {
    const labels: { index: number; label: string }[] = [];
    let lastMonth = '';
    heatmapByWeek.forEach((week, wi) => {
      const midDay = week[3];
      if (midDay) {
        const d = new Date(midDay.date);
        const month = d.toLocaleDateString('en-US', { month: 'short' });
        if (month !== lastMonth) {
          labels.push({ index: wi, label: month });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [heatmapByWeek]);

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      <div className="max-w-[1000px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── LEFT SIDEBAR ── */}
          <aside className="w-full lg:w-[260px] flex-shrink-0 space-y-4">
            {/* Stats card */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5 text-center">
              <div className="w-20 h-20 rounded-full bg-[#ffa116] flex items-center justify-center text-[#0f0f0f] text-2xl font-bold mx-auto">
                <BookOpen size={32} />
              </div>

              <h2 className="text-base font-bold text-[#eff1f6] mt-3">Your Progress</h2>

              {/* Rank badge */}
              <div
                className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full text-[10px] font-bold border"
                style={{ color: rank.color, backgroundColor: rank.bg, borderColor: `${rank.color}30` }}
              >
                {rank.label}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#ffffff08]">
                <div className="text-center">
                  <p className="text-sm font-bold text-[#eff1f6]">{progress.xp}</p>
                  <p className="text-[9px] text-[#5c5c5c] uppercase tracking-wider mt-0.5">XP</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#eff1f6]">{progress.streak}</p>
                  <p className="text-[9px] text-[#5c5c5c] uppercase tracking-wider mt-0.5">Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#eff1f6]">{progress.completedLessons.length}</p>
                  <p className="text-[9px] text-[#5c5c5c] uppercase tracking-wider mt-0.5">Lessons</p>
                </div>
              </div>
            </div>

            {/* Daily goal */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
              <p className="text-xs font-bold text-[#eff1f6] mb-3">Daily Goal</p>
              <div className="grid grid-cols-3 gap-2">
                {DAILY_GOALS.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setDailyGoal(goal)}
                    className={`h-9 rounded-lg text-xs font-semibold transition-colors ${
                      dailyGoal === goal
                        ? 'bg-[#ffa116] text-[#0f0f0f]'
                        : 'bg-[#0f0f0f] border border-[#ffffff08] text-[#8c8c8c] hover:text-[#eff1f6]'
                    }`}
                  >
                    {goal} XP
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress(); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#ffffff08] hover:bg-[#1a1a1a] transition-colors text-left"
              >
                <RotateCcw size={16} className="text-[#ef4444]" />
                <span className="text-xs font-medium text-[#eff1f6]">Reset Progress</span>
              </button>
            </div>
          </aside>

          {/* ── MAIN AREA ── */}
          <main className="flex-1 min-w-0 space-y-5">
            {/* Activity Heatmap */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-[#8c8c8c]" />
                <h3 className="text-sm font-bold text-[#eff1f6]">Activity</h3>
                <span className="text-xs text-[#5c5c5c] ml-auto">
                  {progress.activityLog.length} active day{progress.activityLog.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Month labels */}
              <div className="flex gap-1.5 ml-6 mb-1">
                {heatmapByWeek.map((_, wi) => {
                  const month = monthLabels.find((m) => m.index === wi);
                  return (
                    <div key={wi} className="w-[22px] flex-shrink-0">
                      {month && (
                        <span className="text-[9px] text-[#5c5c5c]">{month.label}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {heatmapByWeek.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((cell, di) => (
                      <div
                        key={di}
                        className="w-3 h-3 rounded-sm flex-shrink-0"
                        style={{ backgroundColor: cell.intensity > 0 ? '#ffa116' : '#1a1a1a' }}
                        title={cell.date}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 mt-3">
                <span className="text-[10px] text-[#5c5c5c]">Less</span>
                <div className="w-3 h-3 rounded-sm bg-[#1a1a1a]" />
                <div className="w-3 h-3 rounded-sm bg-[#ffa116]40" />
                <div className="w-3 h-3 rounded-sm bg-[#ffa116]80" />
                <div className="w-3 h-3 rounded-sm bg-[#ffa116]" />
                <span className="text-[10px] text-[#5c5c5c]">More</span>
              </div>
            </div>

            {/* Course Progress */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={16} className="text-[#8c8c8c]" />
                <h3 className="text-sm font-bold text-[#eff1f6]">Course Progress</h3>
                <span className="text-xs text-[#5c5c5c] ml-auto">{completionPercentage}%</span>
              </div>
              <div className="h-2.5 bg-[#0f0f0f] rounded-full overflow-hidden">
                <div className="h-full bg-[#ffa116] rounded-full transition-all" style={{ width: `${completionPercentage}%` }} />
              </div>
              <p className="text-xs text-[#5c5c5c] mt-2">{progress.completedLessons.length} of {totalLessons} lessons completed</p>
            </div>

            {/* Practice scores */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-[#8c8c8c]" />
                <h3 className="text-sm font-bold text-[#eff1f6]">Practice Scores</h3>
              </div>
              {Object.keys(progress.practiceScores).length === 0 ? (
                <p className="text-xs text-[#5c5c5c]">Complete a lesson's practice cards to see scores here.</p>
              ) : (
                <div className="space-y-2">
                  {LESSON_LIST.filter((l) => progress.practiceScores[l.lessonId] !== undefined).map((lesson) => {
                    const score = progress.practiceScores[lesson.lessonId];
                    return (
                      <div key={lesson.lessonId} className="flex items-center gap-3">
                        <div className="w-40 truncate">
                          <p className="text-xs text-[#8c8c8c] truncate">{lesson.title}</p>
                        </div>
                        <div className="flex-1 h-2 bg-[#0f0f0f] rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-[#ffa116] transition-all" style={{ width: `${score}%` }} />
                        </div>
                        <div className="w-10 text-right">
                          <span className="text-xs text-[#eff1f6]">{score}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
