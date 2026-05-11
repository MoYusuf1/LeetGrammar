import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  BookOpen, Lightbulb, CheckCircle, AlertTriangle,
  ListChecks, Bookmark
} from 'lucide-react';
import { getProblemById, allProblems, displayDifficulty } from '@/data/problems';
import { getProblemContent } from '@/data/problem-lessons';
import { useProgress } from '@/hooks/useProgress';
import { Markdown } from '@/components/Markdown';
import { LessonLayoutB, RevealableExample } from './lesson-mocks';

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

  const [readSections, setReadSections] = useState<Set<string>>(new Set());

  const status = getLessonStatus(lessonId);
  const isCompleted = status === 'completed';

  const markSection = (section: string) => {
    setReadSections((prev) => new Set(prev).add(section));
  };

  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Find next problem in the same unit
  const nextProblem = (() => {
    if (!problem) return null;
    const unitProblems = allProblems
      .filter((p) => p.unitId === problem.unitId)
      .sort((a, b) => a.id - b.id);
    const idx = unitProblems.findIndex((p) => p.id === problem.id);
    return unitProblems[idx + 1] ?? null;
  })();

  if (!problem || !lesson) {
    return (
      <div className="h-screen bg-[#0f0f0f] flex items-center justify-center">
        <p className="text-[#8c8c8c]">Lesson not found</p>
      </div>
    );
  }

  const diffColor = problem.difficulty === 'Beginner' ? '#00b8a3' : problem.difficulty === 'Intermediate' ? '#ffc01e' : '#ff375f';
  const diffLabel = displayDifficulty(problem.difficulty);

  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen, hasContent: !!lesson.overview },
    { id: 'rule', label: 'Key Rule', icon: Lightbulb, hasContent: !!lesson.rule },
    { id: 'examples', label: 'Examples', icon: ListChecks, hasContent: (lesson.testCases ?? []).length > 0 },
    { id: 'concepts', label: 'Concepts', icon: Bookmark, hasContent: lesson.keyConcepts.length > 0 },
    { id: 'mistakes', label: 'Mistakes', icon: AlertTriangle, hasContent: lesson.commonMistakes.length > 0 },
    { id: 'ref', label: 'Quick Ref', icon: CheckCircle, hasContent: lesson.quickRef.length > 0 },
  ].filter((s) => s.hasContent);

  return (
    <LessonLayoutB
      lessonId={lessonId}
      title={problem.title}
      difficulty={diffLabel}
      diffColor={diffColor}
      tags={problem.tags}
      isCompleted={isCompleted}
      sections={sections}
      readSections={readSections}
      onScrollTo={scrollTo}
      onPractice={() => navigate(`/problem/${lessonId}`)}
      onNext={nextProblem ? () => navigate(`/lesson/${nextProblem.id}`) : undefined}
      hasNext={!!nextProblem}
    >
      {/* ─── Overview ─── */}
      {lesson.overview && (
        <section id="section-overview" className="rounded-xl border border-[#ffffff10] bg-[#141414] overflow-hidden" onMouseEnter={() => markSection('overview')}>
          <div className="px-5 py-3 border-b border-[#ffffff08] flex items-center gap-2">
            <BookOpen size={14} className="text-[#ffa116]" />
            <h2 className="text-xs font-bold text-[#8c8c8c] uppercase tracking-wider">Overview</h2>
          </div>
          <div className="p-5">
            <Markdown text={lesson.overview} />
          </div>
        </section>
      )}

      {/* ─── Key Rule ─── */}
      {lesson.rule && (
        <section id="section-rule" className="rounded-xl border border-[#ffa11630] bg-[#ffa11608] overflow-hidden" onMouseEnter={() => markSection('rule')}>
          <div className="px-5 py-3 border-b border-[#ffa11615] flex items-center gap-2">
            <Lightbulb size={14} className="text-[#ffa116]" />
            <h2 className="text-xs font-bold text-[#ffa116] uppercase tracking-wider">Key Rule</h2>
          </div>
          <div className="p-5">
            <Markdown text={lesson.rule} />
          </div>
        </section>
      )}

      {/* ─── Examples (revealable answers) ─── */}
      {(lesson.testCases ?? []).length > 0 && (
        <section id="section-examples" className="rounded-xl border border-[#ffffff10] bg-[#141414] overflow-hidden" onMouseEnter={() => markSection('examples')}>
          <div className="px-5 py-3 border-b border-[#ffffff08] flex items-center gap-2">
            <ListChecks size={14} className="text-[#00b8a3]" />
            <h2 className="text-xs font-bold text-[#8c8c8c] uppercase tracking-wider">Examples</h2>
          </div>
          <div className="p-5 space-y-4">
            {(lesson.testCases ?? []).map((tc, i) => (
              <RevealableExample
                key={i}
                index={i}
                input={tc.input}
                output={tc.output}
                explanation={tc.explanation}
              />
            ))}
          </div>
        </section>
      )}

      {/* ─── Key Concepts ─── */}
      {lesson.keyConcepts.length > 0 && (
        <section id="section-concepts" className="rounded-xl border border-[#ffffff10] bg-[#141414] overflow-hidden" onMouseEnter={() => markSection('concepts')}>
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
                  <p className="text-[15px] text-[#d4d4d4] leading-relaxed pt-0.5">{concept}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ─── Rich Examples with Breakdowns ─── */}
      {lesson.examples.length > 0 && (
        <section className="rounded-xl border border-[#ffffff10] bg-[#141414] overflow-hidden">
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

      {/* ─── Common Mistakes ─── */}
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
                    <p className="text-xs text-[#b0b0b0] leading-relaxed">{m.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Quick Reference ─── */}
      {lesson.quickRef.length > 0 && (
        <section id="section-ref" className="rounded-xl border border-[#ffffff10] bg-[#141414] overflow-hidden" onMouseEnter={() => markSection('ref')}>
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
    </LessonLayoutB>
  );
}
