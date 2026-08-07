/**
 * Landing Page — LeetCode-inspired dark landing for visitors.
 */

import { useNavigate } from 'react-router';
import {
  ArrowRight,
  Code2,
  BookOpen,
  Layers,
  Volume2,
  Printer,
  CheckCircle2,
  Play,
  Star,
  Save,
  ChevronRight,
} from 'lucide-react';
import { LESSON_LIST } from '@/data/teaching-content';
import { VOCAB_COUNT } from '@/data/vocabulary';

const STATS = [
  { value: String(LESSON_LIST.length), label: 'Lessons' },
  { value: `${VOCAB_COUNT}+`, label: 'Vocabulary Words' },
  { value: '100%', label: 'Free' },
  { value: '0', label: 'Accounts Needed' },
];

const FEATURES = [
  {
    icon: Layers,
    title: 'Bite-Sized Cards',
    desc: 'Every lesson breaks down into intro, vocabulary, teaching, and practice cards — a few minutes at a time, not a wall of text.',
  },
  {
    icon: BookOpen,
    title: 'A Real Curriculum',
    desc: '26 lessons covering Somali grammar from phonetics to advanced sentence construction, in a deliberate learning order.',
  },
  {
    icon: Volume2,
    title: 'Vocabulary Built In',
    desc: `${VOCAB_COUNT}+ hand-curated high-frequency words, introduced exactly when you need them for each lesson.`,
  },
  {
    icon: Printer,
    title: 'Printable Worksheets',
    desc: 'Every lesson has a matching worksheet you can practice on screen or print for offline study, with an answer key.',
  },
  {
    icon: CheckCircle2,
    title: 'Practice That Sticks',
    desc: 'Multiple choice, fill-in-the-blank, unscramble, translation, and marker-identification exercises — not just flashcards.',
  },
  {
    icon: Save,
    title: 'Your Progress, Your Device',
    desc: 'No account, no sign-up. Progress, streaks, and XP are saved right on this device.',
  },
];

