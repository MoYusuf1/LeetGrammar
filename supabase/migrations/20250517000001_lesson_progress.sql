-- Migration: lesson_progress table
-- Tracks which card a user is currently on for each lesson.
-- Enables "resume where you left off" functionality.

CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL,
  current_card INTEGER DEFAULT 0,
  completed INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, lesson_id)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id);

-- Enable RLS
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

-- Users can only see and modify their own progress
CREATE POLICY "Users can read own lesson progress"
  ON lesson_progress FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own lesson progress"
  ON lesson_progress FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own lesson progress"
  ON lesson_progress FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own lesson progress"
  ON lesson_progress FOR DELETE
  USING (user_id = auth.uid());

-- Also update the profiles table to add lesson_activity tracking
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS lessons_started INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS lessons_completed INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_study_time INTEGER DEFAULT 0; -- in seconds
