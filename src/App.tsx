import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';
import { Shield } from 'lucide-react';
import { useAuthInit } from '@/hooks/useAuthInit';
import TopNav from '@/components/TopNav';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAdmin } from '@/hooks/useAdmin';

/* ─── Core routes (eager) ─── */
import Problems from '@/pages/Problems';
import Roadmap from '@/pages/Roadmap';
import Learn from '@/pages/Learn';
import Landing from '@/pages/Landing';

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
const StudyHub = lazy(() => import('@/pages/StudyHub'));
const Settings = lazy(() => import('@/pages/Settings'));

function AdminIngest() {
  const isAdmin = useAdmin();
  const navigate = useNavigate();
  if (!isAdmin) {
    return (
      <div className="min-h-full bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="text-center">
          <Shield size={40} className="text-[#ef4444] mx-auto mb-3" />
          <h1 className="text-lg font-bold text-[#eff1f6]">Access Denied</h1>
          <p className="text-sm text-[#8c8c8c] mt-1">Admin only.</p>
          <button
            onClick={() => navigate('/profile')}
            className="mt-4 px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-sm font-semibold"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }
  return <Ingest />;
}

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
              <Route path="/" element={<Landing />} />
              <Route path="/problems" element={<Problems />} />
              <Route path="/problem/:id" element={<Problem />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/wiki/:conceptId" element={<Wiki />} />
              <Route path="/concepts" element={<Concepts />} />
              <Route path="/curriculum" element={<Curriculum />} />
              <Route path="/ingest" element={<AdminIngest />} />
              <Route path="/quiz/:conceptId" element={<Quiz />} />
              <Route path="/review" element={<Review />} />
              <Route path="/study/:conceptId" element={<StudyHub />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Navigate to="/settings" replace />} />
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
