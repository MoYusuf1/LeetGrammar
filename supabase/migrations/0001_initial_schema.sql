-- LeetGrammar Initial Schema
-- Run this in the Supabase SQL Editor (https://app.supabase.com/project/_/sql)

-- ─── Profiles Table ─────────────────────────────────────────────────────────

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies: users can only read/update their own profile
create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- ─── User Progress Table ────────────────────────────────────────────────────

create table if not exists public.user_progress (
  user_id uuid references auth.users on delete cascade primary key,
  completed_lessons integer[] default '{}',
  practice_scores jsonb default '{}',
  srs_cards jsonb default '{}',
  xp integer default 0,
  streak integer default 0,
  last_study_date text default '',
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.user_progress enable row level security;

-- Policies: users can only read/update their own progress
create policy "Progress is viewable by owner"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Progress is insertable by owner"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Progress is updatable by owner"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- ─── Auto-Create Profile Trigger ────────────────────────────────────────────

-- Function: auto-insert profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

-- Trigger: run after user inserts into auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
