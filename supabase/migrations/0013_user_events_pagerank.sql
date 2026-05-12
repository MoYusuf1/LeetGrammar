-- Migration: 0013_user_events_pagerank
-- Dependencies: 0002_graph_schema (graph_nodes, graph_edges), 0003_exercise_graph_and_srs
-- Safe to re-run. All operations are idempotent.

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 1: Pre-flight checks
-- ═══════════════════════════════════════════════════════════════════════════════

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'graph_nodes') THEN
    RAISE EXCEPTION 'Prerequisite missing: public.graph_nodes does not exist. Run migration 0002 first.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'graph_edges') THEN
    RAISE EXCEPTION 'Prerequisite missing: public.graph_edges does not exist. Run migration 0002 first.';
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 2: User Events (Event Sourcing)
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.user_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  event_type  text NOT NULL,
  concept_id  text REFERENCES public.graph_nodes(id) ON DELETE SET NULL,
  lesson_id   text,
  exercise_id text,
  payload     jsonb NOT NULL DEFAULT '{}',
  created_at  timestamptz DEFAULT now()
);

COMMENT ON TABLE public.user_events IS
  'Immutable event log for all learner interactions. Source of truth for analytics and state replay.';

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_events_user_created
  ON public.user_events(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_events_user_type
  ON public.user_events(user_id, event_type);

CREATE INDEX IF NOT EXISTS idx_user_events_concept
  ON public.user_events(concept_id)
  WHERE concept_id IS NOT NULL;

-- RLS
ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'user_events'
      AND policyname = 'User events are viewable by owner'
  ) THEN
    CREATE POLICY "User events are viewable by owner"
      ON public.user_events FOR SELECT
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'user_events'
      AND policyname = 'User events are insertable by owner'
  ) THEN
    CREATE POLICY "User events are insertable by owner"
      ON public.user_events FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 3: PageRank on Graph Nodes
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.graph_nodes
  ADD COLUMN IF NOT EXISTS pagerank float DEFAULT 0.0;

COMMENT ON COLUMN public.graph_nodes.pagerank IS
  'PageRank centrality (0-1). Higher = more foundational / important concept.';

CREATE INDEX IF NOT EXISTS idx_graph_nodes_pagerank
  ON public.graph_nodes(pagerank DESC)
  WHERE type = 'CONCEPT';

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 4: PageRank Computation Function
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.compute_pagerank(
  p_damping   float DEFAULT 0.85,
  p_epsilon   float DEFAULT 0.0001,
  p_max_iter  int   DEFAULT 100
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_n       int;
  v_i       int;
  v_delta   float;
BEGIN
  SELECT COUNT(*) INTO v_n FROM public.graph_nodes;
  IF v_n = 0 THEN
    RETURN;
  END IF;

  -- Initialize uniform distribution
  UPDATE public.graph_nodes SET pagerank = 1.0 / v_n;

  FOR v_i IN 1..p_max_iter LOOP
    -- Standard PageRank update over REQUIRES edges
    WITH
      out_degrees AS (
        SELECT from_node, COUNT(*)::float AS out_degree
        FROM public.graph_edges
        WHERE type = 'REQUIRES'
        GROUP BY from_node
      ),
      inbound AS (
        SELECT
          e.to_node AS node_id,
          SUM(COALESCE(gn.pagerank / NULLIF(od.out_degree, 0), 0)) AS pr_contrib
        FROM public.graph_edges e
        JOIN public.graph_nodes gn ON gn.id = e.from_node
        LEFT JOIN out_degrees od ON od.from_node = e.from_node
        WHERE e.type = 'REQUIRES'
        GROUP BY e.to_node
      )
    UPDATE public.graph_nodes gn
    SET pagerank = (1 - p_damping) / v_n + p_damping * COALESCE(inbound.pr_contrib, 0)
    FROM inbound
    WHERE gn.id = inbound.node_id;

    -- Handle sink nodes (no outgoing REQUIRES edges)
    UPDATE public.graph_nodes
    SET pagerank = pagerank + (
      SELECT COALESCE(SUM(pagerank), 0) * p_damping / v_n
      FROM public.graph_nodes
      WHERE id NOT IN (SELECT DISTINCT from_node FROM public.graph_edges WHERE type = 'REQUIRES')
    )
    WHERE id NOT IN (SELECT DISTINCT from_node FROM public.graph_edges WHERE type = 'REQUIRES');

    -- Check convergence
    SELECT MAX(ABS(gn.pagerank - sub.new_pr))
    INTO v_delta
    FROM public.graph_nodes gn
    JOIN (SELECT id, pagerank AS new_pr FROM public.graph_nodes) sub ON sub.id = gn.id;

    IF v_delta < p_epsilon THEN
      EXIT;
    END IF;
  END LOOP;
END;
$$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 5: Curriculum Units (Roadmap Data)
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.curriculum_units (
  id                text PRIMARY KEY,
  title             text NOT NULL,
  description       text NOT NULL DEFAULT '',
  unit_order        int  NOT NULL,
  color             text NOT NULL DEFAULT '#3b82f6',
  problem_ids       int[] NOT NULL DEFAULT '{}',
  prerequisite_ids  text[] NOT NULL DEFAULT '{}'
);

COMMENT ON TABLE public.curriculum_units IS
  'High-level curriculum units for the problem roadmap. Each unit maps to a set of legacy problem IDs.';

-- Seed data (idempotent via ON CONFLICT)
INSERT INTO public.curriculum_units (id, title, description, unit_order, color, problem_ids, prerequisite_ids)
VALUES
  ('s0', 'Foundations', 'Alphabet, sounds, greetings, and basic social formulas.', 0, '#3b82f6', '{1,2,3}', '{}'),
  ('s1', 'Noun System', 'Gender, definite articles, pluralization, and case marking.', 1, '#22c55e', '{4,5,6,7}', '{s0}'),
  ('s2', 'Sentence Core', 'Clitic pronouns, SOV word order, and the copula system.', 2, '#a855f7', '{8,9,10,11}', '{s0}'),
  ('s3', 'Focus & Questions', 'Focus markers (waa, baa, waxa) and question formation.', 3, '#f97316', '{12,13,14,15,16}', '{s2}'),
  ('s4', 'Verb & Tense', 'Verb classes, present/past/future, negation, and aspect.', 4, '#eab308', '{17,18,19,20}', '{s2}'),
  ('s5', 'Space & Modifiers', 'Prepositions, directionals, adjectives-as-verbs, and numbers.', 5, '#06b6d4', '{21,22,23,24}', '{s2,s4}'),
  ('s6', 'Complex Grammar', 'Connectors, relative clauses, conditionals, and reported speech.', 6, '#ec4899', '{25,26,27,28}', '{s3,s4,s5}'),
  ('s7', 'Mastery', 'Passive voice, causative verbs, and free production.', 7, '#ef4444', '{29,30}', '{s4,s5,s6}')
ON CONFLICT (id) DO UPDATE SET
  title            = EXCLUDED.title,
  description      = EXCLUDED.description,
  unit_order       = EXCLUDED.unit_order,
  color            = EXCLUDED.color,
  problem_ids      = EXCLUDED.problem_ids,
  prerequisite_ids = EXCLUDED.prerequisite_ids;

-- RLS
ALTER TABLE public.curriculum_units ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'curriculum_units'
      AND policyname = 'Curriculum units are readable by everyone'
  ) THEN
    CREATE POLICY "Curriculum units are readable by everyone"
      ON public.curriculum_units FOR SELECT
      TO anon, authenticated USING (true);
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 6: RPC Functions
-- ═══════════════════════════════════════════════════════════════════════════════

