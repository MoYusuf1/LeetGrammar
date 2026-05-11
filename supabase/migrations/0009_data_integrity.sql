-- Data Integrity & Cleanup Migration
-- Run this to add constraints, indexes, and cleanup routines.

-- ─── 1. Graph Data Integrity ────────────────────────────────────────────────

-- Ensure all edges point to existing nodes (orphaned edge cleanup)
DELETE FROM public.graph_edges
WHERE from_node NOT IN (SELECT id FROM public.graph_nodes)
   OR to_node NOT IN (SELECT id FROM public.graph_nodes);

-- Deduplicate nodes with identical default labels (keep earliest)
WITH dups AS (
  SELECT id,
         ROW_NUMBER() OVER (PARTITION BY labels->>'default' ORDER BY id) as rn
  FROM public.graph_nodes
  WHERE labels->>'default' IS NOT NULL
)
DELETE FROM public.graph_nodes
WHERE id IN (SELECT id FROM dups WHERE rn > 1);

-- Add index for fast label lookups (if not exists)
CREATE INDEX IF NOT EXISTS idx_graph_nodes_labels_default
  ON public.graph_nodes USING gin ((labels->>'default'));

-- ─── 2. Workbook Attempts Cleanup ───────────────────────────────────────────

-- Delete attempts for non-existent levels (levels 1-7 are valid)
DELETE FROM public.workbook_attempts
WHERE level_id < 1 OR level_id > 7;

-- Add composite index for user+level lookups
CREATE INDEX IF NOT EXISTS idx_workbook_attempts_user_level_drill
  ON public.workbook_attempts (user_id, level_id, drill_id);

-- ─── 3. Progress Table Cleanup ──────────────────────────────────────────────

-- Remove empty progress rows (no completed lessons, no workbook levels, zero XP)
DELETE FROM public.user_progress
WHERE xp = 0
  AND coalesce(array_length(completed_lessons, 1), 0) = 0
  AND coalesce(array_length(completed_workbook_levels, 1), 0) = 0
  AND coalesce(array_length(activity_log, 1), 0) = 0;

-- ─── 4. Profiles Cleanup ────────────────────────────────────────────────────

-- Delete profiles without auth users (shouldn't happen, but belt+suspenders)
DELETE FROM public.profiles
WHERE id NOT IN (SELECT id FROM auth.users);

-- ─── 5. Review Logs Cleanup (keep last 90 days) ─────────────────────────────

DELETE FROM public.review_logs
WHERE created_at < NOW() - INTERVAL '90 days';

-- ─── 6. Add updated_at trigger for user_progress ────────────────────────────

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_user_progress_updated_at ON public.user_progress;
CREATE TRIGGER set_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
