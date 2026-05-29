/**
 * RuleCard — Phase A: grammar rule + interlinear gloss examples.
 *
 * Teaching methodology:
 *   1. "The Rule" — one clear principle
 *   2. "Why it matters" — real listening scenario
 *   3. Interlinear gloss examples (Somali / TAG / english stacked)
 *   4. Pattern summary
 *   5. CTA to start practice
 */

import { ArrowRight, Ear, BookOpen } from 'lucide-react';
import type { LevelData } from '@/data/drill-content';

interface RuleCardProps {
  level: LevelData;
  onStart: () => void;
}

/** Listening context for each level — why this skill matters in real audio */
const LISTENING_CONTEXT: Record<number, string> = {
  1: 'In a Somali movie, the average sentence flies by in under 2 seconds. Before you can understand meaning, you need to recognise the sentence type. Is it a declaration? A question? A focus? This level trains that reflex.',
  2: 'The same sentence — same words, same verb — can mean "he ate" or "IT WAS HIM who ate." The marker is the only difference. Train your ear to catch which one it is.',
  3: 'Native Somali is fast. Wuu, bay, waxaan — these fly out as single sounds. This level teaches you to unfuse them instantly so you know the marker AND the subject in one hit.',
  4: 'Somali puts the verb last. If you expect English word order, you will always be reaching for the verb just as the speaker moves on. This level locks in the skeleton so you always know where things land.',
  5: 'The small words u, ku, ka, la — and the direction words soo/sii — carry the spatial logic of the whole sentence. Without them, you lose who did what, for whom, and from where.',
  6: 'Somali sentences chain together. Missing iyo/-na/-se/oo means you lose the thread between clauses and end up with isolated phrases instead of a full thought.',
  7: 'Production and comprehension reinforce each other. If you can build it, you can hear it.',
};

