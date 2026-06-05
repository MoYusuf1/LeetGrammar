import json

nodes = []
edges = []
hyperedges = []

def add_node(id, label, file_type, source_file):
    nodes.append({
        "id": id,
        "label": label,
        "file_type": file_type,
        "source_file": source_file,
        "source_location": None,
        "source_url": None,
        "captured_at": None,
        "author": None,
        "contributor": None
    })

def add_edge(source, target, relation, confidence, confidence_score, source_file):
    edges.append({
        "source": source,
        "target": target,
        "relation": relation,
        "confidence": confidence,
        "confidence_score": confidence_score,
        "source_file": source_file,
        "source_location": None,
        "weight": 1.0
    })

def add_hyperedge(id, label, nodes_list, relation, confidence, confidence_score, source_file):
    hyperedges.append({
        "id": id,
        "label": label,
        "nodes": nodes_list,
        "relation": relation,
        "confidence": confidence,
        "confidence_score": confidence_score,
        "source_file": source_file
    })

# Documents
add_node("architecture_system_architecture", "System Architecture", "document", "docs/ARCHITECTURE.md")
add_node("001_hypergraph_over_relational_hypergraph_over_relational_model", "ADR-001: Hypergraph over Relational Model", "document", "docs/adr/001-hypergraph-over-relational.md")
add_node("002_client_first_architecture_client_first_architecture_with_offline_sync", "ADR-002: Client-First Architecture with Offline Sync", "document", "docs/adr/002-client-first-architecture.md")
add_node("003_content_addressing_content_addressed_storage_with_merkle_cids", "ADR-003: Content-Addressed Storage with Merkle-CIDs", "document", "docs/adr/003-content-addressing.md")
add_node("004_unified_hybrid_index_unified_hybrid_index_for_search", "ADR-004: Unified Hybrid Index for Search", "document", "docs/adr/004-unified-hybrid-index.md")
add_node("005_pragmatic_hypergraph_pragmatic_hypergraph_tier_2_architecture", "ADR-005: Pragmatic Hypergraph (Tier 2 Architecture)", "document", "docs/adr/005-pragmatic-hypergraph.md")
add_node("tech_stack_technology_stack", "Technology Stack", "document", "docs/TECH_STACK.md")
add_node("roadmap_roadmap", "Roadmap", "document", "docs/ROADMAP.md")

# Architecture concepts
add_node("architecture_leetsomali", "LeetSomali", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_pedagogical_knowledge_graph", "Pedagogical Knowledge Graph", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_materialized_views", "Materialized Views", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_property_graph", "Property Graph", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_construction_hypergraph", "Construction Hypergraph", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_content_addressed_chunk_store", "Content-Addressed Chunk Store", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_chunk_deduplication", "Chunk Deduplication", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_qualifier_system", "Qualifier System", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_graph_engine", "Graph Engine", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_inverted_index", "Inverted Index (FTS)", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_vector_index", "Vector Index (HNSW)", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_graph_traversal", "Graph Traversal", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_search_layer", "Search Layer", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_curriculum_validator", "Curriculum Validator", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_offline_by_default", "Offline by Default", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_multi_textbook_strategy", "Multi-Textbook Strategy", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_conflict_reporter", "Conflict Reporter", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_wiki_view", "Wiki View", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_path_view", "Path View (DAG)", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_concept_explorer", "Concept Explorer", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_dialect_filter", "Dialect Filter", "concept", "docs/ARCHITECTURE.md")
add_node("architecture_dialect_as_dimension", "Dialect as Dimension", "concept", "docs/ARCHITECTURE.md")

# Architecture rationale
add_node("architecture_why_hybrid", "Why Hybrid Graph Model", "rationale", "docs/ARCHITECTURE.md")
add_node("architecture_not_a_merkle_dag", "NOT a Merkle-DAG", "rationale", "docs/ARCHITECTURE.md")

