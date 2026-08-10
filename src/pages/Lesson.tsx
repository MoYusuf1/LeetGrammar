/**
 * Lesson Page — Wraps the card-based teaching engine.
 *
 * Route: /lesson/:id
 * The Learn page links here. This page TEACHES the material,
 * one card at a time, with intro → teach → practice → summary flow.
 */

import { useParams } from 'react-router';
import { Suspense, lazy } from 'react';
import { MAX_LESSON_ID } from '@/data/authored-lessons';

const LessonCards = lazy(() => import('@/components/lesson/LessonCards'));

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lessonId = parseInt(id ?? '1', 10);

  /* Validate lesson ID */
  if (isNaN(lessonId) || lessonId < 1 || lessonId > MAX_LESSON_ID) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-4 bg-[#0f0f0f]">
        <p className="text-[#8c8c8c] text-sm">Lesson not found.</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Suspense
        fallback={
          <LessonSkeleton />
        }
      >
        <LessonCards key={lessonId} lessonId={lessonId} />
      </Suspense>
    </div>
  );
}

function LessonSkeleton() {
  return (
    <div className="h-full flex flex-col bg-[#0f0f0f] animate-pulse">
      {/* Skeleton top bar */}
      <div className="px-4 pt-3 pb-2">
        <div className="max-w-[600px] mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#ffffff08]" />
          <div className="flex-1 h-2 bg-[#ffffff08] rounded-full" />
          <div className="w-8 h-2 bg-[#ffffff08] rounded" />
        </div>
      </div>

      {/* Skeleton content */}
      <div className="flex-1 px-4 py-6 space-y-4">
        <div className="max-w-[600px] mx-auto space-y-4">
          <div className="h-8 bg-[#ffffff08] rounded-xl w-3/4" />
          <div className="h-24 bg-[#ffffff08] rounded-2xl" />
          <div className="h-16 bg-[#ffffff08] rounded-xl" />
          <div className="h-16 bg-[#ffffff08] rounded-xl" />
        </div>
      </div>

      {/* Skeleton bottom */}
      <div className="px-4 pb-5 pt-2">
        <div className="max-w-[600px] mx-auto h-12 bg-[#ffffff08] rounded-2xl" />
      </div>
    </div>
  );
}
