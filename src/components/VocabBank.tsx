import { BookOpen, X } from 'lucide-react';
import { VOCABULARY_BANK } from '@/data/workbook';

interface VocabBankProps {
  open: boolean;
  onClose: () => void;
}

export default function VocabBank({ open, onClose }: VocabBankProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl bg-[#141414] border border-[#ffffff10] shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-[#ffffff08] bg-[#141414]">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-[#ffa116]" />
            <h2 className="text-sm font-bold text-[#eff1f6]">Vocabulary Bank</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#ffffff10] transition-colors"
          >
            <X size={16} className="text-[#8c8c8c]" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          <p className="text-xs text-[#8c8c8c]">
            These are the only nouns and verbs used in the workbook drills. Refer back to this whenever you need a word.
          </p>

          {/* Nouns */}
          <section>
            <h3 className="text-xs font-bold text-[#ffa116] uppercase tracking-wider mb-3">Nouns</h3>
            <div className="rounded-xl border border-[#ffffff08] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f0f0f]">
                    <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Somali</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ffffff08]">
                  {VOCABULARY_BANK.nouns.map((noun, i) => (
                    <tr key={i} className="hover:bg-[#ffffff04] transition-colors">
                      <td className="px-4 py-2.5 text-[#eff1f6] font-medium font-mono">{noun.somali}</td>
                      <td className="px-4 py-2.5 text-[#8c8c8c]">{noun.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Verbs */}
          <section>
            <h3 className="text-xs font-bold text-[#00b8a3] uppercase tracking-wider mb-3">Verbs</h3>
            <div className="rounded-xl border border-[#ffffff08] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#0f0f0f]">
                    <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Somali</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ffffff08]">
                  {VOCABULARY_BANK.verbs.map((verb, i) => (
                    <tr key={i} className="hover:bg-[#ffffff04] transition-colors">
                      <td className="px-4 py-2.5 text-[#eff1f6] font-medium font-mono">{verb.somali}</td>
                      <td className="px-4 py-2.5 text-[#8c8c8c]">{verb.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
