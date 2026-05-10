import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, BookOpen, Lightbulb, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import { getProblemById } from '@/data/problems';
import { getProblemContent } from '@/data/problemLessons';
import { useProgress } from '@/hooks/useProgress';
import { Markdown } from '@/components/Markdown';

const WORD_COLORS: Record<string, string> = {
  noun: '#79c0ff', verb: '#7ee787', adjective: '#ffa657',
  preposition: '#d2a8ff', particle: '#ff7b72', clitic: '#56d4dd',
  focus: '#ff7b72', conjunction: '#e3b341', default: '#8b949e',
};

function getWordColor(role: string): string {
  const lower = role.toLowerCase();
  if (lower.includes('noun')) return WORD_COLORS.noun;
  if (lower.includes('verb')) return WORD_COLORS.verb;
  if (lower.includes('adject')) return WORD_COLORS.adjective;
  if (lower.includes('preposition')) return WORD_COLORS.preposition;
  if (lower.includes('particle') || lower.includes('focus')) return WORD_COLORS.particle;
  if (lower.includes('clitic')) return WORD_COLORS.clitic;
  if (lower.includes('conjunction') || lower.includes('connector')) return WORD_COLORS.conjunction;
  return WORD_COLORS.default;
}

export default function Lesson() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lessonId = parseInt(id || '1', 10);

  const problem = getProblemById(lessonId);
  const lesson = getProblemContent(lessonId);
  const { getLessonStatus } = useProgress();

  const status = getLessonStatus(lessonId);
  const isCompleted = status === 'completed';

  if (!problem || !lesson) {
    return (
      <div className="h-screen bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-[#8c8c8c]">Lesson not found</p>
      </div>
    );
  }

  const diffColor = problem.difficulty === 'Beginner' ? '#00b8a3' : problem.difficulty === 'Intermediate' ? '#ffc01e' : '#ff375f';

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-[#ffffff10]">
        <div className="max-w-[900px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/roadmap')}
              className="flex items-center gap-1.5 text-[#8c8c8c] hover:text-[#eff1f6] transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              <span>Roadmap</span>
            </button>
            <div className="w-px h-4 bg-[#ffffff15]" />
            <span className="text-sm text-[#5c5c5c]">Lesson {lessonId}</span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-md"
              style={{ color: diffColor, backgroundColor: diffColor + '18' }}
            >
              {problem.difficulty}
            </span>
            {isCompleted && (
              <span className="text-xs text-[#00b8a3] font-medium flex items-center gap-1">
                <CheckCircle size={12} /> Completed
              </span>
            )}
            <button
              onClick={() => navigate(`/problem/${lessonId}`)}
              className="flex items-center gap-1.5 text-xs font-medium text-[#0f0f0f] bg-[#ffa116] hover:bg-[#e69115] px-3 py-1.5 rounded-lg transition-colors"
            >
              Practice <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[900px] mx-auto px-6 py-8 space-y-8">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-[#eff1f6]">{problem.title}</h1>
          <div className="flex gap-2 mt-3 flex-wrap">
            {problem.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-[#ffffff10] text-[#8c8c8c]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Overview */}
        <section>
          <h2 className="text-sm font-bold text-[#eff1f6] mb-3 flex items-center gap-2">
            <BookOpen size={16} className="text-[#ffa116]" />
            Overview
          </h2>
          <div className="text-sm text-[#c8c8c8] leading-relaxed space-y-3">
            <Markdown text={lesson.overview} />
          </div>
        </section>

        {/* Key Rule */}
        {lesson.rule && (
          <div className="bg-[#ffa11610] rounded-xl p-5 border border-[#ffa11630]">
            <h3 className="text-sm font-bold text-[#ffa116] mb-3 flex items-center gap-1.5">
              <Lightbulb size={14} />
              Key Rule
            </h3>
            <div className="text-sm text-[#eff1f6] leading-relaxed">
              <Markdown text={lesson.rule} />
            </div>
          </div>
        )}

        {/* Key Concepts */}
        {lesson.keyConcepts.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-[#eff1f6] mb-3">Key Concepts</h2>
            <ul className="space-y-2">
              {lesson.keyConcepts.map((concept, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#c8c8c8]">
                  <span className="w-5 h-5 rounded-full bg-[#ffa11615] text-[#ffa116] text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <Markdown text={concept} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Test Cases (Input/Output format like LeetCode) */}
        {lesson.testCases.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-[#eff1f6] mb-4">Examples</h2>
            <div className="space-y-3">
              {lesson.testCases.map((tc, i) => (
                <div key={i} className="bg-[#1a1a1a] rounded-xl p-5 border border-[#ffffff10]">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Example {i + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-3">
                      <span className="text-[11px] font-semibold text-[#8c8c8c] w-20 flex-shrink-0">Input:</span>
                      <span className="text-sm text-[#eff1f6] font-mono">{tc.input}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[11px] font-semibold text-[#8c8c8c] w-20 flex-shrink-0">Output:</span>
                      <span className="text-sm text-[#ffa116] font-mono">{tc.output}</span>
                    </div>
                    <div className="flex gap-3 pt-1">
                      <span className="text-[11px] font-semibold text-[#8c8c8c] w-20 flex-shrink-0">Explanation:</span>
                      <span className="text-xs text-[#8c8c8c] leading-relaxed">{tc.explanation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Common Mistakes */}
        {lesson.commonMistakes.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-[#eff1f6] mb-4 flex items-center gap-2">
              <AlertTriangle size={14} className="text-[#ff375f]" />
              Common Mistakes
            </h2>
            <div className="space-y-3">
              {lesson.commonMistakes.map((m, i) => (
                <div key={i} className="bg-[#ff375f08] rounded-xl p-4 border border-[#ff375f20]">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#ff375f15] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-[#ff375f]">{i + 1}</span>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs text-[#ff375f] font-medium line-through">{m.mistake}</p>
                      <p className="text-sm text-[#00b8a3]">{m.correction}</p>
                      <p className="text-xs text-[#8c8c8c]">{m.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Reference */}
        {lesson.quickRef.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-[#eff1f6] mb-3">Quick Reference</h2>
            <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#ffffff10]">
              {lesson.quickRef.map((ref, i) => (
                <div
                  key={i}
                  className={`flex justify-between px-5 py-3 ${i < lesson.quickRef.length - 1 ? 'border-b border-[#ffffff08]' : ''}`}
                >
                  <span className="text-xs font-medium text-[#8c8c8c]">{ref.label}</span>
                  <span className="text-xs text-[#eff1f6] font-semibold text-right">{ref.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Practice CTA */}
        <div className="pt-4 pb-12">
          <button
            onClick={() => navigate(`/problem/${lessonId}`)}
            className="w-full py-3.5 rounded-xl font-semibold text-sm text-[#0f0f0f] bg-[#ffa116] hover:bg-[#e69115] transition-colors flex items-center justify-center gap-2"
          >
            {isCompleted ? 'Practice Again' : 'Start Practice'} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
