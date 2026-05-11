import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Shield,
  User,
  RotateCcw,
  GitMerge,
  Database,
  Users,
  ArrowRight,
  Check,
  X,
  Loader2,
} from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { useAdmin } from '@/hooks/useAdmin';
import { fetchAllProfiles, setAdminStatus } from '@/engine/sync';
import ProfileEditor from '@/components/ProfileEditor';
import SyncStatusCard from '@/components/SyncStatusCard';
import CloudSyncNotice from '@/components/CloudSyncNotice';

/* ─── Tabs ─── */
type TabKey = 'general' | 'admin';

const TABS: { key: TabKey; label: string; icon: typeof User; adminOnly?: boolean }[] = [
  { key: 'general', label: 'General', icon: User },
  { key: 'admin', label: 'Admin', icon: Shield, adminOnly: true },
];

/* ─── General Tab ─── */
function GeneralTab() {
  const { resetProgress } = useProgress();

  return (
    <div className="space-y-5">
      {/* Profile Card */}
      <ProfileEditor />

      {/* Sync Status */}
      <SyncStatusCard />

      {/* Reset Progress */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
        <h3 className="text-sm font-bold text-[#ef4444] mb-2 flex items-center gap-2">
          <RotateCcw size={14} /> Danger Zone
        </h3>
        <p className="text-xs text-[#8c8c8c] mb-3">This will permanently delete all your progress. This action cannot be undone.</p>
        <button
          onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) resetProgress(); }}
          className="h-9 px-4 rounded-lg bg-[#ef4444]15 border border-[#ef4444]30 text-xs font-semibold text-[#ef4444] hover:bg-[#ef4444]25 transition-colors"
        >
          Reset All Progress
        </button>
      </div>

      {/* Unconfigured notice */}
      <CloudSyncNotice />
    </div>
  );
}

/* ─── Admin Tab ─── */
function AdminTab() {
  const navigate = useNavigate();
  const isAdmin = useAdmin();
  const [users, setUsers] = useState<Array<{ id: string; email: string; first_name?: string; last_name?: string; is_admin?: boolean }>>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    loadUsers();
  }, [isAdmin]);

  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchAllProfiles();
    setUsers(data ?? []);
    setLoading(false);
  };

  const toggleAdmin = async (userId: string, makeAdmin: boolean) => {
    setUpdating(userId);
    const ok = await setAdminStatus(userId, makeAdmin);
    if (ok) {
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, is_admin: makeAdmin } : u));
    }
    setUpdating(null);
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield size={32} className="text-[#ef4444] mx-auto mb-3" />
        <p className="text-sm text-[#8c8c8c]">Admin access required.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Admin Tools */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
        <h3 className="text-sm font-bold text-[#eff1f6] mb-4 flex items-center gap-2">
          <GitMerge size={14} className="text-[#ffa116]" /> Tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/ingest')}
            className="flex items-center gap-3 p-4 rounded-xl bg-[#0f0f0f] border border-[#ffffff08] hover:border-[#ffffff15] hover:bg-[#1a1a1a] transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#ffa116]15 border border-[#ffa116]30 flex items-center justify-center flex-shrink-0">
              <GitMerge size={18} className="text-[#ffa116]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#eff1f6]">Ingest Data</p>
              <p className="text-xs text-[#8c8c8c]">Import knowledge graph JSON files</p>
            </div>
            <ArrowRight size={16} className="text-[#5c5c5c] flex-shrink-0" />
          </button>
          <button
            onClick={() => navigate('/curriculum')}
            className="flex items-center gap-3 p-4 rounded-xl bg-[#0f0f0f] border border-[#ffffff08] hover:border-[#ffffff15] hover:bg-[#1a1a1a] transition-all text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#3b82f6]15 border border-[#3b82f6]30 flex items-center justify-center flex-shrink-0">
              <Database size={18} className="text-[#3b82f6]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#eff1f6]">Database</p>
              <p className="text-xs text-[#8c8c8c]">View graph stats and manage persistence</p>
            </div>
            <ArrowRight size={16} className="text-[#5c5c5c] flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* User Management */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
        <h3 className="text-sm font-bold text-[#eff1f6] mb-4 flex items-center gap-2">
          <Users size={14} className="text-[#22c55e]" /> User Management
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="text-[#ffa116] animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <p className="text-xs text-[#5c5c5c] text-center py-8">No users found.</p>
        ) : (
          <div className="space-y-2">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff06]">
                <div className="min-w-0">
                  <p className="text-sm text-[#eff1f6] truncate">
                    {u.first_name && u.last_name ? `${u.first_name} ${u.last_name}` : u.email}
                  </p>
                  <p className="text-[10px] text-[#5c5c5c] truncate">{u.email}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {u.is_admin ? (
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#ffa116]15 text-[#ffa116]">Admin</span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-[#1a1a1a] text-[#5c5c5c]">User</span>
                  )}
                  <button
                    onClick={() => toggleAdmin(u.id, !u.is_admin)}
                    disabled={updating === u.id}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      u.is_admin
                        ? 'bg-[#ef4444]10 text-[#ef4444] hover:bg-[#ef4444]20'
                        : 'bg-[#22c55e]10 text-[#22c55e] hover:bg-[#22c55e]20'
                    }`}
                    title={u.is_admin ? 'Demote to user' : 'Promote to admin'}
                  >
                    {updating === u.id ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : u.is_admin ? (
                      <X size={12} />
                    ) : (
                      <Check size={12} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Settings Page ─── */
export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabKey>('general');
  const isAdmin = useAdmin();

  const visibleTabs = TABS.filter((t) => !t.adminOnly || isAdmin);

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-0 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[720px] mx-auto">
          <h1 className="text-xl font-bold text-[#eff1f6] mb-3">Settings</h1>
          <div className="flex items-center gap-1 -mb-px">
            {visibleTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                    isActive
                      ? 'text-[#eff1f6] border-[#ffa116]'
                      : 'text-[#8c8c8c] border-transparent hover:text-[#c8c8c8]'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5">
        <div className="max-w-[720px] mx-auto">
          {activeTab === 'general' && <GeneralTab />}
          {activeTab === 'admin' && <AdminTab />}
        </div>
      </div>
    </div>
  );
}
