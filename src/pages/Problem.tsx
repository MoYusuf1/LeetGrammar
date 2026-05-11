import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Check, BookOpen, RotateCcw, Send, ChevronRight, GraduationCap, ListChecks, Eye } from 'lucide-react';
import { getProblemById, displayDifficulty } from '@/data/problems';
import { getProblemContent } from '@/data/problem-lessons';
import { useProgress } from '@/hooks/useProgress';
import CelebrationOverlay from '@/components/CelebrationOverlay';
import { DrillRunner } from '@/components/DrillRunner';

function RevealableProblemExample({
  index,
  input,
  output,
  explanation,
}: {
  index: number;
  input: string;
  output: string;
  explanation: string;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#ffffff10]">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Example {index + 1}</span>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <span className="text-[11px] font-semibold text-[#8c8c8c] w-20 flex-shrink-0">Prompt:</span>
          <span className="text-sm text-[#eff1f6] font-mono">{input}</span>
        </div>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full mt-1 py-2 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-xs text-[#8c8c8c] hover:text-[#eff1f6] hover:border-[#ffffff15] transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye size={13} />
            Reveal Answer
          </button>
        ) : (
          <>
            <div className="flex gap-2">
              <span className="text-[11px] font-semibold text-[#8c8c8c] w-20 flex-shrink-0">Answer:</span>
              <span className="text-sm text-[#ffa116] font-mono">{output}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <span className="text-[11px] font-semibold text-[#8c8c8c] w-20 flex-shrink-0">Explanation:</span>
              <span className="text-xs text-[#b0b0b0] leading-relaxed">{explanation}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Problem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const problemId = parseInt(id || '1', 10);

  const problem = getProblemById(problemId);
  const lesson = getProblemContent(problemId);
  const { completeLesson, progress, getLessonStatus } = useProgress();

  const [activeTab, setActiveTab] = useState<'description' | 'examples' | 'submissions'>('description');
  const [drillPassed, setDrillPassed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [drillKey, setDrillKey] = useState(0);

  const isCompleted = getLessonStatus(problemId) === 'completed';

  const drills = lesson?.drills ?? [];
  const hasDrills = drills.length > 0;

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

  if (!problem || !lesson) {
    return (
      <div className="h-full bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-[#8c8c8c]">Problem not found</p>
      </div>
    );
  }

  const diffColor = problem.difficulty === 'Beginner' ? '#00b8a3' : problem.difficulty === 'Intermediate' ? '#ffc01e' : '#ff375f';

  return (
    <div className="h-full flex flex-col bg-[#0f0f0f]">
      {/* Top Bar — no back button, study link moved to exercise */}
      <div className="h-[44px] bg-[#1a1a1a] border-b border-[#ffffff10] flex items-center px-5 justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold text-[#eff1f6]">{problem.id}. {problem.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md" style={{ color: diffColor, backgroundColor: diffColor + '18' }}>
            {displayDifficulty(problem.difficulty)}
          </span>
          {isCompleted && (
            <span className="text-xs text-[#00b8a3] font-medium flex items-center gap-1">
              <Check size={12} /> Solved
            </span>
          )}
        </div>
      </div>

      {/* Split Pane */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left — Description */}
        <div className="flex-1 overflow-y-auto border-r border-[#ffffff10]">
          <div className="flex border-b border-[#ffffff10] bg-[#0f0f0f] sticky top-0 z-10">
            <button onClick={() => setActiveTab('description')} className={`px-5 py-3 text-xs font-semibold border-b-2 transition-colors ${activeTab === 'description' ? 'border-[#ffa116] text-[#eff1f6]' : 'border-transparent text-[#8c8c8c] hover:text-[#eff1f6]'}`}>
              <BookOpen size={12} className="inline mr-1.5" />Description
            </button>
            <button onClick={() => setActiveTab('examples')} className={`px-5 py-3 text-xs font-semibold border-b-2 transition-colors ${activeTab === 'examples' ? 'border-[#ffa116] text-[#eff1f6]' : 'border-transparent text-[#8c8c8c] hover:text-[#eff1f6]'}`}>
              <ListChecks size={12} className="inline mr-1.5" />Examples{(lesson?.testCases?.length ?? 0) > 0 && <span className="ml-1 text-[10px] text-[#5c5c5c]">({lesson?.testCases?.length})</span>}
            </button>
            <button onClick={() => setActiveTab('submissions')} className={`px-5 py-3 text-xs font-semibold border-b-2 transition-colors ${activeTab === 'submissions' ? 'border-[#ffa116] text-[#eff1f6]' : 'border-transparent text-[#8c8c8c] hover:text-[#eff1f6]'}`}>
              <RotateCcw size={12} className="inline mr-1.5" />Submissions
            </button>
          </div>

          {activeTab === 'description' && (
            <div className="p-6 space-y-5 max-w-[720px]">
              {/* Title */}
              <div>
                <h1 className="text-xl font-semibold text-[#eff1f6]">{problem.id}. {problem.title}</h1>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {problem.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-[#ffffff10] text-[#8c8c8c]">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Problem Statement */}
              <div className="text-[15px] text-[#d4d4d4] leading-relaxed">
                {lesson?.exercises?.[0]?.question ?? 'Practice this grammar concept.'}
              </div>

              {/* Constraints */}
              {lesson.keyConcepts.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-[#5c5c5c] uppercase tracking-wider mb-2">Key Concepts</h3>
                  <ul className="space-y-1.5">
                    {lesson.keyConcepts.slice(0, 4).map((concept, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#8c8c8c]">
                        <span className="text-[#5c5c5c] mt-0.5">•</span>
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'examples' && (
            <div className="p-6 space-y-4 max-w-[720px]">
              {(lesson?.testCases?.length ?? 0) > 0 ? (
                lesson!.testCases!.map((tc, i) => (
                  <RevealableProblemExample
                    key={i}
                    index={i}
                    input={tc.input}
                    output={tc.output}
                    explanation={tc.explanation}
                  />
                ))
              ) : (
                <p className="text-sm text-[#8c8c8c]">No examples for this problem.</p>
              )}
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="p-6">
              <div className="text-center py-8">
                <RotateCcw size={24} className="text-[#3e3e3e] mx-auto mb-2" />
                <p className="text-sm text-[#8c8c8c]">Submission history coming soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Right — Solve */}
        <div className="flex-1 flex flex-col bg-[#0f0f0f] overflow-hidden border-l border-[#ffffff10]">
          {/* Exercise Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="h-[40px] bg-[#1a1a1a] border-b border-[#ffffff10] flex items-center px-4 sticky top-0 z-10 justify-between">
              <span className="text-xs font-semibold text-[#8c8c8c] uppercase tracking-wider">Exercise</span>
              <div className="flex items-center gap-2">
                {isCompleted && (
                  <span className="text-[10px] font-medium text-[#00b8a3] bg-[#00b8a315] px-2 py-0.5 rounded">Solved</span>
                )}
                <button
                  onClick={() => navigate(`/lesson/${problemId}`)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#ffa116]15 text-[#ffa116] hover:bg-[#ffa116]25 transition-colors text-[11px] font-medium"
                >
                  <GraduationCap size={12} />
                  Study
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {hasDrills ? (
                <DrillRunner
                  key={drillKey}
                  drills={drills}
                  onComplete={handleDrillComplete}
                  onRetry={handleDrillRetry}
                />
              ) : lesson?.exercises?.[0] ? (
                <div className="p-4">
                  <p className="text-sm text-[#8c8c8c] mb-4">This lesson uses the legacy exercise format.</p>
                  {/* Legacy fallback could go here */}
                </div>
              ) : (
                <div className="text-center py-8 text-[#8c8c8c] text-sm">No drills available for this problem yet.</div>
              )}
            </div>
          </div>

          {/* Action Bar */}
          <div className="h-[52px] bg-[#1a1a1a] border-t border-[#ffffff10] flex items-center px-4 gap-3 flex-shrink-0">
            <button
              onClick={handleResetDrills}
              className="h-8 px-4 rounded-lg bg-[#3e3e3e] text-[#eff1f6] font-medium text-xs flex items-center gap-1.5 hover:bg-[#505050] active:bg-[#3e3e3e] transition-colors"
            >
              <RotateCcw size={12} /> Reset
            </button>
            <button
              onClick={handleSubmit}
              disabled={isCompleted || !drillPassed}
              className={`h-8 px-4 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all ${
                isCompleted
                  ? 'bg-[#00b8a320] text-[#00b8a3] cursor-default'
                  : drillPassed
                  ? 'bg-[#ffa116] text-[#0f0f0f] hover:bg-[#ffb84d] hover:shadow-[0_0_12px_rgba(255,161,22,0.3)] cursor-pointer'
                  : 'bg-[#282828] text-[#5c5c5c] cursor-not-allowed'
              }`}
            >
              {isCompleted ? <Check size={12} /> : <Send size={12} />}
              {isCompleted ? 'Solved' : drillPassed ? 'Submit' : 'Complete drills to submit'}
            </button>
            {isCompleted && (
              <button
                onClick={() => navigate(`/problem/${problemId + 1}`)}
                className="ml-auto h-8 px-3 rounded-lg border border-[#ffffff15] text-[#8c8c8c] hover:text-[#eff1f6] hover:border-[#ffffff30] hover:bg-[#ffffff08] text-xs flex items-center gap-1 transition-all"
              >
                Next <ChevronRight size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {showCelebration && <CelebrationOverlay xp={10} streak={progress.streak} onContinue={() => { setShowCelebration(false); }} />}
    </div>
  );
}
