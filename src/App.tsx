import { Routes, Route, Navigate } from 'react-router';
import TopNav from '@/components/TopNav';
import Roadmap from '@/pages/Roadmap';
import Problems from '@/pages/Problems';
import Problem from '@/pages/Problem';
import Lesson from '@/pages/Lesson';
import Profile from '@/pages/Profile';
import Learn from '@/pages/Learn';
import About from '@/pages/About';

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-[#0f0f0f] overflow-hidden">
      <TopNav />
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <Routes>
          <Route path="/" element={<Navigate to="/problems" replace />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problem/:id" element={<Problem />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<About />} />
          {/* Redirects for old routes */}
          <Route path="/path" element={<Navigate to="/roadmap" replace />} />
          <Route path="/practice" element={<Navigate to="/problems" replace />} />
          <Route path="/lesson/:id" element={<Lesson />} />
        </Routes>
      </div>
    </div>
  );
}
