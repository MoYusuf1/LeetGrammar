-- ============================================================
-- SOMALI GRAMMAR v2 — Clean Relational Schema
-- Normalized where possible, JSONB only for extensibility.
-- ============================================================

-- ─── 0. Nuke old tables ────────────────────────────────────────
DROP TABLE IF EXISTS review_logs CASCADE;
DROP TABLE IF EXISTS learner_concept_states CASCADE;
DROP TABLE IF EXISTS exercise_concepts CASCADE;
DROP TABLE IF EXISTS exercise_items CASCADE;
DROP TABLE IF EXISTS graph_exercises CASCADE;
DROP TABLE IF EXISTS lesson_chunks CASCADE;
DROP TABLE IF EXISTS content_edges CASCADE;
DROP TABLE IF EXISTS concept_edges CASCADE;
DROP TABLE IF EXISTS graph_constructions CASCADE;
DROP TABLE IF EXISTS graph_chunks CASCADE;
DROP TABLE IF EXISTS graph_lessons CASCADE;
DROP TABLE IF EXISTS graph_nodes CASCADE;
DROP TABLE IF EXISTS user_progress CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- ─── 1. Profiles ───────────────────────────────────────────────
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── 2. graph_nodes ────────────────────────────────────────────
-- Labels and common attributes are first-class columns.
-- Only `extra_attrs` is JSONB for rarely-used properties.

CREATE TABLE graph_nodes (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('CONCEPT', 'MORPHEME', 'WORD', 'EXAMPLE', 'RULE', 'LESSON')),
  label_default TEXT NOT NULL,
  label_somali TEXT,
  label_english TEXT,
  -- Common attributes as columns (the ones we query/filter on)
  pos TEXT,                       -- noun, verb, adj, classifier, particle...
  gender TEXT CHECK (gender IN ('masculine', 'feminine')),
  bound BOOLEAN DEFAULT false,    -- true for clitics
  polarity TEXT CHECK (polarity IN ('positive', 'negative', 'neutral')),
  verb_class TEXT,                -- conjugation group (1, 2A, 2B, 3)
  dialect TEXT,                   -- standard, northern, southern, benadiri, maay-maay
  -- Extensibility: rarely-used attrs go here
  extra_attrs JSONB DEFAULT '{}',
  -- Definition chunks (which chunks explain this node)
  definition_cids TEXT[] DEFAULT '{}'
);

CREATE INDEX idx_nodes_type ON graph_nodes(type);
CREATE INDEX idx_nodes_pos ON graph_nodes(pos);
CREATE INDEX idx_nodes_gender ON graph_nodes(gender);
CREATE INDEX idx_nodes_bound ON graph_nodes(bound);