/** Interlinear gloss: renders one sentence broken into word columns */
function InterlinearGloss({
  parts,
  color,
}: {
  parts: { somali: string; tag: string; english: string }[];
  color: string;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="flex items-start gap-0 min-w-max">
        {parts.map((part, i) => (
          <div key={i} className="flex flex-col items-start pr-4 last:pr-0">
            {/* Somali word */}
            <span className="text-sm font-bold text-[#eff1f6] font-mono leading-snug whitespace-nowrap">
              {part.somali}
            </span>
            {/* Grammatical tag */}
            <span
              className="text-[9px] font-bold uppercase tracking-wider leading-tight mt-0.5 whitespace-nowrap"
              style={{ color: `${color}99` }}
            >
              {part.tag}
            </span>
            {/* English gloss */}
            <span className="text-[10px] text-[#5c5c5c] italic leading-tight mt-0.5 whitespace-nowrap">
              {part.english}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Parse a breakdown string like "wuu = waa + uu (STATEMENT + he)" into gloss parts */
function parseExampleToGloss(
  somali: string,
  breakdown: string
): { somali: string; tag: string; english: string }[] | null {
  const words = somali.replace(/[.?!]$/, '').split(/\s+/);

  // We can define manual gloss maps for known examples
  const KNOWN_GLOSS: Record<string, { somali: string; tag: string; english: string }[]> = {
    'Cali wuu tegay.': [
      { somali: 'Cali', tag: 'name', english: 'Ali' },
      { somali: 'wuu', tag: 'waa+uu', english: '(he states)' },
      { somali: 'tegay.', tag: 'verb.past', english: 'went' },
    ],
    'Hooyada bay cuntay.': [
      { somali: 'Hooyada', tag: 'noun.def', english: 'the mother' },
      { somali: 'bay', tag: 'baa+ay', english: '(she is focus)' },
      { somali: 'cuntay.', tag: 'verb.past', english: 'ate' },
    ],
    'Ma cunaysaa?': [
      { somali: 'Ma', tag: 'question', english: '(asking)' },
      { somali: 'cunaysaa?', tag: 'verb.pres+you', english: 'are you eating?' },
    ],
    'Waxaan akhriyay buug.': [
      { somali: 'Waxaan', tag: 'waxa+aan', english: '(what I...)' },
      { somali: 'akhriyay', tag: 'verb.past', english: 'read' },
      { somali: 'buug.', tag: 'noun', english: 'a book' },
    ],
    'Cali baa cuntada cunay.': [
      { somali: 'Cali', tag: 'name', english: 'Ali' },
      { somali: 'baa', tag: 'focus', english: '(ALI is focus)' },
      { somali: 'cuntada', tag: 'noun.def', english: 'the food' },
      { somali: 'cunay.', tag: 'verb.past', english: 'ate' },
    ],
    'Cali wuu cuntada cunay.': [
      { somali: 'Cali', tag: 'name', english: 'Ali' },
      { somali: 'wuu', tag: 'waa+uu', english: '(he states)' },
      { somali: 'cuntada', tag: 'noun.def', english: 'the food' },
      { somali: 'cunay.', tag: 'verb.past', english: 'ate' },
    ],
    'Waxuu Cali cunay waa hilib.': [
      { somali: 'Waxuu', tag: 'waxa+uu', english: '(what he...)' },
      { somali: 'Cali', tag: 'name', english: 'Ali' },
      { somali: 'cunay', tag: 'verb.past', english: 'ate' },
      { somali: 'waa', tag: 'copula', english: 'was' },
      { somali: 'hilib.', tag: 'noun', english: 'meat' },
    ],
    'Wuu u soo keenay.': [
      { somali: 'Wuu', tag: 'waa+uu', english: '(he states)' },
      { somali: 'u', tag: 'prep:for', english: 'for/to' },
      { somali: 'soo', tag: 'direction', english: '→ toward' },
      { somali: 'keenay.', tag: 'verb.past', english: 'brought' },
    ],
    'Cali iyo Sahra way tegeen dugsiga.': [
      { somali: 'Cali', tag: 'name', english: 'Ali' },
      { somali: 'iyo', tag: 'connector', english: 'and' },
      { somali: 'Sahra', tag: 'name', english: 'Sahra' },
      { somali: 'way', tag: 'waa+ay', english: '(they state)' },
      { somali: 'tegeen', tag: 'verb.past.pl', english: 'went' },
      { somali: 'dugsiga.', tag: 'noun.def', english: 'the school' },
    ],
  };

  return KNOWN_GLOSS[somali] ?? null;
}

export default function RuleCard({ level, onStart }: RuleCardProps) {
  const context = LISTENING_CONTEXT[level.id];

  return (
    <div className="space-y-4">
      {/* Level header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${level.color}15`, border: `1px solid ${level.color}30` }}
        >
          <BookOpen size={16} style={{ color: level.color }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#eff1f6]">{level.title}</h2>
          <p className="text-xs text-[#5c5c5c]">{level.subtitle}</p>
        </div>
      </div>

      {/* The Rule */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
            style={{ backgroundColor: `${level.color}15`, color: level.color, border: `1px solid ${level.color}30` }}
          >
            The Rule
          </span>
        </div>
        <h3 className="text-sm font-bold text-[#eff1f6]">{level.rule.title}</h3>
        <div className="text-sm text-[#a0a0a0] leading-relaxed whitespace-pre-line">
          {level.rule.content}
        </div>
      </div>

      {/* Why this matters for listening */}
      {context && (
        <div className="rounded-xl bg-[#0f1a0f] border border-[#22c55e18] p-4">
          <div className="flex items-start gap-2.5">
            <Ear size={14} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-[#22c55e] uppercase tracking-wider mb-1.5">
                Why this matters for listening
              </p>
              <p className="text-xs text-[#6a9e6a] leading-relaxed">{context}</p>
            </div>
          </div>
        </div>
      )}

      {/* Examples with interlinear gloss */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
          Sentence Anatomy
        </p>

        {level.rule.examples.map((example, i) => {
          const gloss = parseExampleToGloss(example.somali, example.breakdown);
          return (
            <div
              key={i}
              className="rounded-xl bg-[#1a1a1a] border border-[#ffffff06] p-4 space-y-3"
            >
              {/* Interlinear gloss */}
              {gloss ? (
                <div className="pb-1">
                  <InterlinearGloss parts={gloss} color={level.color} />
                </div>
              ) : (
                <p className="text-sm font-medium text-[#eff1f6] font-mono">{example.somali}</p>
              )}

              {/* Breakdown text */}
              {!gloss && (
                <p className="text-xs text-[#5c5c5c] leading-relaxed">{example.breakdown}</p>
              )}
              {gloss && (
                <p className="text-[10px] text-[#4a4a4a] leading-relaxed border-t border-[#ffffff06] pt-2">
                  {example.breakdown}
                </p>
              )}

              {/* English translation */}
              <div className="flex items-center gap-2">
                <ArrowRight size={11} style={{ color: level.color }} />
                <p className="text-xs font-medium" style={{ color: level.color }}>
                  {example.english}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Start Practice CTA */}
      <button
        onClick={onStart}
        className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] mt-2"
        style={{ backgroundColor: level.color, color: '#0f0f0f' }}
      >
        Start Practice →
      </button>
    </div>
  );
}
