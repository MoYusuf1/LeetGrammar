-- ═══════════════════════════════════════════════════════════════════════════
-- LeetGrammar — Clean Schema (v3)
-- Keep: auth.users | Drop: everything else | Create: minimal sync + social
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy text search

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. CURRICULUM (public read, admin write)
--    Static content — hydrated to client on load, cached offline
-- ═══════════════════════════════════════════════════════════════════════════

-- Textbook attribution for multi-source facts
CREATE TABLE textbook_sources (
  id          TEXT PRIMARY KEY,            -- 'saeed-1999', 'zorc-1986'
  title       TEXT NOT NULL,
  author      TEXT,
  year        INTEGER,
  edition     TEXT,
  url         TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge graph nodes
CREATE TABLE graph_nodes (
  id                    TEXT PRIMARY KEY,   -- 'concept:grammar:focus-marker:waa'
  type                  TEXT NOT NULL
    CHECK (type IN ('CONCEPT','MORPHEME','WORD','EXAMPLE','RULE','LESSON','TEXTBOOK','CONSTRUCTION')),
  label_default         TEXT NOT NULL,
  label_somali          TEXT,
  label_english         TEXT,
  label_transliteration TEXT,
  attributes            JSONB DEFAULT '{}',
  definition_cids       TEXT[] DEFAULT '{}',
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

-- Binary relationships
CREATE TABLE graph_edges (
  id          TEXT PRIMARY KEY,
  from_node   TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  to_node     TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  type        TEXT NOT NULL
    CHECK (type IN ('REQUIRES','CONTRADICTS','DERIVES_FROM','EXEMPLIFIES','CITES','IS_A','PART_OF','VARIES_BY','TESTS')),
  weight      REAL DEFAULT 1.0 CHECK (weight BETWEEN 0 AND 1),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Normalized edge attribution (replaces JSONB qualifiers)
CREATE TABLE edge_attributions (
  edge_id     TEXT NOT NULL REFERENCES graph_edges(id) ON DELETE CASCADE,
  source_id   TEXT NOT NULL REFERENCES textbook_sources(id),
  page        TEXT,
  chapter     TEXT,
  confidence  REAL CHECK (confidence BETWEEN 0 AND 1),
  register    TEXT CHECK (register IN ('formal','informal','poetic','religious')),
  era         TEXT,
  notes       TEXT,
  PRIMARY KEY (edge_id, source_id)
);

-- Dialect tags per edge
CREATE TABLE edge_dialects (
  edge_id   TEXT NOT NULL REFERENCES graph_edges(id) ON DELETE CASCADE,
  dialect   TEXT NOT NULL,  -- 'standard', 'northern', 'southern', 'benadir', 'maay-maay'
  PRIMARY KEY (edge_id, dialect)
);

-- Grammatical constructions (hyperedges)
CREATE TABLE graph_constructions (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Construction members (n-ary roles)
CREATE TABLE construction_members (
  construction_id TEXT NOT NULL REFERENCES graph_constructions(id) ON DELETE CASCADE,
  node_id         TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  role            TEXT NOT NULL
    CHECK (role IN ('marker','head','subject','object','verb','tense','aspect','polarity','mood','focus','topic','modifier','determiner','possessor','complement')),
  position        INTEGER,
  optional        BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (construction_id, node_id, role)
);

-- Content-addressed chunks
CREATE TABLE graph_chunks (
  cid           TEXT PRIMARY KEY,
  content_type  TEXT NOT NULL CHECK (content_type IN ('text/markdown','text/plain','audio/mp3')),
  payload       TEXT NOT NULL
);

-- Node → chunk links
CREATE TABLE node_chunks (
  node_id     TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  chunk_cid   TEXT NOT NULL REFERENCES graph_chunks(cid) ON DELETE CASCADE,
  chunk_role  TEXT NOT NULL DEFAULT 'definition'
    CHECK (chunk_role IN ('definition','example','explanation','rule','cultural_note')),
  PRIMARY KEY (node_id, chunk_cid)
);

-- Lessons (materialized from graph + pedagogy)
CREATE TABLE lessons (
  id                SERIAL PRIMARY KEY,
  node_id           TEXT UNIQUE REFERENCES graph_nodes(id),
  title             TEXT NOT NULL,
  description       TEXT,
  slug              TEXT UNIQUE NOT NULL,
  order_index       INTEGER NOT NULL,
  estimated_minutes INTEGER DEFAULT 5,
  difficulty        TEXT CHECK (difficulty IN ('easy','medium','hard')),
  prerequisites     INTEGER[] DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Lesson content ordering
CREATE TABLE lesson_chunks (
  lesson_id     INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  chunk_cid     TEXT NOT NULL REFERENCES graph_chunks(cid) ON DELETE CASCADE,
  order_index   INTEGER NOT NULL,
  chunk_type    TEXT CHECK (chunk_type IN ('teach','example','rule','exercise','cultural_note')),
  PRIMARY KEY (lesson_id, chunk_cid)
);

-- Exercises
CREATE TABLE exercises (
  id            SERIAL PRIMARY KEY,
  lesson_id     INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  concept_id    TEXT REFERENCES graph_nodes(id),
  type          TEXT NOT NULL
    CHECK (type IN ('multiple_choice','fill_blank','sentence_constructor','word_bank','matching','listening_select','audio_transcription','grammar_identify')),
  question      TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  options       JSONB DEFAULT '[]',
  explanation   TEXT,
  difficulty    TEXT CHECK (difficulty IN ('easy','medium','hard')) DEFAULT 'easy',
  points        INTEGER DEFAULT 10,
  order_index   INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements (public read)
CREATE TABLE achievements (
  id              SERIAL PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  title           TEXT NOT NULL,
  description     TEXT NOT NULL,
  icon            TEXT NOT NULL,
  tier            TEXT CHECK (tier IN ('bronze','silver','gold','diamond')) NOT NULL,
  condition_type  TEXT NOT NULL,
  condition_value INTEGER NOT NULL,
  xp_reward       INTEGER DEFAULT 0,
  gem_reward      INTEGER DEFAULT 0
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. USER DATA (RLS protected — users only see their own)
-- ═══════════════════════════════════════════════════════════════════════════

-- Profile (extends auth.users)
CREATE TABLE profiles (
  id                UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username          TEXT UNIQUE,
  display_name      TEXT,
  avatar_url        TEXT,
  bio               TEXT,
  native_language   TEXT,
  learning_goal     TEXT,
  daily_goal        INTEGER DEFAULT 50,
  total_xp          INTEGER DEFAULT 0,
  current_streak    INTEGER DEFAULT 0,
  longest_streak    INTEGER DEFAULT 0,
  gems              INTEGER DEFAULT 500,
  hearts            INTEGER DEFAULT 5,
  max_hearts        INTEGER DEFAULT 5,
  show_on_leaderboard BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Settings
CREATE TABLE user_settings (
  user_id               UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_goal            INTEGER DEFAULT 50,
  theme                 TEXT DEFAULT 'dark',
  audio_auto_play       BOOLEAN DEFAULT FALSE,
  difficulty_preference TEXT DEFAULT 'normal',
  email_notifications   BOOLEAN DEFAULT TRUE,
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- SRS concept mastery (FSRS-inspired continuous model)
CREATE TABLE concept_mastery (
  user_id                   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  concept_id                TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  mastery                   REAL NOT NULL DEFAULT 0.0 CHECK (mastery BETWEEN 0 AND 1),
  stability                 REAL NOT NULL DEFAULT 1.0,
  difficulty                REAL NOT NULL DEFAULT 0.3 CHECK (difficulty BETWEEN 0 AND 1),
  retrievability            REAL NOT NULL DEFAULT 1.0 CHECK (retrievability BETWEEN 0 AND 1),
  last_reviewed             TIMESTAMPTZ,
  next_review_at            TIMESTAMPTZ,
  review_count              INTEGER NOT NULL DEFAULT 0,
  lapse_count               INTEGER NOT NULL DEFAULT 0,
  total_study_time_seconds  INTEGER NOT NULL DEFAULT 0,
  updated_at                TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, concept_id)
);

-- Immutable review events (analytics + sync)
CREATE TABLE review_events (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  concept_id        TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  exercise_id       INTEGER REFERENCES exercises(id),
  rating            INTEGER NOT NULL CHECK (rating BETWEEN 0 AND 3), -- 0=again, 1=hard, 2=good, 3=easy
  old_mastery       REAL NOT NULL,
  new_mastery       REAL NOT NULL,
  old_stability     REAL NOT NULL,
  new_stability     REAL NOT NULL,
  scheduled_interval REAL,
  actual_interval   REAL,
  study_time_seconds INTEGER DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Lesson progress
CREATE TABLE lesson_progress (
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id         INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status            TEXT NOT NULL DEFAULT 'not_started'
    CHECK (status IN ('not_started','in_progress','completed')),
  score             INTEGER DEFAULT 0,
  stars             INTEGER DEFAULT 0 CHECK (stars BETWEEN 0 AND 3),
  current_card      INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  attempts          INTEGER DEFAULT 0,
  started_at        TIMESTAMPTZ,
  completed_at      TIMESTAMPTZ,
  last_attempted_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, lesson_id)
);

-- Exercise attempts (event log)
CREATE TABLE exercise_attempts (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id       INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  lesson_id         INTEGER REFERENCES lessons(id),
  user_answer       TEXT,
  is_correct        BOOLEAN DEFAULT FALSE,
  time_spent_seconds INTEGER DEFAULT 0,
  hint_used         BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Daily activity (materialized for fast leaderboard + heatmap)
CREATE TABLE daily_activity (
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date                DATE NOT NULL,
  xp_earned           INTEGER DEFAULT 0,
  lessons_completed   INTEGER DEFAULT 0,
  exercises_completed INTEGER DEFAULT 0,
  time_spent_seconds  INTEGER DEFAULT 0,
  streak_maintained   BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (user_id, date)
);

-- Leaderboard
CREATE TABLE leaderboard (
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_type       TEXT NOT NULL CHECK (period_type IN ('weekly','monthly','all_time')),
  period_value      TEXT NOT NULL,
  xp_amount         INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  rank              INTEGER,
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, period_type, period_value)
);

-- Comments
CREATE TABLE comments (
  id            SERIAL PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id     INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  parent_id     INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  content       TEXT NOT NULL,
  likes_count   INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Achievement unlocks
CREATE TABLE user_achievements (
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id INTEGER NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at   TIMESTAMPTZ DEFAULT NOW(),
  progress      INTEGER DEFAULT 0,
  PRIMARY KEY (user_id, achievement_id)
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. INDEXES
-- ═══════════════════════════════════════════════════════════════════════════

-- Graph traversal
CREATE INDEX idx_graph_edges_from ON graph_edges(from_node);
CREATE INDEX idx_graph_edges_to ON graph_edges(to_node);
CREATE INDEX idx_graph_edges_type ON graph_edges(type);
CREATE INDEX idx_graph_nodes_type ON graph_nodes(type);
CREATE INDEX idx_graph_nodes_label_trgm ON graph_nodes USING GIN (label_default gin_trgm_ops);

-- Content
CREATE INDEX idx_lessons_order ON lessons(order_index);
CREATE INDEX idx_lesson_chunks_lesson ON lesson_chunks(lesson_id);
CREATE INDEX idx_exercises_lesson ON exercises(lesson_id);
CREATE INDEX idx_exercises_concept ON exercises(concept_id);

-- User data
CREATE INDEX idx_concept_mastery_user_review ON concept_mastery(user_id, next_review_at)
  WHERE next_review_at IS NOT NULL;
CREATE INDEX idx_review_events_user_created ON review_events(user_id, created_at DESC);
CREATE INDEX idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX idx_exercise_attempts_user ON exercise_attempts(user_id, created_at DESC);
CREATE INDEX idx_daily_activity_user_date ON daily_activity(user_id, date);
CREATE INDEX idx_comments_lesson ON comments(lesson_id);
CREATE INDEX idx_leaderboard_period ON leaderboard(period_type, period_value, rank);

-- ═══════════════════════════════════════════════════════════════════════════
-- 4. ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable RLS on all user tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Curriculum: public read
ALTER TABLE textbook_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE graph_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE graph_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE graph_constructions ENABLE ROW LEVEL SECURITY;
ALTER TABLE graph_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Policies: curriculum public read
CREATE POLICY "Curriculum public read" ON textbook_sources FOR SELECT USING (true);
CREATE POLICY "Curriculum public read" ON graph_nodes FOR SELECT USING (true);
CREATE POLICY "Curriculum public read" ON graph_edges FOR SELECT USING (true);
CREATE POLICY "Curriculum public read" ON graph_constructions FOR SELECT USING (true);
CREATE POLICY "Curriculum public read" ON graph_chunks FOR SELECT USING (true);
CREATE POLICY "Curriculum public read" ON lessons FOR SELECT USING (true);
CREATE POLICY "Curriculum public read" ON exercises FOR SELECT USING (true);
CREATE POLICY "Curriculum public read" ON achievements FOR SELECT USING (true);

-- Policies: user data = own only
CREATE POLICY "Own profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Own settings" ON user_settings FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own mastery" ON concept_mastery FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own reviews" ON review_events FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own progress" ON lesson_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own attempts" ON exercise_attempts FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own activity" ON daily_activity FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own achievements" ON user_achievements FOR ALL USING (auth.uid() = user_id);

-- Comments: public read, own write
CREATE POLICY "Comments public read" ON comments FOR SELECT USING (true);
CREATE POLICY "Own comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Leaderboard: public read
CREATE POLICY "Leaderboard public read" ON leaderboard FOR SELECT USING (true);

-- ═══════════════════════════════════════════════════════════════════════════
-- 5. RPC FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════

-- Hydrate full graph to client (one round-trip)
CREATE OR REPLACE FUNCTION get_full_graph()
RETURNS JSON
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT json_build_object(
    'nodes', coalesce((SELECT json_agg(row_to_json(graph_nodes)) FROM graph_nodes), '[]'::json),
    'edges', coalesce((SELECT json_agg(row_to_json(graph_edges)) FROM graph_edges), '[]'::json),
    'constructions', coalesce((SELECT json_agg(row_to_json(graph_constructions)) FROM graph_constructions), '[]'::json),
    'members', coalesce((SELECT json_agg(row_to_json(construction_members)) FROM construction_members), '[]'::json),
    'chunks', coalesce((SELECT json_agg(row_to_json(graph_chunks)) FROM graph_chunks), '[]'::json),
    'node_chunks', coalesce((SELECT json_agg(row_to_json(node_chunks)) FROM node_chunks), '[]'::json),
    'lessons', coalesce((SELECT json_agg(row_to_json(lessons)) FROM lessons), '[]'::json),
    'lesson_chunks', coalesce((SELECT json_agg(row_to_json(lesson_chunks)) FROM lesson_chunks), '[]'::json),
    'textbooks', coalesce((SELECT json_agg(row_to_json(textbook_sources)) FROM textbook_sources), '[]'::json)
  );
$$;

-- Get due reviews for SRS
CREATE OR REPLACE FUNCTION get_due_reviews(p_user_id UUID)
RETURNS JSON
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT coalesce(json_agg(row_to_json(t)), '[]'::json)
  FROM (
    SELECT
      cm.concept_id,
      cm.mastery,
      cm.stability,
      cm.retrievability,
      cm.last_reviewed,
      cm.next_review_at,
      cm.review_count,
      gn.label_default,
      gn.label_somali,
      gn.type AS node_type
    FROM concept_mastery cm
    JOIN graph_nodes gn ON gn.id = cm.concept_id
    WHERE cm.user_id = p_user_id
      AND cm.next_review_at <= NOW()
    ORDER BY cm.retrievability ASC
  ) t;
$$;

-- Get prerequisite chain (DAG traversal)
CREATE OR REPLACE FUNCTION get_prerequisites(start_node TEXT, max_depth INT DEFAULT 10)
RETURNS TABLE(node_id TEXT, depth INT, path TEXT[])
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  WITH RECURSIVE prereqs AS (
    SELECT from_node AS node_id, 1 AS depth, ARRAY[from_node] AS path
    FROM graph_edges WHERE to_node = start_node AND type = 'REQUIRES'
    UNION ALL
    SELECT e.from_node, p.depth + 1, p.path || e.from_node
    FROM graph_edges e
    JOIN prereqs p ON e.to_node = p.node_id
    WHERE e.type = 'REQUIRES'
      AND p.depth < max_depth
      AND NOT e.from_node = ANY(p.path) -- cycle guard
  )
  SELECT * FROM prereqs;
$$;

-- Get all concepts taught by a lesson
CREATE OR REPLACE FUNCTION get_lesson_concepts(p_lesson_id INT)
RETURNS JSON
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT coalesce(json_agg(row_to_json(t)), '[]'::json)
  FROM (
    SELECT DISTINCT gn.id, gn.label_default, gn.type, lc.chunk_type
    FROM lesson_chunks lc
    JOIN node_chunks nc ON nc.chunk_cid = lc.chunk_cid
    JOIN graph_nodes gn ON gn.id = nc.node_id
    WHERE lc.lesson_id = p_lesson_id
    ORDER BY lc.order_index
  ) t;
$$;

GRANT EXECUTE ON FUNCTION get_full_graph() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_due_reviews(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_prerequisites(TEXT, INT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_lesson_concepts(INT) TO anon, authenticated;

-- ═══════════════════════════════════════════════════════════════════════════
-- 6. AUTO-PROFILE TRIGGER
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (NEW.id, 'user_' || substr(NEW.id::text, 1, 8), 'Learner');

  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
