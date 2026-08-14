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
 *
 * NOT A NAV DESTINATION. A printable sheet is genuinely a separate document, so
 * it kept its route when the UI collapsed onto /learn — but it is entered from a
 * lesson's practice screen rather than listed anywhere.
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { X, Printer, Eye, EyeOff } from 'lucide-react';
import { MAX_LESSON_ID } from '@/data/authored-lessons';
import { buildWorksheet } from '@/lib/worksheet';
import Somali from '@/components/Somali';

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
      <div className="flex min-h-[100dvh] items-center justify-center bg-surface px-4">
        <p className="text-body text-ink-muted">Worksheet not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-surface print:bg-white">
      {/* Action bar — hidden when printing */}
      <header className="sticky top-0 z-20 border-b border-border bg-surface px-4 pt-safe-t print:hidden">
        <div className="mx-auto flex max-w-2xl items-center gap-2 py-2.5">
          <button
            onClick={() => navigate(-1)}
            aria-label="Close"
            className="-ml-2 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-surface-sunken hover:text-ink"
          >
            <X className="h-[18px] w-[18px]" />
          </button>
          <span className="flex-1 text-small font-medium text-ink">Worksheet</span>
          <button
            onClick={() => setShowAnswers((s) => !s)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-small font-medium text-ink-muted transition-colors hover:bg-surface-sunken"
          >
            {showAnswers ? <EyeOff size={15} /> : <Eye size={15} />}
            <span className="hidden sm:inline">{showAnswers ? 'Hide answers' : 'Show answers'}</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 rounded-lg bg-accent-strong px-3 py-2 text-small font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            <Printer size={15} />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-6 print:px-0 print:py-0">
        {/* Worksheet header */}
        <header className="mb-6 border-b border-border pb-4 print:border-black">
          <p className="text-micro font-semibold uppercase tracking-wider text-ink-faint print:text-black">
            Lesson {worksheet.lessonId} · Worksheet
          </p>
          <h1 className="mt-1 text-title font-semibold text-ink print:text-black">
            {worksheet.title}
          </h1>
          <p className="mt-2 text-small text-ink-muted print:text-black">
            Name: ______________________________&nbsp;&nbsp;&nbsp;Date: ____________________
          </p>
        </header>

        {/* Section A — Vocabulary */}
        <section className="mb-8">
          <h2 className="mb-3 text-small font-semibold uppercase tracking-wider text-ink print:text-black">
            A. Vocabulary — write the English meaning
          </h2>
          <div className="overflow-hidden rounded-xl border border-border print:rounded-none print:border-black">
            <table className="w-full text-small">
              <thead>
                <tr className="bg-surface-sunken print:bg-white">
                  <th className="px-4 py-2.5 text-left text-micro font-semibold uppercase tracking-wider text-ink-faint print:text-black">
                    Somali
                  </th>
                  <th className="px-4 py-2.5 text-left text-micro font-semibold uppercase tracking-wider text-ink-faint print:text-black">
                    English
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border print:divide-black">
                {worksheet.vocab.map((w) => (
                  <tr key={w.rank}>
                    <td className="px-4 py-2.5">
                      <Somali className="print:text-black">{w.somali}</Somali>
                    </td>
                    <td className="px-4 py-2.5 print:text-black">
                      {showAnswers ? (
                        <span className="text-success print:text-black">{w.english}</span>
                      ) : (
                        <span className="text-ink-faint print:text-black">
                          ______________________
                        </span>
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
            <h2 className="mb-3 text-small font-semibold uppercase tracking-wider text-ink print:text-black">
              B. Practice — circle the correct answer
            </h2>
            <ol className="space-y-5">
              {worksheet.practice.map((ex, i) => {
                const hasOptions =
                  ex.type === 'multiple_choice' || ex.type === 'fill_blank' || ex.type === 'matching';
                const answerText =
                  ex.correctAnswer ?? (Array.isArray(ex.answer) ? ex.answer.join(' · ') : ex.answer);
                return (
                  <li key={i} className="text-small">
                    <p className="mb-2 font-medium text-ink print:text-black">
                      {i + 1}. <Bold text={ex.question} />
                    </p>
                    {ex.somali && (
                      <p className="mb-2 pl-4">
                        <Somali size="lg" className="print:text-black">
                          {ex.somali}
                        </Somali>
                      </p>
                    )}
                    {ex.type === 'unscramble' && ex.words && (
                      <p className="mb-2 pl-4">
                        <Somali className="print:text-black">{ex.words.join(' / ')}</Somali>
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
                                isAnswer ? 'font-semibold text-success' : 'text-ink-muted'
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
                          <span className="text-success print:text-black">{answerText}</span>
                        ) : (
                          <span className="text-ink-faint print:text-black">
                            ______________________________
                          </span>
                        )}
                      </p>
                    )}
                    {showAnswers && (
                      <p className="mt-1.5 pl-4 text-micro text-ink-muted print:text-black">
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
        <p className="mt-8 text-small text-ink-faint print:hidden">
          Tip: toggle <span className="text-ink">Show answers</span> to print an answer key, or
          leave it off to print a blank worksheet.
        </p>
      </div>
    </div>
  );
}

/**
 * Renders the `**bold**` markup the authored questions use.
 *
 * Without this the worksheet printed the asterisks literally — every lesson
 * uses the markup to mark the Somali form under discussion, so every printed
 * sheet since the course was built showed `**Sahra baa...**`. The print channel
 * is the deep-reading half of the design, so it cannot show raw markup.
 *
 * Kept separate from components/RichText because that one colors with a theme
 * token; on a printed page the emphasis has to be plain black.
 */
function Bold({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((seg, i) =>
        seg.startsWith('**') && seg.endsWith('**') && seg.length > 4 ? (
          <strong key={i} className="font-semibold">
            {seg.slice(2, -2)}
          </strong>
        ) : (
          seg
        ),
      )}
    </>
  );
}
