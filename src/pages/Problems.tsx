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
    <div className="min-h-full bg-[#0f0f0f]">
      {/* ─── Header ─── */}
      <div className="px-6 pt-6 pb-4 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#eff1f6]">Problem List</h1>
          <span className="text-sm text-[#8c8c8c]">
            <span className="text-[#eff1f6] font-semibold">{solvedCount}</span> / {allProblems.length}
          </span>
        </div>
      </div>

      {/* ─── Filter Bar ─── */}
      <div className="px-6 pb-4 max-w-[1200px] mx-auto">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c]" size={14} />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-4 bg-[#1a1a1a] border border-[#3e3e3e] rounded-lg text-sm text-[#eff1f6] placeholder-[#5c5c5c] focus:outline-none focus:border-[#ffa116] transition-colors"
            />
          </div>

          {/* Difficulty pills */}
          <div className="flex items-center gap-1.5">
            {[
              { key: 'Beginner', label: 'Easy', color: '#00b8a3' },
              { key: 'Intermediate', label: 'Medium', color: '#ffc01e' },
              { key: 'Advanced', label: 'Hard', color: '#ff375f' },
            ].map((d) => (
              <button
                key={d.key}
                onClick={() => setDifficultyFilter((prev) => prev === d.key ? 'all' : d.key)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                  difficultyFilter === d.key
                    ? 'bg-[#ffffff15] text-[#eff1f6]'
                    : 'bg-[#1a1a1a] text-[#5c5c5c] hover:text-[#8c8c8c]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Status pills */}
          <div className="flex items-center gap-1.5">
            {[
              { key: 'solved', label: 'Solved' },
              { key: 'unsolved', label: 'Unsolved' },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => setStatusFilter((prev) => prev === s.key ? 'all' : s.key)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                  statusFilter === s.key
                    ? 'bg-[#ffffff15] text-[#eff1f6]'
                    : 'bg-[#1a1a1a] text-[#5c5c5c] hover:text-[#8c8c8c]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] text-[#5c5c5c] hover:text-[#ef4444] transition-colors"
            >
              <RotateCcw size={11} />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* ─── Problem Table ─── */}
      <div className="px-6 pb-8 max-w-[1200px] mx-auto">
        <div className="border border-[#ffffff10] rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[44px_48px_1fr_80px_80px] sm:grid-cols-[48px_56px_1fr_100px_100px] gap-2 px-4 sm:px-5 py-3 bg-[#1a1a1a] border-b border-[#ffffff10] text-[11px] font-semibold text-[#8c8c8c] uppercase tracking-wider">
            <div className="text-center">Status</div>
            <div>#</div>
            <div>Title</div>
            <div className="text-right hidden sm:block">Acceptance</div>
            <div className="text-right">Difficulty</div>
          </div>

          {/* Table Rows */}
          <div>
            {filteredProblems.map((problem) => {
              const status = getLessonStatus(problem.id);
              const isCompleted = status === 'completed';
              const diffColor = getDifficultyColor(problem.difficulty);

              return (
                <div
                  key={problem.id}
                  className="grid grid-cols-[44px_48px_1fr_80px_80px] sm:grid-cols-[48px_56px_1fr_100px_100px] gap-2 px-4 sm:px-5 py-3 text-left transition-colors border-b border-[#ffffff06] last:border-b-0 hover:bg-[#ffffff06] items-center"
                >
                  {/* Status */}
                  <div className="flex items-center justify-center">
                    {isCompleted ? (
                      <div className="w-[18px] h-[18px] rounded-full bg-[#00b8a3] flex items-center justify-center">
                        <Check size={11} className="text-[#0f0f0f]" strokeWidth={3} />
                      </div>
                    ) : (
                      <Circle size={15} className="text-[#3e3e3e]" />
                    )}
                  </div>

                  {/* ID */}
                  <span className="text-sm text-[#5c5c5c] font-mono">
                    {problem.id}
                  </span>

                  {/* Title */}
                  <div className="min-w-0">
                    <button
                      onClick={() => navigate(`/problem/${problem.id}`)}
                      className="text-sm text-[#eff1f6] hover:text-[#ffa116] transition-colors text-left truncate block"
                    >
                      {problem.title}
                    </button>
                    {problem.isPremium && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#ffc01e] mt-0.5">
                        <Lock size={10} /> Premium
                      </span>
                    )}
                  </div>

                  {/* Acceptance */}
                  <span className="text-sm text-[#8c8c8c] text-right hidden sm:block">
                    {problem.acceptance > 0 ? `${problem.acceptance}%` : '—'}
                  </span>

                  {/* Difficulty */}
                  <span className="text-sm font-medium text-right" style={{ color: diffColor }}>
                    {displayDifficulty(problem.difficulty)}
                  </span>
                </div>
              );
            })}
          </div>

          {filteredProblems.length === 0 && (
            <div className="px-4 py-16 text-center">
              <Search size={32} className="text-[#3e3e3e] mx-auto mb-3" />
              <p className="text-sm text-[#8c8c8c]">No problems match your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-2 text-xs text-[#ffa116] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
