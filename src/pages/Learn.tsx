/**
 * Home — a contents page.
 *
 * WHY IT LOOKS LIKE A BOOK AND NOT LIKE SETTINGS. Everything else in this app
 * is deliberately iOS furniture: grouped lists, glass bars, system greys. Home
 * is the one screen that should say what the thing IS, and what it is, is a
 * course — so it borrows from a table of contents instead of a settings list.
 *
 * No cards. No chevrons. No rounded rectangles, no fills, no borders. Type sits
 * directly on the background and the numerals do the structuring. That is the
 * whole design; if you find yourself adding a container here, it has stopped
 * being this.
 *
 * STATE IS CARRIED BY WEIGHT, NOT BY ICONS. The palette is black and white, so
 * there is nothing to color-code with:
 *
 *   done      — recedes to the faintest ink, because it is behind you
 *   current   — full ink, and the only line that gets a marker
 *   upcoming  — normal ink, light numeral
 *
 * REGRESSION GUARD, INHERITED AND STILL LOAD-BEARING: a hardcoded table naming
 * lesson ranges used to live in this file's predecessor. Authoring a new lesson
 * would have left it invisible on this page while build, tests and validator all
 * stayed green. Units and lessons derive from UNITS and LESSON_LIST. NO LESSON
 * NUMBER MAY BE WRITTEN AS A LITERAL HERE — the numerals below are formatted
 * from lesson.lessonId.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
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

  /* "You are here" marks the first unfinished lesson — the one tap that
     matters, which is why there is no separate continue button. */
  const current = LESSON_LIST.find((l) => !completed.includes(l.lessonId))?.lessonId;

  return (
    <div className="min-h-[100dvh] bg-bg">
      <div className="mx-auto max-w-column px-5 pt-safe-t">
        <header className="pb-10 pt-12">
          <h1 className="text-large font-bold tracking-tight text-label">Somali</h1>
          <p className="mt-1 text-subhead text-label-2">
            {doneCount === 0
              ? `${total} lessons`
              : doneCount === total
                ? 'All lessons done'
                : `${doneCount} of ${total} done`}
          </p>
        </header>

        <main className="pb-[calc(4rem+var(--safe-b))]">
          {grouped.map(({ unit, lessons }) => {
            const bank = getUnitTest(unit.id);
            const unlocked = isUnitComplete(unit.id, completed);
            return (
              <section key={unit.id} className="mb-12">
                {/* A part title in a contents page: a rule and a small label. */}
                <div className="mb-5 flex items-center gap-3">
                  <span className="text-caption2 font-semibold uppercase tracking-[0.14em] text-label-3">
                    {unit.name ?? `Unit ${unit.id}`}
                  </span>
                  <span className="h-px flex-1 bg-separator" />
                </div>

                <ol>
                  {lessons.map((lesson) => (
                    <Entry
                      key={lesson.lessonId}
                      lesson={lesson}
                      done={completed.includes(lesson.lessonId)}
                      current={lesson.lessonId === current}
                      due={due.has(lesson.lessonId)}
                      onOpen={() => navigate(`/lesson/${lesson.lessonId}`)}
                    />
                  ))}
                </ol>

                {/* Only once it can be taken. A line you cannot press is
                    furniture, and this page has no room for furniture. */}
                {bank && unlocked && (
                  <button
                    onClick={() => navigate(`/unit-test/${unit.id}`)}
                    className="mt-1 grid w-full grid-cols-[2.75rem_1fr] items-baseline gap-3 py-3 text-left active:opacity-50"
                  >
                    <span aria-hidden className="text-title2 font-light text-label-3">
                      ·
                    </span>
                    <span className="text-title3 text-label">{bank.name}</span>
                  </button>
                )}
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}

function Entry({
  lesson,
  done,
  current,
  due,
  onOpen,
}: {
  lesson: LessonSummary;
  done: boolean;
  current: boolean;
  due: boolean;
  onOpen: () => void;
}) {
  /* Zero-padded so the numeral column stays optically even at 01 and at 10.
     Derived from the id — never written as a literal. */
  const numeral = String(lesson.lessonId).padStart(2, '0');

  return (
    <li>
      <button
        onClick={onOpen}
        aria-current={current ? 'step' : undefined}
        className="grid w-full grid-cols-[2.75rem_1fr] items-baseline gap-3 py-3.5 text-left active:opacity-50"
      >
        <span
          aria-hidden
          className={`text-title1 font-light tabular-nums leading-none ${
            current ? 'text-label' : 'text-label-3'
          }`}
        >
          {numeral}
        </span>

        <span className="min-w-0">
          <span
            className={`block text-title3 ${
              current ? 'font-semibold text-label' : done ? 'text-label-3' : 'text-label'
            }`}
          >
            {lesson.title}
          </span>

          {(current || due) && (
            <span className="mt-0.5 block text-footnote text-label-2">
              {current ? 'you are here' : 'due for review'}
            </span>
          )}
        </span>
      </button>
    </li>
  );
}
