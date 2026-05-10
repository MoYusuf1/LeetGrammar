# Glossary

> **Purpose:** Precise definitions for graph-theoretic, topological, and linguistic terms used in this project.

## Graph Theory

| Term | Definition |
|------|------------|
| **Graph** | A set of vertices (nodes) connected by edges. |
| **Directed Acyclic Graph (DAG)** | A directed graph with no cycles. Used for prerequisite ordering. |
| **Hypergraph** | A generalization of a graph where an edge (hyperedge) can connect any number of vertices, not just two. |
| **Knowledge Hypergraph (KHG)** | A hypergraph where hyperedges represent n-ary relations with typed roles (e.g., Agent, Patient, Tense). |
| **Hyper-relational KG** | A knowledge graph where each fact carries qualifier pairs (e.g., source, confidence, time). |
| **Incidence Matrix** | A matrix showing which vertices belong to which hyperedges. |
| **Bipartite Graph** | A graph whose vertices can be divided into two disjoint sets (e.g., concepts and examples). |
| **Adjacency Index** | A data structure enabling fast lookup of a node's neighbors. |

## Topology & Category Theory

| Term | Definition |
|------|------------|
| **Sheaf** | A mathematical tool for tracking locally-defined data that must agree on overlaps. Enables multi-perspective truth. |
| **Topos** | A category that behaves like the category of sets; provides a logical environment for contextual reasoning. |
| **Sheaf Laplacian** | An operator measuring the inconsistency of a sheaf. Low values mean local data glues together well globally. |
| **Persistent Homology** | A method from Topological Data Analysis tracking how topological features (holes, loops) appear and disappear across scales. |
| **Simplicial Complex** | A set of simplices (points, edges, triangles, tetrahedra...) closed under subsets. Generalizes graphs to higher dimensions. |
| **Simplicial Neural Network** | A neural network passing messages through simplices of varying dimension, not just edges. |

## Storage & Distributed Systems

| Term | Definition |
|------|------------|
| **Merkle-DAG** | A directed acyclic graph where each node is identified by the hash of its content and children's hashes. |
| **Content Identifier (CID)** | A hash-based address for a piece of content. Same content = same CID. |
| **Content-Addressed Storage** | Storage where data is retrieved by its hash, not by a location (URL/path). |
| **CRDT** | Conflict-Free Replicated Data Type. Data structures that converge without consensus when merged. |
| **Merkle-CRDT** | A CRDT layered on a Merkle-DAG, enabling efficient sync and history. |
| **Merkle Root** | The hash of the topmost node in a Merkle tree/DAG. Represents the entire dataset. |
| **Bloom Filter** | A space-efficient probabilistic data structure for set membership. False positives possible; false negatives impossible. |
| **HNSW** | Hierarchical Navigable Small World. A graph-based index for approximate nearest neighbor search in high dimensions. |

## Search & ML

| Term | Definition |
|------|------------|
| **Vector Embedding** | A dense vector representation of text (or other data) in a high-dimensional space where semantic similarity = spatial proximity. |
| **ANN Search** | Approximate Nearest Neighbor search. Finds the closest vectors without exhaustive comparison. |
| **Inverted Index** | A mapping from terms to the documents/chunks containing them. Enables fast full-text search. |
| **Hybrid Index** | A unified index supporting both vector similarity and graph traversal queries. |
| **Graph Neural Network (GNN)** | A neural network operating on graph structure via message passing between nodes. |
| **Hypergraph Neural Network (HGNN)** | A GNN generalization where messages pass through hyperedges, not just binary edges. |
| **Neuro-Symbolic AI** | Systems combining neural network learning with symbolic logic reasoning. |

## Linguistics

| Term | Definition |
|------|------------|
| **Morpheme** | The smallest meaningful unit in a language (e.g., `waa`, `ka`, plural suffix `-o`). |
| **Focus Marker** | A particle indicating what part of a sentence is emphasized (Somali: `waa`, `baa`, `ayaa`). |
| **Polarity** | Positive vs. negative orientation of a clause. |
| **Concord / Agreement** | The matching of features (gender, number, case) between related words. |
| **Construction** | A structured pairing of form and meaning (e.g., the focus construction). |
| **Copula** | A linking verb (e.g., English "is"; Somali `yahay`). |
| **Clitic** | An element phonologically dependent on a neighboring word (e.g., subject clitics `uu`, `ay`). |
| **SOV** | Subject-Object-Verb word order (Somali canonical order). |
| **Dialect** | A regional or social variety of a language with distinct features. |

## Project-Specific

| Term | Definition |
|------|------------|
| **Chunk** | The smallest content-addressed unit in our storage layer (~sentence/paragraph scale). |
| **Node** | An entity in our hypergraph (concept, word, example, lesson, etc.). |
| **Hyperedge** | An n-ary relationship between nodes with assigned roles. |
| **Qualifiers** | Metadata attached to hyperedges: source, confidence, dialect, register, etc. |
| **Lesson View** | A dynamic assembly of nodes/edges queried from the hypergraph, not a static document. |
| **Materialized View** | A pre-computed query result stored for fast rendering (e.g., a lesson page). |
| **Prerequisite Closure** | The complete set of concepts that must be known before learning a target concept. |
