import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useAuthInit } from '@/hooks/useAuthInit';
import { useGraphInit } from '@/hooks/useGraphInit';
import TopNav from '@/components/TopNav';
import ErrorBoundary from '@/components/ErrorBoundary';
import AdminGuard from '@/components/AdminGuard';

/* ─── All routes (lazy-loaded) ─── */
const Landing = lazy(() => import('@/pages/Landing'));
const Problems = lazy(() => import('@/pages/Problems'));
const Roadmap = lazy(() => import('@/pages/Roadmap'));
const Learn = lazy(() => import('@/pages/Learn'));
const Problem = lazy(() => import('@/pages/Problem'));
const WorkbookLevel = lazy(() => import('@/pages/WorkbookLevel'));
const Lesson = lazy(() => import('@/pages/Lesson'));
const Lessons = lazy(() => import('@/pages/Lessons'));
const Profile = lazy(() => import('@/pages/Profile'));
const Wiki = lazy(() => import('@/pages/Wiki'));
const Concepts = lazy(() => import('@/pages/Concepts'));
const Curriculum = lazy(() => import('@/pages/Curriculum'));
const Ingest = lazy(() => import('@/pages/Ingest'));
const Quiz = lazy(() => import('@/pages/Quiz'));
const Review = lazy(() => import('@/pages/Review'));
const StudyHub = lazy(() => import('@/pages/StudyHub'));
const Settings = lazy(() => import('@/pages/Settings'));

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#0f0f0f]">
      <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  useAuthInit();
  useGraphInit();

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col bg-[#0f0f0f] overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-16 sm:pb-0">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/problem/:id" element={<Problem />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/wiki/:conceptId" element={<Wiki />} />
              <Route path="/concepts" element={<Concepts />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route
                path="/ingest"
                element={
                  <AdminGuard>
                    <Ingest />
                  </AdminGuard>
                }
              />
              <Route path="/quiz/:conceptId" element={<Quiz />} />
              <Route path="/review" element={<Review />} />
              <Route path="/study/:conceptId" element={<StudyHub />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Navigate to="/settings" replace />} />
              {/* Redirects for old routes */}
              <Route path="/path" element={<Navigate to="/roadmap" replace />} />
              <Route path="/practice" element={<Navigate to="/problems" replace />} />
              <Route path="/workbook/level/:id" element={<WorkbookLevel />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
}
