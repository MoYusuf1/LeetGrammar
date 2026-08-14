/**
 * Lesson Page — Wraps the card-based teaching engine.
 *
 * Route: /lesson/:id
 * /learn links here. This page TEACHES the material, one card at a time,
 * with intro → teach → practice → summary flow.
 */

import { useParams, useNavigate } from 'react-router';
import { Suspense, lazy } from 'react';
import { MAX_LESSON_ID } from '@/data/authored-lessons';

const LessonCards = lazy(() => import('@/components/lesson/LessonCards'));

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lessonId = parseInt(id ?? '1', 10);

  /* Validate lesson ID */
  if (isNaN(lessonId) || lessonId < 1 || lessonId > MAX_LESSON_ID) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-surface px-4">
        <p className="text-body text-ink-muted">Lesson not found.</p>
        <button
          onClick={() => navigate('/learn')}
          className="rounded-xl bg-accent-strong px-5 py-3 text-small font-semibold text-white"
        >
          Back to lessons
        </button>
      </div>
    );
  }

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <LessonCards key={lessonId} lessonId={lessonId} />
    </Suspense>
  );
}

function LessonSkeleton() {
  return (
    <div className="flex min-h-[100dvh] animate-pulse flex-col bg-surface">
      <div className="border-b border-border px-4 pt-safe-t">
        <div className="mx-auto flex max-w-column items-center gap-3 py-2.5">
          <div className="h-10 w-10 rounded-full bg-surface-sunken" />
          <div className="h-1.5 flex-1 rounded-full bg-surface-sunken" />
          <div className="h-2 w-8 rounded bg-surface-sunken" />
        </div>
      </div>

      <div className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-column space-y-4">
          <div className="h-3 w-24 rounded bg-surface-sunken" />
          <div className="h-8 w-3/4 rounded-lg bg-surface-sunken" />
          <div className="h-24 rounded-xl bg-surface-sunken" />
          <div className="h-16 rounded-xl bg-surface-sunken" />
        </div>
      </div>

      <div className="px-4 pb-[calc(0.75rem+var(--safe-bottom))]">
        <div className="mx-auto h-[52px] max-w-column rounded-xl bg-surface-sunken" />
      </div>
    </div>
  );
}
