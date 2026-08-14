/**
 * Worksheet — per-lesson practice sheet.
 *
 * Route: /worksheet/:id
 *
 * TWO PRESENTATIONS OF THE SAME CONTENT, AND THEY ARE NOW ACTUALLY SEPARATE.
 *
 *   On screen — an iOS page: grouped lists, real headings, nothing else.
 *   Printed   — a worksheet: black on white, ruled answer blanks, name and date.
 *
 * Previously the screen version WAS the printed one. A phone got a Name/Date
 * rule that wrapped onto two lines, a SOMALI | ENGLISH table header, all-caps
 * section titles and rows of underscores — a sheet of A4 squeezed onto a 390px
 * screen. Everything that only makes sense on paper is `hidden print:block`
 * now, and everything that only makes sense on screen is `print:hidden`.
 *
 * IT IS NOT INTERACTIVE, despite what the previous docstring claimed. There are
 * no inputs; the eye toggles the answer key. Typing happens in the lesson.
 *
 * NOT A NAV DESTINATION — reached from a lesson's menu. A printable sheet is
 * genuinely a separate document, which is why it kept a route when the rest of
 * the UI collapsed onto /learn.
 */

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { X, Printer, Eye, EyeOff } from 'lucide-react';
import { MAX_LESSON_ID } from '@/data/authored-lessons';
import { buildWorksheet } from '@/lib/worksheet';
import { ToolbarGroup, ToolbarButton } from '@/components/lesson/LessonToolbar';
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
      <div className="flex min-h-[100dvh] items-center justify-center bg-bg px-4">
        <p className="text-callout text-label-2">Worksheet not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-bg print:bg-white">
      {/* The same floating glass control the lesson uses, so closing is in the
          same place everywhere. */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Close"
        className="glass pressable fixed left-4 z-30 flex h-10 w-10 items-center justify-center rounded-full text-label print:hidden"
        style={{ top: 'calc(var(--safe-t) + 14px)' }}
      >
        <X className="h-[18px] w-[18px]" />
      </button>

      <div className="mx-auto max-w-column px-5 pb-[calc(7rem+var(--safe-b))] pt-[calc(var(--safe-t)+74px)] print:max-w-none print:px-0 print:pb-0 print:pt-0">
        <h1 className="text-title1 font-bold text-label print:text-black">{worksheet.title}</h1>

        {/* Paper only. */}
        <p className="mt-6 hidden text-black print:block">
          Name: ______________________________&nbsp;&nbsp;&nbsp;Date: ____________________
        </p>

        <section className="mt-8">
          <h2 className="mb-2 px-1 text-footnote text-label-2 print:mb-3 print:px-0 print:text-black">
            Vocabulary — write the English meaning
          </h2>

          <div className="list-group print:rounded-none print:bg-transparent">
            {worksheet.vocab.map((w) => (
              <div
                key={w.rank}
                className="list-row flex items-baseline justify-between gap-4 px-4 py-3 print:border-black print:px-0"
              >
                <Somali size="lg" className="print:text-black">
                  {w.somali}
                </Somali>

                {showAnswers ? (
                  <span className="text-right text-callout text-label-2 print:text-black">
                    {w.english}
                  </span>
                ) : (
                  /* Nothing on screen — the empty right-hand side IS the
                     question. On paper it needs a line to write on. */
                  <span className="hidden text-black print:inline">______________________</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {worksheet.practice.length > 0 && (
          <section className="mt-10 print:break-before-page">
            <h2 className="mb-2 px-1 text-footnote text-label-2 print:mb-3 print:px-0 print:text-black">
              Practice
            </h2>

            <ol className="space-y-7 print:space-y-5">
              {worksheet.practice.map((ex, i) => {
                const hasOptions =
                  ex.type === 'multiple_choice' ||
                  ex.type === 'fill_blank' ||
                  ex.type === 'matching';
                const answerText =
                  ex.correctAnswer ?? (Array.isArray(ex.answer) ? ex.answer.join(' · ') : ex.answer);

                return (
                  <li key={i} className="space-y-3">
                    <p className="text-callout text-label print:text-black">
                      <span className="text-label-3 print:text-black">{i + 1}. </span>
                      <Bold text={ex.question} />
                    </p>

                    {ex.somali && (
                      <Somali size="lg" as="p" className="print:text-black">
                        {ex.somali}
                      </Somali>
                    )}

                    {ex.type === 'unscramble' && ex.words && (
                      <Somali as="p" className="print:text-black">
                        {ex.words.join('  ·  ')}
                      </Somali>
                    )}

                    {hasOptions ? (
                      <div className="list-group print:rounded-none print:bg-transparent">
                        {(ex.options ?? []).map((opt, j) => {
                          const isAnswer = showAnswers && opt === ex.correctAnswer;
                          return (
                            <p
                              key={j}
                              className={`list-row px-4 py-2.5 text-callout print:border-black print:px-0 print:text-black ${
                                isAnswer ? 'font-semibold text-label' : 'text-label-2'
                              }`}
                            >
                              {opt}
                              {isAnswer ? '  ✓' : ''}
                            </p>
                          );
                        })}
                      </div>
                    ) : showAnswers ? (
                      <p className="text-callout font-semibold text-label print:text-black">
                        {answerText}
                      </p>
                    ) : (
                      <p className="hidden text-black print:block">
                        ______________________________________
                      </p>
                    )}

                    {showAnswers && (
                      <p className="text-footnote text-label-2 print:text-black">{ex.explanation}</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        )}
      </div>

      {/* Notes-style: a capsule for the toggle, a pill for the action. Adding a
          third control is one more ToolbarButton. */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 px-3 pb-[calc(0.5rem+var(--safe-b))] pt-2 print:hidden">
        <div className="pointer-events-none mx-auto flex max-w-column items-center justify-between gap-2">
          <ToolbarGroup>
            <ToolbarButton
              label={showAnswers ? 'Hide answers' : 'Show answers'}
              onClick={() => setShowAnswers((s) => !s)}
            >
              {showAnswers ? (
                <EyeOff className="h-[20px] w-[20px]" />
              ) : (
                <Eye className="h-[20px] w-[20px]" />
              )}
            </ToolbarButton>
          </ToolbarGroup>

          <button
            onClick={() => window.print()}
            className="pressable pointer-events-auto flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-callout font-semibold text-accent-ink"
          >
            <Printer className="h-[18px] w-[18px]" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the `**bold**` markup the authored questions use.
 *
 * Without this the worksheet printed the asterisks literally — every lesson
 * uses the markup to mark the form under discussion, so every printed sheet
 * since the course was built showed `**Sahra baa...**`. The print channel is
 * the deep-reading half of the design, so it cannot show raw markup.
 *
 * Kept separate from components/RichText because that one colours with a theme
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
