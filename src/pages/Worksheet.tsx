/**
 * Worksheet Page — per-lesson practice sheet.
 *
 * Route: /worksheet/:id
 * One page, two modes:
 *   • On screen — interactive: type answers, toggle the answer key.
 *   • Printed   — clean black-on-white worksheet (browser Print → Save as PDF).
 *
 * Content is derived from the lesson's vocab + authored practice exercises,
 * so there is nothing extra to maintain (see lib/worksheet.ts).
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Printer, Eye, EyeOff } from 'lucide-react';
import { MAX_LESSON_ID } from '@/data/teaching-content';
import { buildWorksheet } from '@/lib/worksheet';

export default function WorksheetPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showAnswers, setShowAnswers] = useState(false);

  const lessonId = parseInt(id ?? '1', 10);
  const worksheet =
    !isNaN(lessonId) && lessonId >= 1 && lessonId <= MAX_LESSON_ID
      ? buildWorksheet(lessonId)
      : null;

  if (!worksheet) {
    return (
      <div className="h-full flex items-center justify-center px-4 bg-[#0f0f0f]">
        <p className="text-[#8c8c8c] text-sm">Worksheet not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#0f0f0f] print:bg-white">
      <div className="max-w-[760px] mx-auto px-4 py-6 print:py-0 print:px-0">
        {/* Action bar — hidden when printing */}
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-[#8c8c8c] hover:text-[#eff1f6] transition-colors"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnswers((s) => !s)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ffffff08] text-[#c8c8c8] text-sm font-medium hover:bg-[#ffffff15] transition-colors"
            >
              {showAnswers ? <EyeOff size={15} /> : <Eye size={15} />}
              {showAnswers ? 'Hide answers' : 'Show answers'}
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ffa116] text-[#0f0f0f] text-sm font-bold hover:bg-[#ffa116d0] transition-colors"
            >
              <Printer size={15} />
              Print / PDF
            </button>
          </div>
        </div>

        {/* Worksheet header */}
        <header className="mb-6 pb-4 border-b border-[#ffffff10] print:border-black">
          <p className="text-xs font-semibold text-[#ffa116] uppercase tracking-wider print:text-black">
            Lesson {worksheet.lessonId} · Worksheet
          </p>
          <h1 className="text-2xl font-bold text-[#eff1f6] mt-1 print:text-black">{worksheet.title}</h1>
          <p className="text-sm text-[#8c8c8c] mt-2 print:text-black">
            Name: ______________________________&nbsp;&nbsp;&nbsp;Date: ____________________
          </p>
        </header>

        {/* Section A — Vocabulary */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-[#eff1f6] uppercase tracking-wider mb-3 print:text-black">
            A. Vocabulary — write the English meaning
          </h2>
          <div className="rounded-xl border border-[#ffffff10] overflow-hidden print:border-black print:rounded-none">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0f0f0f] print:bg-white">
                  <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider print:text-black">
                    Somali
                  </th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider print:text-black">
                    English
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ffffff08] print:divide-black/30">
                {worksheet.vocab.map((w) => (
                  <tr key={w.rank}>
                    <td className="px-4 py-2.5 text-[#eff1f6] font-medium font-mono print:text-black">
                      {w.somali}
                    </td>
                    <td className="px-4 py-2.5 print:text-black">
                      {showAnswers ? (
                        <span className="text-[#00b8a3] print:text-black">{w.english}</span>
                      ) : (
                        <span className="text-[#3c3c3c] print:text-black">______________________</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section B — Practice */}
        {worksheet.practice.length > 0 && (
          <section className="mb-8 break-before-page">
            <h2 className="text-sm font-bold text-[#eff1f6] uppercase tracking-wider mb-3 print:text-black">
              B. Practice — circle the correct answer
            </h2>
            <ol className="space-y-5">
              {worksheet.practice.map((ex, i) => {
                const hasOptions = ex.type === 'multiple_choice' || ex.type === 'fill_blank' || ex.type === 'matching';
                const answerText = ex.correctAnswer ?? (Array.isArray(ex.answer) ? ex.answer.join(' · ') : ex.answer);
                return (
                  <li key={i} className="text-sm">
                    <p className="text-[#eff1f6] font-medium mb-2 print:text-black">
                      {i + 1}. {ex.question}
                    </p>
                    {ex.somali && (
                      <p className="text-[#eff1f6] font-mono mb-2 pl-4 print:text-black">{ex.somali}</p>
                    )}
                    {ex.type === 'unscramble' && ex.words && (
                      <p className="text-[#c8c8c8] mb-2 pl-4 print:text-black">
                        {ex.words.join(' / ')}
                      </p>
                    )}
                    {hasOptions ? (
                      <div className="space-y-1.5 pl-4">
                        {(ex.options ?? []).map((opt, j) => {
                          const isAnswer = showAnswers && opt === ex.correctAnswer;
                          return (
                            <p
                              key={j}
                              className={`print:text-black ${
                                isAnswer ? 'text-[#00b8a3] font-semibold' : 'text-[#c8c8c8]'
                              }`}
                            >
                              {String.fromCharCode(65 + j)}. {opt}
                              {isAnswer ? '  ✓' : ''}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="pl-4 print:text-black">
                        {showAnswers ? (
                          <span className="text-[#00b8a3] print:text-black">{answerText}</span>
                        ) : (
                          <span className="text-[#3c3c3c] print:text-black">______________________________</span>
                        )}
                      </p>
                    )}
                    {showAnswers && (
                      <p className="text-xs text-[#8c8c8c] mt-1.5 pl-4 print:text-black">
                        {ex.explanation}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {/* Footer note — screen only */}
        <p className="text-xs text-[#5c5c5c] mt-8 print:hidden">
          Tip: toggle <span className="text-[#c8c8c8]">Show answers</span> to print a teacher answer key, or
          leave it off to print a blank worksheet.
        </p>
      </div>
    </div>
  );
}
