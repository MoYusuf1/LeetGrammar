-- Workbook Progress Schema Update
-- Adds workbook-level tracking to user_progress and creates granular attempt storage.

-- ─── Add workbook columns to user_progress ──────────────────────────────────

alter table public.user_progress
  add column if not exists activity_log text[] default '{}',
  add column if not exists completed_workbook_levels integer[] default '{}',
  add column if not exists workbook_level_scores jsonb default '{}';

-- ─── Workbook Attempts Table ────────────────────────────────────────────────

-- Granular per-drill attempt storage for resume-across-devices
create table if not exists public.workbook_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  level_id integer not null,
  drill_id integer not null,
  answer text,
  is_correct boolean,
  attempted_at timestamptz default now(),
  unique (user_id, level_id, drill_id)
);

-- Enable RLS
alter table public.workbook_attempts enable row level security;

-- Policies: owner-only

create policy "Workbook attempts are viewable by owner"
  on public.workbook_attempts for select
  using (auth.uid() = user_id);

create policy "Workbook attempts are insertable by owner"
  on public.workbook_attempts for insert
  with check (auth.uid() = user_id);

create policy "Workbook attempts are updatable by owner"
  on public.workbook_attempts for update
  using (auth.uid() = user_id);

-- Index for fast level-level queries

create index if not exists idx_workbook_attempts_user_level
  on public.workbook_attempts (user_id, level_id);
