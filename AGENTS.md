# Agent Instructions — LeetGrammar

## Graphify-First Development

This project has a **queryable knowledge graph** at `graphify-out/graph.json`.
When answering questions about the codebase, architecture, or relationships
between components, **consult the graph before grepping or reading raw files**.

### When to use the graph
- "How does X work?" → `.venv/bin/graphify query "how does X work"`
- "What calls Y?" → `.venv/bin/graphify query "what calls Y"`
- "Trace data flow from A to B" → `.venv/bin/graphify path "A" "B"`
- "Explain component Z" → `.venv/bin/graphify explain "Z"`
- Architecture overviews, community structures, surprising connections

### When to read files directly
- Editing a specific file you already know the path of
- Reading the exact implementation of a single function
- Checking syntax, types, or trivial one-line fixes

### Graph maintenance
- After significant code changes, run: `.venv/bin/graphify update . --no-cluster`
  (zero API cost — pure AST)
- To regenerate the full report: `.venv/bin/graphify cluster-only . --no-label --no-viz`
- The graph was last built from commit `77c6b85a`.

### Available outputs
- `graphify-out/GRAPH_REPORT.md` — architecture report with god nodes & communities
- `graphify-out/graph.json` — full queryable graph
- `.venv/bin/graphify query "<question>"` — BFS traversal for context
- `.venv/bin/graphify path "<A>" "<B>"` — shortest path between concepts
- `.venv/bin/graphify explain "<node>"` — plain-language node explanation

### MCP server (optional)
The graph can also be served as an MCP stdio server:
```bash
.venv/bin/python -m graphify.serve graphify-out/graph.json
```
