import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Check, X, BookOpen, RotateCcw, Play, Send, ChevronRight, GraduationCap, Terminal } from 'lucide-react';
import { getProblemById } from '@/data/problems';
import { getProblemContent } from '@/data/problem-lessons';
import { useProgress } from '@/hooks/useProgress';
import ExerciseCard from '@/components/ExerciseCard';
import CelebrationOverlay from '@/components/CelebrationOverlay';

export default function Problem() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const problemId = parseInt(id || '1', 10);

  const problem = getProblemById(problemId);
  const lesson = getProblemContent(problemId);
  const { completeLesson, progress, getLessonStatus } = useProgress();

  const [activeTab, setActiveTab] = useState<'description' | 'submissions'>('description');
  const [runResult, setRunResult] = useState<{
    correct: boolean;
    testCaseResults: { input: string; expected: string; actual: string; passed: boolean }[];
    message: string;
  } | null>(null);
  const [, setSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [exerciseKey, setExerciseKey] = useState(0); // Used to reset ExerciseCard

  const isCompleted = getLessonStatus(problemId) === 'completed';

  const exercise = lesson?.exercises?.[0] ?? null;
  const testCases = lesson?.testCases ?? [];

  const handleRun = useCallback((correct: boolean) => {
    if (!exercise) return;
    const selectedAnswer = exercise.options[exercise.answer];

    // Build test case results
    const tcResults = testCases.map((tc) => ({
      input: tc.input,
      expected: tc.output,
      actual: correct ? tc.output : selectedAnswer, // If wrong, show what they picked
      passed: correct, // For grammar, we check the exercise, not each test case independently
    }));

    setRunResult({
      correct,
      testCaseResults: tcResults,
      message: correct
        ? 'All test cases passed! Your answer is correct.'
        : 'Your answer did not match the expected output. Review the explanation and try again.',
    });
  }, [exercise, testCases]);

  const handleSubmit = useCallback(() => {
    if (!isCompleted && runResult?.correct) {
      completeLesson(problemId);
      setSubmitted(true);
      setShowCelebration(true);
    }
  }, [completeLesson, isCompleted, problemId, runResult?.correct]);

  const handleReset = useCallback(() => {
    setRunResult(null);
    setExerciseKey(k => k + 1);
  }, []);

  if (!problem || !lesson) {
    return (
      <div className="h-screen bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-[#8c8c8c]">Problem not found</p>
      </div>
    );
  }

  const diffColor = problem.difficulty === 'Beginner' ? '#00b8a3' : problem.difficulty === 'Intermediate' ? '#ffc01e' : '#ff375f';

  return (
    <div className="h-screen flex flex-col bg-[#0f0f0f]">
      {/* Top Bar */}
      <div className="h-[44px] bg-[#1a1a1a] border-b border-[#ffffff10] flex items-center px-5 justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/problems')} className="flex items-center gap-2 text-[#8c8c8c] hover:text-[#eff1f6] transition-colors tap-scale text-xs">
            <ArrowLeft size={16} />
            <span className="font-medium">Problem List</span>
          </button>
          <button
            onClick={() => navigate(`/lesson/${problemId}`)}
            className="flex items-center gap-1.5 text-[#8c8c8c] hover:text-[#ffa116] transition-colors text-xs"
          >
            <GraduationCap size={14} />
            <span>Study</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md" style={{ color: diffColor, backgroundColor: diffColor + '18' }}>
            {problem.difficulty}
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
            <button onClick={() => setActiveTab('submissions')} className={`px-5 py-3 text-xs font-semibold border-b-2 transition-colors ${activeTab === 'submissions' ? 'border-[#ffa116] text-[#eff1f6]' : 'border-transparent text-[#8c8c8c] hover:text-[#eff1f6]'}`}>
              <RotateCcw size={12} className="inline mr-1.5" />Submissions
            </button>
          </div>

          {activeTab === 'description' ? (
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
              <div className="text-sm text-[#c8c8c8] leading-relaxed">
                {exercise?.question ?? 'Practice this grammar concept.'}
              </div>

              {/* Test Cases (Input/Output/Explanation) */}
              {testCases.length > 0 && (
                <div className="space-y-3">
                  {testCases.map((tc, i) => (
                    <div key={i} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#ffffff10]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Example {i + 1}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <span className="text-[11px] font-semibold text-[#8c8c8c] w-20 flex-shrink-0">Input:</span>
                          <span className="text-sm text-[#eff1f6] font-mono">{tc.input}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-[11px] font-semibold text-[#8c8c8c] w-20 flex-shrink-0">Output:</span>
                          <span className="text-sm text-[#ffa116] font-mono">{tc.output}</span>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <span className="text-[11px] font-semibold text-[#8c8c8c] w-20 flex-shrink-0">Explanation:</span>
                          <span className="text-xs text-[#8c8c8c] leading-relaxed">{tc.explanation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Constraints */}
              {lesson.keyConcepts.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-[#5c5c5c] uppercase tracking-wider mb-2">Constraints</h3>
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
          ) : (
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
              {isCompleted && (
                <span className="text-[10px] font-medium text-[#00b8a3] bg-[#00b8a315] px-2 py-0.5 rounded">Solved</span>
              )}
            </div>
            <div className="p-4">
              {exercise ? (
                <ExerciseCard
                  key={exerciseKey}
                  question={exercise.question}
                  options={exercise.options}
                  answer={exercise.answer}
                  explanation={exercise.explanation}
                  onAnswer={handleRun}
                />
              ) : (
                <div className="text-center py-8 text-[#8c8c8c] text-sm">No exercise available for this problem.</div>
              )}
            </div>
          </div>

          {/* Console Panel */}
          {runResult && (
            <div className="border-t border-[#ffffff10] bg-[#0f0f0f] max-h-[280px] overflow-y-auto">
              <div className="h-8 bg-[#1a1a1a] border-b border-[#ffffff08] flex items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={12} className="text-[#8c8c8c]" />
                  <span className="text-[11px] font-semibold text-[#8c8c8c]">Console</span>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${runResult.correct ? 'text-[#00b8a3] bg-[#00b8a315]' : 'text-[#ff375f] bg-[#ff375f15]'}`}>
                  {runResult.correct ? 'Accepted' : 'Wrong Answer'}
                </span>
              </div>
              <div className="p-4 space-y-3">
                {runResult.testCaseResults.map((tc, i) => (
                  <div key={i} className={`rounded-lg p-3 border ${tc.passed ? 'bg-[#00b8a308] border-[#00b8a320]' : 'bg-[#ff375f08] border-[#ff375f20]'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {tc.passed ? (
                        <Check size={14} className="text-[#00b8a3]" />
                      ) : (
                        <X size={14} className="text-[#ff375f]" />
                      )}
                      <span className={`text-xs font-semibold ${tc.passed ? 'text-[#00b8a3]' : 'text-[#ff375f]'}`}>
                        Test Case {i + 1}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex gap-2">
                        <span className="text-[10px] text-[#5c5c5c] w-16">Input:</span>
                        <span className="text-[11px] text-[#c8c8c8] font-mono">{tc.input}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[10px] text-[#5c5c5c] w-16">Expected:</span>
                        <span className="text-[11px] text-[#c8c8c8] font-mono">{tc.expected}</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[10px] text-[#5c5c5c] w-16">Actual:</span>
                        <span className={`text-[11px] font-mono ${tc.passed ? 'text-[#00b8a3]' : 'text-[#ff375f]'}`}>{tc.actual}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-[#8c8c8c]">{runResult.message}</p>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="h-[52px] bg-[#1a1a1a] border-t border-[#ffffff10] flex items-center px-4 gap-3 flex-shrink-0">
            <button
              onClick={handleReset}
              className="h-8 px-4 rounded-lg bg-[#3e3e3e] text-[#eff1f6] font-medium text-xs flex items-center gap-1.5 hover:bg-[#505050] active:bg-[#3e3e3e] transition-colors"
            >
              <Play size={12} /> Run
            </button>
            <button
              onClick={handleSubmit}
              disabled={isCompleted || !runResult?.correct}
              className={`h-8 px-4 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all ${
                isCompleted
                  ? 'bg-[#00b8a320] text-[#00b8a3] cursor-default'
                  : runResult?.correct
                  ? 'bg-[#ffa116] text-[#0f0f0f] hover:bg-[#ffb84d] hover:shadow-[0_0_12px_rgba(255,161,22,0.3)] cursor-pointer'
                  : 'bg-[#282828] text-[#5c5c5c] cursor-not-allowed'
              }`}
            >
              {isCompleted ? <Check size={12} /> : <Send size={12} />}
              {isCompleted ? 'Solved' : 'Submit'}
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
