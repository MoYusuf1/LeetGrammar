/**
 * Landing Page — LeetCode-inspired dark landing for visitors.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowRight,
  Code2,
  GitBranch,
  Target,
  Zap,
  TrendingUp,
  Globe,
  CheckCircle2,
  Play,
  Star,
  Network,
  ChevronRight,
} from 'lucide-react';
import AuthModal from '@/components/AuthModal';

const STATS = [
  { value: '3,685', label: 'Grammar Concepts' },
  { value: '1,698', label: 'Relationships' },
  { value: '50+', label: 'Lessons' },
  { value: '100%', label: 'Free' },
];

const FEATURES = [
  {
    icon: GitBranch,
    title: 'Prerequisite-Aware Paths',
    desc: 'Just like code has dependencies, grammar has prerequisites. The graph ensures you master foundations before advancing.',
  },
  {
    icon: Target,
    title: 'Learning Frontier',
    desc: 'Know exactly what you are ready to learn next. No guesswork, no skipping ahead, no gaps in knowledge.',
  },
  {
    icon: Zap,
    title: 'Spaced Repetition',
    desc: 'Review concepts at the optimal time. The SRS engine schedules reviews based on your personal mastery curve.',
  },
  {
    icon: TrendingUp,
    title: 'Mastery Tracking',
    desc: 'Every concept has a [0,1] mastery score. Watch your knowledge graph light up as you progress.',
  },
  {
    icon: Network,
    title: 'Concept Explorer',
    desc: 'Navigate the full grammar graph. See how topics connect, what they require, and where they lead.',
  },
  {
    icon: Globe,
    title: 'Cultural Context',
    desc: 'Learn not just the rules, but when and how Somali speakers actually use them in daily conversation.',
  },
];

const STEPS = [
  { num: '01', title: 'Explore the Roadmap', desc: 'Browse the full grammar curriculum as an interactive dependency graph.' },
  { num: '02', title: 'Learn a Concept', desc: 'Work through bite-sized lessons with examples, audio, and exercises.' },
  { num: '03', title: 'Practice & Review', desc: 'Reinforce with SRS-powered review sessions tailored to your weak spots.' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);

  // Landing page is now the homepage for all users — no redirect

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
                Somali Grammar, Reimagined
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#eff1f6] leading-[1.1] tracking-tight">
                Master Somali
                <br />
                <span className="text-[#ffa116]">Grammar</span>
              </h1>

              <p className="text-[15px] text-[#8c8c8c] mt-5 max-w-[440px] leading-relaxed">
                A graph-powered learning platform that understands prerequisites,
                tracks mastery, and guides you through Somali grammar with
                the precision of a dependency resolver.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-8">
                <button
                  onClick={() => navigate('/problems')}
                  className="h-12 px-7 rounded-xl bg-[#ffa116] text-[#0f0f0f] text-sm font-bold flex items-center gap-2 hover:bg-[#ffb800] transition-colors"
                >
                  <Play size={16} fill="currentColor" />
                  Start Learning
                </button>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="h-12 px-7 rounded-xl bg-[#141414] border border-[#ffffff10] text-[#eff1f6] text-sm font-semibold flex items-center gap-2 hover:bg-[#1a1a1a] transition-colors"
                >
                  Sign In
                </button>
              </div>

              <p className="text-[11px] text-[#5c5c5c] mt-3">
                No account required to start. Sign in to sync progress across devices.
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
                  <span className="ml-3 text-[10px] text-[#5c5c5c] font-mono">somali-grammar.jsx</span>
                </div>

                {/* Code content */}
                <div className="p-5 font-mono text-[13px] leading-relaxed">
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">1</span>
                    <span><span className="text-[#c586c0]">import</span> <span className="text-[#eff1f6]">{`{ Graph }`}</span> <span className="text-[#c586c0]">from</span> <span className="text-[#ce9178]">&apos;leet-grammar&apos;</span>;</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">2</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">3</span>
                    <span><span className="text-[#569cd6]">const</span> <span className="text-[#4ec9b0]">myPath</span> <span className="text-[#eff1f6]">=</span> <span className="text-[#569cd6]">new</span> <span className="text-[#4ec9b0]">Graph</span><span className="text-[#eff1f6]">()</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">4</span>
                    <span className="pl-4"><span className="text-[#dcdcaa]">.addConcept</span><span className="text-[#eff1f6]">(</span><span className="text-[#ce9178]">&apos;Word Order&apos;</span><span className="text-[#eff1f6]">)</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">5</span>
                    <span className="pl-4"><span className="text-[#dcdcaa]">.addConcept</span><span className="text-[#eff1f6]">(</span><span className="text-[#ce9178]">&apos;Present Tense&apos;</span><span className="text-[#eff1f6]">)</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">6</span>
                    <span className="pl-4"><span className="text-[#dcdcaa]">.requires</span><span className="text-[#eff1f6]">(</span><span className="text-[#ce9178]">&apos;Future Tense&apos;</span><span className="text-[#eff1f6]">,</span> <span className="text-[#ce9178]">&apos;Infinitive&apos;</span><span className="text-[#eff1f6]">);</span></span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">7</span>
                  </div>
                  <div className="flex">
                    <span className="text-[#5c5c5c] select-none w-6 text-right mr-4">8</span>
                    <span><span className="text-[#c586c0]">await</span> <span className="text-[#4ec9b0]">myPath</span><span className="text-[#dcdcaa]">.learn</span><span className="text-[#eff1f6]">();</span> <span className="text-[#6a9955]">// Begin your journey</span></span>
                  </div>

                  {/* Output */}
                  <div className="mt-4 pt-4 border-t border-[#ffffff08]">
                    <div className="flex items-center gap-2 text-[#22c55e]">
                      <CheckCircle2 size={14} />
                      <span className="text-xs font-medium">3,685 concepts loaded</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#22c55e] mt-1">
                      <CheckCircle2 size={14} />
                      <span className="text-xs font-medium">1,698 relationships mapped</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#ffa116] mt-1">
                      <Zap size={14} />
                      <span className="text-xs font-medium">Next: Present Habitual Tense</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#1a1a1a] border border-[#ffffff10] rounded-xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#22c55e]20 flex items-center justify-center">
                    <TrendingUp size={16} className="text-[#22c55e]" />
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
                A curriculum built on <span className="text-[#ffa116]">dependencies</span>
              </h2>
              <p className="text-[15px] text-[#8c8c8c] leading-relaxed mb-6">
                Traditional apps throw random lessons at you. LeetGrammar knows you need
                <span className="text-[#eff1f6]"> Word Order </span>
                before
                <span className="text-[#eff1f6]"> Tense Conjugation</span>,
                because the graph models real grammatical dependencies — not just a table of contents.
              </p>
              <button
                onClick={() => navigate('/roadmap')}
                className="text-sm text-[#ffa116] font-semibold flex items-center gap-1 hover:underline"
              >
                Explore the full roadmap
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-6">
              <div className="space-y-3">
                {[
                  { label: 'Somali Alphabet & Sounds', done: true },
                  { label: 'Greetings & Introductions', done: true },
                  { label: 'Word Order (SOV)', done: true },
                  { label: 'Personal Pronouns', done: true },
                  { label: 'Present Habitual Tense', done: false, current: true },
                  { label: 'Past Simple Tense', done: false },
                  { label: 'Future Tense', done: false },
                  { label: 'Focus Markers (baa, ayaa)', done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-[#22c55e]15' : item.current ? 'bg-[#ffa116]15' : 'bg-[#1a1a1a] border border-[#ffffff08]'}`}>
                      {item.done ? (
                        <CheckCircle2 size={13} className="text-[#22c55e]" />
                      ) : item.current ? (
                        <Code2 size={13} className="text-[#ffa116]" />
                      ) : (
                        <span className="text-[9px] text-[#5c5c5c]">{i + 1}</span>
                      )}
                    </div>
                    <p className={`text-[13px] ${item.done ? 'text-[#5c5c5c] line-through' : item.current ? 'text-[#eff1f6] font-medium' : 'text-[#8c8c8c]'}`}>
                      {item.label}
                    </p>
                    {item.current && (
                      <span className="text-[10px] text-[#ffa116] font-medium ml-auto px-2 py-0.5 rounded bg-[#ffa116]10">Next</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Graph tech explanation ─── */}
      <div className="px-4 py-20 border-t border-[#ffffff08]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">Why Graphs?</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#eff1f6]">How graph technology facilitates learning</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[800px] mx-auto">
            {[
              {
                title: 'Prerequisite Awareness',
                desc: 'Learners see why a topic matters before studying it. The graph surfaces every dependency, so you always know what foundation a concept rests on.',
              },
              {
                title: 'No Knowledge Gaps',
                desc: 'Traditional linear curricula let learners skip around. The graph enforces prerequisites — you cannot learn the Future Tense without first mastering the Infinitive.',
              },
              {
                title: 'Adaptive Paths',
                desc: 'The graph reroutes around known material and reinforces weak nodes. Your path is unique to your knowledge state, not a one-size-fits-all playlist.',
              },
              {
                title: 'Contextual Review',
                desc: 'Spaced repetition tied to concept nodes — not isolated flashcards. When you review, credit travels down to prerequisites while penalties flag what needs work.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
                <h3 className="text-sm font-bold text-[#eff1f6] mb-2">{item.title}</h3>
                <p className="text-xs text-[#8c8c8c] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Bottom CTA ─── */}
      <div className="px-4 py-20 border-t border-[#ffffff08]">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#eff1f6]">Ready to start your journey?</h2>
          <p className="text-[15px] text-[#8c8c8c] mt-3 max-w-[440px] mx-auto">
            Join thousands of learners mastering Somali grammar through the power of graph technology.
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => navigate('/problems')}
              className="h-12 px-7 rounded-xl bg-[#ffa116] text-[#0f0f0f] text-sm font-bold flex items-center gap-2 hover:bg-[#ffb800] transition-colors"
            >
              Start Learning
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setAuthOpen(true)}
              className="h-12 px-7 rounded-xl bg-[#141414] border border-[#ffffff10] text-[#eff1f6] text-sm font-semibold flex items-center gap-2 hover:bg-[#1a1a1a] transition-colors"
            >
              Sign In
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

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </div>
  );
}
