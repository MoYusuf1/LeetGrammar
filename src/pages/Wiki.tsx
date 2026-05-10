import { useParams, useNavigate } from 'react-router';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Link2,
  GitFork,
  MessageSquareQuote,
  Construction,
  AlertTriangle,
} from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import ConceptGraph from '@/components/ConceptGraph';
import SourceBadge from '@/components/SourceBadge';
import SourceFilter from '@/components/SourceFilter';
import { useGraphInit } from '@/hooks/useGraphInit';
import type { Edge, EdgeType } from '@/engine/types';

const EDGE_TYPE_LABELS: Record<EdgeType, string> = {
  REQUIRES: 'Prerequisites',
  CONTRADICTS: 'Contrasts With',
  DERIVES_FROM: 'Derived From',
  EXEMPLIFIES: 'Examples',
  CITES: 'Sources',
  IS_A: 'Is A',
  PART_OF: 'Part Of',
  VARIES_BY: 'Varies By',
  SHARED_FORM: 'Shared Form',
  AGREES_WITH: 'Agreement',
  INFLECTION_OF: 'Inflection',
  HOMONYM_OF: 'Homonym',
};

export default function Wiki() {
  useGraphInit();
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeSources, setActiveSources] = useState<string[]>([]);

  const {
    engine,
    chunks,
    getEdgesFrom,
    getEdgesTo,
    getConstructionsForNode,
    getPrerequisiteClosure,
  } = useGraphStore();

  const node = useMemo(() => {
    if (!conceptId) return undefined;
    return engine.getNode(conceptId);
  }, [engine, conceptId]);

  const related = useMemo(() => {
    if (!node) return [] as Edge[];
    return [...getEdgesFrom(node.id), ...getEdgesTo(node.id)];
  }, [node, getEdgesFrom, getEdgesTo]);

  // Auto-populate active sources on first load
  useMemo(() => {
    if (activeSources.length === 0 && related.length > 0) {
      const allSources = new Set(related.map((e) => e.qualifiers.source.textbookId));
      setActiveSources(Array.from(allSources));
    }
  }, [related, activeSources.length]);

  const filteredRelated = useMemo(() => {
    if (activeSources.length === 0) return related;
    return related.filter((e) => activeSources.includes(e.qualifiers.source.textbookId));
  }, [related, activeSources]);

  const constructions = useMemo(() => {
    if (!node) return [];
    const all = getConstructionsForNode(node.id);
    if (activeSources.length === 0) return all;
    return all.filter((c) => activeSources.includes(c.qualifiers.source.textbookId));
  }, [node, getConstructionsForNode, activeSources]);

  const prerequisites = useMemo(() => {
    if (!node) return [];
    return getPrerequisiteClosure(node.id);
  }, [node, getPrerequisiteClosure]);

  const groupedEdges = useMemo(() => {
    const map = new Map<EdgeType, Edge[]>();
    for (const edge of filteredRelated) {
      const list = map.get(edge.type) ?? [];
      list.push(edge);
      map.set(edge.type, list);
    }
    return map;
  }, [filteredRelated]);

  const examples = filteredRelated.filter((e) => e.type === 'EXEMPLIFIES');

  // Detect multi-source conflicts for this node
  const conflicts = useMemo(() => {
    if (!node) return [];
    const edgeGroups = new Map<string, Edge[]>();
    for (const edge of related) {
      const key = `${edge.from}|${edge.to}|${edge.type}`;
      const list = edgeGroups.get(key) ?? [];
      list.push(edge);
      edgeGroups.set(key, list);
    }

    return Array.from(edgeGroups.values()).filter((edges) => edges.length > 1);
  }, [related, node]);

  if (!node) {
    return (
      <div className="min-h-full bg-[#0f0f0f] px-4 py-8">
        <div className="max-w-[640px] mx-auto text-center">
          <h1 className="text-xl font-bold text-[#eff1f6]">Concept not found</h1>
          <p className="text-sm text-[#8c8c8c] mt-2">Try searching for another term.</p>
        </div>
      </div>
    );
  }

  const definitions = node.definitionCids
    .map((cid) => chunks.get(cid))
    .filter(Boolean);

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[640px] mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#8c8c8c] hover:text-[#eff1f6] transition-colors mb-3"
          >
            <ArrowLeft size={14} />
            <span className="text-xs font-medium">Back</span>
          </button>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffa116]20 border border-[#ffa116]30 flex items-center justify-center flex-shrink-0">
              <BookOpen size={18} className="text-[#ffa116]" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-[#eff1f6]">{node.labels.default}</h1>
              <div className="flex flex-wrap gap-2 mt-1">
                {node.labels.somali && (
                  <span className="text-xs text-[#8c8c8c] bg-[#1a1a1a] px-2 py-0.5 rounded-md border border-[#ffffff08]">
                    {node.labels.somali}
                  </span>
                )}
                {node.labels.english && (
                  <span className="text-xs text-[#8c8c8c] bg-[#1a1a1a] px-2 py-0.5 rounded-md border border-[#ffffff08]">
                    {node.labels.english}
                  </span>
                )}
                <span className="text-[10px] font-semibold text-[#5c5c5c] bg-[#1a1a1a] px-2 py-0.5 rounded-md border border-[#ffffff08] uppercase tracking-wider">
                  {node.type}
                </span>
              </div>
            </div>
          </div>

          {/* Source Filter */}
          <div className="mt-3">
            <SourceFilter selected={activeSources} onChange={setActiveSources} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-5">
        <div className="max-w-[640px] mx-auto space-y-5">
          {/* Multi-source conflict banner */}
          {conflicts.length > 0 && (
            <div className="rounded-xl bg-[#ef4444]10 border border-[#ef4444]20 p-3.5">
              <div className="flex items-start gap-2">
                <AlertTriangle size={14} className="text-[#ef4444] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#ef4444]">
                    Multiple sources disagree
                  </p>
                  <p className="text-[10px] text-[#8c8c8c] mt-0.5">
                    {conflicts.length} relationship{conflicts.length > 1 ? 's' : ''} have conflicting information from different textbooks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Definitions */}
          {definitions.length > 0 && (
            <section>
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2.5">
                Definition
              </p>
              <div className="space-y-2">
                {definitions.map((def) => (
                  <div
                    key={def!.cid}
                    className="rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5 text-sm text-[#c8c8c8] leading-relaxed"
                  >
                    {def!.contentType === 'text/markdown' ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: def!.payload
                            .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#eff1f6]">$1</strong>')
                            .replace(/\*(.+?)\*/g, '<em>$1</em>'),
                        }}
                      />
                    ) : (
                      def!.payload
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Examples */}
          {examples.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-2.5">
                <MessageSquareQuote size={12} className="text-[#5c5c5c]" />
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                  Examples
                </p>
              </div>
              <div className="space-y-2">
                {examples.map((edge) => {
                  const exNode = engine.getNode(edge.from);
                  const chunk = exNode?.definitionCids[0]
                    ? chunks.get(exNode.definitionCids[0])
                    : undefined;
                  if (!chunk) return null;
                  return (
                    <div
                      key={edge.id}
                      className="rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5"
                    >
                      <p className="text-sm text-[#eff1f6] font-medium">{exNode?.labels.default}</p>
                      <p className="text-xs text-[#8c8c8c] mt-1">{chunk.payload}</p>
                      <div className="mt-2">
                        <SourceBadge qualifiers={edge.qualifiers} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Constructions */}
          {constructions.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-2.5">
                <Construction size={12} className="text-[#5c5c5c]" />
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                  Constructions
                </p>
              </div>
              <div className="space-y-2">
                {constructions.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-[#eff1f6]">{c.name}</p>
                      <SourceBadge qualifiers={c.qualifiers} />
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {c.members
                        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                        .map((m) => {
                          const memberNode = engine.getNode(m.nodeId);
                          return (
                            <span
                              key={m.nodeId}
                              className="text-[10px] px-2 py-1 rounded-md bg-[#1a1a1a] border border-[#ffffff08] text-[#8c8c8c]"
                            >
                              {memberNode?.labels.default ?? m.nodeId}
                              <span className="text-[#5c5c5c] ml-1">({m.role})</span>
                              {m.bound && <span className="text-[#5c5c5c] ml-0.5">•</span>}
                              {m.optional && <span className="text-[#5c5c5c] ml-0.5">?</span>}
                            </span>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Concepts */}
          {groupedEdges.size > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-2.5">
                <Link2 size={12} className="text-[#5c5c5c]" />
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                  Related Concepts
                </p>
              </div>
              <div className="space-y-3">
                {Array.from(groupedEdges.entries()).map(([type, edges]) => (
                  <div key={type}>
                    <p className="text-[10px] font-semibold text-[#8c8c8c] mb-1.5">
                      {EDGE_TYPE_LABELS[type] ?? type}
                    </p>
                    <div className="flex flex-col gap-2">
                      {edges.map((edge) => {
                        const isOutgoing = edge.from === node.id;
                        const otherId = isOutgoing ? edge.to : edge.from;
                        const other = engine.getNode(otherId);
                        if (!other) return null;
                        return (
                          <div
                            key={edge.id}
                            className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#1a1a1a] border border-[#ffffff08]"
                          >
                            <button
                              onClick={() => navigate(`/wiki/${otherId}`)}
                              className="text-xs text-[#c8c8c8] hover:text-[#eff1f6] transition-colors text-left"
                            >
                              {other.labels.default}
                            </button>
                            <SourceBadge qualifiers={edge.qualifiers} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prerequisites */}
          {prerequisites.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-2.5">
                <GitFork size={12} className="text-[#5c5c5c]" />
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                  Prerequisites
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {prerequisites.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/wiki/${p.id}`)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff08] text-[#c8c8c8] hover:bg-[#222222] hover:text-[#eff1f6] transition-colors"
                  >
                    {p.labels.default}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Concept Graph */}
          <ConceptGraph rootId={node.id} maxDepth={1} onNodeClick={(id) => navigate(`/wiki/${id}`)} />
        </div>
      </div>
    </div>
  );
}
