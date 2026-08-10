/**
 * GLOSSARY PAGE — Plain English ↔ Technical Terms
 * Route: /glossary
 *
 * Maps all banned linguistics terms to their plain-English replacements.
 * This is the bridge to outside resources (YouTube, dictionaries, academic
 * grammars) where you'll encounter technical terminology.
 *
 * Per Part 4 of COURSE_DESIGN.md: technical terms are demoted to this
 * glossary page — zero in lesson text, one optional aside per lesson
 * naming the technical term (e.g. "grammar books call this a particle").
 */

import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { getBannedTermsWithReplacements } from '@/data/banned-terms';

export default function GlossaryPage() {
  const navigate = useNavigate();
  const terms = getBannedTermsWithReplacements();

  return (
    <div className="min-h-full bg-[#0f0f0f] text-[#eff1f6]">
      <div className="max-w-[900px] mx-auto px-4 py-8">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[#8c8c8c] hover:text-[#eff1f6] mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Glossary</h1>
          <p className="text-[#c8c8c8] max-w-2xl">
            When you hear or read <span className="text-[#ffa116]">technical</span> terms
            while learning Somali (in YouTube videos, dictionaries, academic grammars),
            this page helps you understand what they mean in plain language. None of these
            terms are required to learn Somali — they're just names that linguists use.
          </p>
        </header>

        {/* Terms grid */}
        <div className="space-y-6">
          {terms.map((term, i) => (
            <div
              key={i}
              className="p-5 rounded-lg border border-[#ffffff10] hover:border-[#ffffff20] transition-colors"
            >
              {/* Technical term */}
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-[#ffa116] font-mono font-bold text-sm uppercase tracking-wide">
                  {term.technical}
                </span>
              </div>

              {/* Arrow and plain English */}
              <div className="ml-4 mb-3">
                <p className="text-[#c8c8c8]">
                  <span className="text-[#888]">→ </span>
                  <span className="text-[#eff1f6] font-semibold">{term.plain}</span>
                </p>
              </div>

              {/* Note (if allowlisted) */}
              {term.note && (
                <div className="ml-4 text-xs text-[#888] italic bg-[#ffffff05] p-3 rounded">
                  <p className="mb-1 text-[#aaa]">
                    <span className="text-[#00b8a3]">Note:</span> {term.note}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#ffffff10]">
          <p className="text-sm text-[#888]">
            <strong>Why a glossary?</strong> Research shows that learning with plain
            language first, then mapping to technical terms later, leads to deeper
            understanding. This glossary is optional — use it when you encounter a term
            elsewhere and want to know what it means.
          </p>
        </div>
      </div>
    </div>
  );
}