# ADR-001
add_node("001_decision_custom_knowledge_hypergraph", "Custom Knowledge Hypergraph Decision", "rationale", "docs/adr/001-hypergraph-over-relational.md")
add_node("001_expressiveness", "Expressiveness", "concept", "docs/adr/001-hypergraph-over-relational.md")
add_node("001_multi_source_attribution", "Multi-Source Attribution", "concept", "docs/adr/001-hypergraph-over-relational.md")
add_node("001_rejected_relational_model", "Rejected Relational Model", "rationale", "docs/adr/001-hypergraph-over-relational.md")
add_node("001_rejected_property_graph", "Rejected Property Graph as Primary", "rationale", "docs/adr/001-hypergraph-over-relational.md")
add_node("001_rejected_document_store", "Rejected Document Store", "rationale", "docs/adr/001-hypergraph-over-relational.md")

# ADR-002
add_node("002_decision_client_first", "Client-First Architecture Decision", "rationale", "docs/adr/002-client-first-architecture.md")
add_node("002_offline_by_default", "Offline by Default", "concept", "docs/adr/002-client-first-architecture.md")
add_node("002_privacy_by_design", "Privacy by Design", "concept", "docs/adr/002-client-first-architecture.md")
add_node("002_merkle_crdt_sync", "Merkle-CRDT Sync", "concept", "docs/adr/002-client-first-architecture.md")
add_node("002_rejected_server_centric", "Rejected Server-Centric Model", "rationale", "docs/adr/002-client-first-architecture.md")

# ADR-003
add_node("003_decision_content_addressed_storage", "Content-Addressed Storage Decision", "rationale", "docs/adr/003-content-addressing.md")
add_node("003_sha_256_cids", "SHA-256 CIDs", "concept", "docs/adr/003-content-addressing.md")
add_node("003_deduplication", "Deduplication", "concept", "docs/adr/003-content-addressing.md")
add_node("003_immutability", "Immutability", "concept", "docs/adr/003-content-addressing.md")

# ADR-004
add_node("004_decision_unified_hybrid_index", "Unified Hybrid Index Decision", "rationale", "docs/adr/004-unified-hybrid-index.md")
add_node("004_inverted_index", "Inverted Index", "concept", "docs/adr/004-unified-hybrid-index.md")
add_node("004_vector_index", "Vector Index", "concept", "docs/adr/004-unified-hybrid-index.md")
add_node("004_adjacency_index", "Adjacency Index", "concept", "docs/adr/004-unified-hybrid-index.md")
add_node("004_query_planner", "Query Planner", "concept", "docs/adr/004-unified-hybrid-index.md")

# ADR-005
add_node("005_decision_pragmatic_hypergraph", "Pragmatic Hypergraph Decision", "rationale", "docs/adr/005-pragmatic-hypergraph.md")
add_node("005_tier_2_pragmatic_hypergraph", "Tier 2 Pragmatic Hypergraph", "concept", "docs/adr/005-pragmatic-hypergraph.md")
add_node("005_edge_qualifiers", "Edge Qualifiers", "concept", "docs/adr/005-pragmatic-hypergraph.md")
add_node("005_deferred_merkle_crdt", "Deferred Merkle-CRDT Sync", "rationale", "docs/adr/005-pragmatic-hypergraph.md")
add_node("005_deferred_sheaf_consistency", "Deferred Sheaf Consistency", "rationale", "docs/adr/005-pragmatic-hypergraph.md")
add_node("005_deferred_persistent_homology", "Deferred Persistent Homology", "rationale", "docs/adr/005-pragmatic-hypergraph.md")

# Tech Stack
add_node("tech_stack_react", "React", "concept", "docs/TECH_STACK.md")
add_node("tech_stack_typescript", "TypeScript", "concept", "docs/TECH_STACK.md")
add_node("tech_stack_vite", "Vite", "concept", "docs/TECH_STACK.md")
add_node("tech_stack_zustand", "Zustand", "concept", "docs/TECH_STACK.md")
add_node("tech_stack_vitest", "Vitest", "concept", "docs/TECH_STACK.md")
add_node("tech_stack_custom_engine", "Custom Engine", "concept", "docs/TECH_STACK.md")
add_node("tech_stack_hash_wasm", "hash-wasm", "concept", "docs/TECH_STACK.md")
add_node("tech_stack_comlink", "Comlink", "concept", "docs/TECH_STACK.md")
add_node("tech_stack_sqlite_wasm", "SQLite WASM", "concept", "docs/TECH_STACK.md")
add_node("tech_stack_transformers_js", "transformers.js", "concept", "docs/TECH_STACK.md")
add_node("tech_stack_hnswlib", "hnswlib", "concept", "docs/TECH_STACK.md")

