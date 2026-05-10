import { useLocation, useNavigate } from 'react-router';
import { Map, List, BookOpen, User, Flame, Code2, Network, Route } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

const navLinks = [
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/problems', label: 'Problems', icon: List },
  { path: '/learn', label: 'Learn', icon: BookOpen },
  { path: '/concepts', label: 'Wiki', icon: Network },
  { path: '/curriculum', label: 'Path', icon: Route },
];

export default function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { progress } = useProgress();

  // Don't show top nav during problem solving (immersive mode)
  // Show it on lesson pages so users can navigate away
  if (location.pathname.startsWith('/problem/')) {
    return null;
  }

  return (
    <nav className="h-[50px] bg-[#0f0f0f]/80 backdrop-blur-md border-b border-[#ffffff10] flex items-center px-4 justify-between flex-shrink-0 sticky top-0 z-50">
      {/* Logo */}
      <button
        onClick={() => navigate('/problems')}
        className="flex items-center gap-2 tap-scale"
      >
        <div className="w-7 h-7 rounded-lg bg-[#ffa116] flex items-center justify-center">
          <Code2 size={16} className="text-[#1a1a1a]" strokeWidth={2.5} />
        </div>
        <span className="text-[#eff1f6] font-bold text-sm hidden sm:inline">
          Soomaali<span className="text-[#ffa116]">Grammar</span>
        </span>
      </button>

      {/* Center nav links */}
      <div className="flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
          const Icon = link.icon;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors tap-scale ${
                isActive
                  ? 'text-[#eff1f6] bg-[#ffffff1a]'
                  : 'text-[#8c8c8c] hover:text-[#eff1f6] hover:bg-[#ffffff0d]'
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{link.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right side - streak indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-[#ffc01e]">
          <Flame size={14} />
          <span className="text-xs font-semibold">{progress.streak}</span>
        </div>
        <button
          onClick={() => navigate('/profile')}
          className="w-7 h-7 rounded-full bg-[#3e3e3e] flex items-center justify-center text-[#8c8c8c] hover:text-[#eff1f6] tap-scale"
        >
          <User size={14} />
        </button>
      </div>
    </nav>
  );
}
