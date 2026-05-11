-- Validation RPC Functions
-- Exposes helper functions for the client-side data validator.

-- Returns duplicate node labels with their occurrence count
CREATE OR REPLACE FUNCTION public.get_duplicate_node_labels()
RETURNS TABLE(label text, count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT labels->>'default' as label, COUNT(*)::bigint as count
  FROM public.graph_nodes
  WHERE labels->>'default' IS NOT NULL
    AND labels->>'default' != ''
  GROUP BY labels->>'default'
  HAVING COUNT(*) > 1;
$$;

-- Returns summary stats for the graph
CREATE OR REPLACE FUNCTION public.get_graph_stats()
RETURNS TABLE(
  total_nodes bigint,
  total_edges bigint,
  orphaned_edges bigint,
  unlabeled_nodes bigint,
  duplicate_labels bigint
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    (SELECT COUNT(*) FROM public.graph_nodes) as total_nodes,
    (SELECT COUNT(*) FROM public.graph_edges) as total_edges,
    (SELECT COUNT(*) FROM public.graph_edges
     WHERE from_node NOT IN (SELECT id FROM public.graph_nodes)
        OR to_node NOT IN (SELECT id FROM public.graph_nodes)) as orphaned_edges,
    (SELECT COUNT(*) FROM public.graph_nodes
     WHERE labels->>'default' IS NULL OR labels->>'default' = '') as unlabeled_nodes,
    (SELECT COUNT(*) FROM (
       SELECT labels->>'default'
       FROM public.graph_nodes
       WHERE labels->>'default' IS NOT NULL AND labels->>'default' != ''
       GROUP BY labels->>'default'
       HAVING COUNT(*) > 1
     ) d) as duplicate_labels;
$$;
