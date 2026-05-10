-- LeetGrammar Exercise Graph + Graph-Aware SRS Schema

-- ─── Exercise Nodes ─────────────────────────────────────────────────────────
-- Exercises (problems, questions, drills) are first-class nodes in the graph.

create table if not exists public.graph_exercises (
  id text primary key,
  title text not null,
  problem_id int,              -- links back to legacy problem ID (if applicable)
  concept_ids text[] not null default '{}',
  difficulty float not null default 0.5,      -- 0=easiest, 1=hardest
  discrimination float not null default 1.0,  -- IRT: how well it separates able/unable
  exposure_count int not null default 0,
  success_count int not null default 0,
  success_rate float not null default 0.5,
  content jsonb not null default '{}',        -- question, options, answer, explanation
  qualifiers jsonb not null default '{}',
  created_at timestamptz default now()
);

comment on table public.graph_exercises is 'Exercises / problems / questions linked to concepts';

alter table public.graph_exercises enable row level security;

create policy "Exercises are readable by everyone"
  on public.graph_exercises for select
  to anon, authenticated
  using (true);

-- ─── TESTS Edges (Exercise → Concept) ───────────────────────────────────────
-- We reuse the graph_edges table with type='TESTS' instead of creating a new table.
-- This keeps the graph unified.

-- No new table needed — just a new edge type in graph_edges.

-- ─── Edge Weights on REQUIRES ───────────────────────────────────────────────
-- Add weight column to REQUIRES edges (0.0 = soft suggestion, 1.0 = hard block)

alter table public.graph_edges add column if not exists weight float default 1.0;

-- Update existing REQUIRES edges from problem-curriculum to weight 0.95
update public.graph_edges
set weight = 0.95
where type = 'REQUIRES'
  and qualifiers->'source'->>'textbookId' = 'problem-curriculum';

-- Update existing REQUIRES edges from transitive closure to weight 0.6
update public.graph_edges
set weight = 0.6
where type = 'REQUIRES'
  and (id like 'edge:req-isa-%' or id like 'edge:req-partof-%');

-- ─── Learner Concept State ──────────────────────────────────────────────────
-- Continuous mastery model per concept (replaces binary SRS cards)

create table if not exists public.learner_concept_states (
  user_id uuid references auth.users on delete cascade,
  concept_id text not null references public.graph_nodes(id) on delete cascade,
  mastery float not null default 0.0,         -- [0,1] probability of recall
  stability float not null default 1.0,       -- days until retrievability = 0.5
  difficulty float not null default 0.3,      -- intrinsic difficulty of this card
  retrievability float not null default 1.0,  -- current probability of recall
  last_reviewed timestamptz,
  next_review_at timestamptz,
  review_count int not null default 0,
  lapse_count int not null default 0,         -- times failed
  total_study_time_seconds int not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (user_id, concept_id)
);

comment on table public.learner_concept_states is 'Continuous mastery state per concept per learner (FSRS-inspired)';

alter table public.learner_concept_states enable row level security;

create policy "Learner states are viewable by owner"
  on public.learner_concept_states for select
  using (auth.uid() = user_id);

create policy "Learner states are insertable by owner"
  on public.learner_concept_states for insert
  with check (auth.uid() = user_id);

create policy "Learner states are updatable by owner"
  on public.learner_concept_states for update
  using (auth.uid() = user_id);

-- Index for fast due-date queries

create index if not exists idx_learner_states_next_review
  on public.learner_concept_states(user_id, next_review_at)
  where next_review_at is not null;

-- ─── Review Log ─────────────────────────────────────────────────────────────
-- Every review interaction is logged for analytics + model improvement

create table if not exists public.review_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  concept_id text not null,
  exercise_id text,                           -- optional: which exercise triggered it
  rating int not null,                        -- 0=again, 1=hard, 2=good, 3=easy
  old_mastery float not null,
  new_mastery float not null,
  old_stability float not null,
  new_stability float not null,
  scheduled_interval float,                   -- days until next review (at time of review)
  actual_interval float,                      -- days since last review
  study_time_seconds int not null default 0,
  created_at timestamptz default now()
);

comment on table public.review_logs is 'Log of every review for analytics + FSRS optimization';

alter table public.review_logs enable row level security;

create policy "Review logs are viewable by owner"
  on public.review_logs for select
  using (auth.uid() = user_id);

create policy "Review logs are insertable by owner"
  on public.review_logs for insert
  with check (auth.uid() = user_id);

-- Index for analytics queries
create index if not exists idx_review_logs_user_created
  on public.review_logs(user_id, created_at desc);

-- ─── RPC: Get Due Reviews ───────────────────────────────────────────────────
-- Returns all concepts due for review for a user, enriched with graph data

create or replace function public.get_due_reviews(p_user_id uuid)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(json_agg(row_to_json(t)), '[]'::json)
  from (
    select
      lcs.concept_id,
      lcs.mastery,
      lcs.stability,
      lcs.retrievability,
      lcs.last_reviewed,
      lcs.next_review_at,
      lcs.review_count,
      gn.labels,
      gn.type as node_type
    from public.learner_concept_states lcs
    join public.graph_nodes gn on gn.id = lcs.concept_id
    where lcs.user_id = p_user_id
      and lcs.next_review_at <= now()
    order by lcs.retrievability asc
  ) t;
$$;

grant execute on function public.get_due_reviews(uuid) to authenticated;
