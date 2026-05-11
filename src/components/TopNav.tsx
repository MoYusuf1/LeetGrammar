import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Map, List, BookOpen, Flame, Code2, LogIn, Search } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useAuthStore } from '@/stores/auth-store';
import { useGraphStore } from '@/stores/graph-store';
import AuthModal from './AuthModal';
import GlobalSearch from './GlobalSearch';

const navLinks = [
  { path: '/roadmap', label: 'Roadmap', icon: Map },
  { path: '/problems', label: 'Problems', icon: List },
  { path: '/learn', label: 'Learn', icon: BookOpen },
];

export default function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { progress } = useProgress();
  const { user, signOut, syncStatus } = useAuthStore();
  const { isLoading: graphLoading } = useGraphStore();
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? '?';

  return (
    <>
      <nav className="h-[50px] bg-[#0f0f0f]/80 backdrop-blur-md border-b border-[#ffffff10] flex items-center px-4 justify-between flex-shrink-0 sticky top-0 z-50">
        {/* Logo + Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/problems')}
            className="flex items-center gap-2 tap-scale"
          >
            <div className="w-7 h-7 rounded-lg bg-[#ffa116] flex items-center justify-center">
              <Code2 size={16} className="text-[#1a1a1a]" strokeWidth={2.5} />
            </div>
            <span className="text-[#eff1f6] font-bold text-sm hidden sm:inline">
              Leet<span className="text-[#ffa116]">Grammar</span>
            </span>
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="hidden md:flex items-center gap-2 h-8 px-3 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] text-xs text-[#5c5c5c] hover:text-[#8c8c8c] hover:border-[#ffffff15] transition-colors"
          >
            <Search size={13} />
            <span>Search</span>
            <kbd className="ml-1 px-1 py-0.5 rounded text-[9px] font-mono bg-[#0f0f0f] border border-[#ffffff08]">⌘K</kbd>
          </button>
        </div>

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

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Graph loading indicator */}
          {graphLoading && (
            <div className="hidden sm:flex items-center gap-1.5 text-[#5c5c5c]">
              <div className="w-3.5 h-3.5 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] font-medium">Loading data…</span>
            </div>
          )}

          {/* Sync indicator */}
          {user && syncStatus === 'syncing' && (
            <div className="w-2 h-2 rounded-full bg-[#ffa116] animate-pulse" title="Syncing..." />
          )}
          {user && syncStatus === 'synced' && (
            <div className="w-2 h-2 rounded-full bg-[#22c55e]" title="Synced" />
          )}

          {/* Streak */}
          <div className="flex items-center gap-1 text-[#ffc01e]">
            <Flame size={14} />
            <span className="text-xs font-semibold">{progress.streak}</span>
          </div>

          {/* Auth */}
          {user ? (
            <div className="relative group">
              <button aria-label="Open user menu" className="w-7 h-7 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-xs font-bold hover:ring-2 hover:ring-[#3b82f6]50 transition-all">
                {userInitial}
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#1a1a1a] border border-[#ffffff10] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-3 border-b border-[#ffffff08]">
                  <p className="text-xs font-medium text-[#eff1f6] truncate">{user.email}</p>
                  <p className="text-[10px] text-[#5c5c5c] mt-0.5">
                    {syncStatus === 'synced' ? 'Cloud sync on' : syncStatus === 'syncing' ? 'Syncing...' : 'Sync off'}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full text-left px-3 py-2 text-xs text-[#c8c8c8] hover:text-[#eff1f6] hover:bg-[#ffffff06] transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full text-left px-3 py-2 text-xs text-[#c8c8c8] hover:text-[#eff1f6] hover:bg-[#ffffff06] transition-colors"
                >
                  Settings
                </button>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-3 py-2 text-xs text-[#ef4444] hover:bg-[#ef4444]08 transition-colors rounded-b-xl"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              aria-label="Sign in"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#8c8c8c] hover:text-[#eff1f6] hover:bg-[#ffffff0d] transition-colors"
            >
              <LogIn size={14} />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </nav>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
