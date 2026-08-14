/**
 * Home — the lessons, and nothing else.
 *
 * HOW THIS SETTLED. It first listed everything: every lesson, both unit tests,
 * a practice button per row, a progress bar and a review banner. That was too
 * much to read before starting. Then it swung the other way — one card and an
 * "All lessons" row — and there was nothing on the screen.
 *
 * There is genuinely only one kind of thing to show here, so it shows that:
 * the lessons, grouped by unit, with the one you are on lifted to the top.
 * No separate index screen, no progress bar, no locked rows.
 *
 * A locked unit test is not rendered. A row you cannot press is furniture.
 *
 * REGRESSION GUARD: a hardcoded table naming lesson ranges used to live in this
 * file's predecessor. Authoring a new lesson would have left it invisible while
 * build, tests and validator all stayed green. Everything derives from
 * LESSON_LIST and UNITS. NOTHING HERE MAY NAME A LESSON NUMBER.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Check } from 'lucide-react';
import { LESSON_LIST, type LessonSummary } from '@/data/authored-lessons';
import { UNITS, getUnitTest } from '@/data/unit-tests';
import { isUnitComplete } from '@/lib/assessment';
import { dueLessons } from '@/lib/review';
import { useProgressStore } from '@/stores/progress-store';

export default function LearnPage() {
  const navigate = useNavigate();
  const store = useProgressStore();

  const grouped = useMemo(
    () =>
      UNITS.map((unit) => ({
        unit,
        lessons: LESSON_LIST.filter((l) => unit.lessonIds.includes(l.lessonId)),
      })),
    [],
  );

  const completed = (store.completedLessons as number[] | undefined) ?? [];
  const due = new Set(dueLessons(store.reviewSchedule ?? {}, completed));
  const total = LESSON_LIST.length;
  const doneCount = completed.filter((id) => id >= 1 && id <= total).length;

  const next = LESSON_LIST.find((l) => !completed.includes(l.lessonId));
  const resumeAt = next ? (store.getLessonCardPosition?.(next.lessonId) ?? 0) : 0;

  return (
    <div className="min-h-[100dvh] bg-bg">
      <div className="mx-auto max-w-column px-4 pt-safe-t">
        <header className="pb-3 pt-4">
          <h1 className="text-large font-bold text-label">Somali</h1>
          <p className="mt-0.5 text-subhead text-label-2">
            {doneCount === 0
              ? `${total} lessons`
              : doneCount === total
                ? 'All lessons done'
                : `${doneCount} of ${total} done`}
          </p>
        </header>

        <main className="pb-[calc(2.5rem+var(--safe-b))]">
          {/* The one you are on, lifted out of the list so the app opens on a
              thing to do rather than a decision to make. */}
          {next && (
            <button
              onClick={() => navigate(`/lesson/${next.lessonId}`)}
              className="pressable mb-7 flex w-full items-center gap-3 rounded-xl bg-elevated px-4 py-4 text-left"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-caption2 font-semibold uppercase tracking-wide text-label-3">
                  {resumeAt > 0 ? 'Continue' : doneCount === 0 ? 'Start' : 'Up next'}
                </span>
                <span className="mt-0.5 block truncate text-title2 font-semibold text-label">
                  {next.title}
                </span>
                <span className="mt-0.5 block text-footnote text-label-2">
                  {resumeAt > 0
                    ? `Card ${resumeAt + 1} of ${next.cardCount}`
                    : `${next.cardCount} cards`}
                </span>
              </span>
              <ChevronRight className="h-5 w-5 flex-shrink-0 text-label-3" />
            </button>
          )}

          {grouped.map(({ unit, lessons }) => {
            const bank = getUnitTest(unit.id);
            const unlocked = isUnitComplete(unit.id, completed);
            return (
              <section key={unit.id} className="mb-7">
                <h2 className="px-1 pb-1.5 text-footnote text-label-2">
                  {unit.name ?? `Unit ${unit.id}`}
                </h2>

                <div className="list-group">
                  {lessons.map((lesson) => (
                    <LessonRow
                      key={lesson.lessonId}
                      lesson={lesson}
                      done={completed.includes(lesson.lessonId)}
                      due={due.has(lesson.lessonId)}
                      onOpen={() => navigate(`/lesson/${lesson.lessonId}`)}
                    />
                  ))}

                  {/* Only once it can actually be taken. */}
                  {bank && unlocked && (
                    <button
                      onClick={() => navigate(`/unit-test/${unit.id}`)}
                      className="list-row flex min-h-[52px] w-full items-center gap-3 px-4 py-3 text-left active:bg-fill"
                    >
                      <span className="min-w-0 flex-1 truncate text-body text-label">
                        {bank.name}
                      </span>
                      <ChevronRight className="h-4 w-4 flex-shrink-0 text-label-3" />
                    </button>
                  )}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}

function LessonRow({
  lesson,
  done,
  due,
  onOpen,
}: {
  lesson: LessonSummary;
  done: boolean;
  due: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="list-row flex min-h-[52px] w-full items-center gap-3 px-4 py-3 text-left active:bg-fill"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-body text-label">{lesson.title}</span>
        {due && <span className="block text-footnote text-label-2">Due for review</span>}
      </span>
      {done && <Check className="h-4 w-4 flex-shrink-0 text-label-2" />}
      <ChevronRight className="h-4 w-4 flex-shrink-0 text-label-3" />
    </button>
  );
}
