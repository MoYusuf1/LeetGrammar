# Supabase Setup Guide

This app uses Supabase for authentication and cloud-synced progress.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Copy your **Project URL** and **anon API key** from Settings > API
4. Paste them into `.env`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 2. Run the SQL Schema

In your Supabase dashboard, go to the **SQL Editor** and run:

```sql
-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  completed_lessons INT[] DEFAULT '{}',
  practice_scores JSONB DEFAULT '{}',
  srs_cards JSONB DEFAULT '{}',
  xp INT DEFAULT 0,
  streak INT DEFAULT 0,
  last_study_date TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Progress: users can only read/update their own
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger: create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 3. Enable OAuth Providers (Optional)

In Authentication > Providers, enable:
- **Google**: Add your Google OAuth credentials
- **GitHub**: Add your GitHub OAuth app credentials

For local development, you can skip this and use email/password.

## 4. Test

1. Restart your dev server: `npm run dev`
2. Click **Sign In** in the top nav
3. Create an account with email/password
4. Complete a lesson or quiz
5. Check that progress syncs (green dot in nav)
6. Sign out and back in — progress should restore

## Guest Mode

If Supabase is not configured, the app works fully in **guest mode**:
- All progress is saved to localStorage
- No cloud sync
- Auth UI shows a "not configured" message