-- ─── 3. graph_lessons ──────────────────────────────────────────
CREATE TABLE graph_lessons (
  id TEXT PRIMARY KEY,
  textbook_id TEXT NOT NULL,
  chapter TEXT NOT NULL,
  title TEXT NOT NULL,
  page_range TEXT,
  difficulty FLOAT NOT NULL DEFAULT 0.3 CHECK (difficulty >= 0 AND difficulty <= 1),
  estimated_minutes INT DEFAULT 15,
  sort_key INT NOT NULL DEFAULT 0,
  previous_lesson TEXT REFERENCES graph_lessons(id),
  next_lesson TEXT REFERENCES graph_lessons(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lessons_textbook ON graph_lessons(textbook_id, sort_key);

-- ─── 4. graph_chunks ───────────────────────────────────────────
-- Metadata normalized into columns. No JSONB for standard fields.

CREATE TABLE graph_chunks (
  cid TEXT PRIMARY KEY,
  lesson_id TEXT REFERENCES graph_lessons(id) ON DELETE SET NULL,
  content_type TEXT NOT NULL DEFAULT 'text/markdown',
  payload TEXT NOT NULL DEFAULT '',
  source_page TEXT,
  chunk_type TEXT NOT NULL CHECK (chunk_type IN (
    'dialogue', 'dialogue-translation', 'vocabulary', 'grammar',
    'cultural-note', 'exercise-prompt', 'memo', 'folktale',
    'survival-dialog', 'paradigm', 'reading', 'overview'
  )),
  -- Extensible qualifiers only
  extra_qualifiers JSONB DEFAULT '{}'
);

CREATE INDEX idx_chunks_lesson ON graph_chunks(lesson_id);
CREATE INDEX idx_chunks_type ON graph_chunks(chunk_type);

-- Full-text search
ALTER TABLE graph_chunks ADD COLUMN search_vector TSVECTOR
  GENERATED ALWAYS AS (to_tsvector('english', COALESCE(payload, ''))) STORED;
CREATE INDEX idx_chunks_search ON graph_chunks USING GIN(search_vector);

-- ─── 5. lesson_chunks (ordering within a lesson) ──────────────
CREATE TABLE lesson_chunks (
  lesson_id TEXT REFERENCES graph_lessons(id) ON DELETE CASCADE,
  chunk_cid TEXT REFERENCES graph_chunks(cid) ON DELETE CASCADE,
  section_order INT NOT NULL DEFAULT 0,
  section_title TEXT,
  PRIMARY KEY (lesson_id, chunk_cid)
);

-- ─── 6. concept_edges (structural: concept → concept) ──────────
CREATE TABLE concept_edges (
  id TEXT PRIMARY KEY,
  from_node TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  to_node TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  weight FLOAT NOT NULL DEFAULT 1.0 CHECK (weight >= 0 AND weight <= 1),
  source_page TEXT,
  source_textbook TEXT,
  confidence FLOAT CHECK (confidence >= 0 AND confidence <= 1)
);

CREATE INDEX idx_concept_edges_from ON concept_edges(from_node);
CREATE INDEX idx_concept_edges_to ON concept_edges(to_node);
CREATE INDEX idx_concept_edges_type ON concept_edges(type);

-- ─── 7. content_edges (content → concept) ──────────────────────
CREATE TABLE content_edges (
  id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL,
  concept_id TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  weight FLOAT NOT NULL DEFAULT 1.0 CHECK (weight >= 0 AND weight <= 1),
  source_page TEXT,
  source_textbook TEXT
);

CREATE INDEX idx_content_edges_concept ON content_edges(concept_id);
CREATE INDEX idx_content_edges_content ON content_edges(content_id);

-- ─── 8. graph_constructions ────────────────────────────────────
CREATE TABLE graph_constructions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  members JSONB NOT NULL DEFAULT '[]',
  source_page TEXT,
  source_textbook TEXT
);

-- ─── 9. graph_exercises ────────────────────────────────────────
CREATE TABLE graph_exercises (
  id TEXT PRIMARY KEY,
  lesson_id TEXT REFERENCES graph_lessons(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  instruction TEXT,
  difficulty FLOAT NOT NULL DEFAULT 0.3 CHECK (difficulty >= 0 AND difficulty <= 1),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_exercises_lesson ON graph_exercises(lesson_id);

-- ─── 10. exercise_items ────────────────────────────────────────
-- Individual exercise items (prompt/answer/hint) as rows, not JSON.
CREATE TABLE exercise_items (
  id SERIAL PRIMARY KEY,
  exercise_id TEXT NOT NULL REFERENCES graph_exercises(id) ON DELETE CASCADE,
  item_order INT NOT NULL DEFAULT 0,
  prompt TEXT NOT NULL,
  answer TEXT,
  hint TEXT
);

CREATE INDEX idx_items_exercise ON exercise_items(exercise_id);

-- ─── 11. exercise_concepts (junction) ──────────────────────────
CREATE TABLE exercise_concepts (
  exercise_id TEXT REFERENCES graph_exercises(id) ON DELETE CASCADE,
  concept_id TEXT REFERENCES graph_nodes(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  PRIMARY KEY (exercise_id, concept_id)
);

CREATE INDEX idx_exercise_concepts_concept ON exercise_concepts(concept_id);

-- ─── 12. learner_concept_states ────────────────────────────────
CREATE TABLE learner_concept_states (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  concept_id TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  mastery FLOAT NOT NULL DEFAULT 0.0 CHECK (mastery >= 0 AND mastery <= 1),
  stability FLOAT NOT NULL DEFAULT 0.0,
  difficulty FLOAT NOT NULL DEFAULT 0.3,
  retrievability FLOAT NOT NULL DEFAULT 0.0,
  last_reviewed TIMESTAMPTZ,
  next_review_at TIMESTAMPTZ,
  review_count INT NOT NULL DEFAULT 0,
  lapse_count INT NOT NULL DEFAULT 0,
  total_study_time_seconds INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, concept_id)
);

CREATE INDEX idx_lcs_next_review ON learner_concept_states(next_review_at)
  WHERE next_review_at IS NOT NULL;
CREATE INDEX idx_lcs_user ON learner_concept_states(user_id);

-- ─── 13. review_logs ───────────────────────────────────────────
CREATE TABLE review_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  concept_id TEXT NOT NULL REFERENCES graph_nodes(id) ON DELETE CASCADE,
  exercise_id TEXT REFERENCES graph_exercises(id) ON DELETE SET NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 4),
  old_mastery FLOAT NOT NULL,
  new_mastery FLOAT NOT NULL,
  old_stability FLOAT NOT NULL,
  new_stability FLOAT NOT NULL,
  scheduled_interval FLOAT,
  actual_interval FLOAT,
  study_time_seconds INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_review_logs_user ON review_logs(user_id, created_at DESC);

-- ─── 14. RLS ───────────────────────────────────────────────────
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learner_concept_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles read all" ON profiles FOR SELECT USING (true);
CREATE POLICY "Profiles update own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "LCS own" ON learner_concept_states FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Review logs own" ON review_logs FOR ALL USING (auth.uid() = user_id);

-- ─── 15. Triggers ──────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER trg_lcs_updated BEFORE UPDATE ON learner_concept_states
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
