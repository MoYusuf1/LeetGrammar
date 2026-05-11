/**
 * Lesson Page Layout — Babbel-style Sidebar + Content
 *
 * Left sidebar (~220px) with sticky section nav + progress.
 * Main content fills remaining width. Best space utilization.
 */

import type { ReactNode } from 'react';

export interface LessonSection {
  id: string;
  label: string;
  icon: React.ElementType;
  hasContent: boolean;
}

export interface LessonLayoutProps {
  lessonId: number;
  title: string;
  difficulty: string;
  diffColor: string;
  tags: string[];
  isCompleted: boolean;
  sections: LessonSection[];
  readSections: Set<string>;
  onScrollTo: (id: string) => void;
  onPractice: () => void;
  onNext?: () => void;
  hasNext: boolean;
  children: ReactNode;
}

export function LessonLayoutB(props: LessonLayoutProps) {
  const {
    title, difficulty, diffColor, tags, isCompleted,
    sections, readSections, onScrollTo, onPractice, onNext, hasNext,
    children,
  } = props;

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      <div className="max-w-[1200px] mx-auto px-4 py-6 flex gap-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:block w-[220px] flex-shrink-0">
          <div className="sticky top-16 space-y-4">
            {/* Title */}
            <div>
              <h1 className="text-base font-bold text-[#eff1f6] leading-snug">{title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ color: diffColor, backgroundColor: diffColor + '15' }}>
                  {difficulty}
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-[#ffffff08] text-[#5c5c5c]">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Section Nav */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-3">
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2 px-1">Sections</p>
              <div className="space-y-0.5">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isRead = readSections.has(section.id);
                  return (
                    <button
                      key={section.id}
                      onClick={() => onScrollTo(section.id)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-medium text-left transition-colors ${
                        isRead ? 'text-[#00b8a3]' : 'text-[#8c8c8c] hover:text-[#c8c8c8]'
                      }`}
                    >
                      <Icon size={12} />
                      <span className="flex-1">{section.label}</span>
                      {isRead && <span className="text-[10px]">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <button
                onClick={onPractice}
                className="w-full h-10 rounded-xl text-xs font-bold text-[#0f0f0f] bg-[#ffa116] hover:bg-[#ffb800] transition-all flex items-center justify-center gap-1.5"
              >
                {isCompleted ? 'Practice Again' : 'Practice'}
              </button>
              {hasNext && (
                <button
                  onClick={onNext}
                  className="w-full h-10 rounded-xl text-xs font-semibold text-[#8c8c8c] bg-[#141414] border border-[#ffffff08] hover:text-[#eff1f6] hover:border-[#ffffff15] transition-all flex items-center justify-center gap-1.5"
                >
                  Next Lesson →
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-5 pb-20">
          {/* Mobile title */}
          <div className="lg:hidden">
            <h1 className="text-xl font-bold text-[#eff1f6]">{title}</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ color: diffColor, backgroundColor: diffColor + '15' }}>
                {difficulty}
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-[#ffffff08] text-[#5c5c5c]">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          {children}
        </main>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0f0f0f]/95 backdrop-blur-md border-t border-[#ffffff10] z-30">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onPractice} className="flex-1 h-10 rounded-xl text-sm font-bold text-[#0f0f0f] bg-[#ffa116]">
            {isCompleted ? 'Practice Again' : 'Practice'}
          </button>
          {hasNext && (
            <button onClick={onNext} className="h-10 px-4 rounded-xl text-sm font-semibold text-[#8c8c8c] bg-[#141414] border border-[#ffffff08]">
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Revealable Example Card ─── */

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function RevealableExample({
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
    <div className="rounded-xl border border-[#ffffff10] bg-[#0f0f0f] p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
          Example {index + 1}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex gap-3">
          <span className="text-[11px] font-semibold text-[#5c5c5c] w-20 flex-shrink-0 uppercase">Prompt</span>
          <span className="text-sm text-[#eff1f6] font-mono">{input}</span>
        </div>

        {!revealed ? (
          <button
            onClick={() => setRevealed(true)}
            className="w-full mt-1 py-2.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] text-xs text-[#8c8c8c] hover:text-[#eff1f6] hover:border-[#ffffff15] transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye size={13} />
            Reveal Answer
          </button>
        ) : (
          <>
            <div className="flex gap-3">
              <span className="text-[11px] font-semibold text-[#5c5c5c] w-20 flex-shrink-0 uppercase">Answer</span>
              <span className="text-sm text-[#ffa116] font-mono">{output}</span>
            </div>
            <div className="flex gap-3 pt-1">
              <span className="text-[11px] font-semibold text-[#5c5c5c] w-20 flex-shrink-0 uppercase">Why</span>
              <span className="text-xs text-[#b0b0b0] leading-relaxed">{explanation}</span>
            </div>
            <button
              onClick={() => setRevealed(false)}
              className="mt-1 text-[10px] text-[#5c5c5c] hover:text-[#8c8c8c] flex items-center gap-1 transition-colors"
            >
              <EyeOff size={11} /> Hide answer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
