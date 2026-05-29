/**
 * Problem.tsx — Mobile-first problem solver.
 *
 * Mobile: Stacked (drill first, then description below)
 * Desktop: Side-by-side (description left, drill right)
 */

import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Check, BookOpen, RotateCcw, Send, ChevronLeft, GraduationCap, ListChecks } from 'lucide-react';
import { getProblemById, displayDifficulty } from '@/data/problems';
import { getDrillsForProblem, hasDrills } from '@/data/problem-drills';
import { useProgress } from '@/hooks/useProgress';
import CelebrationOverlay from '@/components/CelebrationOverlay';
import { DrillRunner } from '@/components/DrillRunner';

export default function Problem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const problemId = parseInt(id || '1', 10);

  const problem = getProblemById(problemId);
  const { completeLesson, getLessonStatus } = useProgress();

  const [activeTab, setActiveTab] = useState<'description' | 'examples' | 'submissions'>('description');
  const [drillPassed, setDrillPassed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [drillKey, setDrillKey] = useState(0);

  const isCompleted = getLessonStatus(problemId) === 'completed';
  const drills = getDrillsForProblem(problemId);
  const problemHasDrills = hasDrills(problemId);

  const handleDrillComplete = useCallback((_score: number, _total: number, passed: boolean) => {
    if (passed) {
      setDrillPassed(true);
    }
  }, []);

  const handleDrillRetry = useCallback(() => {
    setDrillPassed(false);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isCompleted && drillPassed) {
      completeLesson(problemId);
      setShowCelebration(true);
    }
  }, [completeLesson, isCompleted, problemId, drillPassed]);

  const handleResetDrills = useCallback(() => {
    setDrillPassed(false);
    setDrillKey((k) => k + 1);
  }, []);

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-[#8c8c8c]">Problem not found</p>
      </div>
    );
  }

  const diffColor = problem.difficulty === 'Beginner' ? '#00b8a3' : problem.difficulty === 'Intermediate' ? '#ffc01e' : '#ff375f';

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-[#ffffff10] px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/problems')} className="flex items-center gap-2 text-[#5c5c5c] hover:text-[#eff1f6] transition-colors">
            <ChevronLeft size={16} />
            <span className="text-xs font-semibold">Back</span>
          </button>
          <h1 className="text-sm font-bold text-[#eff1f6] flex-1 text-center">#{problem.id} {problem.title}</h1>
          <span className="text-[10px] font-bold px-2 py-1 rounded" style={{ color: diffColor, backgroundColor: diffColor + '20' }}>
            {displayDifficulty(problem.difficulty)}
          </span>
        </div>
      </div>

      {/* Layout: Mobile stacked, Desktop side-by-side */}
      <div className="flex flex-col lg:flex-row">
        {/* Drill section — full width on mobile, right half on desktop */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-[#ffffff10] p-4 lg:p-6 min-h-screen lg:min-h-auto lg:overflow-y-auto">
          <div className="space-y-4">
            {/* Drill header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#5c5c5c] uppercase tracking-wider">Exercise</h2>
              {isCompleted && (
                <span className="text-[10px] font-bold text-[#22c55e] bg-[#22c55e15] px-2 py-0.5 rounded">Solved</span>
              )}
            </div>

            {/* Drill runner */}
            {problemHasDrills ? (
              <div className="bg-[#1a1a1a] border border-[#ffffff08] rounded-xl p-4">
                <DrillRunner
                  key={drillKey}
                  drills={drills}
                  onComplete={handleDrillComplete}
                  onRetry={handleDrillRetry}
                />
              </div>
            ) : (
              <div className="text-center py-8 text-[#8c8c8c] text-sm">No drills available for this problem yet.</div>
            )}

            {/* Submit button */}
            {drillPassed && !isCompleted && (
              <button
                onClick={handleSubmit}
                className="w-full py-3 rounded-xl bg-[#ffa116] text-[#0f0f0f] font-bold transition-all active:scale-[0.98]"
              >
                <Check size={14} className="inline mr-2" />
                Mark Complete
              </button>
            )}

            {drillPassed && isCompleted && (
              <div className="text-center py-4 rounded-xl bg-[#22c55e15] border border-[#22c55e30]">
                <p className="text-xs font-bold text-[#22c55e]">✓ Problem Completed</p>
              </div>
            )}
          </div>
        </div>

        {/* Description section — hidden on mobile, left half on desktop */}
        <div className="hidden lg:flex lg:w-1/2 lg:flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#ffffff10] bg-[#0f0f0f] sticky top-0 z-10">
            {['description', 'examples', 'submissions'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 px-4 py-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#ffa116] text-[#eff1f6]'
                    : 'border-transparent text-[#8c8c8c] hover:text-[#eff1f6]'
                }`}
              >
                {tab === 'description' ? 'Description' : tab === 'examples' ? 'Examples' : 'Submissions'}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'description' && (
              <div className="space-y-4 max-w-[600px]">
                <div>
                  <h2 className="text-lg font-bold text-[#eff1f6] mb-2">{problem.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-1 rounded bg-[#ffffff10] text-[#8c8c8c]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-[#d4d4d4] leading-relaxed">{problem.description}</p>
                {problem.tags.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-[#5c5c5c] uppercase tracking-wider mb-2">Concepts</h3>
                    <ul className="space-y-1">
                      {problem.tags.map((tag, i) => (
                        <li key={i} className="text-xs text-[#8c8c8c]">• {tag.replace(/-/g, ' ')}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="max-w-[600px]">
                <p className="text-sm text-[#8c8c8c]">
                  The exercises on the left contain {drills.length} interactive examples. Complete them to unlock submission.
                </p>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="text-center py-8">
                <RotateCcw size={20} className="text-[#3e3e3e] mx-auto mb-2" />
                <p className="text-sm text-[#8c8c8c]">Submission history coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile description — shown below drill on small screens */}
      <div className="lg:hidden px-4 py-6 border-t border-[#ffffff10]">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#eff1f6]">{problem.title}</h2>
            <div className="flex flex-wrap gap-2">
              {problem.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-1 rounded bg-[#ffffff10] text-[#8c8c8c]">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#d4d4d4] leading-relaxed">{problem.description}</p>
          </div>
        )}
      </div>

      {showCelebration && <CelebrationOverlay />}
    </div>
  );
}
