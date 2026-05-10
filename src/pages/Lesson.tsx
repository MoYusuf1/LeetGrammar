import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft, BookOpen, Lightbulb, CheckCircle, AlertTriangle,
  ChevronRight, ListChecks, Bookmark, Check
} from 'lucide-react';
import { getProblemById } from '@/data/problems';
import { getProblemContent } from '@/data/problem-lessons';
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
  const { getLessonStatus, completeLesson } = useProgress();

  const [readSections, setReadSections] = useState<Set<string>>(new Set());

  const status = getLessonStatus(lessonId);
  const isCompleted = status === 'completed';

  const markSection = (section: string) => {
    setReadSections((prev) => new Set(prev).add(section));
  };

  if (!problem || !lesson) {
    return (
      <div className="h-screen bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-[#8c8c8c]">Lesson not found</p>
      </div>
    );
  }

  const diffColor = problem.difficulty === 'Beginner' ? '#00b8a3' : problem.difficulty === 'Intermediate' ? '#ffc01e' : '#ff375f';

  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen, hasContent: !!lesson.overview },
    { id: 'rule', label: 'Key Rule', icon: Lightbulb, hasContent: !!lesson.rule },
    { id: 'examples', label: 'Examples', icon: ListChecks, hasContent: (lesson.testCases ?? []).length > 0 },
    { id: 'concepts', label: 'Concepts', icon: Bookmark, hasContent: lesson.keyConcepts.length > 0 },
    { id: 'mistakes', label: 'Mistakes', icon: AlertTriangle, hasContent: lesson.commonMistakes.length > 0 },
    { id: 'ref', label: 'Quick Ref', icon: CheckCircle, hasContent: lesson.quickRef.length > 0 },
  ].filter((s) => s.hasContent);

  const readCount = sections.filter((s) => readSections.has(s.id)).length;
  const readPct = sections.length > 0 ? Math.round((readCount / sections.length) * 100) : 0;

  return (
    <div className="min-h-full bg-[#0f0f0f] pb-24">
      {/* Top Bar */}
      <div className="sticky top-0 z-20 bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-[#ffffff10]">
        <div className="max-w-[800px] mx-auto px-5 py-3.5 flex items-center justify-between">
          <button
            onClick={() => navigate('/learn')}
            className="flex items-center gap-1.5 text-[#8c8c8c] hover:text-[#eff1f6] transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Learn</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-1.5 bg-[#282828] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#ffa116] transition-all duration-500"
                  style={{ width: `${readPct}%` }}
                />
              </div>
              <span className="text-[10px] text-[#8c8c8c] font-medium">{readPct}%</span>
            </div>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-md"
              style={{ color: diffColor, backgroundColor: diffColor + '15', border: `1px solid ${diffColor}25` }}
            >
              {problem.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-[800px] mx-auto px-5 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-mono text-[#5c5c5c]">Lesson {lessonId}</span>
          {isCompleted && (
            <span className="text-[10px] font-medium text-[#00b8a3] bg-[#00b8a315] px-1.5 py-0.5 rounded flex items-center gap-1">
              <Check size={10} strokeWidth={3} /> Completed
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-[#eff1f6] leading-tight">{problem.title}</h1>
        <div className="flex gap-2 mt-3 flex-wrap">
          {problem.tags.map((tag) => (
            <span key={tag} className="text-[11px] px-2.5 py-1 rounded-full bg-[#ffffff08] text-[#8c8c8c] border border-[#ffffff08]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-[800px] mx-auto px-5 mb-6">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isRead = readSections.has(section.id);
            return (
              <button
                key={section.id}
                onClick={() => {
                  const el = document.getElementById(`section-${section.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  isRead
                    ? 'bg-[#00b8a315] text-[#00b8a3] border border-[#00b8a325]'
                    : 'bg-[#1a1a1a] text-[#8c8c8c] border border-[#ffffff08] hover:border-[#ffffff15]'
                }`}
              >
                <Icon size={12} />
                {section.label}
                {isRead && <Check size={10} strokeWidth={3} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-5 space-y-4">

        {/* Overview */}
        {lesson.overview && (
          <section id="section-overview" className="rounded-xl border border-[#ffffff10] bg-[#111111] overflow-hidden" onMouseEnter={() => markSection('overview')}>
            <div className="px-5 py-3 border-b border-[#ffffff08] flex items-center gap-2">
              <BookOpen size={14} className="text-[#ffa116]" />
              <h2 className="text-xs font-bold text-[#8c8c8c] uppercase tracking-wider">Overview</h2>
            </div>
            <div className="p-5 text-sm text-[#c8c8c8] leading-relaxed">
              <Markdown text={lesson.overview} />
            </div>
          </section>
        )}

        {/* Key Rule */}
        {lesson.rule && (
          <section id="section-rule" className="rounded-xl border border-[#ffa11630] bg-[#ffa11608] overflow-hidden" onMouseEnter={() => markSection('rule')}>
            <div className="px-5 py-3 border-b border-[#ffa11615] flex items-center gap-2">
              <Lightbulb size={14} className="text-[#ffa116]" />
              <h2 className="text-xs font-bold text-[#ffa116] uppercase tracking-wider">Key Rule</h2>
            </div>
            <div className="p-5 text-sm text-[#eff1f6] leading-relaxed">
              <Markdown text={lesson.rule} />
            </div>
          </section>
        )}

        {/* Examples */}
        {(lesson.testCases ?? []).length > 0 && (
          <section id="section-examples" className="rounded-xl border border-[#ffffff10] bg-[#111111] overflow-hidden" onMouseEnter={() => markSection('examples')}>
            <div className="px-5 py-3 border-b border-[#ffffff08] flex items-center gap-2">
              <ListChecks size={14} className="text-[#00b8a3]" />
              <h2 className="text-xs font-bold text-[#8c8c8c] uppercase tracking-wider">Examples</h2>
            </div>
            <div className="p-5 space-y-4">
              {(lesson.testCases ?? []).map((tc, i) => (
                <div key={i} className="rounded-lg border border-[#ffffff08] bg-[#0f0f0f] p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-5 h-5 rounded-full bg-[#282828] flex items-center justify-center text-[10px] font-bold text-[#8c8c8c]">{i + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-3">
                      <span className="text-[11px] font-semibold text-[#5c5c5c] w-20 flex-shrink-0 uppercase">Input</span>
                      <span className="text-sm text-[#eff1f6] font-mono">{tc.input}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-[11px] font-semibold text-[#5c5c5c] w-20 flex-shrink-0 uppercase">Output</span>
                      <span className="text-sm text-[#ffa116] font-mono">{tc.output}</span>
                    </div>
                    <div className="flex gap-3 pt-1">
                      <span className="text-[11px] font-semibold text-[#5c5c5c] w-20 flex-shrink-0 uppercase">Why</span>
                      <span className="text-xs text-[#8c8c8c] leading-relaxed">{tc.explanation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Concepts */}
        {lesson.keyConcepts.length > 0 && (
          <section id="section-concepts" className="rounded-xl border border-[#ffffff10] bg-[#111111] overflow-hidden" onMouseEnter={() => markSection('concepts')}>
            <div className="px-5 py-3 border-b border-[#ffffff08] flex items-center gap-2">
              <Bookmark size={14} className="text-[#a855f7]" />
              <h2 className="text-xs font-bold text-[#8c8c8c] uppercase tracking-wider">Key Concepts</h2>
            </div>
            <div className="p-5">
              <ul className="space-y-3">
                {lesson.keyConcepts.map((concept, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#a855f715] border border-[#a855f720] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-[#a855f7]">{i + 1}</span>
                    </div>
                    <p className="text-sm text-[#c8c8c8] leading-relaxed pt-0.5">{concept}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Rich Examples with Breakdowns */}
        {lesson.examples.length > 0 && (
          <section className="rounded-xl border border-[#ffffff10] bg-[#111111] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#ffffff08] flex items-center gap-2">
              <ListChecks size={14} className="text-[#3b82f6]" />
              <h2 className="text-xs font-bold text-[#8c8c8c] uppercase tracking-wider">In Context</h2>
            </div>
            <div className="p-5 space-y-4">
              {lesson.examples.map((ex, i) => (
                <div key={i} className="rounded-lg border border-[#ffffff08] bg-[#0f0f0f] p-4">
                  <p className="text-sm font-medium text-[#eff1f6] mb-1">{ex.english}</p>
                  {ex.literal && <p className="text-xs text-[#8c8c8c] italic mb-2">{ex.literal}</p>}
                  <p className="text-base font-medium text-[#eff1f6] mb-3 font-mono" dir="ltr">{ex.somali}</p>
                  {ex.breakdown && ex.breakdown.length > 0 && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3 border-t border-[#ffffff08]">
                      {ex.breakdown.map((word, wi) => (
                        <span key={wi} className="text-xs">
                          <span style={{ color: getWordColor(word.role) }} className="font-semibold">{word.word}</span>
                          <span className="text-[#5c5c5c] ml-0.5">({word.role})</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Common Mistakes */}
        {lesson.commonMistakes.length > 0 && (
          <section id="section-mistakes" className="rounded-xl border border-[#ff375f20] bg-[#ff375f05] overflow-hidden" onMouseEnter={() => markSection('mistakes')}>
            <div className="px-5 py-3 border-b border-[#ff375f10] flex items-center gap-2">
              <AlertTriangle size={14} className="text-[#ff375f]" />
              <h2 className="text-xs font-bold text-[#ff375f] uppercase tracking-wider">Watch Out For</h2>
            </div>
            <div className="p-5 space-y-3">
              {lesson.commonMistakes.map((m, i) => (
                <div key={i} className="rounded-lg border border-[#ff375f15] bg-[#ff375f08] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#ff375f15] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-[#ff375f]">{i + 1}</span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <p className="text-xs text-[#ff7b7b] line-through">{m.mistake}</p>
                      <p className="text-sm text-[#00b8a3]">{m.correction}</p>
                      <p className="text-xs text-[#8c8c8c] leading-relaxed">{m.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Reference */}
        {lesson.quickRef.length > 0 && (
          <section id="section-ref" className="rounded-xl border border-[#ffffff10] bg-[#111111] overflow-hidden" onMouseEnter={() => markSection('ref')}>
            <div className="px-5 py-3 border-b border-[#ffffff08] flex items-center gap-2">
              <CheckCircle size={14} className="text-[#00b8a3]" />
              <h2 className="text-xs font-bold text-[#8c8c8c] uppercase tracking-wider">Quick Reference</h2>
            </div>
            <div className="divide-y divide-[#ffffff08]">
              {lesson.quickRef.map((ref, i) => (
                <div key={i} className="flex justify-between items-center px-5 py-3">
                  <span className="text-sm text-[#8c8c8c]">{ref.label}</span>
                  <span className="text-sm text-[#eff1f6] font-semibold font-mono">{ref.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/95 backdrop-blur-md border-t border-[#ffffff10] z-30">
        <div className="max-w-[800px] mx-auto px-5 py-3 flex items-center gap-3">
          {!isCompleted && (
            <button
              onClick={() => {
                completeLesson(lessonId);
              }}
              className="h-11 px-4 rounded-xl font-semibold text-sm text-[#22c55e] bg-[#22c55e]15 border border-[#22c55e]30 hover:bg-[#22c55e]25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Check size={16} strokeWidth={3} />
              Mark Done
            </button>
          )}
          <button
            onClick={() => navigate(`/problem/${lessonId}`)}
            className="flex-1 h-11 rounded-xl font-semibold text-sm text-[#0f0f0f] bg-[#ffa116] hover:bg-[#ffb84d] hover:shadow-[0_0_20px_rgba(255,161,22,0.25)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {isCompleted ? 'Practice Again' : 'Practice This Lesson'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
