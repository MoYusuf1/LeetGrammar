import { Cloud, CloudOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';

interface SyncStatusCardProps {
  /** If true, renders the compact sidebar style (Profile page). Otherwise the full card style (Settings). */
  compact?: boolean;
}

export default function SyncStatusCard({ compact = false }: SyncStatusCardProps) {
  const { user, syncStatus } = useAuthStore();

  if (!user) return null;

  const content = (
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
  );

  if (compact) {
    return (
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
        <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2">Sync Status</p>
        {content}
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5">
      <h3 className="text-sm font-bold text-[#eff1f6] mb-3">Sync Status</h3>
      {content}
    </div>
  );
}
