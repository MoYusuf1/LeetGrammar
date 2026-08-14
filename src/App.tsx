/**
 * App shell — mobile-first, one page.
 *
 * SHAPE: /learn is the app. Everything else is a task the learner enters and
 * leaves — a lesson, its homework, a unit test — rendered full-screen over the
 * top with a close affordance, not a nav destination. There is no landing
 * page, no tab bar (a tab bar with one tab is just a bar), and no account
 * surface: progress has always been local-only in localStorage, so there was
 * never an account to hide.
 *
 * RETIRED: Landing, Profile and Glossary as routes. Their function is folded
 * in — progress into the /learn header, the glossary into a drawer opened from
 * inside a lesson, where a learner actually meets the term. /worksheet stays
 * reachable because a printable sheet is genuinely a separate document, but it
 * is entered from a lesson rather than listed anywhere.
 */

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import ErrorBoundary from '@/components/ErrorBoundary';

const Learn = lazy(() => import('@/pages/Learn'));
const Lesson = lazy(() => import('@/pages/Lesson'));
const Homework = lazy(() => import('@/pages/Homework'));
const UnitTest = lazy(() => import('@/pages/UnitTest'));
const Worksheet = lazy(() => import('@/pages/Worksheet'));

function PageLoader() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-surface">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      {/* 100dvh, not 100vh: on mobile the URL bar makes vh taller than the
          visible viewport, which pushed the bottom action off-screen. */}
      <div className="min-h-[100dvh] bg-surface text-ink">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/learn" element={<Learn />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/homework/:id" element={<Homework />} />
            <Route path="/unit-test/:id" element={<UnitTest />} />
            <Route path="/worksheet/:id" element={<Worksheet />} />

            {/* Everything else lands on the one page, including the routes the
                old LeetCode-shaped UI used to have. */}
            <Route path="*" element={<Navigate to="/learn" replace />} />
          </Routes>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
