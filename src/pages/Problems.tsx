/**
 * Problems.tsx — Problem list with roadmap section filtering.
 *
 * Shows all problems by default.
 * When accessed from Roadmap, filters by section automatically.
 */

import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Search, Check, Circle, RotateCcw } from 'lucide-react';
import { allProblems, displayDifficulty, problemSections } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';

export default function Problems() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { getLessonStatus } = useProgress();

  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sectionFilter, setSectionFilter] = useState<number | null>(null);

  // Load section filter from URL
  useEffect(() => {
    const section = searchParams.get('section');
    if (section) {
      setSectionFilter(parseInt(section, 10));
    }
  }, [searchParams]);

  const filteredProblems = useMemo(() => {
    return allProblems.filter((p) => {
      const matchesSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
      const status = getLessonStatus(p.id);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'solved' && status === 'completed') ||
        (statusFilter === 'unsolved' && status !== 'completed');
      const matchesSection = sectionFilter === null || p.sectionId === sectionFilter;

      return matchesSearch && matchesDifficulty && matchesStatus && matchesSection;
    });
  }, [search, difficultyFilter, statusFilter, sectionFilter]);

  const solvedCount = allProblems.filter((p) => getLessonStatus(p.id) === 'completed').length;
  const hasFilters = search || difficultyFilter !== 'all' || statusFilter !== 'all';

  const clearFilters = () => {
    setSearch('');
    setDifficultyFilter('all');
    setStatusFilter('all');
  };

  const currentSection = sectionFilter !== null ? problemSections.find((s) => s.id === sectionFilter) : null;

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-[#eff1f6]">Problems</h1>
            {currentSection && <p className="text-[10px] text-[#8c8c8c] mt-0.5">{currentSection.name}</p>}
          </div>
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['Beginner', 'Intermediate', 'Advanced'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter((prev) => (prev === d ? 'all' : d))}
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
              onClick={() => setStatusFilter((prev) => (prev === s ? 'all' : s))}
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

      {/* Problems list */}
      <div className="px-4 pb-20 sm:pb-8">
        <div className="space-y-1">
          {filteredProblems.map((problem) => {
            const status = getLessonStatus(problem.id);
            const isCompleted = status === 'completed';

            return (
              <button
                key={problem.id}
                onClick={() => navigate(`/problem/${problem.id}`)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] hover:bg-[#252525] active:scale-[0.98] transition-all text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <Check size={14} className="text-[#22c55e]" strokeWidth={2.5} />
                    ) : (
                      <Circle size={14} className="text-[#3c3c3c]" />
                    )}
                  </div>
                  <span className="text-xs font-mono text-[#5c5c5c]">#{problem.id}</span>
                  <span className="text-xs font-semibold text-[#eff1f6] truncate">{problem.title}</span>
                </div>
                <span className="text-[10px] text-[#5c5c5c] ml-2 flex-shrink-0">
                  {displayDifficulty(problem.difficulty)}
                </span>
              </button>
            );
          })}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-xs text-[#5c5c5c]">No problems found</p>
          </div>
        )}
      </div>
    </div>
  );
}
