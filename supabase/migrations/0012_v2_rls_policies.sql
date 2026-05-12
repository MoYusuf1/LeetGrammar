-- v2 RLS Policies
-- Add public read access for all pedagogical content tables.
-- Safe to re-run (CREATE POLICY uses IF NOT EXISTS logic via manual checks).

-- ─── graph_lessons ──────────────────────────────────────────────────────────

alter table public.graph_lessons enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'graph_lessons' and policyname = 'Graph lessons are readable by everyone'
  ) then
    create policy "Graph lessons are readable by everyone"
      on public.graph_lessons for select to anon, authenticated using (true);
  end if;
end
$$;

-- ─── lesson_chunks ──────────────────────────────────────────────────────────

alter table public.lesson_chunks enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'lesson_chunks' and policyname = 'Lesson chunks are readable by everyone'
  ) then
    create policy "Lesson chunks are readable by everyone"
      on public.lesson_chunks for select to anon, authenticated using (true);
  end if;
end
$$;

-- ─── graph_chunks ───────────────────────────────────────────────────────────
-- v1 already had a policy, but v2 schema may have dropped it.

alter table public.graph_chunks enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'graph_chunks' and policyname = 'Graph chunks are readable by everyone'
  ) then
    create policy "Graph chunks are readable by everyone"
      on public.graph_chunks for select to anon, authenticated using (true);
  end if;
end
$$;

-- ─── concept_edges ──────────────────────────────────────────────────────────

alter table public.concept_edges enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'concept_edges' and policyname = 'Concept edges are readable by everyone'
  ) then
    create policy "Concept edges are readable by everyone"
      on public.concept_edges for select to anon, authenticated using (true);
  end if;
end
$$;

-- ─── content_edges ──────────────────────────────────────────────────────────

alter table public.content_edges enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'content_edges' and policyname = 'Content edges are readable by everyone'
  ) then
    create policy "Content edges are readable by everyone"
      on public.content_edges for select to anon, authenticated using (true);
  end if;
end
$$;

-- ─── graph_exercises ────────────────────────────────────────────────────────
-- v1 already had a policy, but v2 schema may have dropped it.

alter table public.graph_exercises enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'graph_exercises' and policyname = 'Graph exercises are readable by everyone'
  ) then
    create policy "Graph exercises are readable by everyone"
      on public.graph_exercises for select to anon, authenticated using (true);
  end if;
end
$$;

-- ─── exercise_items ─────────────────────────────────────────────────────────

alter table public.exercise_items enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'exercise_items' and policyname = 'Exercise items are readable by everyone'
  ) then
    create policy "Exercise items are readable by everyone"
      on public.exercise_items for select to anon, authenticated using (true);
  end if;
end
$$;

-- ─── exercise_concepts ──────────────────────────────────────────────────────

alter table public.exercise_concepts enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'exercise_concepts' and policyname = 'Exercise concepts are readable by everyone'
  ) then
    create policy "Exercise concepts are readable by everyone"
      on public.exercise_concepts for select to anon, authenticated using (true);
  end if;
end
$$;

-- ─── graph_nodes ────────────────────────────────────────────────────────────
-- v1 already had a policy, but ensure it exists.

alter table public.graph_nodes enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'graph_nodes' and policyname = 'Graph nodes are readable by everyone'
  ) then
    create policy "Graph nodes are readable by everyone"
      on public.graph_nodes for select to anon, authenticated using (true);
  end if;
end
$$;
