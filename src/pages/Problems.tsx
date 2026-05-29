/**
 * Problems.tsx — Minimalist problem list.
 *
 * One accent color. No unnecessary details.
 * Clean, focused, uncluttered.
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
      const matchesSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase());
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
  const hasFilters = search || difficultyFilter !== 'all' || statusFilter !== 'all';

  const clearFilters = () => {
    setSearch('');
    setDifficultyFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-bold text-[#eff1f6]">Problems</h1>
          <span className="text-xs text-[#8c8c8c]">
            <span className="text-[#eff1f6] font-bold">{solvedCount}</span> / {allProblems.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3c3c3c]" size={13} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 bg-[#1a1a1a] border border-[#ffffff10] rounded-lg text-xs text-[#eff1f6] placeholder-[#3c3c3c] focus:outline-none focus:border-[#ffa116] transition-colors"
          />
        </div>

        {/* Filters — minimal pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['Beginner', 'Intermediate', 'Advanced'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter((prev) => prev === d ? 'all' : d)}
              className={`px-2 py-1 rounded-lg text-[9px] font-semibold uppercase tracking-wider transition-colors ${
                difficultyFilter === d
                  ? 'bg-[#ffa116] text-[#0f0f0f]'
                  : 'bg-[#1a1a1a] text-[#5c5c5c] border border-[#ffffff08]'
              }`}
            >
              {d === 'Beginner' ? 'Easy' : d === 'Intermediate' ? 'Med' : 'Hard'}
            </button>
          ))}

          {['solved', 'unsolved'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter((prev) => prev === s ? 'all' : s)}
              className={`px-2 py-1 rounded-lg text-[9px] font-semibold uppercase tracking-wider transition-colors ${
                statusFilter === s
                  ? 'bg-[#ffa116] text-[#0f0f0f]'
                  : 'bg-[#1a1a1a] text-[#5c5c5c] border border-[#ffffff08]'
              }`}
            >
              {s === 'solved' ? 'Done' : 'Open'}
            </button>
          ))}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-[9px] text-[#3c3c3c] hover:text-[#ef4444] transition-colors"
            >
              <RotateCcw size={9} />
            </button>
          )}
        </div>
      </div>

      {/* Problems — card layout on mobile, table on desktop */}
      <div className="px-4 pb-20 sm:pb-8">
        {/* Desktop table */}
        <div className="hidden sm:block">
          <div className="border border-[#ffffff08] rounded-xl overflow-hidden">
            <div className="grid grid-cols-[48px_56px_1fr_100px_100px] gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-[#ffffff08] text-[10px] font-semibold text-[#5c5c5c] uppercase tracking-wider">
              <div className="text-center">✓</div>
              <div>#</div>
              <div>Title</div>
              <div className="text-right">Accept</div>
              <div className="text-right">Level</div>
            </div>

            <div>
              {filteredProblems.map((problem) => {
                const status = getLessonStatus(problem.id);
                const isCompleted = status === 'completed';

                return (
                  <button
                    key={problem.id}
                    onClick={() => navigate(`/problem/${problem.id}`)}
                    className="w-full grid grid-cols-[48px_56px_1fr_100px_100px] gap-2 px-4 py-3 border-b border-[#ffffff06] last:border-b-0 hover:bg-[#ffffff06] items-center transition-colors text-left"
                  >
                    <div className="flex items-center justify-center">
                      {isCompleted ? (
                        <Check size={14} className="text-[#22c55e]" strokeWidth={2.5} />
                      ) : (
                        <Circle size={14} className="text-[#3c3c3c]" />
                      )}
                    </div>
                    <span className="text-xs text-[#5c5c5c] font-mono">{problem.id}</span>
                    <span className="text-xs text-[#eff1f6]">{problem.title}</span>
                    <span className="text-xs text-[#5c5c5c] text-right">
                      {problem.acceptance > 0 ? `${problem.acceptance}%` : '—'}
                    </span>
                    <span className="text-xs text-[#5c5c5c] text-right">
                      {displayDifficulty(problem.difficulty)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-2">
          {filteredProblems.map((problem) => {
            const status = getLessonStatus(problem.id);
            const isCompleted = status === 'completed';

            return (
              <button
                key={problem.id}
                onClick={() => navigate(`/problem/${problem.id}`)}
                className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] text-left transition-colors hover:bg-[#252525] active:scale-[0.98]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {isCompleted ? (
                      <Check size={16} className="text-[#22c55e]" strokeWidth={2.5} />
                    ) : (
                      <Circle size={16} className="text-[#3c3c3c]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-mono text-[#5c5c5c]">#{problem.id}</span>
                      <span className="text-[9px] font-semibold text-[#5c5c5c] uppercase">
                        {displayDifficulty(problem.difficulty)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#eff1f6]">{problem.title}</p>
                    {problem.acceptance > 0 && (
                      <p className="text-[9px] text-[#5c5c5c] mt-0.5">{problem.acceptance}%</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xs text-[#5c5c5c]">No problems found</p>
          </div>
        )}
      </div>
    </div>
  );
}
