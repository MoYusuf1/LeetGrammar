import { useAuthStore } from '@/stores/auth-store';

export default function CloudSyncNotice() {
  const { isConfigured } = useAuthStore();

  if (isConfigured) return null;

  return (
    <div className="rounded-xl bg-[#eab308]08 border border-[#eab308]15 p-3.5">
      <p className="text-xs text-[#eab308]">
        Cloud sync is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file to enable sync.
      </p>
    </div>
  );
}
