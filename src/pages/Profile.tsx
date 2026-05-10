import { Flame, Star, BookOpen, RotateCcw, Info, TrendingUp, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useProgress } from '@/hooks/useProgress';
import { allProblems } from '@/data/problems';

export default function Profile() {
  const navigate = useNavigate();
  const { progress, completionPercentage, resetProgress } = useProgress();

  const problemsByDifficulty = {
    Beginner: allProblems.filter((p) => p.difficulty === 'Beginner'),
    Intermediate: allProblems.filter((p) => p.difficulty === 'Intermediate'),
    Advanced: allProblems.filter((p) => p.difficulty === 'Advanced'),
  };

  const completedByDiff = {
    Beginner: problemsByDifficulty.Beginner.filter((p) => progress.completedLessons.includes(p.id)).length,
    Intermediate: problemsByDifficulty.Intermediate.filter((p) => progress.completedLessons.includes(p.id)).length,
    Advanced: problemsByDifficulty.Advanced.filter((p) => progress.completedLessons.includes(p.id)).length,
  };

  // Generate a simple activity heatmap (last 28 days)
  const generateHeatmap = () => {
    const days = 28;
    const cells = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const dateStr = date.toISOString().split('T')[0];
      const isActive = progress.lastStudyDate === dateStr;
      const intensity = isActive ? 1 : 0;
      cells.push({ date: dateStr, intensity });
    }
    return cells;
  };

  const heatmap = generateHeatmap();

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-8 py-5 border-b border-[#ffffff10]">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-xl font-semibold text-[#eff1f6]">Profile</h1>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-6 space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#ffffff10] flex flex-col items-center text-center">
            <Flame size={22} className="text-[#ffc01e] mb-2" />
            <span className="text-2xl font-bold text-[#eff1f6]">{progress.streak}</span>
            <span className="text-xs text-[#8c8c8c]">Day Streak</span>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#ffffff10] flex flex-col items-center text-center">
            <Star size={22} className="text-[#ffc01e] mb-2" />
            <span className="text-2xl font-bold text-[#eff1f6]">{progress.xp}</span>
            <span className="text-xs text-[#8c8c8c]">XP Points</span>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#ffffff10] flex flex-col items-center text-center">
            <BookOpen size={22} className="text-[#ffa116] mb-2" />
            <span className="text-2xl font-bold text-[#eff1f6]">{progress.completedLessons.length}</span>
            <span className="text-xs text-[#8c8c8c]">Solved</span>
          </div>
          <div className="bg-[#1a1a1a] rounded-xl p-5 border border-[#ffffff10] flex flex-col items-center text-center">
            <Trophy size={22} className="text-[#00b8a3] mb-2" />
            <span className="text-2xl font-bold text-[#eff1f6]">{completionPercentage}%</span>
            <span className="text-xs text-[#8c8c8c]">Complete</span>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#ffffff10]">
          <h3 className="font-semibold text-[#eff1f6] mb-4">Activity</h3>
          <div className="flex gap-1 flex-wrap">
            {heatmap.map((cell, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-sm"
                style={{
                  backgroundColor: cell.intensity > 0 ? '#ffa116' : '#282828',
                  opacity: cell.intensity > 0 ? 0.8 + cell.intensity * 0.2 : 1,
                }}
                title={cell.date}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] text-[#5c5c5c]">Less</span>
            <div className="w-3 h-3 rounded-sm bg-[#282828]" />
            <div className="w-3 h-3 rounded-sm bg-[#ffa11640]" />
            <div className="w-3 h-3 rounded-sm bg-[#ffa11680]" />
            <div className="w-3 h-3 rounded-sm bg-[#ffa116]" />
            <span className="text-[10px] text-[#5c5c5c]">More</span>
          </div>
        </div>

        {/* Progress + Difficulty side by side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Progress ring */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#ffffff10]">
            <h3 className="font-semibold text-[#eff1f6] mb-4">Course Progress</h3>
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#282828" strokeWidth="8" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#ffa116" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 34} strokeDashoffset={2 * Math.PI * 34 * (1 - completionPercentage / 100)}
                    transform="rotate(-90 40 40)" className="ring-animate" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TrendingUp size={18} className="text-[#ffa116]" />
                </div>
              </div>
              <div className="flex-1">
                <div className="h-2.5 bg-[#282828] rounded-full overflow-hidden">
                  <div className="h-full bg-[#ffa116] rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }} />
                </div>
                <p className="text-xs text-[#8c8c8c] mt-2">{progress.completedLessons.length} of 50 problems solved</p>
              </div>
            </div>
          </div>

          {/* Difficulty breakdown */}
          <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#ffffff10]">
            <h3 className="font-semibold text-[#eff1f6] mb-4">By Difficulty</h3>
            <div className="space-y-4">
              {([
                { key: 'Beginner' as const, label: 'Beginner', color: '#00b8a3' },
                { key: 'Intermediate' as const, label: 'Intermediate', color: '#ffc01e' },
                { key: 'Advanced' as const, label: 'Advanced', color: '#ff375f' },
              ]).map(({ key, label, color }) => {
                const total = problemsByDifficulty[key].length;
                const done = completedByDiff[key];
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-[#8c8c8c]">{label}</span>
                      <span className="text-sm font-medium text-[#eff1f6]">{done}/{total}</span>
                    </div>
                    <div className="h-2 bg-[#282828] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <button onClick={() => navigate('/about')} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#ffffff10] flex items-center gap-3 tap-scale text-left hover:bg-[#ffffff08] transition-colors">
            <Info size={20} className="text-[#8c8c8c]" />
            <span className="font-medium text-[#eff1f6]">About this course</span>
          </button>
          <button onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress(); }} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#ffffff10] flex items-center gap-3 tap-scale text-left hover:bg-[#ffffff08] transition-colors">
            <RotateCcw size={20} className="text-[#ff375f]" />
            <span className="font-medium text-[#eff1f6]">Reset Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
}
