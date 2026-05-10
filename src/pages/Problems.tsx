import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Search, Check, Lock, Circle, Shuffle } from 'lucide-react';
import { allProblems, getAllTags } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';

export default function Problems() {
  const navigate = useNavigate();
  const { progress, getLessonStatus } = useProgress();

  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  const allTags = getAllTags();

  const filteredProblems = useMemo(() => {
    return allProblems.filter((p) => {
      const matchesSearch =
        search === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesDifficulty = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
      const matchesTag = tagFilter === 'all' || p.tags.includes(tagFilter);

      const status = getLessonStatus(p.id);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'solved' && status === 'completed') ||
        (statusFilter === 'unsolved' && status !== 'completed');

      return matchesSearch && matchesDifficulty && matchesTag && matchesStatus;
    });
  }, [search, difficultyFilter, statusFilter, tagFilter, progress]);

  const solvedCount = allProblems.filter((p) => getLessonStatus(p.id) === 'completed').length;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#00b8a3';
      case 'Intermediate': return '#ffc01e';
      case 'Advanced': return '#ff375f';
      default: return '#8c8c8c';
    }
  };

  const handleRandom = () => {
    const unsolved = allProblems.filter((p) => getLessonStatus(p.id) !== 'completed');
    const pool = unsolved.length > 0 ? unsolved : allProblems;
    const random = pool[Math.floor(Math.random() * pool.length)];
    navigate(`/problem/${random.id}`);
  };

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Search & Filters Bar */}
      <div className="px-8 py-5 border-b border-[#ffffff10] bg-[#0f0f0f]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-[#eff1f6]">Problem Set</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRandom}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#ffffff10] text-[#8c8c8c] hover:text-[#eff1f6] hover:bg-[#ffffff15] text-xs font-medium transition-colors tap-scale"
              >
                <Shuffle size={13} />
                Pick One
              </button>
              <span className="text-sm text-[#8c8c8c]">
                <span className="text-[#eff1f6] font-semibold">{solvedCount}</span> / {allProblems.length}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-[400px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c5c5c]" size={15} />
              <input
                type="text"
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 bg-[#1a1a1a] border border-[#3e3e3e] rounded-lg text-sm text-[#eff1f6] placeholder-[#5c5c5c] focus:outline-none focus:border-[#ffa116] transition-colors"
              />
            </div>

            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="h-9 px-3 bg-[#1a1a1a] border border-[#3e3e3e] rounded-lg text-sm text-[#eff1f6] focus:outline-none focus:border-[#ffa116] cursor-pointer"
            >
              <option value="all" className="bg-[#1a1a1a]">All Difficulties</option>
              <option value="Beginner" className="bg-[#1a1a1a]">Beginner</option>
              <option value="Intermediate" className="bg-[#1a1a1a]">Intermediate</option>
              <option value="Advanced" className="bg-[#1a1a1a]">Advanced</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 bg-[#1a1a1a] border border-[#3e3e3e] rounded-lg text-sm text-[#eff1f6] focus:outline-none focus:border-[#ffa116] cursor-pointer"
            >
              <option value="all" className="bg-[#1a1a1a]">All Status</option>
              <option value="solved" className="bg-[#1a1a1a]">Solved</option>
              <option value="unsolved" className="bg-[#1a1a1a]">Unsolved</option>
            </select>

            <select
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
              className="h-9 px-3 bg-[#1a1a1a] border border-[#3e3e3e] rounded-lg text-sm text-[#eff1f6] focus:outline-none focus:border-[#ffa116] cursor-pointer"
            >
              <option value="all" className="bg-[#1a1a1a]">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag} className="bg-[#1a1a1a]">{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Problem Table */}
      <div className="px-8 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div className="border border-[#ffffff10] rounded-xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[52px_56px_1fr_100px_100px_140px] gap-2 px-5 py-3 bg-[#1a1a1a] border-b border-[#ffffff10] text-[11px] font-semibold text-[#8c8c8c] uppercase tracking-wider sticky top-0">
              <div>Status</div>
              <div>#</div>
              <div>Title</div>
              <div className="text-right">Acceptance</div>
              <div className="text-right">Difficulty</div>
              <div className="text-right">Tags</div>
            </div>

            {/* Table Rows */}
            <div>
              {filteredProblems.map((problem) => {
                const status = getLessonStatus(problem.id);
                const isCompleted = status === 'completed';
                const isLocked = status === 'locked';
                const diffColor = getDifficultyColor(problem.difficulty);

                return (
                  <button
                    key={problem.id}
                    onClick={() => { if (!isLocked) navigate(`/problem/${problem.id}`); }}
                    disabled={isLocked}
                    className={`w-full grid grid-cols-[52px_56px_1fr_100px_100px_140px] gap-2 px-5 py-3 text-left transition-colors border-b border-[#ffffff08] last:border-b-0
                      ${isLocked ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#ffffff08] cursor-pointer'}
                    `}
                  >
                    {/* Status */}
                    <div className="flex items-center justify-center">
                      {isCompleted ? (
                        <div className="w-[18px] h-[18px] rounded-full bg-[#00b8a3] flex items-center justify-center">
                          <Check size={11} className="text-[#0f0f0f]" strokeWidth={3} />
                        </div>
                      ) : isLocked ? (
                        <Lock size={15} className="text-[#5c5c5c]" />
                      ) : (
                        <Circle size={15} className="text-[#3e3e3e]" />
                      )}
                    </div>

                    {/* ID */}
                    <span className="text-sm text-[#8c8c8c] flex items-center font-mono">
                      {problem.id}
                    </span>

                    {/* Title */}
                    <span className={`text-sm flex items-center ${isLocked ? 'text-[#5c5c5c]' : 'text-[#eff1f6]'}`}>
                      {problem.title}
                    </span>

                    {/* Acceptance */}
                    <span className="text-sm text-[#8c8c8c] flex items-center justify-end">
                      {problem.acceptance > 0 ? `${problem.acceptance}%` : '—'}
                    </span>

                    {/* Difficulty */}
                    <span className="text-sm font-medium flex items-center justify-end" style={{ color: diffColor }}>
                      {problem.difficulty}
                    </span>

                    {/* Tags */}
                    <div className="flex items-center justify-end gap-1 flex-wrap">
                      {problem.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] text-[#5c5c5c] bg-[#ffffff10] px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredProblems.length === 0 && (
              <div className="px-4 py-16 text-center">
                <Search size={32} className="text-[#3e3e3e] mx-auto mb-3" />
                <p className="text-sm text-[#8c8c8c]">No problems match your filters.</p>
                <button
                  onClick={() => { setSearch(''); setDifficultyFilter('all'); setStatusFilter('all'); setTagFilter('all'); }}
                  className="mt-2 text-xs text-[#ffa116] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