const STEPS = [
  { num: '01', title: 'Pick a Lesson', desc: 'Browse the 26-lesson course and start wherever you are.' },
  { num: '02', title: 'Work Through the Cards', desc: 'Intro, vocabulary, teaching, and practice — one card at a time.' },
  { num: '03', title: 'Practice & Print', desc: 'Check your answers, then print a worksheet to reinforce offline.' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-[#0f0f0f] overflow-y-auto">
      {/* ─── Hero ─── */}
      <div className="relative px-4 pt-16 pb-20 overflow-hidden">
        {/* subtle radial glow behind hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ffa116] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffa116]10 border border-[#ffa116]20 text-[11px] font-bold text-[#ffa116] uppercase tracking-wider mb-6">
                <Star size={12} />
                Somali Grammar, One Lesson at a Time
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#eff1f6] leading-[1.1] tracking-tight">
                Learn Somali
                <br />
                <span className="text-[#ffa116]">Grammar</span>
              </h1>

              <p className="text-[15px] text-[#8c8c8c] mt-5 max-w-[440px] leading-relaxed">
                A focused, card-based course through Somali grammar — vocabulary,
                teaching, and practice bundled into 26 lessons you can work
                through at your own pace.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <button
                  onClick={() => navigate('/learn')}
                  className="h-12 px-7 rounded-xl bg-[#ffa116] text-[#0f0f0f] text-sm font-bold flex items-center gap-2 hover:bg-[#ffb800] transition-colors"
                >
                  <Play size={16} fill="currentColor" />
                  Start Learning
                </button>
              </div>

              <p className="text-[11px] text-[#5c5c5c] mt-3">
                Free, no account needed. Your progress is saved on this device.
              </p>
            </div>

            {/* Right: code window */}
            <div className="relative hidden lg:block">
              <div className="rounded-xl bg-[#141414] border border-[#ffffff08] overflow-hidden shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#ffffff08]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 text-[10px] text-[#5c5c5c] font-mono">lesson-01.somali</span>
                </div>

                {/* Card preview content */}
                <div className="p-5 font-mono text-[13px] leading-relaxed">
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">1</span>
                    <span className="text-[#ffa116]">Lesson 1 — Foundations &amp; Phonetics</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">2</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">3</span>
                    <span><span className="text-[#569cd6]">somali</span>: <span className="text-[#ce9178]">&quot;Nabad, magacaagu waa maxay?&quot;</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">4</span>
                    <span><span className="text-[#569cd6]">english</span>: <span className="text-[#ce9178]">&quot;Hello, what is your name?&quot;</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">5</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">6</span>
                    <span><span className="text-[#dcdcaa]">practice</span><span className="text-[#eff1f6]">(</span><span className="text-[#ce9178]">&apos;fill_blank&apos;</span><span className="text-[#eff1f6]">)</span></span>
                  </div>

                  {/* Output */}
                  <div className="mt-4 pt-4 border-t border-[#ffffff08]">
                    <div className="flex items-center gap-2 text-[#22c55e]">
                      <CheckCircle2 size={14} />
                      <span className="text-xs font-medium">{LESSON_LIST.length} lessons loaded</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#22c55e] mt-1">
                      <CheckCircle2 size={14} />
                      <span className="text-xs font-medium">{VOCAB_COUNT}+ vocabulary words</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#ffa116] mt-1">
                      <BookOpen size={14} />
                      <span className="text-xs font-medium">Next: Nouns — Gender &amp; Number</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#1a1a1a] border border-[#ffffff10] rounded-xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#22c55e]20 flex items-center justify-center">
                    <Save size={16} className="text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-[#eff1f6]">Day 12 Streak</p>
                    <p className="text-[10px] text-[#5c5c5c]">Keep it going!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Stats bar ─── */}
      <div className="border-y border-[#ffffff08] bg-[#0a0a0a]">
        <div className="max-w-[1100px] mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[#eff1f6]">{s.value}</p>
                <p className="text-[11px] text-[#5c5c5c] uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── How it works ─── */}
      <div className="px-4 py-20">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#eff1f6]">Three steps to fluency</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div key={step.num} className="rounded-xl bg-[#141414] border border-[#ffffff08] p-6 hover:border-[#ffffff12] transition-colors">
                <span className="text-3xl font-bold text-[#ffa116] opacity-30">{step.num}</span>
                <h3 className="text-sm font-bold text-[#eff1f6] mt-3 mb-2">{step.title}</h3>
                <p className="text-xs text-[#8c8c8c] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Features ─── */}
      <div className="px-4 py-20 border-t border-[#ffffff08]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#eff1f6]">Everything you need to learn Somali</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5 hover:border-[#ffffff12] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#ffa116]10 border border-[#ffa116]20 flex items-center justify-center mb-4 group-hover:bg-[#ffa116]15 transition-colors">
                    <Icon size={18} className="text-[#ffa116]" />
                  </div>
                  <h3 className="text-sm font-bold text-[#eff1f6] mb-1">{f.title}</h3>
                  <p className="text-xs text-[#8c8c8c] leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── Curriculum preview ─── */}
      <div className="px-4 py-20 border-t border-[#ffffff08]">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">Curriculum</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#eff1f6] mb-4">
                A course built in <span className="text-[#ffa116]">order</span>
              </h2>
              <p className="text-[15px] text-[#8c8c8c] leading-relaxed mb-6">
                Each lesson builds on the last — sounds and phonetics first, then
                nouns, pronouns, and verbs, working up to full sentence
                construction and fluent conversation.
              </p>
              <button
                onClick={() => navigate('/learn')}
                className="text-sm text-[#ffa116] font-semibold flex items-center gap-1 hover:underline"
              >
                Explore the full course
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-6">
              <div className="space-y-3">
                {LESSON_LIST.slice(0, 8).map((lesson, i) => (
                  <div key={lesson.lessonId} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 bg-[#1a1a1a] border border-[#ffffff08]">
                      <span className="text-[9px] text-[#5c5c5c]">{i + 1}</span>
                    </div>
                    <p className="text-[13px] text-[#8c8c8c] truncate">{lesson.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom CTA ─── */}
      <div className="px-4 py-20 border-t border-[#ffffff08]">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#eff1f6]">Ready to start your journey?</h2>
          <p className="text-[15px] text-[#8c8c8c] mt-3 max-w-[440px] mx-auto">
            No account, no cost. Jump straight into Lesson 1.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => navigate('/learn')}
              className="h-12 px-7 rounded-xl bg-[#ffa116] text-[#0f0f0f] text-sm font-bold flex items-center gap-2 hover:bg-[#ffb800] transition-colors"
            >
              Start Learning
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Footer ─── */}
      <div className="border-t border-[#ffffff08] px-4 py-8">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#ffa116] flex items-center justify-center">
              <Code2 size={13} className="text-[#1a1a1a]" strokeWidth={2.5} />
            </div>
            <span className="text-xs font-bold text-[#eff1f6]">
              Leet<span className="text-[#ffa116]">Grammar</span>
            </span>
          </div>
          <p className="text-[11px] text-[#5c5c5c]">
            Built with care for Somali language learners everywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
