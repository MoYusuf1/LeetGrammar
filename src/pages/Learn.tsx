/**
 * Home — what to do now, and nothing else.
 *
 * WHY THIS IS SHORT. The previous version listed every lesson, every unit test
 * and every practice affordance on first load. Opening the app meant reading
 * the entire curriculum before you could start, which is a decision to make
 * rather than a thing to do. Settings does not open on every setting; Safari
 * does not open on every bookmark.
 *
 * So: one card telling you where you are, a review row only when something is
 * actually due, and the full curriculum one tap away at /lessons. A locked unit
 * test is not shown at all — a row you cannot press is furniture.
 *
 * REGRESSION GUARD, INHERITED: a hardcoded table naming lesson ranges used to
 * live in the old lessons page. Authoring a new lesson would have left it
 * invisible while build, tests and validator all stayed green. Everything here
 * derives from LESSON_LIST and UNITS. NOTHING MAY NAME A LESSON NUMBER.
 */

import { useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { LESSON_LIST } from '@/data/authored-lessons';
import { UNITS, getUnitTest } from '@/data/unit-tests';
import { isUnitComplete } from '@/lib/assessment';
import { dueLessons } from '@/lib/review';
import { useProgressStore } from '@/stores/progress-store';

export default function LearnPage() {
  const navigate = useNavigate();
  const store = useProgressStore();

  const completed = (store.completedLessons as number[] | undefined) ?? [];
  const total = LESSON_LIST.length;
  const doneCount = completed.filter((id) => id >= 1 && id <= total).length;

  const due = dueLessons(store.reviewSchedule ?? {}, completed);
  const next = LESSON_LIST.find((l) => !completed.includes(l.lessonId));
  const resumeAt = next ? (store.getLessonCardPosition?.(next.lessonId) ?? 0) : 0;

  /* Only an unlocked test is worth a row. */
  const openTest = UNITS.map((u) => ({ unit: u, bank: getUnitTest(u.id) })).find(
    ({ unit, bank }) => bank && isUnitComplete(unit.id, completed),
  );

  return (
    <div className="min-h-[100dvh] bg-bg">
      <div className="mx-auto max-w-column px-4 pt-safe-t">
        <header className="pb-2 pt-4">
          <h1 className="text-large font-bold text-label">Somali</h1>
          <p className="mt-0.5 text-subhead text-label-2">
            {doneCount === 0
              ? `${total} lessons`
              : doneCount === total
                ? 'Course complete'
                : `${doneCount} of ${total} lessons done`}
          </p>
        </header>

        <main className="pb-[calc(2rem+var(--safe-b))] pt-3">
          {/* The one thing to do. */}
          {next ? (
            <button
              onClick={() => navigate(`/lesson/${next.lessonId}`)}
              className="pressable flex w-full items-center gap-3 rounded-xl bg-elevated px-4 py-4 text-left"
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
          ) : (
            <div className="rounded-xl bg-elevated px-4 py-4">
              <p className="text-title3 font-semibold text-label">Every lesson done</p>
              <p className="mt-0.5 text-footnote text-label-2">
                Keep the material from going quiet — practice is below.
              </p>
            </div>
          )}

          {/* Only when something is genuinely owed. */}
          {due.length > 0 && (
            <div className="mt-5 list-group">
              <Row
                title={due.length === 1 ? 'Review 1 lesson' : `Review ${due.length} lessons`}
                detail="Due now"
                onClick={() => navigate(`/homework/${due[0]}`)}
              />
            </div>
          )}

          <div className="mt-5 list-group">
            <Row title="All lessons" onClick={() => navigate('/lessons')} />
            {openTest?.bank && (
              <Row
                title={openTest.bank.name}
                onClick={() => navigate(`/unit-test/${openTest.unit.id}`)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/** An iOS list row: label, optional trailing detail, chevron. */
function Row({
  title,
  detail,
  onClick,
}: {
  title: string;
  detail?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="list-row flex min-h-[48px] w-full items-center gap-3 px-4 py-3 text-left active:bg-fill"
    >
      <span className="min-w-0 flex-1 truncate text-body text-label">{title}</span>
      {detail && <span className="flex-shrink-0 text-body text-label-2">{detail}</span>}
      <ChevronRight className="h-4 w-4 flex-shrink-0 text-label-3" />
    </button>
  );
}
