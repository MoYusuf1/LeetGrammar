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

import { useMemo, useState } from 'react';
import { UserRound } from 'lucide-react';
import ProfileSheet from '@/components/ProfileSheet';
import { useAuthSync } from '@/contexts/AuthSyncContext';
import { useNavigate } from 'react-router';
import { LESSON_LIST, type LessonSummary } from '@/data/authored-lessons';
import { UNITS, getUnitTest } from '@/data/unit-tests';
import { dueLessons } from '@/lib/review';
import { repairQueue } from '@/lib/repair';
import { useProgressStore } from '@/stores/progress-store';

export default function LearnPage() {
  const navigate = useNavigate();
  const store = useProgressStore();
  const { user } = useAuthSync();
  const [profileOpen, setProfileOpen] = useState(false);

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
  /* The first unfinished lesson. It is marked by ink weight rather than by a
     label, and it is why there is no separate continue button. */
  const current = LESSON_LIST.find((l) => !completed.includes(l.lessonId))?.lessonId;

  /* Unresolved slips, fed by every recorded exercise attempt. The one
     actionable row on this page that is not a lesson. */
  const repairCount = repairQueue(store.exerciseProgress).length;

  return (
    <div className="learn-page min-h-[100dvh] bg-bg">
      <button onClick={() => setProfileOpen(true)} aria-label="Open profile" className="profile-trigger fixed right-4 top-[calc(0.75rem+var(--safe-t))] z-20 grid h-10 w-10 place-items-center rounded-full bg-fill backdrop-blur active:opacity-60"><UserRound size={20}/></button>
      <ProfileSheet open={profileOpen} onClose={() => setProfileOpen(false)} />
      <div className="learn-shell mx-auto px-5 pt-safe-t">
        <div className="learn-content">
          <div className="learn-large-toolbar" aria-label="Learner">
            <span>{user?.displayName?.trim() || ''}</span>
          </div>
          <header className="learn-mobile-header pb-10 pt-12">
            <h1 className="text-large font-bold tracking-tight text-label">Somali</h1>
          </header>

          <main className="pb-[calc(4rem+var(--safe-b))]">
          {/* The repair row. Rendered only while something is unresolved — a
              row you cannot press is furniture, and an empty queue is nothing
              to act on. Same type-on-background shape as the unit test row. */}
          {repairCount > 0 && (
            <section className="mb-12">
              <button
                onClick={() => navigate('/repair')}
                className="grid w-full grid-cols-[2.75rem_1fr] items-baseline gap-3 py-3 text-left active:opacity-50"
              >
                <span aria-hidden className="text-title2 font-light text-label-3">
                  ·
                </span>
                <span className="min-w-0">
                  <span className="block text-title3 font-semibold text-label">
                    Put right what slipped
                  </span>
                  <span className="mt-0.5 block text-footnote text-label-2">
                    {repairCount === 1 ? '1 item waiting' : `${repairCount} items waiting`}
                  </span>
                </span>
              </button>
            </section>
          )}
          {grouped.map(({ unit, lessons }) => {
            const bank = getUnitTest(unit.id);
            return (
              <section key={unit.id} className="mb-12">
                {/* A part title in a contents page. No rule beside it — the
                    whitespace between sections already separates them, and the
                    line was one more mark doing a job nothing needed doing.
                    The unit's own name is not shown either: "Filling the WHO
                    box" means nothing before you have done it. Derived from
                    unit.id, never a literal. */}
                <p className="mb-5 text-caption2 font-semibold uppercase tracking-[0.14em] text-label-3">
                  Unit {unit.id}
                </p>

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

                {/* Always shown now. It used to appear only once the unit's
                    lessons were done, back when the test was gated; the gate is
                    gone (see UnitTest.tsx) and a row that appears from nowhere
                    is worse than one that was always there. The test's own
                    intro says if the lessons are unfinished. */}
                {bank && (
                  <button
                    onClick={() => navigate(`/unit-test/${unit.id}`)}
                    className="mt-2 grid w-full grid-cols-[2.75rem_1fr] items-center gap-3 py-3 text-left active:opacity-50"
                  >
                    <span aria-hidden className="text-title1 font-light leading-[1.3] tabular-nums text-label-3">
                      T{unit.id}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-title3 font-medium text-label">{bank.name}</span>
                      <span className="mt-0.5 block text-footnote text-label-2">Check what you remember</span>
                    </span>
                  </button>
                )}
              </section>
            );
          })}
          </main>
        </div>
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
      {/* Numeral and title share one line-height so their baselines actually
          meet — with mismatched leading, items-baseline still aligns them but
          the numeral reads as floating above the title. */}
      <button
        onClick={onOpen}
        aria-current={current ? 'step' : undefined}
        className="grid w-full grid-cols-[2.5rem_1fr] items-baseline gap-4 py-3.5 text-left active:opacity-50"
      >
        <span
          aria-hidden
          className={`text-title1 font-light leading-[1.3] tabular-nums ${
            current ? 'text-label' : 'text-label-3'
          }`}
        >
          {numeral}
        </span>

        <span className="min-w-0">
          {/* The current lesson is marked by ink and weight alone. A label
              saying so was one more thing to read on a page whose point is
              that there is almost nothing to read. */}
          <span
            className={`block text-title3 leading-[1.3] ${
              current ? 'font-semibold text-label' : done ? 'text-label-3' : 'text-label'
            }`}
          >
            {lesson.title}
          </span>

          {due && (
            <span className="mt-0.5 block text-footnote text-label-2">due for review</span>
          )}
        </span>
      </button>
    </li>
  );
}
