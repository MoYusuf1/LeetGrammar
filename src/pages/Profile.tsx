/**
 * Profile Page — LeetCode-inspired user profile.
 *
 * Layout:
 *   Left sidebar (260px): Avatar, name, rank, community stats
 *   Main area: Problems solved, heatmap, knowledge graph, course progress
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  RotateCcw,
  TrendingUp,
  Trophy,
  Cloud,
  CloudOff,
  Loader2,
  MapPin,
  Calendar,
  Target,
  Camera,
  Route,
  ChevronRight,
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { allProblems } from '@/data/problems';
import { useAuthStore } from '@/stores/auth-store';
import { useGraphStore } from '@/stores/graph-store';
import { fetchProfile, updateProfile, uploadAvatar } from '@/engine/sync';

const RANK_COLORS = [
  { max: 100, label: 'Novice', color: '#5c5c5c', bg: '#1a1a1a' },
  { max: 300, label: 'Learner', color: '#22c55e', bg: '#22c55e15' },
  { max: 600, label: 'Scholar', color: '#3b82f6', bg: '#3b82f615' },
  { max: 1000, label: 'Expert', color: '#a855f7', bg: '#a855f715' },
  { max: 1500, label: 'Master', color: '#ffc01e', bg: '#ffc01e15' },
  { max: Infinity, label: 'Grandmaster', color: '#ef4444', bg: '#ef444415' },
];

function getRank(xp: number) {
  return RANK_COLORS.find((r) => xp < r.max) ?? RANK_COLORS[RANK_COLORS.length - 1];
}

function getInitials(first?: string, last?: string, email?: string) {
  if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
  if (first) return first[0].toUpperCase();
  if (email) return email[0].toUpperCase();
  return '?';
}

/* ────────────────────────────────────────────────────────────────────────── */

