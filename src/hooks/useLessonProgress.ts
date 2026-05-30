/**
 * useLessonProgress — Tracks which card a user is on for each lesson.
 *
 * Syncs to localStorage (immediate) and Supabase (async).
 * Lets users resume exactly where they left off.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  getLessonProgress,
  upsertLessonProgress as upsertLessonProgressToDb,
  deleteLessonProgress as deleteLessonProgressFromDb,
} from '@/lib/supabase/lesson-queries';
import { useAuthStore } from '@/stores/auth-store';

const STORAGE_KEY = 'lesson-card-positions';

interface LessonProgressMap {
  [lessonId: number]: number; // current card index
}

/** Load from localStorage */
function loadLocal(): LessonProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Save to localStorage */
function saveLocal(map: LessonProgressMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function useLessonProgress() {
  const { user } = useAuthStore();
  const [positions, setPositions] = useState<LessonProgressMap>(loadLocal);
  const [syncing, setSyncing] = useState(false);

  /* Sync from Supabase on mount (if logged in) */
  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      const data = await getLessonProgress(user.id);

      if (data && data.length > 0) {
        const merged = { ...loadLocal() };
        for (const row of data) {
          /* Supabase wins if newer */
          if (row.current_card > (merged[row.lesson_id] ?? -1)) {
            merged[row.lesson_id] = row.current_card;
          }
        }
        setPositions(merged);
        saveLocal(merged);
      }
    };

    fetchProgress();
  }, [user]);

  /* Get current card for a lesson */
  const getCardPosition = useCallback(
    (lessonId: number): number => {
      return positions[lessonId] ?? 0;
    },
    [positions]
  );

  /* Save position */
  const savePosition = useCallback(
    async (lessonId: number, cardIndex: number) => {
      const updated = { ...positions, [lessonId]: cardIndex };
      setPositions(updated);
      saveLocal(updated);

      /* Sync to Supabase */
      if (user) {
        setSyncing(true);
        try {
          await upsertLessonProgressToDb(user.id, lessonId, cardIndex);
        } finally {
          setSyncing(false);
        }
      }
    },
    [positions, user]
  );

  /* Clear position (lesson completed) */
  const clearPosition = useCallback(
    async (lessonId: number) => {
      const updated = { ...positions };
      delete updated[lessonId];
      setPositions(updated);
      saveLocal(updated);

      if (user) {
        await deleteLessonProgressFromDb(user.id, lessonId);
      }
    },
    [positions, user]
  );

  return {
    positions,
    getCardPosition,
    savePosition,
    clearPosition,
    syncing,
  };
}