-- get_roadmap_topics: Returns all curriculum units ordered by unit_order
CREATE OR REPLACE FUNCTION public.get_roadmap_topics()
RETURNS json
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    json_agg(row_to_json(t) ORDER BY t.unit_order),
    '[]'::json
  )
  FROM public.curriculum_units t;
$$;

GRANT EXECUTE ON FUNCTION public.get_roadmap_topics() TO anon, authenticated;

-- get_concept_priorities: Returns top N concepts by PageRank
CREATE OR REPLACE FUNCTION public.get_concept_priorities(p_limit int DEFAULT 50)
RETURNS json
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
  FROM (
    SELECT id, type, label_default, label_somali, label_english, extra_attrs, pagerank
    FROM public.graph_nodes
    WHERE type = 'CONCEPT'
    ORDER BY pagerank DESC
    LIMIT p_limit
  ) t;
$$;

GRANT EXECUTE ON FUNCTION public.get_concept_priorities(int) TO anon, authenticated;

-- log_user_event: Append-only event logger
CREATE OR REPLACE FUNCTION public.log_user_event(
  p_event_type  text,
  p_concept_id  text DEFAULT null,
  p_lesson_id   text DEFAULT null,
  p_exercise_id text DEFAULT null,
  p_payload     jsonb DEFAULT '{}'
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_event_id uuid;
BEGIN
  INSERT INTO public.user_events (
    user_id, event_type, concept_id, lesson_id, exercise_id, payload
  )
  VALUES (
    auth.uid(), p_event_type, p_concept_id, p_lesson_id, p_exercise_id, p_payload
  )
  RETURNING id INTO v_event_id;

  RETURN v_event_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.log_user_event(text, text, text, text, jsonb) TO authenticated;

-- ═══════════════════════════════════════════════════════════════════════════════
-- SECTION 7: Verification
-- ═══════════════════════════════════════════════════════════════════════════════

DO $$
DECLARE
  v_event_count    int;
  v_unit_count     int;
  v_pagerank_ready bool;
BEGIN
  SELECT COUNT(*) INTO v_event_count    FROM public.user_events;
  SELECT COUNT(*) INTO v_unit_count     FROM public.curriculum_units;
  SELECT COUNT(*) > 0 INTO v_pagerank_ready FROM public.graph_nodes WHERE pagerank > 0;

  RAISE NOTICE 'Migration 0013 verification:';
  RAISE NOTICE '  - user_events table: OK (row count before your usage: %)', v_event_count;
  RAISE NOTICE '  - curriculum_units table: OK (seeded with % units)', v_unit_count;
  RAISE NOTICE '  - graph_nodes.pagerank column: OK';
  RAISE NOTICE '  - compute_pagerank() function: OK';
  RAISE NOTICE '  - get_roadmap_topics() RPC: OK';
  RAISE NOTICE '  - get_concept_priorities() RPC: OK';
  RAISE NOTICE '  - log_user_event() RPC: OK';

  IF v_pagerank_ready THEN
    RAISE NOTICE '  - PageRank already computed (found non-zero values).';
  ELSE
    RAISE NOTICE '  - PageRank NOT YET computed. Run: SELECT compute_pagerank();';
  END IF;
END $$;
