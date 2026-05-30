/**
 * TopNav — Minimal, mobile-first navigation.
 *
 * Top bar with just logo + search (mobile) or full nav (desktop).
 * Bottom navigation on mobile for main sections.
 */

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Map, List, BookOpen, Code2, LogIn, Search, Menu } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
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
  const { user, signOut } = useAuthStore();
  const [authOpen, setAuthOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cmd+K shortcut (desktop only)
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
      {/* Top bar — minimal */}
      <nav className="h-12 bg-[#0f0f0f] border-b border-[#ffffff08] flex items-center px-4 justify-between sticky top-0 z-50">
        {/* Logo — icon only on mobile */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <div className="w-6 h-6 rounded-lg bg-[#ffa116] flex items-center justify-center">
            <Code2 size={14} className="text-[#1a1a1a]" strokeWidth={2.5} />
          </div>
          <span className="text-[#eff1f6] font-bold text-xs hidden sm:inline">
            Leet<span className="text-[#ffa116]">Grammar</span>
          </span>
        </button>

        {/* Search + User */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 h-8 px-2 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] text-xs text-[#5c5c5c] hover:text-[#8c8c8c] transition-colors"
          >
            <Search size={12} />
            <span className="hidden sm:inline">Search</span>
          </button>

          {user ? (
            <button
              onClick={() => signOut()}
              className="h-8 w-8 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] flex items-center justify-center text-xs font-bold text-[#ffa116] hover:bg-[#252525] transition-colors"
              title={user.email}
            >
              {userInitial}
            </button>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="h-8 px-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] flex items-center gap-1 text-xs font-bold hover:opacity-90 transition-opacity"
            >
              <LogIn size={12} />
              <span className="hidden sm:inline">Sign in</span>
            </button>
          )}
        </div>
      </nav>

      {/* Bottom navigation — mobile only */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#0f0f0f] border-t border-[#ffffff08] flex items-center justify-around sm:hidden z-50">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
          const Icon = link.icon;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="flex flex-col items-center gap-1 py-2 px-4"
            >
              <Icon
                size={18}
                className="transition-colors"
                style={{
                  color: isActive ? '#ffa116' : '#5c5c5c',
                }}
              />
              <span
                className="text-[9px] font-bold uppercase tracking-wider transition-colors"
                style={{
                  color: isActive ? '#ffa116' : '#5c5c5c',
                }}
              >
                {link.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Desktop nav — hidden on mobile */}
      <div className="hidden sm:flex border-b border-[#ffffff08] h-10 px-4 items-center gap-1 bg-[#0f0f0f] sticky top-12 z-40">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
          const Icon = link.icon;
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                isActive
                  ? 'text-[#eff1f6] bg-[#ffffff1a]'
                  : 'text-[#8c8c8c] hover:text-[#eff1f6] hover:bg-[#ffffff0d]'
              }`}
            >
              <Icon size={14} />
              <span>{link.label}</span>
            </button>
          );
        })}
      </div>

      {/* Modals */}
      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
