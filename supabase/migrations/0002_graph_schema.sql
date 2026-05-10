-- LeetGrammar Graph Schema
-- Stores the knowledge graph in Supabase for centralized management.
-- The app hydrates via the get_full_graph() RPC function (one round-trip).

-- ─── Graph Nodes ────────────────────────────────────────────────────────────

create table if not exists public.graph_nodes (
  id text primary key,
  type text not null,
  labels jsonb not null default '{}',
  attributes jsonb not null default '{}',
  definition_cids text[] default '{}'
);

comment on table public.graph_nodes is 'Knowledge graph nodes (CONCEPT, MORPHEME, WORD, EXAMPLE, etc.)';

-- Enable RLS (read-only for anon/authenticated)
alter table public.graph_nodes enable row level security;

create policy "Graph nodes are readable by everyone"
  on public.graph_nodes for select
  to anon, authenticated
  using (true);

-- ─── Graph Edges ────────────────────────────────────────────────────────────

create table if not exists public.graph_edges (
  id text primary key,
  from_node text not null references public.graph_nodes(id) on delete cascade,
  to_node text not null references public.graph_nodes(id) on delete cascade,
  type text not null,
  qualifiers jsonb not null default '{}'
);

comment on table public.graph_edges is 'Relationships between nodes (REQUIRES, EXEMPLIFIES, etc.)';

-- Indexes for fast traversal queries
create index if not exists idx_graph_edges_from on public.graph_edges(from_node);
create index if not exists idx_graph_edges_to on public.graph_edges(to_node);
create index if not exists idx_graph_edges_type on public.graph_edges(type);

alter table public.graph_edges enable row level security;

create policy "Graph edges are readable by everyone"
  on public.graph_edges for select
  to anon, authenticated
  using (true);

-- ─── Graph Constructions ────────────────────────────────────────────────────

create table if not exists public.graph_constructions (
  id text primary key,
  name text not null,
  members jsonb not null default '[]',
  qualifiers jsonb not null default '{}'
);

comment on table public.graph_constructions is 'Grammatical construction templates';

alter table public.graph_constructions enable row level security;

create policy "Graph constructions are readable by everyone"
  on public.graph_constructions for select
  to anon, authenticated
  using (true);

-- ─── Graph Chunks ───────────────────────────────────────────────────────────

create table if not exists public.graph_chunks (
  cid text primary key,
  content_type text not null,
  payload text not null,
  qualifiers jsonb not null default '{}'
);

comment on table public.graph_chunks is 'Content chunks (definitions, explanations, markdown)';

alter table public.graph_chunks enable row level security;

create policy "Graph chunks are readable by everyone"
  on public.graph_chunks for select
  to anon, authenticated
  using (true);

-- ─── RPC: Get Full Graph ────────────────────────────────────────────────────
-- Returns the entire graph as a single JSON object for fast client hydration.

create or replace function public.get_full_graph()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'nodes', coalesce((select json_agg(row_to_json(graph_nodes)) from public.graph_nodes), '[]'::json),
    'edges', coalesce((select json_agg(row_to_json(graph_edges)) from public.graph_edges), '[]'::json),
    'constructions', coalesce((select json_agg(row_to_json(graph_constructions)) from public.graph_constructions), '[]'::json),
    'chunks', coalesce((select json_agg(row_to_json(graph_chunks)) from public.graph_chunks), '[]'::json),
    'meta', json_build_object(
      'node_count', (select count(*) from public.graph_nodes),
      'edge_count', (select count(*) from public.graph_edges),
      'construction_count', (select count(*) from public.graph_constructions),
      'chunk_count', (select count(*) from public.graph_chunks)
    )
  );
$$;

-- Grant execute permission to anon and authenticated roles
grant execute on function public.get_full_graph() to anon, authenticated;
