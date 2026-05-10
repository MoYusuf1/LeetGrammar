import { useLocation, useNavigate } from 'react-router';
import { Map, List, User } from 'lucide-react';

const tabs = [
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/problems', label: 'Problems', icon: List },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show bottom nav during problem solving
  if (location.pathname.startsWith('/problem/')) {
    return null;
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-ios-border pb-[env(safe-area-inset-bottom,0px)] h-[calc(60px+env(safe-area-inset-bottom,0px))]"
      style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50 }}
    >
      <div className="max-w-[480px] mx-auto flex items-center justify-around h-[60px]">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path || location.pathname.startsWith(tab.path + '/');
          const Icon = tab.icon;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center gap-0.5 w-20 h-full tap-scale select-none ${
                isActive ? 'text-accent' : 'text-text-tertiary'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className={`text-[10px] font-medium ${isActive ? 'font-semibold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