export default function Profile() {
  const navigate = useNavigate();
  const { progress, completionPercentage, resetProgress } = useProgress();
  const { user, syncStatus, isConfigured } = useAuthStore();
  const { stats } = useGraphStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load profile from Supabase
  useEffect(() => {
    if (!user) return;
    fetchProfile(user.id).then((data) => {
      if (data) {
        setFirstName(data.first_name ?? '');
        setLastName(data.last_name ?? '');
        setDisplayName(data.display_name ?? '');
        setUsername(data.username ?? '');
        setAvatarUrl(data.avatar_url ?? '');
      }
      setProfileLoaded(true);
    });
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    await updateProfile(user.id, {
      first_name: firstName,
      last_name: lastName,
      display_name: displayName,
      username,
    });
    setSaving(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingAvatar(true);
    const url = await uploadAvatar(user.id, file);
    if (url) {
      setAvatarUrl(url);
      await updateProfile(user.id, { avatar_url: url });
    }
    setUploadingAvatar(false);
    e.target.value = '';
  };

  const rank = getRank(progress.xp);
  const fullName = `${firstName} ${lastName}`.trim() || displayName || user?.email?.split('@')[0] || 'Guest';
  const initials = getInitials(firstName, lastName, user?.email ?? undefined);

  // Problems by difficulty
  const problemsByDifficulty = useMemo(() => ({
    Beginner: allProblems.filter((p) => p.difficulty === 'Beginner'),
    Intermediate: allProblems.filter((p) => p.difficulty === 'Intermediate'),
    Advanced: allProblems.filter((p) => p.difficulty === 'Advanced'),
  }), []);

  const solvedByDiff = useMemo(() => ({
    Beginner: problemsByDifficulty.Beginner.filter((p) => progress.completedLessons.includes(p.id)).length,
    Intermediate: problemsByDifficulty.Intermediate.filter((p) => progress.completedLessons.includes(p.id)).length,
    Advanced: problemsByDifficulty.Advanced.filter((p) => progress.completedLessons.includes(p.id)).length,
  }), [progress.completedLessons, problemsByDifficulty]);

  // Real activity heatmap from activityLog
  const heatmap = useMemo(() => {
    const days = 49; // 7 weeks
    const logSet = new Set(progress.activityLog);
    const cells = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const dateStr = date.toISOString().split('T')[0];
      const count = logSet.has(dateStr) ? 1 : 0;
      cells.push({ date: dateStr, intensity: count });
    }
    return cells;
  }, [progress.activityLog]);

  const heatmapByWeek = useMemo(() => {
    const weeks: typeof heatmap[] = [];
    for (let i = 0; i < heatmap.length; i += 7) {
      weeks.push(heatmap.slice(i, i + 7));
    }
    return weeks;
  }, [heatmap]);

  // Month labels for heatmap
  const monthLabels = useMemo(() => {
    const labels: { index: number; label: string }[] = [];
    let lastMonth = '';
    heatmapByWeek.forEach((week, wi) => {
      const midDay = week[3];
      if (midDay) {
        const d = new Date(midDay.date);
        const month = d.toLocaleDateString('en-US', { month: 'short' });
        if (month !== lastMonth) {
          labels.push({ index: wi, label: month });
          lastMonth = month;
        }
      }
    });
    return labels;
  }, [heatmapByWeek]);

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      <div className="max-w-[1000px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── LEFT SIDEBAR ── */}
          <aside className="w-full lg:w-[260px] flex-shrink-0 space-y-4">
            {/* Avatar Card */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5 text-center">
              <div className="relative inline-block">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-4 border-[#0f0f0f]"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#3b82f6] flex items-center justify-center text-white text-2xl font-bold mx-auto border-4 border-[#0f0f0f]">
                    {initials}
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#1a1a1a] border border-[#ffffff15] flex items-center justify-center text-[#8c8c8c] hover:text-[#eff1f6] hover:bg-[#222222] transition-colors"
                  title="Change photo"
                >
                  {uploadingAvatar ? <Loader2 size={12} className="animate-spin" /> : <Camera size={12} />}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <h2 className="text-base font-bold text-[#eff1f6] mt-3">{fullName}</h2>
              {username && <p className="text-xs text-[#5c5c5c] mt-0.5">@{username}</p>}
              {user && (
                <p className="text-xs text-[#5c5c5c] mt-1 flex items-center justify-center gap-1">
                  <MapPin size={10} />
                  {user.email}
                </p>
              )}

              {/* Rank badge */}
              <div
                className="inline-flex items-center gap-1.5 mt-3 px-2.5 py-1 rounded-full text-[10px] font-bold border"
                style={{ color: rank.color, backgroundColor: rank.bg, borderColor: `${rank.color}30` }}
              >
                {rank.label}
              </div>

              {/* Community stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#ffffff08]">
                <div className="text-center">
                  <p className="text-sm font-bold text-[#eff1f6]">{progress.xp}</p>
                  <p className="text-[9px] text-[#5c5c5c] uppercase tracking-wider mt-0.5">XP</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#eff1f6]">{progress.streak}</p>
                  <p className="text-[9px] text-[#5c5c5c] uppercase tracking-wider mt-0.5">Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-[#eff1f6]">{progress.completedLessons.length}</p>
                  <p className="text-[9px] text-[#5c5c5c] uppercase tracking-wider mt-0.5">Solved</p>
                </div>
              </div>
            </div>

            {/* Edit profile */}
            {user && profileLoaded && (
              <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First"
                      className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last"
                      className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1 block">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="@username"
                    className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] placeholder:text-[#5c5c5c] focus:outline-none focus:border-[#ffa116]50 transition-colors"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="w-full h-9 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-xs font-bold hover:bg-[#ffb800] transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            )}

            {/* Sync status */}
            {user && (
              <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2">Sync Status</p>
                <div className="flex items-center gap-2">
                  {syncStatus === 'synced' ? (
                    <>
                      <Cloud size={14} className="text-[#22c55e]" />
                      <span className="text-xs text-[#22c55e]">Synced</span>
                    </>
                  ) : syncStatus === 'syncing' ? (
                    <>
                      <Loader2 size={14} className="text-[#ffa116] animate-spin" />
                      <span className="text-xs text-[#ffa116]">Syncing...</span>
                    </>
                  ) : (
                    <>
                      <CloudOff size={14} className="text-[#ef4444]" />
                      <span className="text-xs text-[#ef4444]">Offline</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Journey */}
            <button
              onClick={() => navigate('/curriculum')}
              className="w-full rounded-xl bg-[#141414] border border-[#ffffff08] p-4 text-left hover:bg-[#1a1a1a] transition-colors group"
            >
              <div className="flex items-center gap-2 mb-2">
                <Route size={14} className="text-[#ffa116]" />
                <span className="text-xs font-bold text-[#eff1f6]">Your Journey</span>
                <ChevronRight size={12} className="text-[#5c5c5c] ml-auto group-hover:text-[#8c8c8c] transition-colors" />
              </div>
              <div className="h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-[#ffa116] rounded-full transition-all" style={{ width: `${completionPercentage}%` }} />
              </div>
              <p className="text-[10px] text-[#5c5c5c]">{progress.completedLessons.length} of {allProblems.length} completed</p>
            </button>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => { if (window.confirm('Reset all progress?')) resetProgress(); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#ffffff08] hover:bg-[#1a1a1a] transition-colors text-left"
              >
                <RotateCcw size={16} className="text-[#ef4444]" />
                <span className="text-xs font-medium text-[#eff1f6]">Reset Progress</span>
              </button>
            </div>
          </aside>

          {/* ── MAIN AREA ── */}
          <main className="flex-1 min-w-0 space-y-5">
            {/* Problems Solved — LeetCode style */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Target size={16} className="text-[#8c8c8c]" />
                <h3 className="text-sm font-bold text-[#eff1f6]">Problems Solved</h3>
                <span className="text-xs text-[#5c5c5c] ml-auto">
                  {progress.completedLessons.length} / {allProblems.length}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Donut chart */}
                <div className="relative w-28 h-28 flex-shrink-0">
                  <svg width="112" height="112" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="48" fill="none" stroke="#1a1a1a" strokeWidth="10" />
                    <circle
                      cx="56" cy="56" r="48" fill="none" stroke="#00b8a3" strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 48 * (solvedByDiff.Beginner / allProblems.length)} ${2 * Math.PI * 48}`}
                      strokeDashoffset={0}
                      strokeLinecap="round"
                      transform="rotate(-90 56 56)"
                    />
                    <circle
                      cx="56" cy="56" r="48" fill="none" stroke="#ffc01e" strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 48 * (solvedByDiff.Intermediate / allProblems.length)} ${2 * Math.PI * 48}`}
                      strokeDashoffset={`${-2 * Math.PI * 48 * (solvedByDiff.Beginner / allProblems.length)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 56 56)"
                    />
                    <circle
                      cx="56" cy="56" r="48" fill="none" stroke="#ff375f" strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 48 * (solvedByDiff.Advanced / allProblems.length)} ${2 * Math.PI * 48}`}
                      strokeDashoffset={`${-2 * Math.PI * 48 * ((solvedByDiff.Beginner + solvedByDiff.Intermediate) / allProblems.length)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 56 56)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-[#eff1f6]">{progress.completedLessons.length}</span>
                    <span className="text-[9px] text-[#5c5c5c]">solved</span>
                  </div>
                </div>

                {/* Difficulty breakdown */}
                <div className="flex-1 w-full space-y-3">
                  {[
                    { key: 'Beginner' as const, label: 'Easy', color: '#00b8a3', solved: solvedByDiff.Beginner, total: problemsByDifficulty.Beginner.length },
                    { key: 'Intermediate' as const, label: 'Medium', color: '#ffc01e', solved: solvedByDiff.Intermediate, total: problemsByDifficulty.Intermediate.length },
                    { key: 'Advanced' as const, label: 'Hard', color: '#ff375f', solved: solvedByDiff.Advanced, total: problemsByDifficulty.Advanced.length },
                  ].map((d) => {
                    const pct = d.total > 0 ? Math.round((d.solved / d.total) * 100) : 0;
                    return (
                      <div key={d.key} className="flex items-center gap-3">
                        <div className="w-24">
                          <p className="text-xs text-[#8c8c8c]">{d.label}</p>
                        </div>
                        <div className="flex-1 h-2 bg-[#0f0f0f] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: d.color }} />
                        </div>
                        <div className="w-12 text-right">
                          <span className="text-xs text-[#eff1f6]">{d.solved}</span>
                          <span className="text-xs text-[#5c5c5c]">/{d.total}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Activity Heatmap */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={16} className="text-[#8c8c8c]" />
                <h3 className="text-sm font-bold text-[#eff1f6]">Activity</h3>
                <span className="text-xs text-[#5c5c5c] ml-auto">
                  {progress.activityLog.length} active day{progress.activityLog.length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Month labels */}
              <div className="flex gap-1.5 ml-6 mb-1">
                {heatmapByWeek.map((_, wi) => {
                  const month = monthLabels.find((m) => m.index === wi);
                  return (
                    <div key={wi} className="w-[22px] flex-shrink-0">
                      {month && (
                        <span className="text-[9px] text-[#5c5c5c]">{month.label}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {heatmapByWeek.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((cell, di) => (
                      <div
                        key={di}
                        className="w-3 h-3 rounded-sm flex-shrink-0"
                        style={{
                          backgroundColor: cell.intensity > 0 ? '#ffa116' : '#1a1a1a',
                          opacity: cell.intensity > 0 ? 1 : 1,
                        }}
                        title={cell.date}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 mt-3">
                <span className="text-[10px] text-[#5c5c5c]">Less</span>
                <div className="w-3 h-3 rounded-sm bg-[#1a1a1a]" />
                <div className="w-3 h-3 rounded-sm bg-[#ffa116]40" />
                <div className="w-3 h-3 rounded-sm bg-[#ffa116]80" />
                <div className="w-3 h-3 rounded-sm bg-[#ffa116]" />
                <span className="text-[10px] text-[#5c5c5c]">More</span>
              </div>
            </div>

            {/* Knowledge Graph */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-[#8c8c8c]" />
                <h3 className="text-sm font-bold text-[#eff1f6]">Knowledge Graph</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-lg bg-[#0f0f0f]">
                  <p className="text-lg font-bold text-[#eff1f6]">{stats.nodes}</p>
                  <p className="text-[10px] text-[#5c5c5c] mt-0.5">Nodes</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-[#0f0f0f]">
                  <p className="text-lg font-bold text-[#eff1f6]">{stats.edges}</p>
                  <p className="text-[10px] text-[#5c5c5c] mt-0.5">Edges</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-[#0f0f0f]">
                  <p className="text-lg font-bold text-[#eff1f6]">{stats.constructions}</p>
                  <p className="text-[10px] text-[#5c5c5c] mt-0.5">Constructions</p>
                </div>
              </div>
            </div>

            {/* Course Progress */}
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={16} className="text-[#8c8c8c]" />
                <h3 className="text-sm font-bold text-[#eff1f6]">Course Progress</h3>
                <span className="text-xs text-[#5c5c5c] ml-auto">{completionPercentage}%</span>
              </div>
              <div className="h-2.5 bg-[#0f0f0f] rounded-full overflow-hidden">
                <div className="h-full bg-[#ffa116] rounded-full transition-all" style={{ width: `${completionPercentage}%` }} />
              </div>
              <p className="text-xs text-[#5c5c5c] mt-2">{progress.completedLessons.length} of {allProblems.length} problems completed</p>
            </div>
          </main>
        </div>
      </div>

      {/* Unconfigured notice */}
      {!isConfigured && (
        <div className="max-w-[1000px] mx-auto px-4 pb-6">
          <div className="rounded-xl bg-[#eab308]08 border border-[#eab308]15 p-3.5">
            <p className="text-xs text-[#eab308]">
              Cloud sync is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable sync.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
