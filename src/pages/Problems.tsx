/**
 * Problems.tsx — Mobile-first card-based layout.
 *
 * No table on mobile. Each problem is a full-width card.
 * Clean, readable, touch-friendly.
 */

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Search, Check, Circle, Lock, RotateCcw } from 'lucide-react';
import { allProblems, displayDifficulty } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';

export default function Problems() {
  const navigate = useNavigate();
  const { getLessonStatus } = useProgress();

  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProblems = useMemo(() => {
    return allProblems.filter((p) => {
      const matchesSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase());

      const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;

      const status = getLessonStatus(p.id);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'solved' && status === 'completed') ||
        (statusFilter === 'unsolved' && status !== 'completed');

      return matchesSearch && matchesDifficulty && matchesStatus;
    });
  }, [search, difficultyFilter, statusFilter]);

  const solvedCount = allProblems.filter((p) => getLessonStatus(p.id) === 'completed').length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#00b8a3';
      case 'Intermediate': return '#ffc01e';
      case 'Advanced': return '#ff375f';
      default: return '#8c8c8c';
    }
  };

  const clearFilters = () => {
    setSearch('');
    setDifficultyFilter('all');
    setStatusFilter('all');
  };

  const hasFilters = search || difficultyFilter !== 'all' || statusFilter !== 'all';

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-[#eff1f6]">Problem List</h1>
          <span className="text-xs text-[#8c8c8c]">
            <span className="text-[#eff1f6] font-bold">{solvedCount}</span> / {allProblems.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c]" size={13} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 bg-[#1a1a1a] border border-[#ffffff10] rounded-lg text-xs text-[#eff1f6] placeholder-[#3c3c3c] focus:outline-none focus:border-[#ffa116] transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { key: 'Beginner', label: 'Easy' },
            { key: 'Intermediate', label: 'Medium' },
            { key: 'Advanced', label: 'Hard' },
          ].map((d) => (
            <button
              key={d.key}
              onClick={() => setDifficultyFilter((prev) => prev === d.key ? 'all' : d.key)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                difficultyFilter === d.key
                  ? 'bg-[#ffffff15] text-[#eff1f6]'
                  : 'bg-[#1a1a1a] text-[#5c5c5c] border border-[#ffffff08]'
              }`}
            >
              {d.label}
            </button>
          ))}

          {[
            { key: 'solved', label: 'Solved' },
            { key: 'unsolved', label: 'Unsolved' },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setStatusFilter((prev) => prev === s.key ? 'all' : s.key)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                statusFilter === s.key
                  ? 'bg-[#ffffff15] text-[#eff1f6]'
                  : 'bg-[#1a1a1a] text-[#5c5c5c] border border-[#ffffff08]'
              }`}
            >
              {s.label}
            </button>
          ))}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] text-[#3c3c3c] hover:text-[#ef4444] transition-colors"
            >
              <RotateCcw size={10} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Problems — card layout on mobile, table on desktop */}
      <div className="px-4 pb-20 sm:pb-8">
        {/* Desktop table */}
        <div className="hidden sm:block">
          <div className="border border-[#ffffff10] rounded-xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[48px_56px_1fr_100px_100px] gap-2 px-5 py-3 bg-[#1a1a1a] border-b border-[#ffffff10] text-[11px] font-semibold text-[#8c8c8c] uppercase tracking-wider">
              <div className="text-center">Status</div>
              <div>#</div>
              <div>Title</div>
              <div className="text-right">Acceptance</div>
              <div className="text-right">Difficulty</div>
            </div>

            {/* Rows */}
            <div>
              {filteredProblems.map((problem) => {
                const status = getLessonStatus(problem.id);
                const isCompleted = status === 'completed';
                const diffColor = getDifficultyColor(problem.difficulty);

                return (
                  <div
                    key={problem.id}
                    className="grid grid-cols-[48px_56px_1fr_100px_100px] gap-2 px-5 py-3 border-b border-[#ffffff06] last:border-b-0 hover:bg-[#ffffff06] items-center transition-colors"
                  >
                    <div className="flex items-center justify-center">
                      {isCompleted ? (
                        <div className="w-[18px] h-[18px] rounded-full bg-[#00b8a3] flex items-center justify-center">
                          <Check size={11} className="text-[#0f0f0f]" strokeWidth={3} />
                        </div>
                      ) : (
                        <Circle size={15} className="text-[#3e3e3e]" />
                      )}
                    </div>
                    <span className="text-sm text-[#5c5c5c] font-mono">{problem.id}</span>
                    <button
                      onClick={() => navigate(`/problem/${problem.id}`)}
                      className="text-sm text-[#eff1f6] hover:text-[#ffa116] transition-colors text-left"
                    >
                      {problem.title}
                    </button>
                    <span className="text-sm text-[#8c8c8c] text-right">
                      {problem.acceptance > 0 ? `${problem.acceptance}%` : '—'}
                    </span>
                    <span className="text-sm font-medium text-right" style={{ color: diffColor }}>
                      {displayDifficulty(problem.difficulty)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile card layout */}
        <div className="sm:hidden space-y-2">
          {filteredProblems.map((problem) => {
            const status = getLessonStatus(problem.id);
            const isCompleted = status === 'completed';
            const diffColor = getDifficultyColor(problem.difficulty);

            return (
              <button
                key={problem.id}
                onClick={() => navigate(`/problem/${problem.id}`)}
                className="w-full p-3 rounded-xl bg-[#1a1a1a] border border-[#ffffff08] text-left transition-colors hover:bg-[#252525] active:scale-[0.98]"
              >
                <div className="flex items-start gap-3">
                  {/* Status circle */}
                  <div className="flex items-center justify-center flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-[#00b8a3] flex items-center justify-center">
                        <Check size={12} className="text-[#0f0f0f]" strokeWidth={3} />
                      </div>
                    ) : (
                      <Circle size={18} className="text-[#3e3e3e]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-[#5c5c5c]">#{problem.id}</span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: diffColor }}
                      >
                        {displayDifficulty(problem.difficulty)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#eff1f6] leading-snug">{problem.title}</p>
                    {problem.isPremium && (
                      <div className="flex items-center gap-1 text-[10px] text-[#ffc01e] mt-1">
                        <Lock size={10} />
                        <span>Premium</span>
                      </div>
                    )}
                    {problem.acceptance > 0 && (
                      <p className="text-[10px] text-[#5c5c5c] mt-1">
                        {problem.acceptance}% acceptance
                      </p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-[#5c5c5c]">No problems found</p>
          </div>
        )}
      </div>
    </div>
  );
}
