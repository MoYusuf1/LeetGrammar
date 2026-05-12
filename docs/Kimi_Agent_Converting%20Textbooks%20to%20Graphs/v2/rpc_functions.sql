-- ============================================================
-- Somali Grammar v2 — PostgreSQL RPC Functions
-- Matches the normalized relational schema (no JSONB qualifiers)
-- ============================================================

-- ─── get_learning_frontier ─────────────────────────────────────
CREATE OR REPLACE FUNCTION get_learning_frontier(
  p_user_id UUID,
  p_threshold FLOAT DEFAULT 0.7
)
RETURNS TABLE (
  id TEXT,
  type TEXT,
  label_default TEXT,
  label_somali TEXT,
  label_english TEXT,
  mastery FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    n.id,
    n.type,
    n.label_default,
    n.label_somali,
    n.label_english,
    COALESCE(s.mastery, 0.0) AS mastery
  FROM graph_nodes n
  LEFT JOIN learner_concept_states s
    ON s.user_id = p_user_id AND s.concept_id = n.id
  WHERE n.type = 'CONCEPT'
    AND COALESCE(s.mastery, 0) < p_threshold
    AND EXISTS (
      SELECT 1 FROM concept_edges e
      WHERE e.to_node = n.id AND e.type = 'REQUIRES'
    )
    AND NOT EXISTS (
      SELECT 1 FROM concept_edges e
      WHERE e.to_node = n.id AND e.type = 'REQUIRES'
        AND NOT EXISTS (
          SELECT 1 FROM learner_concept_states s2
          WHERE s2.user_id = p_user_id
            AND s2.concept_id = e.from_node
            AND s2.mastery >= p_threshold
        )
    )
  ORDER BY n.id;
END;
$$;

-- ─── submit_review ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION submit_review(
  p_user_id UUID,
  p_concept_id TEXT,
  p_exercise_id TEXT DEFAULT NULL,
  p_rating INT DEFAULT 3,
  p_study_time_seconds INT DEFAULT 0
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  v_old learner_concept_states%ROWTYPE;
  v_new_mastery FLOAT;
  v_new_stability FLOAT;
  v_new_difficulty FLOAT;
  v_retrievability FLOAT;
  v_scheduled FLOAT;
  v_actual FLOAT;
BEGIN
  SELECT * INTO v_old
  FROM learner_concept_states
  WHERE user_id = p_user_id AND concept_id = p_concept_id;

  IF NOT FOUND THEN
    v_old.mastery := 0.0;
    v_old.stability := 0.0;
    v_old.difficulty := 0.3;
    v_old.review_count := 0;
    v_old.lapse_count := 0;
    v_old.total_study_time_seconds := 0;
  END IF;

  v_actual := CASE
    WHEN v_old.last_reviewed IS NULL THEN 0
    ELSE EXTRACT(EPOCH FROM (NOW() - v_old.last_reviewed)) / 86400.0
  END;

  v_retrievability := EXP(LN(0.9) * v_actual / GREATEST(v_old.stability, 0.1));

  v_new_stability := CASE p_rating
    WHEN 1 THEN 0.1
    WHEN 2 THEN v_old.stability * 0.8 + 1.0
    WHEN 3 THEN v_old.stability * 1.5 + 2.0
    WHEN 4 THEN v_old.stability * 2.0 + 4.0
    ELSE v_old.stability * 1.5 + 2.0
  END;

  v_new_difficulty := CASE p_rating
    WHEN 1 THEN LEAST(v_old.difficulty + 0.1, 1.0)
    WHEN 4 THEN GREATEST(v_old.difficulty - 0.05, 0.0)
    ELSE v_old.difficulty
  END;

  v_new_mastery := LEAST(1.0, v_old.mastery * 0.3 + (p_rating / 4.0) * 0.7);
  v_scheduled := v_new_stability * (1.0 + (p_rating - 3) * 0.2);

  INSERT INTO learner_concept_states (
    user_id, concept_id, mastery, stability, difficulty, retrievability,
    last_reviewed, next_review_at, review_count, lapse_count,
    total_study_time_seconds, created_at, updated_at
  ) VALUES (
    p_user_id, p_concept_id, v_new_mastery, v_new_stability, v_new_difficulty,
    v_retrievability, NOW(), NOW() + (v_scheduled || ' days')::INTERVAL,
    v_old.review_count + 1,
    v_old.lapse_count + CASE WHEN p_rating = 1 THEN 1 ELSE 0 END,
    v_old.total_study_time_seconds + p_study_time_seconds,
    COALESCE(v_old.created_at, NOW()), NOW()
  )
  ON CONFLICT (user_id, concept_id) DO UPDATE SET
    mastery = EXCLUDED.mastery,
    stability = EXCLUDED.stability,
    difficulty = EXCLUDED.difficulty,
    retrievability = EXCLUDED.retrievability,
    last_reviewed = EXCLUDED.last_reviewed,
    next_review_at = EXCLUDED.next_review_at,
    review_count = EXCLUDED.review_count,
    lapse_count = EXCLUDED.lapse_count,
    total_study_time_seconds = EXCLUDED.total_study_time_seconds,
    updated_at = EXCLUDED.updated_at;

  INSERT INTO review_logs (
    user_id, concept_id, exercise_id, rating,
    old_mastery, new_mastery, old_stability, new_stability,
    scheduled_interval, actual_interval, study_time_seconds, created_at
  ) VALUES (
    p_user_id, p_concept_id, p_exercise_id, p_rating,
    v_old.mastery, v_new_mastery, v_old.stability, v_new_stability,
    v_scheduled, v_actual, p_study_time_seconds, NOW()
  );

  RETURN jsonb_build_object(
    'mastery', v_new_mastery,
    'stability', v_new_stability,
    'difficulty', v_new_difficulty,
    'retrievability', v_retrievability,
    'nextReviewAt', NOW() + (v_scheduled || ' days')::INTERVAL,
    'lapsed', p_rating = 1
  );
END;
$$;

-- ─── get_mastery_stats ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_mastery_stats(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  v_total INT;
  v_mastered INT;
  v_learning INT;
  v_due INT;
BEGIN
  SELECT COUNT(*) INTO v_total FROM graph_nodes WHERE type = 'CONCEPT';

  SELECT COUNT(*) INTO v_mastered
  FROM learner_concept_states
  WHERE user_id = p_user_id AND mastery >= 0.7;

  SELECT COUNT(*) INTO v_learning
  FROM learner_concept_states
  WHERE user_id = p_user_id AND mastery > 0 AND mastery < 0.7;

  SELECT COUNT(*) INTO v_due
  FROM learner_concept_states
  WHERE user_id = p_user_id AND next_review_at <= NOW();

  RETURN jsonb_build_object(
    'totalConcepts', v_total,
    'mastered', v_mastered,
    'learning', v_learning,
    'new', v_total - v_mastered - v_learning,
    'dueToday', v_due
  );
END;
$$;

-- ─── get_unit_progress ─────────────────────────────────────────
CREATE OR REPLACE FUNCTION get_unit_progress(
  p_user_id UUID,
  p_textbook_id TEXT
)
RETURNS TABLE (
  chapter TEXT,
  total_concepts BIGINT,
  mastered BIGINT,
  in_progress BIGINT,
  not_started BIGINT,
  pct_complete FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH unit_concepts AS (
    SELECT DISTINCT
      l.chapter AS ch,
      ce.concept_id
    FROM graph_lessons l
    JOIN graph_chunks c ON c.lesson_id = l.id
    JOIN content_edges ce ON ce.content_id = c.cid
    WHERE l.textbook_id = p_textbook_id
      AND ce.type = 'TEACHES'
  ),
  mastery AS (
    SELECT
      uc.ch,
      uc.concept_id,
      COALESCE(s.mastery, 0) AS m
    FROM unit_concepts uc
    LEFT JOIN learner_concept_states s
      ON s.user_id = p_user_id AND s.concept_id = uc.concept_id
  )
  SELECT
    m.ch AS chapter,
    COUNT(*) AS total_concepts,
    COUNT(*) FILTER (WHERE m.m >= 0.7) AS mastered,
    COUNT(*) FILTER (WHERE m.m > 0 AND m.m < 0.7) AS in_progress,
    COUNT(*) FILTER (WHERE m.m = 0) AS not_started,
    ROUND(
      COUNT(*) FILTER (WHERE m.m >= 0.7)::FLOAT / NULLIF(COUNT(*), 0) * 100,
      1
    ) AS pct_complete
  FROM mastery m
  GROUP BY m.ch
  ORDER BY m.ch;
END;
$$;

-- ─── get_recommended_unit ──────────────────────────────────────
CREATE OR REPLACE FUNCTION get_recommended_unit(
  p_user_id UUID,
  p_textbook_id TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  v_chapter TEXT;
  v_title TEXT;
  v_unmastered TEXT[];
  v_total INT;
  v_mastered INT;
BEGIN
  SELECT l.chapter, l.title
  INTO v_chapter, v_title
  FROM graph_lessons l
  JOIN graph_chunks c ON c.lesson_id = l.id
  WHERE l.textbook_id = p_textbook_id
    AND EXISTS (
      SELECT 1 FROM content_edges ce
      LEFT JOIN learner_concept_states s
        ON s.user_id = p_user_id AND s.concept_id = ce.concept_id
      WHERE ce.content_id = c.cid AND ce.type = 'TEACHES'
        AND COALESCE(s.mastery, 0) < 0.7
    )
  ORDER BY l.sort_key
  LIMIT 1;

  IF v_chapter IS NULL THEN RETURN NULL; END IF;

  SELECT
    array_agg(DISTINCT ce.concept_id),
    COUNT(DISTINCT ce.concept_id)
  INTO v_unmastered, v_total
  FROM graph_lessons l
  JOIN graph_chunks c ON c.lesson_id = l.id
  JOIN content_edges ce ON ce.content_id = c.cid
  LEFT JOIN learner_concept_states s
    ON s.user_id = p_user_id AND s.concept_id = ce.concept_id
  WHERE l.textbook_id = p_textbook_id
    AND l.chapter = v_chapter
    AND ce.type = 'TEACHES'
    AND COALESCE(s.mastery, 0) < 0.7;

  SELECT COUNT(*) INTO v_mastered
  FROM graph_lessons l
  JOIN graph_chunks c ON c.lesson_id = l.id
  JOIN content_edges ce ON ce.content_id = c.cid
  JOIN learner_concept_states s
    ON s.user_id = p_user_id AND s.concept_id = ce.concept_id
  WHERE l.textbook_id = p_textbook_id
    AND l.chapter = v_chapter
    AND ce.type = 'TEACHES'
    AND s.mastery >= 0.7;

  RETURN jsonb_build_object(
    'chapter', v_chapter,
    'title', COALESCE(v_title, 'Chapter ' || v_chapter),
    'unmasteredConcepts', v_unmastered,
    'progress', CASE WHEN v_total > 0
      THEN v_mastered::FLOAT / NULLIF(v_mastered + COALESCE(array_length(v_unmastered, 1), 0), 0)
      ELSE 0
    END
  );
END;
$$;

-- ─── get_concepts_by_textbook ──────────────────────────────────
CREATE OR REPLACE FUNCTION get_concepts_by_textbook(p_textbook_id TEXT)
RETURNS TABLE (
  concept_id TEXT,
  concept_type TEXT,
  label_default TEXT,
  chapter TEXT,
  chunk_count BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    n.id,
    n.type,
    n.label_default,
    l.chapter,
    COUNT(DISTINCT c.cid)
  FROM graph_nodes n
  JOIN content_edges ce ON ce.concept_id = n.id
  JOIN graph_chunks c ON c.cid = ce.content_id
  JOIN graph_lessons l ON l.id = c.lesson_id
  WHERE ce.type = 'TEACHES'
    AND l.textbook_id = p_textbook_id
  GROUP BY n.id, n.type, n.label_default, l.chapter
  ORDER BY l.chapter, n.id;
END;
$$;

-- ─── search_chunks_by_concept ──────────────────────────────────
CREATE OR REPLACE FUNCTION search_chunks_by_concept(
  p_concept_id TEXT,
  p_query TEXT DEFAULT ''
)
RETURNS TABLE (
  cid TEXT,
  payload TEXT,
  content_type TEXT,
  chunk_type TEXT,
  edge_type TEXT,
  edge_weight FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.cid,
    c.payload,
    c.content_type,
    c.chunk_type,
    ce.type,
    ce.weight
  FROM graph_chunks c
  JOIN content_edges ce ON ce.content_id = c.cid
  WHERE ce.concept_id = p_concept_id
    AND ce.type IN ('TEACHES', 'DEFINES', 'EXEMPLIFIES')
    AND (p_query = '' OR c.payload ILIKE '%' || p_query || '%')
  ORDER BY ce.weight DESC, c.source_page;
END;
$$;
