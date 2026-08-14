/**
 * /learn — the only page.
 *
 * Replaces the old Lessons page, and absorbs what Landing and Profile used to
 * carry. Progress lives in the header now; the Novice → Grandmaster rank
 * ladder that came with the LeetCode-shaped UI is gone, because ranking a
 * learner against an imaginary ladder is not something this course measures.
 *
 * REGRESSION GUARD, INHERITED AND STILL LOAD-BEARING:
 * a hardcoded table used to live here naming lesson ranges
 * (`{ name: 'Unit 1: Foundations', min: 1, max: 4 }`). Authoring Lesson 5 would
 * have left it invisible on this page while the build, the tests and the
 * validator all stayed green — exactly the failure the working agreement's
 * first rule is about. Units and lessons derive from UNITS and LESSON_LIST.
 * NOTHING IN THIS FILE MAY NAME A LESSON NUMBER.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Check, ChevronRight, Lock, Repeat, ClipboardCheck } from 'lucide-react';
import { LESSON_LIST, type LessonSummary } from '@/data/authored-lessons';
import { UNITS, getUnitTest } from '@/data/unit-tests';
import { isUnitComplete } from '@/lib/assessment';
import { dueLessons } from '@/lib/review';
import { useProgressStore } from '@/stores/progress-store';
import ThemeToggle from '@/components/ThemeToggle';

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
  const streak = store.streak ?? 0;

  /* Lessons the fixed-interval schedule says are owed a review, most overdue
     first. Spacing only works if the learner is told; asking them to remember
     which lesson has gone quiet is the thing §1.4 exists to replace. */
  const due = dueLessons(store.reviewSchedule ?? {}, completed);
  const dueSet = new Set(due);

  const total = LESSON_LIST.length;
  const doneCount = completed.filter((id) => id >= 1 && id <= total).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  /* The single most useful thing this page can answer is "what do I do now".
     Reviews come first — a lesson going stale is time-sensitive in a way that
     starting the next one is not. */
  const nextLesson = LESSON_LIST.find((l) => !completed.includes(l.lessonId));

  return (
    <div className="min-h-[100dvh] bg-surface">
      <header className="sticky top-0 z-20 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-column items-center justify-between px-4 pt-safe-t">
          <div className="py-3">
            <h1 className="text-heading font-semibold text-ink">Somali</h1>
            <p className="text-micro text-ink-faint">
              {total} lessons · every form sourced
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-column px-4 pb-[calc(2rem+var(--safe-bottom))] pt-5">
        {/* Progress — plain counts, no rank, no XP ladder. */}
        <section className="mb-6" aria-label="Your progress">
          <div className="mb-2 flex items-baseline justify-between">
            <p className="text-small font-medium text-ink">
              {doneCount} of {total} lessons
            </p>
            <p className="text-micro tabular-nums text-ink-faint">
              {pct}%
              {streak > 0 && (
                <span className="ml-2 text-accent">
                  {streak}-day streak
                </span>
              )}
            </p>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-surface-sunken"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Course progress"
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </section>

        {/* What to do now. Review outranks progress: a lesson going stale is
            time-sensitive, starting the next one is not. */}
        {due.length > 0 ? (
          <button
            onClick={() => navigate(`/homework/${due[0]}`)}
            className="tap-scale mb-6 flex w-full items-center gap-3 rounded-xl border border-accent-line bg-accent-wash px-4 py-4 text-left"
          >
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent-wash text-accent">
              <Repeat className="h-[18px] w-[18px]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-body font-semibold text-ink">
                {due.length === 1 ? '1 lesson is' : `${due.length} lessons are`} due for
                review
              </span>
              <span className="block text-small text-ink-muted">
                Start with lesson {due[0]} — it has been the longest
              </span>
            </span>
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-accent" />
          </button>
        ) : nextLesson ? (
          <button
            onClick={() => navigate(`/lesson/${nextLesson.lessonId}`)}
            className="tap-scale mb-6 flex w-full items-center justify-between gap-3 rounded-xl bg-accent-strong px-5 py-4 text-left shadow-cta"
          >
            <span className="min-w-0">
              <span className="block text-micro font-medium uppercase tracking-wide text-white/75">
                {doneCount === 0 ? 'Start here' : 'Continue'}
              </span>
              <span className="block truncate text-body font-semibold text-white">
                {nextLesson.title}
              </span>
            </span>
            <ChevronRight className="h-5 w-5 flex-shrink-0 text-white" />
          </button>
        ) : null}

        <div className="space-y-7">
          {grouped.map(({ unit, lessons }) => {
            const bank = getUnitTest(unit.id);
            const unlocked = isUnitComplete(unit.id, completed);
            return (
              <section key={unit.id}>
                <h2 className="mb-2 px-1 text-micro font-semibold uppercase tracking-wider text-ink-faint">
                  Unit {unit.id}
                  {unit.name ? ` · ${unit.name}` : ''}
                </h2>

                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  {lessons.map((lesson, i) => (
                    <LessonRow
                      key={lesson.lessonId}
                      lesson={lesson}
                      completed={completed.includes(lesson.lessonId)}
                      resumeAt={store.getLessonCardPosition?.(lesson.lessonId) ?? 0}
                      dueForReview={dueSet.has(lesson.lessonId)}
                      first={i === 0}
                      onOpen={() => navigate(`/lesson/${lesson.lessonId}`)}
                      onHomework={() => navigate(`/homework/${lesson.lessonId}`)}
                    />
                  ))}
                  {bank && (
                    <UnitTestRow
                      name={bank.name}
                      unlocked={unlocked}
                      onClick={() => unlocked && navigate(`/unit-test/${unit.id}`)}
                    />
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}

function LessonRow({
  lesson,
  completed,
  resumeAt,
  dueForReview,
  first,
  onOpen,
  onHomework,
}: {
  lesson: LessonSummary;
  completed: boolean;
  resumeAt: number;
  dueForReview: boolean;
  first: boolean;
  onOpen: () => void;
  onHomework: () => void;
}) {
  const inProgress = !completed && resumeAt > 0;

  return (
    <div
      className={`flex items-stretch ${first ? '' : 'border-t border-border'}`}
    >
      <button
        onClick={onOpen}
        className="flex min-h-[60px] flex-1 items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-sunken"
      >
        <span
          aria-hidden
          className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-micro font-semibold ${
            completed
              ? 'bg-accent text-white'
              : inProgress
                ? 'border border-accent-line bg-accent-wash text-accent'
                : 'border border-border-strong text-ink-faint'
          }`}
        >
          {completed ? <Check className="h-4 w-4" /> : lesson.lessonId}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-body font-medium text-ink">
            {lesson.title}
          </span>
          <span className="block text-micro text-ink-faint">
            {lesson.cardCount} cards
            {inProgress ? ` · resume at card ${resumeAt + 1}` : ''}
          </span>
        </span>

        {dueForReview && (
          <span className="flex-shrink-0 rounded-full bg-accent-wash px-2 py-0.5 text-micro font-semibold text-accent">
            Due
          </span>
        )}
      </button>

      {/* Homework is Layer 2: mixed practice that carries earlier lessons back
          and gates nothing. Offered once the lesson is done, since it revisits
          rather than teaches. */}
      {completed && (
        <button
          onClick={onHomework}
          aria-label={`Practice lesson ${lesson.lessonId}: ${lesson.title}`}
          className="flex w-14 flex-shrink-0 items-center justify-center border-l border-border text-ink-faint transition-colors hover:bg-surface-sunken hover:text-accent"
        >
          <Repeat className="h-[18px] w-[18px]" />
        </button>
      )}
    </div>
  );
}

function UnitTestRow({
  name,
  unlocked,
  onClick,
}: {
  name: string;
  unlocked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!unlocked}
      className={`flex min-h-[60px] w-full items-center gap-3 border-t border-border px-4 py-3 text-left transition-colors ${
        unlocked ? 'hover:bg-surface-sunken' : 'cursor-not-allowed'
      }`}
    >
      <span
        aria-hidden
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
          unlocked
            ? 'border border-accent-line bg-accent-wash text-accent'
            : 'border border-border-strong text-ink-faint'
        }`}
      >
        {unlocked ? (
          <ClipboardCheck className="h-4 w-4" />
        ) : (
          <Lock className="h-3.5 w-3.5" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block truncate text-body font-medium ${
            unlocked ? 'text-ink' : 'text-ink-faint'
          }`}
        >
          {name}
        </span>
        <span className="block text-micro text-ink-faint">
          {unlocked ? 'All lessons done — take the test' : 'Finish the lessons above to unlock'}
        </span>
      </span>
      {unlocked && <ChevronRight className="h-5 w-5 flex-shrink-0 text-ink-faint" />}
    </button>
  );
}