# Roadmap
add_node("roadmap_phase_0_foundation", "Phase 0: Foundation", "concept", "docs/ROADMAP.md")
add_node("roadmap_phase_1_graph_engine_wiki", "Phase 1: Graph Engine + Wiki", "concept", "docs/ROADMAP.md")
add_node("roadmap_phase_2_multi_textbook_ingestion", "Phase 2: Multi-Textbook Ingestion", "concept", "docs/ROADMAP.md")
add_node("roadmap_phase_3_persistence_curriculum", "Phase 3: Persistence + Curriculum", "concept", "docs/ROADMAP.md")
add_node("roadmap_phase_4_search_discovery", "Phase 4: Search + Discovery", "concept", "docs/ROADMAP.md")
add_node("roadmap_phase_5_exercise_generation", "Phase 5: Exercise Generation + Adaptation", "concept", "docs/ROADMAP.md")
add_node("roadmap_prerequisite_engine", "Prerequisite Engine", "concept", "docs/ROADMAP.md")

# EXTRACTED edges (1.0)
add_edge("architecture_system_architecture", "tech_stack_technology_stack", "references", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")
add_edge("architecture_system_architecture", "roadmap_roadmap", "references", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")
add_edge("architecture_system_architecture", "005_pragmatic_hypergraph_pragmatic_hypergraph_tier_2_architecture", "cites", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")

add_edge("002_client_first_architecture_client_first_architecture_with_offline_sync", "003_content_addressing_content_addressed_storage_with_merkle_cids", "cites", "EXTRACTED", 1.0, "docs/adr/002-client-first-architecture.md")
add_edge("002_client_first_architecture_client_first_architecture_with_offline_sync", "tech_stack_technology_stack", "references", "EXTRACTED", 1.0, "docs/adr/002-client-first-architecture.md")
add_edge("003_content_addressing_content_addressed_storage_with_merkle_cids", "002_client_first_architecture_client_first_architecture_with_offline_sync", "cites", "EXTRACTED", 1.0, "docs/adr/003-content-addressing.md")
add_edge("004_unified_hybrid_index_unified_hybrid_index_for_search", "tech_stack_technology_stack", "references", "EXTRACTED", 1.0, "docs/adr/004-unified-hybrid-index.md")
add_edge("004_unified_hybrid_index_unified_hybrid_index_for_search", "roadmap_roadmap", "cites", "EXTRACTED", 1.0, "docs/adr/004-unified-hybrid-index.md")
add_edge("005_pragmatic_hypergraph_pragmatic_hypergraph_tier_2_architecture", "architecture_system_architecture", "cites", "EXTRACTED", 1.0, "docs/adr/005-pragmatic-hypergraph.md")
add_edge("tech_stack_technology_stack", "005_pragmatic_hypergraph_pragmatic_hypergraph_tier_2_architecture", "cites", "EXTRACTED", 1.0, "docs/TECH_STACK.md")
add_edge("tech_stack_technology_stack", "roadmap_roadmap", "cites", "EXTRACTED", 1.0, "docs/TECH_STACK.md")
add_edge("roadmap_roadmap", "architecture_system_architecture", "references", "EXTRACTED", 1.0, "docs/ROADMAP.md")

add_edge("architecture_graph_engine", "architecture_property_graph", "implements", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")
add_edge("architecture_graph_engine", "architecture_construction_hypergraph", "implements", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")
add_edge("architecture_why_hybrid", "architecture_property_graph", "rationale_for", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")
add_edge("architecture_why_hybrid", "architecture_construction_hypergraph", "rationale_for", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")
add_edge("architecture_qualifier_system", "architecture_multi_textbook_strategy", "rationale_for", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")
add_edge("architecture_not_a_merkle_dag", "architecture_content_addressed_chunk_store", "rationale_for", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")
add_edge("architecture_curriculum_validator", "architecture_graph_traversal", "calls", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")

add_edge("001_decision_custom_knowledge_hypergraph", "001_rejected_relational_model", "rationale_for", "EXTRACTED", 1.0, "docs/adr/001-hypergraph-over-relational.md")
add_edge("001_decision_custom_knowledge_hypergraph", "001_rejected_property_graph", "rationale_for", "EXTRACTED", 1.0, "docs/adr/001-hypergraph-over-relational.md")
add_edge("001_decision_custom_knowledge_hypergraph", "001_rejected_document_store", "rationale_for", "EXTRACTED", 1.0, "docs/adr/001-hypergraph-over-relational.md")

add_edge("002_decision_client_first", "002_rejected_server_centric", "rationale_for", "EXTRACTED", 1.0, "docs/adr/002-client-first-architecture.md")

add_edge("003_decision_content_addressed_storage", "003_sha_256_cids", "implements", "EXTRACTED", 1.0, "docs/adr/003-content-addressing.md")
add_edge("003_decision_content_addressed_storage", "003_deduplication", "rationale_for", "EXTRACTED", 1.0, "docs/adr/003-content-addressing.md")
add_edge("003_decision_content_addressed_storage", "003_immutability", "rationale_for", "EXTRACTED", 1.0, "docs/adr/003-content-addressing.md")

add_edge("004_decision_unified_hybrid_index", "004_query_planner", "implements", "EXTRACTED", 1.0, "docs/adr/004-unified-hybrid-index.md")
add_edge("004_decision_unified_hybrid_index", "004_inverted_index", "implements", "EXTRACTED", 1.0, "docs/adr/004-unified-hybrid-index.md")
add_edge("004_decision_unified_hybrid_index", "004_vector_index", "implements", "EXTRACTED", 1.0, "docs/adr/004-unified-hybrid-index.md")
add_edge("004_decision_unified_hybrid_index", "004_adjacency_index", "implements", "EXTRACTED", 1.0, "docs/adr/004-unified-hybrid-index.md")

add_edge("005_decision_pragmatic_hypergraph", "005_tier_2_pragmatic_hypergraph", "implements", "EXTRACTED", 1.0, "docs/adr/005-pragmatic-hypergraph.md")
add_edge("005_decision_pragmatic_hypergraph", "005_edge_qualifiers", "implements", "EXTRACTED", 1.0, "docs/adr/005-pragmatic-hypergraph.md")
add_edge("005_decision_pragmatic_hypergraph", "005_deferred_merkle_crdt", "rationale_for", "EXTRACTED", 1.0, "docs/adr/005-pragmatic-hypergraph.md")
add_edge("005_decision_pragmatic_hypergraph", "005_deferred_sheaf_consistency", "rationale_for", "EXTRACTED", 1.0, "docs/adr/005-pragmatic-hypergraph.md")
add_edge("005_decision_pragmatic_hypergraph", "005_deferred_persistent_homology", "rationale_for", "EXTRACTED", 1.0, "docs/adr/005-pragmatic-hypergraph.md")

# INFERRED edges
add_edge("architecture_leetsomali", "architecture_pedagogical_knowledge_graph", "implements", "INFERRED", 0.95, "docs/ARCHITECTURE.md")
add_edge("architecture_pedagogical_knowledge_graph", "architecture_materialized_views", "conceptually_related_to", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_edge("architecture_property_graph", "architecture_construction_hypergraph", "conceptually_related_to", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_edge("architecture_construction_hypergraph", "001_decision_custom_knowledge_hypergraph", "implements", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_edge("architecture_property_graph", "005_tier_2_pragmatic_hypergraph", "implements", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_edge("architecture_construction_hypergraph", "005_tier_2_pragmatic_hypergraph", "implements", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_edge("architecture_offline_by_default", "002_decision_client_first", "rationale_for", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_edge("architecture_content_addressed_chunk_store", "003_decision_content_addressed_storage", "implements", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_edge("architecture_inverted_index", "004_decision_unified_hybrid_index", "implements", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_edge("architecture_vector_index", "004_decision_unified_hybrid_index", "implements", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_edge("architecture_graph_traversal", "004_decision_unified_hybrid_index", "implements", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_edge("005_edge_qualifiers", "architecture_qualifier_system", "implements", "INFERRED", 0.95, "docs/adr/005-pragmatic-hypergraph.md")
add_edge("003_sha_256_cids", "architecture_content_addressed_chunk_store", "implements", "INFERRED", 0.95, "docs/adr/003-content-addressing.md")
add_edge("003_deduplication", "architecture_chunk_deduplication", "semantically_similar_to", "INFERRED", 0.95, "docs/adr/003-content-addressing.md")
add_edge("001_rejected_property_graph", "architecture_property_graph", "conceptually_related_to", "INFERRED", 0.75, "docs/adr/001-hypergraph-over-relational.md")
add_edge("005_deferred_merkle_crdt", "002_merkle_crdt_sync", "conceptually_related_to", "INFERRED", 0.85, "docs/adr/005-pragmatic-hypergraph.md")
add_edge("004_inverted_index", "architecture_inverted_index", "semantically_similar_to", "INFERRED", 0.95, "docs/adr/004-unified-hybrid-index.md")
add_edge("004_vector_index", "architecture_vector_index", "semantically_similar_to", "INFERRED", 0.95, "docs/adr/004-unified-hybrid-index.md")
add_edge("004_adjacency_index", "architecture_graph_traversal", "conceptually_related_to", "INFERRED", 0.85, "docs/adr/004-unified-hybrid-index.md")

add_edge("tech_stack_custom_engine", "architecture_graph_engine", "implements", "INFERRED", 0.95, "docs/TECH_STACK.md")
add_edge("tech_stack_hash_wasm", "003_sha_256_cids", "implements", "INFERRED", 0.95, "docs/TECH_STACK.md")
add_edge("tech_stack_comlink", "architecture_graph_engine", "calls", "INFERRED", 0.75, "docs/TECH_STACK.md")
add_edge("tech_stack_sqlite_wasm", "architecture_graph_engine", "implements", "INFERRED", 0.75, "docs/TECH_STACK.md")
add_edge("tech_stack_transformers_js", "architecture_vector_index", "implements", "INFERRED", 0.85, "docs/TECH_STACK.md")
add_edge("tech_stack_hnswlib", "architecture_vector_index", "implements", "INFERRED", 0.95, "docs/TECH_STACK.md")
add_edge("tech_stack_zustand", "architecture_graph_engine", "shares_data_with", "INFERRED", 0.75, "docs/TECH_STACK.md")
add_edge("tech_stack_vitest", "tech_stack_custom_engine", "calls", "INFERRED", 0.75, "docs/TECH_STACK.md")
add_edge("tech_stack_react", "architecture_wiki_view", "implements", "INFERRED", 0.85, "docs/TECH_STACK.md")
add_edge("tech_stack_typescript", "tech_stack_custom_engine", "implements", "INFERRED", 0.85, "docs/TECH_STACK.md")

add_edge("roadmap_phase_1_graph_engine_wiki", "architecture_graph_engine", "implements", "INFERRED", 0.95, "docs/ROADMAP.md")
add_edge("roadmap_phase_1_graph_engine_wiki", "architecture_wiki_view", "implements", "INFERRED", 0.95, "docs/ROADMAP.md")
add_edge("roadmap_phase_2_multi_textbook_ingestion", "architecture_multi_textbook_strategy", "implements", "INFERRED", 0.95, "docs/ROADMAP.md")
add_edge("roadmap_phase_3_persistence_curriculum", "architecture_curriculum_validator", "implements", "INFERRED", 0.95, "docs/ROADMAP.md")
add_edge("roadmap_phase_3_persistence_curriculum", "roadmap_prerequisite_engine", "implements", "INFERRED", 0.95, "docs/ROADMAP.md")
add_edge("roadmap_phase_4_search_discovery", "architecture_search_layer", "implements", "INFERRED", 0.95, "docs/ROADMAP.md")
add_edge("roadmap_phase_4_search_discovery", "004_decision_unified_hybrid_index", "implements", "INFERRED", 0.85, "docs/ROADMAP.md")
add_edge("roadmap_phase_0_foundation", "tech_stack_vitest", "calls", "INFERRED", 0.95, "docs/ROADMAP.md")
add_edge("roadmap_phase_0_foundation", "tech_stack_zustand", "calls", "INFERRED", 0.95, "docs/ROADMAP.md")

add_edge("architecture_inverted_index", "architecture_search_layer", "conceptually_related_to", "INFERRED", 0.95, "docs/ARCHITECTURE.md")
add_edge("architecture_vector_index", "architecture_search_layer", "conceptually_related_to", "INFERRED", 0.95, "docs/ARCHITECTURE.md")
add_edge("architecture_graph_traversal", "architecture_search_layer", "conceptually_related_to", "INFERRED", 0.95, "docs/ARCHITECTURE.md")
add_edge("architecture_conflict_reporter", "architecture_multi_textbook_strategy", "implements", "INFERRED", 0.95, "docs/ARCHITECTURE.md")
add_edge("architecture_dialect_filter", "architecture_dialect_as_dimension", "implements", "INFERRED", 0.95, "docs/ARCHITECTURE.md")
add_edge("architecture_system_architecture", "005_decision_pragmatic_hypergraph", "references", "INFERRED", 0.95, "docs/ARCHITECTURE.md")
add_edge("roadmap_roadmap", "005_decision_pragmatic_hypergraph", "references", "INFERRED", 0.95, "docs/ROADMAP.md")

add_edge("001_decision_custom_knowledge_hypergraph", "001_expressiveness", "conceptually_related_to", "INFERRED", 0.95, "docs/adr/001-hypergraph-over-relational.md")
add_edge("001_decision_custom_knowledge_hypergraph", "001_multi_source_attribution", "conceptually_related_to", "INFERRED", 0.95, "docs/adr/001-hypergraph-over-relational.md")
add_edge("002_decision_client_first", "002_offline_by_default", "conceptually_related_to", "INFERRED", 0.95, "docs/adr/002-client-first-architecture.md")
add_edge("002_decision_client_first", "002_privacy_by_design", "conceptually_related_to", "INFERRED", 0.95, "docs/adr/002-client-first-architecture.md")
add_edge("002_decision_client_first", "002_merkle_crdt_sync", "conceptually_related_to", "INFERRED", 0.95, "docs/adr/002-client-first-architecture.md")

# AMBIGUOUS edges
add_edge("architecture_path_view", "roadmap_prerequisite_engine", "conceptually_related_to", "AMBIGUOUS", 0.25, "docs/ARCHITECTURE.md")
add_edge("tech_stack_sqlite_wasm", "005_deferred_merkle_crdt", "conceptually_related_to", "AMBIGUOUS", 0.2, "docs/TECH_STACK.md")

# Hyperedges
add_hyperedge("layer_2_knowledge_graph", "Layer 2: Knowledge Graph", ["architecture_property_graph", "architecture_construction_hypergraph", "architecture_content_addressed_chunk_store", "architecture_qualifier_system"], "participate_in", "INFERRED", 0.85, "docs/ARCHITECTURE.md")
add_hyperedge("search_layer", "Search Layer", ["architecture_inverted_index", "architecture_vector_index", "architecture_graph_traversal"], "participate_in", "EXTRACTED", 1.0, "docs/ARCHITECTURE.md")
add_hyperedge("tier_2_architecture", "Tier 2 Architecture", ["005_tier_2_pragmatic_hypergraph", "architecture_property_graph", "architecture_construction_hypergraph", "005_edge_qualifiers"], "implement", "INFERRED", 0.85, "docs/adr/005-pragmatic-hypergraph.md")
add_hyperedge("unified_hybrid_index", "Unified Hybrid Index", ["004_inverted_index", "004_vector_index", "004_adjacency_index", "004_query_planner"], "implement", "EXTRACTED", 1.0, "docs/adr/004-unified-hybrid-index.md")
add_hyperedge("phase_1_deliverables", "Phase 1 Deliverables", ["roadmap_phase_1_graph_engine_wiki", "architecture_graph_engine", "architecture_wiki_view", "tech_stack_custom_engine"], "implement", "INFERRED", 0.85, "docs/ROADMAP.md")

output = {
    "nodes": nodes,
    "edges": edges,
    "hyperedges": hyperedges,
    "input_tokens": 8500,
    "output_tokens": 5500
}

with open("/home/moyusuf/Documents/projects/LeetGrammar/graphify-out/.graphify_chunk_01.json", "w") as f:
    json.dump(output, f, indent=2)

print(f"Wrote {len(nodes)} nodes, {len(edges)} edges, {len(hyperedges)} hyperedges")
