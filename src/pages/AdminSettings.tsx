/**
 * Admin Settings — admin-only page with links to admin tools.
 */

import { useNavigate } from 'react-router';
import { Shield, GitMerge, Users, Database, ArrowRight } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';

const adminTools = [
  {
    title: 'Ingest Data',
    desc: 'Import knowledge graph JSON files into the database.',
    icon: GitMerge,
    path: '/ingest',
    color: '#ffa116',
  },
  {
    title: 'Database',
    desc: 'View raw graph stats and manage migrations.',
    icon: Database,
    path: '/curriculum',
    color: '#3b82f6',
  },
  {
    title: 'User Management',
    desc: 'Manage users and admin roles. (Coming soon)',
    icon: Users,
    path: '',
    color: '#22c55e',
    disabled: true,
  },
];

export default function AdminSettings() {
  const navigate = useNavigate();
  const isAdmin = useAdmin();

  if (!isAdmin) {
    return (
      <div className="min-h-full bg-[#0f0f0f] flex items-center justify-center px-4">
        <div className="text-center">
          <Shield size={40} className="text-[#ef4444] mx-auto mb-3" />
          <h1 className="text-lg font-bold text-[#eff1f6]">Access Denied</h1>
          <p className="text-sm text-[#8c8c8c] mt-1">You need admin privileges to view this page.</p>
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

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[640px] mx-auto flex items-center gap-2">
          <Shield size={18} className="text-[#ffa116]" />
          <h1 className="text-xl font-bold text-[#eff1f6]">Admin Settings</h1>
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="max-w-[640px] mx-auto space-y-3">
          {adminTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.title}
                onClick={() => !tool.disabled && tool.path && navigate(tool.path)}
                disabled={tool.disabled}
                className={`w-full flex items-center gap-4 p-4 rounded-xl bg-[#141414] border border-[#ffffff08] text-left transition-all ${
                  tool.disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-[#1a1a1a] hover:border-[#ffffff15]'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${tool.color}15`,
                    border: `1px solid ${tool.color}30`,
                  }}
                >
                  <Icon size={18} style={{ color: tool.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#eff1f6]">{tool.title}</p>
                  <p className="text-xs text-[#8c8c8c] mt-0.5">{tool.desc}</p>
                </div>
                {!tool.disabled && <ArrowRight size={16} className="text-[#5c5c5c] flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
