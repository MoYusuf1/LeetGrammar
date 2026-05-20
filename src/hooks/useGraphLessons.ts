/**
 * React hook for fetching and managing graph lessons from Supabase.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { getAllLessons, getLesson } from "@/lib/supabase/lesson-queries";
import type { GraphLesson, LessonView } from "@/lib/supabase/lesson-types";
import { isSupabaseConfigured } from "@/lib/supabase";

/** Race a promise against a timeout. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms);
    promise
      .then((val) => { clearTimeout(timer); resolve(val); })
      .catch((err) => { clearTimeout(timer); reject(err); });
  });
}

interface UseGraphLessonsResult {
  lessons: GraphLesson[];
  groupedLessons: Record<string, GraphLesson[]>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGraphLessons(): UseGraphLessonsResult {
  const [lessons, setLessons] = useState<GraphLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(false);

  const fetchLessons = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      setError("Supabase not configured. Check your .env file.");
      return;
    }

    try {
      setLoading(true);
      const data = await withTimeout(getAllLessons(), 8000);
      setLessons(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load lessons");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    fetchLessons();
  }, [fetchLessons]);

  const groupedLessons = lessons.reduce<Record<string, GraphLesson[]>>((acc, lesson) => {
    const key = lesson.textbook_id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(lesson);
    return acc;
  }, {});

  return { lessons, groupedLessons, loading, error, refetch: fetchLessons };
}

interface UseLessonResult {
  lessonView: LessonView | null;
  loading: boolean;
  error: string | null;
}

export function useLesson(lessonId: string | undefined): UseLessonResult {
  const [lessonView, setLessonView] = useState<LessonView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    withTimeout(getLesson(lessonId), 8000)
      .then((data) => {
        if (!cancelled) {
          setLessonView(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load lesson");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [lessonId]);

  return { lessonView, loading, error };
}
