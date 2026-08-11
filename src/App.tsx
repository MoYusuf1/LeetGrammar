import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import TopNav from '@/components/TopNav';
import ErrorBoundary from '@/components/ErrorBoundary';

/* ─── All routes (lazy-loaded) ─── */
const Landing = lazy(() => import('@/pages/Landing'));
const Lesson = lazy(() => import('@/pages/Lesson'));
const Worksheet = lazy(() => import('@/pages/Worksheet'));
const Lessons = lazy(() => import('@/pages/Lessons'));
const UnitTest = lazy(() => import('@/pages/UnitTest'));
const Profile = lazy(() => import('@/pages/Profile'));
const Glossary = lazy(() => import('@/pages/Glossary'));

function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center bg-[#0f0f0f]">
      <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col bg-[#0f0f0f] overflow-hidden">
        <TopNav />
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-16 sm:pb-0">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/learn" element={<Lessons />} />
              <Route path="/lesson/:id" element={<Lesson />} />
              <Route path="/unit-test/:id" element={<UnitTest />} />
              <Route path="/worksheet/:id" element={<Worksheet />} />
              <Route path="/glossary" element={<Glossary />} />
              {/* Redirects for retired routes */}
              <Route path="/path" element={<Navigate to="/learn" replace />} />
              <Route path="/practice" element={<Navigate to="/learn" replace />} />
              <Route path="/problems" element={<Navigate to="/learn" replace />} />
              <Route path="/problem/:id" element={<Navigate to="/learn" replace />} />
              <Route path="/roadmap" element={<Navigate to="/learn" replace />} />
              <Route path="/workbook/level/:id" element={<Navigate to="/learn" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </ErrorBoundary>
  );
}
