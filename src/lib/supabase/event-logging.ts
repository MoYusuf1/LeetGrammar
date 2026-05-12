/**
 * Event-sourced user interaction logging.
 *
 * Every significant user action becomes an immutable event in the database.
 * This is the foundation for analytics, personalization, and state replay.
 *
 * Usage:
 *   import { logEvent } from '@/lib/supabase/event-logging';
 *   await logEvent({ eventType: 'exercise_answered', conceptId: 'concept:waa', payload: { correct: true, timeMs: 3200 } });
 */

import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';

export type UserEventType =
  | 'exercise_answered'
  | 'lesson_completed'
  | 'concept_viewed'
  | 'review_submitted'
  | 'session_started'
  | 'quiz_completed'
  | 'search_performed';

export interface LogEventParams {
  eventType: UserEventType;
  conceptId?: string;
  lessonId?: string;
  exerciseId?: string;
  payload?: Record<string, unknown>;
}

/**
 * Log a user event to the append-only event store.
 * Returns the event UUID, or null if Supabase is not configured.
 */
export async function logEvent(params: LogEventParams): Promise<string | null> {
  if (!isSupabaseConfigured) return null;

  try {
    const { data, error } = await getSupabase().rpc('log_user_event', {
      p_event_type: params.eventType,
      p_concept_id: params.conceptId ?? null,
      p_lesson_id: params.lessonId ?? null,
      p_exercise_id: params.exerciseId ?? null,
      p_payload: params.payload ?? {},
    });

    if (error) {
      console.warn('[event-log] RPC failed:', error.message);
      return null;
    }

    return data ?? null;
  } catch (err) {
    console.warn('[event-log] Exception:', err);
    return null;
  }
}

/**
 * Fire-and-forget event logger. Never throws, never blocks UI.
 */
export function logEventAsync(params: LogEventParams): void {
  // Intentionally not awaited — events are best-effort
  logEvent(params).catch(() => { /* silently drop */ });
}

/**
 * Batch log multiple events. Useful for session-end snapshots.
 */
export async function logEventsBatch(params: LogEventParams[]): Promise<string[]> {
  if (!isSupabaseConfigured || params.length === 0) return [];

  const results = await Promise.all(params.map((p) => logEvent(p)));
  return results.filter((id): id is string => id !== null);
}
