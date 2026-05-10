/**
 * Profile Page — user stats, settings, sync status, and account management.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Flame,
  Star,
  BookOpen,
  RotateCcw,
  Info,
  TrendingUp,
  Trophy,
  LogOut,
  Cloud,
  CloudOff,
  Loader2,
  User,
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { allProblems } from '@/data/problems';
import { useAuthStore } from '@/stores/auth-store';
import { useGraphStore } from '@/stores/graph-store';
import { fetchProfile, updateProfile } from '@/engine/sync';

export default function Profile() {
  const navigate = useNavigate();
  const { progress, completionPercentage, resetProgress } = useProgress();
  const { user, signOut, syncStatus, isConfigured } = useAuthStore();
  const { stats } = useGraphStore();

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [saving, setSaving] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Load profile from Supabase
  useEffect(() => {
    if (!user) return;
    fetchProfile(user.id).then((data) => {
      if (data) {
        setDisplayName(data.display_name ?? '');
        setUsername(data.username ?? '');
      }
      setProfileLoaded(true);
    });
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    await updateProfile(user.id, { display_name: displayName, username });
    setSaving(false);
  };

  const problemsByDifficulty = {
    Beginner: allProblems.filter((p) => p.difficulty === 'Beginner'),
    Intermediate: allProblems.filter((p) => p.difficulty === 'Intermediate'),
    Advanced: allProblems.filter((p) => p.difficulty === 'Advanced'),
  };

  const completedByDiff = {
    Beginner: problemsByDifficulty.Beginner.filter((p) => progress.completedLessons.includes(p.id)).length,
    Intermediate: problemsByDifficulty.Intermediate.filter((p) => progress.completedLessons.includes(p.id)).length,
    Advanced: problemsByDifficulty.Advanced.filter((p) => progress.completedLessons.includes(p.id)).length,
  };

  const generateHeatmap = () => {
    const days = 28;
    const cells = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const dateStr = date.toISOString().split('T')[0];
      const isActive = progress.lastStudyDate === dateStr;
      cells.push({ date: dateStr, intensity: isActive ? 1 : 0 });
    }
    return cells;
  };

  const heatmap = generateHeatmap();
  const userInitial = user?.email?.charAt(0).toUpperCase() ?? '?';

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[720px] mx-auto">
          <h1 className="text-xl font-bold text-[#eff1f6]">Profile</h1>
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="max-w-[720px] mx-auto space-y-5">
          {/* User Card */}
          <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
            <div className="flex items-center gap-3">
              {user ? (
                <div className="w-12 h-12 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                  {userInitial}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#1a1a1a] border border-[#ffffff10] flex items-center justify-center text-[#5c5c5c] flex-shrink-0">
                  <User size={20} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                {user ? (
                  <>
                    <p className="text-sm font-bold text-[#eff1f6] truncate">
                      {displayName || user.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-[#8c8c8c] truncate">{user.email}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-bold text-[#eff1f6]">Guest</p>
                    <p className="text-xs text-[#8c8c8c]">Sign in to sync your progress</p>
                  </>
                )}
              </div>
              {user && (
                <div className="flex items-center gap-1.5 text-[10px]">
                  {syncStatus === 'synced' ? (
                    <>
                      <Cloud size={12} className="text-[#22c55e]" />
                      <span className="text-[#22c55e]">Synced</span>
                    </>
                  ) : syncStatus === 'syncing' ? (
                    <>
                      <Loader2 size={12} className="text-[#ffa116] animate-spin" />
                      <span className="text-[#ffa116]">Syncing</span>
                    </>
                  ) : (
                    <>
                      <CloudOff size={12} className="text-[#ef4444]" />
                      <span className="text-[#ef4444]">Offline</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Edit profile */}
            {user && profileLoaded && (
              <div className="mt-4 pt-4 border-t border-[#ffffff08] space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your name"
                      className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="@username"
                      className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="h-9 px-4 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] text-xs font-semibold text-[#c8c8c8] hover:text-[#eff1f6] hover:bg-[#222222] transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard icon={<Flame size={18} className="text-[#ffc01e]" />} label="Day Streak" value={progress.streak} />
            <StatCard icon={<Star size={18} className="text-[#ffc01e]" />} label="XP Points" value={progress.xp} />
            <StatCard icon={<BookOpen size={18} className="text-[#ffa116]" />} label="Solved" value={progress.completedLessons.length} />
            <StatCard icon={<Trophy size={18} className="text-[#00b8a3]" />} label="Complete" value={`${completionPercentage}%`} />
          </div>

          {/* Graph Stats */}
          <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">Knowledge Graph</p>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-lg font-bold text-[#eff1f6]">{stats.nodes}</p>
                <p className="text-[10px] text-[#5c5c5c]">Nodes</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#eff1f6]">{stats.edges}</p>
                <p className="text-[10px] text-[#5c5c5c]">Edges</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-[#eff1f6]">{stats.constructions}</p>
                <p className="text-[10px] text-[#5c5c5c]">Constructions</p>
              </div>
            </div>
          </div>

          {/* Activity Heatmap */}
          <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">Activity</p>
            <div className="flex gap-1 flex-wrap">
              {heatmap.map((cell, i) => (
                <div
                  key={i}
                  className="w-4 h-4 rounded-sm"
                  style={{
                    backgroundColor: cell.intensity > 0 ? '#ffa116' : '#1a1a1a',
                    opacity: cell.intensity > 0 ? 1 : 1,
                  }}
                  title={cell.date}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[10px] text-[#5c5c5c]">Less</span>
              <div className="w-3 h-3 rounded-sm bg-[#1a1a1a]" />
              <div className="w-3 h-3 rounded-sm bg-[#ffa116]40" />
              <div className="w-3 h-3 rounded-sm bg-[#ffa116]80" />
              <div className="w-3 h-3 rounded-sm bg-[#ffa116]" />
              <span className="text-[10px] text-[#5c5c5c]">More</span>
            </div>
          </div>

          {/* Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">Course Progress</p>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#1a1a1a" strokeWidth="6" />
                    <circle
                      cx="32" cy="32" r="28"
                      fill="none" stroke="#ffa116" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 28}
                      strokeDashoffset={2 * Math.PI * 28 * (1 - completionPercentage / 100)}
                      transform="rotate(-90 32 32)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TrendingUp size={16} className="text-[#ffa116]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-[#0f0f0f] rounded-full overflow-hidden">
                    <div className="h-full bg-[#ffa116] rounded-full transition-all" style={{ width: `${completionPercentage}%` }} />
                  </div>
                  <p className="text-xs text-[#8c8c8c] mt-2">{progress.completedLessons.length} of 50 problems</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">By Difficulty</p>
              <div className="space-y-3">
                {([
                  { key: 'Beginner' as const, label: 'Beginner', color: '#00b8a3' },
                  { key: 'Intermediate' as const, label: 'Intermediate', color: '#ffc01e' },
                  { key: 'Advanced' as const, label: 'Advanced', color: '#ff375f' },
                ]).map(({ key, label, color }) => {
                  const total = problemsByDifficulty[key].length;
                  const done = completedByDiff[key];
                  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-[#8c8c8c]">{label}</span>
                        <span className="text-xs text-[#eff1f6]">{done}/{total}</span>
                      </div>
                      <div className="h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SRS Stats */}
          <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-3">SRS Cards</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Due Today', value: Object.values(progress.srsCards).filter((c) => c.dueDate <= new Date().toISOString().split('T')[0]).length },
                { label: 'Learning', value: Object.values(progress.srsCards).filter((c) => c.mastery < 3).length },
                { label: 'Mastered', value: Object.values(progress.srsCards).filter((c) => c.mastery >= 3).length },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-lg font-bold text-[#eff1f6]">{s.value}</p>
                  <p className="text-[10px] text-[#5c5c5c]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/about')}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-[#141414] border border-[#ffffff08] hover:bg-[#1a1a1a] transition-colors text-left"
            >
              <Info size={18} className="text-[#8c8c8c]" />
              <span className="text-sm font-medium text-[#eff1f6]">About this course</span>
            </button>
            <button
              onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress(); }}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-[#141414] border border-[#ffffff08] hover:bg-[#1a1a1a] transition-colors text-left"
            >
              <RotateCcw size={18} className="text-[#ef4444]" />
              <span className="text-sm font-medium text-[#eff1f6]">Reset Progress</span>
            </button>
            {user && (
              <button
                onClick={() => signOut()}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#141414] border border-[#ffffff08] hover:bg-[#1a1a1a] transition-colors text-left sm:col-span-2"
              >
                <LogOut size={18} className="text-[#ef4444]" />
                <span className="text-sm font-medium text-[#eff1f6]">Sign Out</span>
              </button>
            )}
          </div>

          {/* Sync info */}
          {!isConfigured && (
            <div className="rounded-xl bg-[#eab308]08 border border-[#eab308]15 p-3.5">
              <p className="text-xs text-[#eab308]">
                Cloud sync is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable sync.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 text-center">
      <div className="flex items-center justify-center mb-2">{icon}</div>
      <p className="text-xl font-bold text-[#eff1f6]">{value}</p>
      <p className="text-[10px] text-[#8c8c8c]">{label}</p>
    </div>
  );
}
