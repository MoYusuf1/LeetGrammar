-- ═══════════════════════════════════════════════════════════════════════════
-- LeetGrammar — Complete Database Schema
-- PostgreSQL + Supabase (Auth, RLS, Realtime ready)
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. CURRICULUM TABLES (content — public read, admin write)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE levels (
  id          SERIAL PRIMARY KEY,
  order_index INTEGER NOT NULL UNIQUE,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  color       TEXT NOT NULL DEFAULT '#22c55e',
  icon        TEXT NOT NULL DEFAULT 'book',
  estimated_hours REAL NOT NULL DEFAULT 2.0,
  slug        TEXT UNIQUE NOT NULL,
  prerequisites INTEGER[] DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE lessons (
  id               SERIAL PRIMARY KEY,
  level_id         INTEGER NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
  order_index      INTEGER NOT NULL,
  title            TEXT NOT NULL,
  description      TEXT NOT NULL,
  slug             TEXT NOT NULL,
  grammar_topic    TEXT NOT NULL,
  cultural_note    TEXT,
  estimated_minutes INTEGER NOT NULL DEFAULT 5,
  total_exercises  INTEGER DEFAULT 0,
  difficulty       TEXT CHECK (difficulty IN ('easy','medium','hard')) NOT NULL,
  prerequisites    INTEGER[] DEFAULT '{}',
  UNIQUE(level_id, order_index)
);

CREATE TABLE exercises (
  id                   SERIAL PRIMARY KEY,
  lesson_id            INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  order_index          INTEGER NOT NULL,
  type                 TEXT CHECK (type IN ('multiple_choice','fill_blank','sentence_constructor','word_bank','matching','listening_select','audio_transcription','grammar_identify')) NOT NULL,
  question             TEXT NOT NULL,
  question_translation TEXT,
  correct_answer       TEXT NOT NULL,
  options              JSONB DEFAULT '[]',
  audio_url            TEXT,
  hint                 TEXT,
  explanation          TEXT NOT NULL,
  difficulty           TEXT CHECK (difficulty IN ('easy','medium','hard')) NOT NULL DEFAULT 'easy',
  points               INTEGER DEFAULT 10,
  UNIQUE(lesson_id, order_index)
);

CREATE TABLE exercise_options (
  id           SERIAL PRIMARY KEY,
  exercise_id  INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  option_text  TEXT NOT NULL,
  is_correct   BOOLEAN DEFAULT FALSE,
  order_index  INTEGER NOT NULL
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. USER PROGRESS TABLES (per-user — RLS protected)
-- ═══════════════════════════════════════════════════════════════════════════

-- Profiles (extends Supabase auth.users)
CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username        TEXT UNIQUE,
  display_name    TEXT,
  avatar_url      TEXT,
  bio             TEXT,
  location        TEXT,
  native_language TEXT,
  learning_goal   TEXT,
  daily_goal      INTEGER DEFAULT 50,
  total_xp        INTEGER DEFAULT 0,
  current_streak  INTEGER DEFAULT 0,
  longest_streak  INTEGER DEFAULT 0,
  gems            INTEGER DEFAULT 500,
  hearts          INTEGER DEFAULT 5,
  max_hearts      INTEGER DEFAULT 5,
  current_level   INTEGER DEFAULT 1,
  lessons_started INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  total_study_time INTEGER DEFAULT 0, -- seconds
  show_on_leaderboard BOOLEAN DEFAULT TRUE,
  email_notifications BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Lesson progress (tracks completion + card position)
CREATE TABLE lesson_progress (
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id    INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status       TEXT CHECK (status IN ('not_started','in_progress','completed')) DEFAULT 'not_started',
  score        INTEGER DEFAULT 0,
  stars        INTEGER DEFAULT 0 CHECK (stars BETWEEN 0 AND 3),
  time_spent_seconds INTEGER DEFAULT 0,
  attempts     INTEGER DEFAULT 0,
  current_card INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  started_at   TIMESTAMPTZ,
  last_attempted_at TIMESTAMPTZ,
  PRIMARY KEY (user_id, lesson_id)
);

-- Exercise results (tracks individual exercise attempts)
CREATE TABLE exercise_results (
  id              SERIAL PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id     INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  lesson_id       INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  user_answer     TEXT,
  is_correct      BOOLEAN DEFAULT FALSE,
  time_spent_seconds INTEGER DEFAULT 0,
  attempts_count  INTEGER DEFAULT 1,
  hint_used       BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Daily activity (for streaks, heatmap, stats)
CREATE TABLE daily_activity (
  id                 SERIAL PRIMARY KEY,
  user_id            UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date               DATE NOT NULL,
  xp_earned          INTEGER DEFAULT 0,
  lessons_completed  INTEGER DEFAULT 0,
  exercises_completed INTEGER DEFAULT 0,
  streak_maintained  BOOLEAN DEFAULT FALSE,
  hearts_lost        INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  UNIQUE(user_id, date)
);

-- Achievements
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

CREATE TABLE user_achievements (
  id            SERIAL PRIMARY KEY,
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id INTEGER NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at   TIMESTAMPTZ DEFAULT NOW(),
  progress      INTEGER DEFAULT 0,
  UNIQUE(user_id, achievement_id)
);

-- Leaderboard
CREATE TABLE leaderboard (
  id                SERIAL PRIMARY KEY,
  user_id           UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_type       TEXT CHECK (period_type IN ('weekly','monthly','all_time')) NOT NULL,
  period_value      TEXT NOT NULL,
  xp_amount         INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  rank              INTEGER,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, period_type, period_value)
);

-- Comments (lesson discussions)
CREATE TABLE comments (
  id           SERIAL PRIMARY KEY,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id    INTEGER REFERENCES lessons(id) ON DELETE CASCADE,
  parent_id    INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  content      TEXT NOT NULL,
  is_pinned    BOOLEAN DEFAULT FALSE,
  likes_count  INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE comment_likes (
  id         SERIAL PRIMARY KEY,
  comment_id INTEGER NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(comment_id, user_id)
);

-- Notifications
CREATE TABLE notifications (
  id         SERIAL PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type       TEXT NOT NULL,
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  is_read    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User settings
CREATE TABLE user_settings (
  id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  daily_goal            INTEGER DEFAULT 50,
  audio_auto_play       BOOLEAN DEFAULT FALSE,
  difficulty_preference TEXT DEFAULT 'normal',
  show_profile_public   BOOLEAN DEFAULT TRUE,
  allow_follows         BOOLEAN DEFAULT TRUE,
  email_notifications   BOOLEAN DEFAULT TRUE,
  theme                 TEXT DEFAULT 'dark',
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. INDEXES
-- ═══════════════════════════════════════════════════════════════════════════

CREATE INDEX idx_lessons_level ON lessons(level_id);
CREATE INDEX idx_exercises_lesson ON exercises(lesson_id);
CREATE INDEX idx_exercise_options_exercise ON exercise_options(exercise_id);
CREATE INDEX idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX idx_lesson_progress_lesson ON lesson_progress(lesson_id);
CREATE INDEX idx_exercise_results_user ON exercise_results(user_id);
CREATE INDEX idx_exercise_results_exercise ON exercise_results(exercise_id);
CREATE INDEX idx_daily_activity_user_date ON daily_activity(user_id, date);
CREATE INDEX idx_daily_activity_date ON daily_activity(date);
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_comments_lesson ON comments(lesson_id);
CREATE INDEX idx_comments_parent ON comments(parent_id);
CREATE INDEX idx_comments_created ON comments(created_at DESC);
CREATE INDEX idx_leaderboard_period ON leaderboard(period_type, period_value);
CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC);

-- ═══════════════════════════════════════════════════════════════════════════
-- 4. ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════════════════

-- Enable RLS on all user tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Public read access to curriculum
ALTER TABLE levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/update their own (public profiles viewable)
CREATE POLICY "Users can read all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Curriculum: public read
CREATE POLICY "Curriculum is public" ON levels FOR SELECT USING (true);
CREATE POLICY "Curriculum is public" ON lessons FOR SELECT USING (true);
CREATE POLICY "Curriculum is public" ON exercises FOR SELECT USING (true);
CREATE POLICY "Curriculum is public" ON exercise_options FOR SELECT USING (true);
CREATE POLICY "Achievements are public" ON achievements FOR SELECT USING (true);

-- Lesson progress: users own their data
CREATE POLICY "Users read own progress" ON lesson_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own progress" ON lesson_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own progress" ON lesson_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own progress" ON lesson_progress FOR DELETE USING (auth.uid() = user_id);

-- Exercise results: users own their data
CREATE POLICY "Users read own results" ON exercise_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own results" ON exercise_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily activity: users own their data
CREATE POLICY "Users read own activity" ON daily_activity FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own activity" ON daily_activity FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own activity" ON daily_activity FOR UPDATE USING (auth.uid() = user_id);

-- User achievements: users own their data
CREATE POLICY "Users read own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);

-- Comments: public read, users own their comments
CREATE POLICY "Comments are public" ON comments FOR SELECT USING (true);
CREATE POLICY "Users insert own comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own comments" ON comments FOR DELETE USING (auth.uid() = user_id);

-- Comment likes: users own their likes
CREATE POLICY "Users read all likes" ON comment_likes FOR SELECT USING (true);
CREATE POLICY "Users insert own likes" ON comment_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own likes" ON comment_likes FOR DELETE USING (auth.uid() = user_id);

-- Leaderboard: public read
CREATE POLICY "Leaderboard is public" ON leaderboard FOR SELECT USING (true);
CREATE POLICY "Users insert own leaderboard entry" ON leaderboard FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Notifications: users own their notifications
CREATE POLICY "Users read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- User settings: users own their settings
CREATE POLICY "Users read own settings" ON user_settings FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users insert own settings" ON user_settings FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own settings" ON user_settings FOR UPDATE USING (auth.uid() = id);

-- ═══════════════════════════════════════════════════════════════════════════
-- 5. FUNCTIONS
-- ═══════════════════════════════════════════════════════════════════════════

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Learner'),
    NOW(),
    NOW()
  );

  INSERT INTO public.user_settings (id, created_at, updated_at)
  VALUES (NEW.id, NOW(), NOW());

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: create profile after auth user created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON lesson_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leaderboard_updated_at BEFORE UPDATE ON leaderboard
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════════════════
-- 6. SEED: ACHIEVEMENTS
-- ═══════════════════════════════════════════════════════════════════════════

INSERT INTO achievements (slug, title, description, icon, tier, condition_type, condition_value, xp_reward, gem_reward) VALUES
('first_steps',         'First Steps',        'Complete your first lesson',                    'footprints',      'bronze',   'lessons_completed',   1,    50,   50),
('week_warrior',        'Week Warrior',       'Maintain a 7-day streak',                       'flame',           'silver',   'streak_days',         7,    100,  100),
('perfect_score',       'Perfect Score',      'Get 3 stars on any lesson',                     'star',            'gold',     'perfect_lessons',     1,    150,  150),
('grammar_novice',      'Grammar Novice',     'Complete Level 1',                              'book',            'bronze',   'level_complete',      1,    100,  75),
('grammar_apprentice',  'Grammar Apprentice', 'Complete Level 2',                              'book-open',       'bronze',   'level_complete',      2,    200,  100),
('grammar_scholar',     'Grammar Scholar',    'Complete Level 4',                              'graduation-cap',  'silver',   'level_complete',      4,    300,  200),
('grammar_master',      'Grammar Master',     'Complete all 8 levels',                         'crown',           'gold',     'level_complete',      8,    1000, 500),
('social_butterfly',    'Social Butterfly',   'Post 10 comments',                              'message-circle',  'silver',   'comments_posted',     10,   100,  100),
('problem_solver',      'Problem Solver',     'Complete 50 exercises',                         'brain',           'silver',   'exercises_completed', 50,   250,  150),
('speed_demon',         'Speed Demon',        'Complete a lesson in under 1 minute',           'zap',             'bronze',   'speed_record',        60,   75,   50),
('xp_collector',        'XP Collector',       'Earn 5,000 total XP',                           'coins',           'gold',     'xp_total',            5000, 500,  300),
('diamond_achiever',    'Diamond Achiever',   'Unlock all other achievements',                 'gem',             'diamond',  'achievements_unlocked', 11, 2000, 1000);
