/**
 * Auth initialization hook.
 * Call once at app root to set up Supabase auth listener and sync.
 */

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useProgressStore } from '@/stores/progress-store';
import { pullProgress, pushProgress, mergeProgress, ensureProfile } from '@/engine/sync';
import { isSupabaseConfigured } from '@/lib/supabase';

export function useAuthInit() {
  const { initialize, user, setSyncStatus, setLastSyncedAt } = useAuthStore();
  const progress = useProgressStore();
  const syncTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Initialize auth on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Pull progress when user logs in
  useEffect(() => {
    if (!user || !isSupabaseConfigured) return;

    const syncOnLogin = async () => {
      setSyncStatus('syncing');
      try {
        await ensureProfile(user.id, user.email);
        const remote = await pullProgress(user.id);

        if (remote) {
          const merged = mergeProgress(
            {
              completedLessons: progress.completedLessons,
              practiceScores: progress.practiceScores,
              srsCards: progress.srsCards,
              xp: progress.xp,
              streak: progress.streak,
              lastStudyDate: progress.lastStudyDate,
              activityLog: progress.activityLog,
            },
            remote
          );

          useProgressStore.setState({
            completedLessons: merged.completedLessons,
            practiceScores: merged.practiceScores,
            srsCards: merged.srsCards,
            xp: merged.xp,
            streak: merged.streak,
            lastStudyDate: merged.lastStudyDate,
            activityLog: merged.activityLog,
          });
        }

        // Push local progress to cloud (in case local is newer)
        const success = await pushProgress(user.id, {
          completedLessons: progress.completedLessons,
          practiceScores: progress.practiceScores,
          srsCards: progress.srsCards,
          xp: progress.xp,
          streak: progress.streak,
          lastStudyDate: progress.lastStudyDate,
          activityLog: progress.activityLog,
        });

        setSyncStatus(success ? 'synced' : 'error');
        setLastSyncedAt(new Date().toISOString());
      } catch {
        setSyncStatus('error');
      }
    };

    syncOnLogin();
  }, [user?.id]);

  // Auto-push on progress changes (debounced)
  useEffect(() => {
    if (!user || !isSupabaseConfigured) return;

    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(async () => {
      setSyncStatus('syncing');
      const success = await pushProgress(user.id, {
        completedLessons: progress.completedLessons,
        practiceScores: progress.practiceScores,
        srsCards: progress.srsCards,
        xp: progress.xp,
        streak: progress.streak,
        lastStudyDate: progress.lastStudyDate,
        activityLog: progress.activityLog,
      });
      setSyncStatus(success ? 'synced' : 'error');
      setLastSyncedAt(new Date().toISOString());
    }, 2000);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [
    user?.id,
    progress.completedLessons.length,
    progress.xp,
    progress.streak,
    progress.lastStudyDate,
  ]);
}
