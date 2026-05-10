import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useAuthInit } from '@/hooks/useAuthInit';
import TopNav from '@/components/TopNav';
import ErrorBoundary from '@/components/ErrorBoundary';

/* ─── Core routes (eager) ─── */
import Problems from '@/pages/Problems';
import Roadmap from '@/pages/Roadmap';
import Learn from '@/pages/Learn';
import About from '@/pages/About';

/* ─── Heavy routes (lazy-loaded) ─── */
const Problem = lazy(() => import('@/pages/Problem'));
const Lesson = lazy(() => import('@/pages/Lesson'));
const Profile = lazy(() => import('@/pages/Profile'));
const Wiki = lazy(() => import('@/pages/Wiki'));
const Concepts = lazy(() => import('@/pages/Concepts'));
const Curriculum = lazy(() => import('@/pages/Curriculum'));
const Ingest = lazy(() => import('@/pages/Ingest'));
const Quiz = lazy(() => import('@/pages/Quiz'));
const Review = lazy(() => import('@/pages/Review'));

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#0f0f0f]">
      <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  useAuthInit();

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col bg-[#0f0f0f] overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/problems" replace />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/problem/:id" element={<Problem />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/about" element={<About />} />
              <Route path="/wiki/:conceptId" element={<Wiki />} />
              <Route path="/concepts" element={<Concepts />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/ingest" element={<Ingest />} />
              <Route path="/quiz/:conceptId" element={<Quiz />} />
              <Route path="/review" element={<Review />} />
              {/* Redirects for old routes */}
              <Route path="/path" element={<Navigate to="/roadmap" replace />} />
              <Route path="/practice" element={<Navigate to="/problems" replace />} />
              <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
}
