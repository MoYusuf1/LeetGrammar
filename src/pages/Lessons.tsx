/**
 * All lessons — the pushed screen behind "All lessons" on the home screen.
 *
 * The full curriculum lives here rather than on the home screen, because
 * opening the app should not require reading eight lesson titles and two test
 * rows before deciding what to do.
 *
 * NOTHING HERE MAY NAME A LESSON NUMBER as a literal. Units and lessons derive
 * from UNITS and LESSON_LIST — a hardcoded range table used to live in this
 * file's predecessor, and authoring a new lesson would have left it invisible
 * while build, tests and validator all stayed green.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, Check, Lock } from 'lucide-react';
import { LESSON_LIST, type LessonSummary } from '@/data/authored-lessons';
import { UNITS, getUnitTest } from '@/data/unit-tests';
import { isUnitComplete } from '@/lib/assessment';
import { dueLessons } from '@/lib/review';
import { useProgressStore } from '@/stores/progress-store';

export default function LessonsPage() {
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

  return (
    <div className="min-h-[100dvh] bg-bg">
      {/* Glass nav bar — one of the two places glass appears. */}
      <header className="glass glass-top sticky top-0 z-20 px-2 pt-safe-t">
        <div className="mx-auto flex max-w-column items-center py-2">
          <button
            onClick={() => navigate('/learn')}
            className="flex h-11 items-center gap-0.5 pr-3 text-body text-accent"
          >
            <ChevronLeft className="h-6 w-6" />
            Somali
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-column px-4 pb-[calc(2rem+var(--safe-b))]">
        <h1 className="pb-3 pt-3 text-large font-bold text-label">All lessons</h1>

        {grouped.map(({ unit, lessons }) => {
          const bank = getUnitTest(unit.id);
          const unlocked = isUnitComplete(unit.id, completed);
          return (
            <section key={unit.id} className="mb-7">
              <h2 className="px-1 pb-1.5 text-footnote text-label-2">
                Unit {unit.id}
                {unit.name ? ` · ${unit.name}` : ''}
              </h2>

              <div className="list-group">
                {lessons.map((lesson) => (
                  <LessonRow
                    key={lesson.lessonId}
                    lesson={lesson}
                    done={completed.includes(lesson.lessonId)}
                    resumeAt={store.getLessonCardPosition?.(lesson.lessonId) ?? 0}
                    due={due.has(lesson.lessonId)}
                    onOpen={() => navigate(`/lesson/${lesson.lessonId}`)}
                  />
                ))}

                {bank && (
                  <button
                    onClick={() => unlocked && navigate(`/unit-test/${unit.id}`)}
                    disabled={!unlocked}
                    className="list-row flex min-h-[52px] w-full items-center gap-3 px-4 py-3 text-left active:bg-fill"
                  >
                    <span
                      className={`min-w-0 flex-1 truncate text-body ${
                        unlocked ? 'text-label' : 'text-label-3'
                      }`}
                    >
                      {bank.name}
                    </span>
                    {unlocked ? (
                      <ChevronRight className="h-4 w-4 flex-shrink-0 text-label-3" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 flex-shrink-0 text-label-3" />
                    )}
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function LessonRow({
  lesson,
  done,
  resumeAt,
  due,
  onOpen,
}: {
  lesson: LessonSummary;
  done: boolean;
  resumeAt: number;
  due: boolean;
  onOpen: () => void;
}) {
  const inProgress = !done && resumeAt > 0;

  return (
    <button
      onClick={onOpen}
      className="list-row flex min-h-[52px] w-full items-center gap-3 px-4 py-3 text-left active:bg-fill"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-body text-label">{lesson.title}</span>
        {(inProgress || due) && (
          <span className="block text-footnote text-label-2">
            {due ? 'Due for review' : `Card ${resumeAt + 1} of ${lesson.cardCount}`}
          </span>
        )}
      </span>
      {done && <Check className="h-4 w-4 flex-shrink-0 text-accent" />}
      <ChevronRight className="h-4 w-4 flex-shrink-0 text-label-3" />
    </button>
  );
}
