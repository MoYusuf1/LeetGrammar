-- 0013_user_events_pagerank_fixed.sql
-- Event-sourced user interaction log + PageRank for concept importance.
-- Run this in Supabase SQL Editor if the original migration failed.

-- ─── User Events (Event Sourcing) ───────────────────────────────────────────

create table if not exists public.user_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  event_type text not null,
  concept_id text references public.graph_nodes(id) on delete set null,
  lesson_id text,
  exercise_id text,
  payload jsonb not null default '{}',
  created_at timestamptz default now()
);

comment on table public.user_events is 'Immutable event log for all learner interactions. Source of truth for analytics and state replay.';

create index if not exists idx_user_events_user_created on public.user_events(user_id, created_at desc);
create index if not exists idx_user_events_user_type on public.user_events(user_id, event_type);
create index if not exists idx_user_events_concept on public.user_events(concept_id) where concept_id is not null;

alter table public.user_events enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'user_events' and policyname = 'User events are viewable by owner'
  ) then
    create policy "User events are viewable by owner"
      on public.user_events for select using (auth.uid() = user_id);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'user_events' and policyname = 'User events are insertable by owner'
  ) then
    create policy "User events are insertable by owner"
      on public.user_events for insert with check (auth.uid() = user_id);
  end if;
end
$$;

-- ─── PageRank on Graph Nodes ────────────────────────────────────────────────

alter table public.graph_nodes add column if not exists pagerank float default 0.0;

comment on column public.graph_nodes.pagerank is 'PageRank centrality (0-1). Higher = more foundational / important concept.';

create index if not exists idx_graph_nodes_pagerank on public.graph_nodes(pagerank desc) where type = 'CONCEPT';

-- ─── PageRank Computation ───────────────────────────────────────────────────

create or replace function public.compute_pagerank(
  p_damping float default 0.85,
  p_epsilon float default 0.0001,
  p_max_iter int default 100
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  n int;
  i int;
  delta float;
begin
  select count(*) into n from public.graph_nodes;
  if n = 0 then return; end if;

  update public.graph_nodes set pagerank = 1.0 / n;

  for i in 1..p_max_iter loop
    with
      out_degrees as (
        select from_node, count(*)::float as out_degree
        from public.graph_edges
        where type = 'REQUIRES'
        group by from_node
      ),
      inbound as (
        select
          e.to_node as node_id,
          sum(coalesce(gn.pagerank / nullif(od.out_degree, 0), 0)) as pr_contrib
        from public.graph_edges e
        join public.graph_nodes gn on gn.id = e.from_node
        left join out_degrees od on od.from_node = e.from_node
        where e.type = 'REQUIRES'
        group by e.to_node
      )
    update public.graph_nodes gn
    set pagerank = (1 - p_damping) / n + p_damping * coalesce(inbound.pr_contrib, 0)
    from inbound
    where gn.id = inbound.node_id;

    -- Sink nodes distribute evenly
    update public.graph_nodes
    set pagerank = pagerank + (
      select coalesce(sum(pagerank), 0) * p_damping / n
      from public.graph_nodes
      where id not in (select distinct from_node from public.graph_edges where type = 'REQUIRES')
    )
    where id not in (select distinct from_node from public.graph_edges where type = 'REQUIRES');

    select max(abs(gn.pagerank - sub.new_pr))
    into delta
    from public.graph_nodes gn
    join (select id, pagerank as new_pr from public.graph_nodes) sub on sub.id = gn.id;

    if delta < p_epsilon then exit; end if;
  end loop;
end;
$$;

-- ─── Curriculum Units (Roadmap) ─────────────────────────────────────────────

create table if not exists public.curriculum_units (
  id text primary key,
  title text not null,
  description text not null default '',
  unit_order int not null,
  color text not null default '#3b82f6',
  problem_ids int[] not null default '{}',
  prerequisite_ids text[] not null default '{}'
);

comment on table public.curriculum_units is 'High-level curriculum units for the problem roadmap.';

insert into public.curriculum_units (id, title, description, unit_order, color, problem_ids, prerequisite_ids)
values
  ('s0', 'Foundations', 'Alphabet, sounds, greetings, and basic social formulas.', 0, '#3b82f6', '{1,2,3}', '{}'),
  ('s1', 'Noun System', 'Gender, definite articles, pluralization, and case marking.', 1, '#22c55e', '{4,5,6,7}', '{s0}'),
  ('s2', 'Sentence Core', 'Clitic pronouns, SOV word order, and the copula system.', 2, '#a855f7', '{8,9,10,11}', '{s0}'),
  ('s3', 'Focus & Questions', 'Focus markers (waa, baa, waxa) and question formation.', 3, '#f97316', '{12,13,14,15,16}', '{s2}'),
  ('s4', 'Verb & Tense', 'Verb classes, present/past/future, negation, and aspect.', 4, '#eab308', '{17,18,19,20}', '{s2}'),
  ('s5', 'Space & Modifiers', 'Prepositions, directionals, adjectives-as-verbs, and numbers.', 5, '#06b6d4', '{21,22,23,24}', '{s2,s4}'),
  ('s6', 'Complex Grammar', 'Connectors, relative clauses, conditionals, and reported speech.', 6, '#ec4899', '{25,26,27,28}', '{s3,s4,s5}'),
  ('s7', 'Mastery', 'Passive voice, causative verbs, and free production.', 7, '#ef4444', '{29,30}', '{s4,s5,s6}')
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  unit_order = excluded.unit_order,
  color = excluded.color,
  problem_ids = excluded.problem_ids,
  prerequisite_ids = excluded.prerequisite_ids;

alter table public.curriculum_units enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'curriculum_units' and policyname = 'Curriculum units are readable by everyone'
  ) then
    create policy "Curriculum units are readable by everyone"
      on public.curriculum_units for select to anon, authenticated using (true);
  end if;
end
$$;

-- ─── RPC: Get Roadmap Topics ────────────────────────────────────────────────

create or replace function public.get_roadmap_topics()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(json_agg(row_to_json(t) order by t.unit_order), '[]'::json)
  from public.curriculum_units t;
$$;

grant execute on function public.get_roadmap_topics() to anon, authenticated;

-- ─── RPC: Get Concept Priority (PageRank-enriched) ──────────────────────────

create or replace function public.get_concept_priorities(p_limit int default 50)
returns json
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(json_agg(row_to_json(t)), '[]'::json)
  from (
    select id, type, label_default, label_somali, label_english, extra_attrs, pagerank
    from public.graph_nodes
    where type = 'CONCEPT'
    order by pagerank desc
    limit p_limit
  ) t;
$$;

grant execute on function public.get_concept_priorities(int) to anon, authenticated;

-- ─── RPC: Log User Event ────────────────────────────────────────────────────

create or replace function public.log_user_event(
  p_event_type text,
  p_concept_id text default null,
  p_lesson_id text default null,
  p_exercise_id text default null,
  p_payload jsonb default '{}'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event_id uuid;
begin
  insert into public.user_events (user_id, event_type, concept_id, lesson_id, exercise_id, payload)
  values (auth.uid(), p_event_type, p_concept_id, p_lesson_id, p_exercise_id, p_payload)
  returning id into v_event_id;
  return v_event_id;
end;
$$;

grant execute on function public.log_user_event(text, text, text, text, jsonb) to authenticated;
