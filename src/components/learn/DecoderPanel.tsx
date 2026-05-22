/**
 * DecoderPanel — Slide-out reference panel for quick decoding.
 *
 * A TOOL, not a lesson. Always accessible via a floating button.
 * Contains:
 *   - Quick Decode table: "You Hear → It Signals"
 *   - Sentence Decoder checklist: 6 steps
 *   - Sentence Anatomy: example breakdowns
 *
 * On desktop: expandable sidebar
 * On mobile: slide-up sheet
 */

import { X, KeyRound, ListChecks, Microscope } from 'lucide-react';

interface DecoderPanelProps {
  open: boolean;
  onToggle: () => void;
}

const QUICK_DECODE = [
  { hear: 'waan / waad / wuu / way', signals: 'STATEMENT — neutral, verb-focused' },
  { hear: 'baa / ayaa', signals: 'FOCUS — emphasizes the noun before it' },
  { hear: 'waxaan / waxaad / waxuu / waxay', signals: 'SPOTLIGHT — "What X did was..."' },
  { hear: 'ma / miyaad / miyuu / miyay', signals: 'QUESTION — yes/no question' },
  { hear: 'u', signals: 'to / for (direction or beneficiary)' },
  { hear: 'ku', signals: 'in / at / by means of (location)' },
  { hear: 'ka', signals: 'from / about (origin/source)' },
  { hear: 'la', signals: 'with / impersonal passive ("one does")' },
  { hear: 'soo', signals: 'toward speaker (coming here)' },
  { hear: 'sii', signals: 'away from speaker (going there)' },
];

const DECODER_STEPS = [
  'Is it a statement, question, or focus sentence?',
  'Who is the subject? (waan=I, wuu=he, way=she, etc.)',
  'Are there prepositions? (u, ku, ka, la)',
  'Is there a direction word? (soo, sii, wada, kala)',
  'Is it passive? (waa la + verb = "it is done")',
  'Are there connectors? (iyo=and, -na=and-also, -se=but, oo=which)',
];

const ANATOMY_EXAMPLES = [
  {
    sentence: 'Cali wuu tegay.',
    parts: [
      { label: 'Subject', value: 'Cali' },
      { label: 'Marker', value: 'wuu = waa + uu (statement + he)' },
      { label: 'Verb', value: 'tegay (went)' },
    ],
  },
  {
    sentence: 'Hooyada bay cuntay.',
    parts: [
      { label: 'Subject', value: 'Hooyada (mother)' },
      { label: 'Marker', value: 'bay = baa + ay (focus + she)' },
      { label: 'Verb', value: 'cuntay (ate)' },
    ],
  },
  {
    sentence: 'Wuu u soo keenay.',
    parts: [
      { label: 'Marker', value: 'wuu = waa + uu' },
      { label: 'Prep', value: 'u (to/for)' },
      { label: 'Direction', value: 'soo (toward speaker)' },
      { label: 'Verb', value: 'keenay (brought)' },
    ],
  },
  {
    sentence: 'Waan ku joogaa guriga.',
    parts: [
      { label: 'Marker', value: 'waan = waa + aan' },
      { label: 'Prep', value: 'ku (in/at)' },
      { label: 'Verb', value: 'joogaa (staying)' },
      { label: 'Object', value: 'guriga (the house)' },
    ],
  },
];

export default function DecoderPanel({ open, onToggle }: DecoderPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-start sm:justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onToggle}
      />

      {/* Panel — mobile: slide-up, desktop: right sidebar */}
      <div className="relative w-full sm:w-[420px] sm:h-full sm:ml-auto max-h-[85vh] sm:max-h-full overflow-y-auto rounded-t-2xl sm:rounded-none bg-[#141414] border-t sm:border-l border-[#ffffff10] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-[#ffffff08] bg-[#141414]">
          <div className="flex items-center gap-2">
            <KeyRound size={16} className="text-[#ffa116]" />
            <h2 className="text-sm font-bold text-[#eff1f6]">Sentence Decoder</h2>
          </div>
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-[#ffffff10] transition-colors"
          >
            <X size={16} className="text-[#8c8c8c]" />
          </button>
        </div>

        <div className="p-5 space-y-8">
          {/* ─── Quick Decode Table ─────────────────────────── */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <KeyRound size={14} className="text-[#3b82f6]" />
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                Quick Decode
              </p>
            </div>
            <div className="rounded-xl border border-[#ffffff08] overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-[#0f0f0f]">
                    <th className="text-left px-3 py-2.5 text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider w-1/2">
                      You Hear
                    </th>
                    <th className="text-left px-3 py-2.5 text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                      It Signals
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ffffff08]">
                  {QUICK_DECODE.map((row, i) => (
                    <tr key={i} className="hover:bg-[#ffffff04] transition-colors">
                      <td className="px-3 py-2.5 text-[#eff1f6] font-mono text-[11px]">
                        {row.hear}
                      </td>
                      <td className="px-3 py-2.5 text-[#8c8c8c]">{row.signals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ─── Sentence Decoder Checklist ─────────────────── */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <ListChecks size={14} className="text-[#00b8a3]" />
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                Decode Checklist
              </p>
            </div>
            <div className="space-y-2">
              {DECODER_STEPS.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#00b8a315] border border-[#00b8a330] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-[#00b8a3]">
                      {i + 1}
                    </span>
                  </div>
                  <p className="text-xs text-[#c8c8c8] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Sentence Anatomy ───────────────────────────── */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Microscope size={14} className="text-[#a855f7]" />
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                Sentence Anatomy
              </p>
            </div>
            <div className="space-y-3">
              {ANATOMY_EXAMPLES.map((ex, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-4 space-y-2"
                >
                  <p className="text-sm font-medium text-[#eff1f6] font-mono">
                    {ex.sentence}
                  </p>
                  <div className="space-y-1">
                    {ex.parts.map((part, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#5c5c5c] uppercase w-16 flex-shrink-0">
                          {part.label}
                        </span>
                        <span className="text-xs text-[#8c8c8c]">
                          {part.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer hint */}
          <p className="text-[10px] text-[#5c5c5c] text-center pt-2">
            Keep this open while doing drills for quick reference.
          </p>
        </div>
      </div>
    </div>
  );
}
