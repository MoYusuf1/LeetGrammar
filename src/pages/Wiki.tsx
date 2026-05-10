/**
 * Wiki Article Page — Wikipedia-style layout for grammar concepts.
 *
 * Layout (desktop):
 *   [TOC sidebar] [Article content] [Infobox]
 *
 * Mobile: infobox stacks above article, TOC collapses to dropdown.
 */

import { useParams, useNavigate } from 'react-router';
import { useMemo, useState, useRef } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Link2,
  GitFork,
  MessageSquareQuote,
  Construction,
  AlertTriangle,
  Hash,
  ChevronRight,
  ExternalLink,
  Wrench,
  ScrollText,
  ListTree,
  Dumbbell,
} from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import ConceptGraph from '@/components/ConceptGraph';
import SourceBadge from '@/components/SourceBadge';
import SourceFilter from '@/components/SourceFilter';
import { useGraphInit } from '@/hooks/useGraphInit';
import type { Edge, EdgeType, Node, NodeType } from '@/engine/types';
import type { GraphEngine } from '@/engine/graph-engine';


const EDGE_TYPE_LABELS: Record<EdgeType, string> = {
  REQUIRES: 'Prerequisites',
  CONTRADICTS: 'Contrasts With',
  DERIVES_FROM: 'Derived From',
  EXEMPLIFIES: 'Examples',
  CITES: 'Cited In',
  IS_A: 'Is A',
  PART_OF: 'Part Of',
  VARIES_BY: 'Varies By',
  SHARED_FORM: 'Shared Form',
  AGREES_WITH: 'Agreement',
  INFLECTION_OF: 'Inflection',
  HOMONYM_OF: 'Homonym',
};

const TYPE_COLORS: Record<NodeType, string> = {
  CONCEPT: '#3b82f6',
  MORPHEME: '#f97316',
  WORD: '#22c55e',
  EXAMPLE: '#a855f7',
  RULE: '#eab308',
  LESSON: '#06b6d4',
  TEXTBOOK: '#ef4444',
  CONSTRUCTION: '#ec4899',
  LEXICAL_ENTRY: '#14b8a6',
};

const TYPE_ICONS: Record<NodeType, typeof BookOpen> = {
  CONCEPT: BookOpen,
  MORPHEME: Hash,
  WORD: Hash,
  EXAMPLE: MessageSquareQuote,
  RULE: Wrench,
  LESSON: ScrollText,
  TEXTBOOK: BookOpen,
  CONSTRUCTION: Construction,
  LEXICAL_ENTRY: Hash,
};

/* ─────────────────────────────────────────────────────────────────────── */

export default function Wiki() {
  useGraphInit();
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [activeSources, setActiveSources] = useState<string[]>([]);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { engine, chunks, getEdgesFrom, getEdgesTo, getConstructionsForNode, getPrerequisiteClosure } =
    useGraphStore();

  const node = useMemo(() => {
    if (!conceptId) return undefined;
    return engine.getNode(conceptId);
  }, [engine, conceptId]);

  const related = useMemo(() => {
    if (!node) return [] as Edge[];
    return [...getEdgesFrom(node.id), ...getEdgesTo(node.id)];
  }, [node, getEdgesFrom, getEdgesTo]);

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
      if (edge.type === 'EXEMPLIFIES') continue; // handled in Examples section
      const list = map.get(edge.type) ?? [];
      list.push(edge);
      map.set(edge.type, list);
    }
    return map;
  }, [filteredRelated]);

  const examples = filteredRelated.filter((e) => e.type === 'EXEMPLIFIES');

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

  // Scroll-to-section handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTocOpen(false);
    }
  };

  // Collect all citations from edges
  const citations = useMemo(() => {
    const map = new Map<string, { source: string; page?: string; count: number }>();
    for (const edge of filteredRelated) {
      const src = edge.qualifiers.source;
      const key = `${src.textbookId}|${src.page ?? ''}`;
      const existing = map.get(key);
      if (existing) {
        existing.count++;
      } else {
        map.set(key, { source: src.textbookId, page: src.page, count: 1 });
      }
    }
    for (const c of constructions) {
      const src = c.qualifiers.source;
      const key = `${src.textbookId}|${src.page ?? ''}`;
      const existing = map.get(key);
      if (existing) {
        existing.count++;
      } else {
        map.set(key, { source: src.textbookId, page: src.page, count: 1 });
      }
    }
    return Array.from(map.values());
  }, [filteredRelated, constructions]);

  if (!node) {
    return (
      <div className="min-h-full bg-[#0f0f0f] px-4 py-8">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="text-xl font-bold text-[#eff1f6]">Concept not found</h1>
          <p className="text-sm text-[#8c8c8c] mt-2">Try searching for another term in the Concept Explorer.</p>
          <button
            onClick={() => navigate('/concepts')}
            className="mt-4 px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-sm font-semibold"
          >
            Browse Concepts
          </button>
        </div>
      </div>
    );
  }

  const definitions = node.definitionCids.map((cid) => chunks.get(cid)).filter(Boolean);
  const nodeColor = TYPE_COLORS[node.type];
  const NodeIcon = TYPE_ICONS[node.type];

  const hasDefinition = definitions.length > 0;
  const hasExamples = examples.length > 0;
  const hasConstructions = constructions.length > 0;
  const hasRelated = groupedEdges.size > 0;
  const hasPrereqs = prerequisites.length > 0;
  const hasCitations = citations.length > 0;

  const tocItems = [
    { id: 'definition', label: 'Definition', show: hasDefinition },
    { id: 'examples', label: 'Examples', show: hasExamples },
    { id: 'constructions', label: 'Constructions', show: hasConstructions },
    { id: 'related', label: 'Related Concepts', show: hasRelated },
    { id: 'prerequisites', label: 'Prerequisites', show: hasPrereqs },
    { id: 'practice', label: 'Practice', show: true },
    { id: 'citations', label: 'References', show: hasCitations },
    { id: 'graph', label: 'Concept Map', show: true },
  ].filter((i) => i.show);

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* ── Top Header ── */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[1100px] mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[#8c8c8c] hover:text-[#eff1f6] transition-colors mb-3"
          >
            <ArrowLeft size={14} />
            <span className="text-xs font-medium">Back</span>
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ color: nodeColor, backgroundColor: `${nodeColor}15` }}
            >
              {node.type}
            </span>
            <ChevronRight size={10} className="text-[#3e3e3e]" />
            <span className="text-[10px] text-[#5c5c5c]">{node.labels.default}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-[#eff1f6] tracking-tight">
            {node.labels.default}
          </h1>

          {/* Subtitle line */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {node.labels.somali && (
              <span className="text-sm text-[#8c8c8c] font-mono">{node.labels.somali}</span>
            )}
            {node.labels.english && (
              <span className="text-sm text-[#5c5c5c] italic">{node.labels.english}</span>
            )}
            {node.labels.transliteration && (
              <span className="text-sm text-[#5c5c5c] font-mono">/{node.labels.transliteration}/</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={() => navigate(`/quiz/${node.id}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-xs font-bold hover:bg-[#ffb800] transition-colors"
            >
              <Dumbbell size={13} />
              Practice
            </button>
            <button
              onClick={() => navigate(`/review`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] text-xs font-medium text-[#c8c8c8] hover:text-[#eff1f6] hover:bg-[#222222] transition-colors"
            >
              <BookOpen size={13} />
              Review
            </button>
          </div>

          {/* Source Filter */}
          <div className="mt-3">
            <SourceFilter selected={activeSources} onChange={setActiveSources} />
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-4 py-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex gap-6 items-start">
            {/* ── Left: TOC Sidebar (desktop) ── */}
            <aside className="hidden lg:block w-[180px] flex-shrink-0 sticky top-4">
              <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5">
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <ListTree size={11} />
                  Contents
                </p>
                <nav className="space-y-0.5">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="w-full text-left text-xs text-[#8c8c8c] hover:text-[#eff1f6] py-1 px-1.5 rounded hover:bg-[#ffffff06] transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* ── Center: Article ── */}
            <div ref={contentRef} className="flex-1 min-w-0">
              {/* Mobile TOC toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="flex items-center gap-2 text-xs text-[#8c8c8c] hover:text-[#eff1f6] transition-colors"
                >
                  <ListTree size={13} />
                  {tocOpen ? 'Hide contents' : 'Show contents'}
                </button>
                {tocOpen && (
                  <div className="mt-2 rounded-lg bg-[#141414] border border-[#ffffff08] p-2 space-y-0.5">
                    {tocItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className="block w-full text-left text-xs text-[#8c8c8c] hover:text-[#eff1f6] py-1 px-2 rounded hover:bg-[#ffffff06]"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Multi-source conflict banner */}
              {conflicts.length > 0 && (
                <div className="mb-6 rounded-xl bg-[#ef4444]08 border border-[#ef4444]15 p-3.5">
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-[#ef4444] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-[#ef4444]">Multiple sources disagree</p>
                      <p className="text-[10px] text-[#8c8c8c] mt-0.5">
                        {conflicts.length} relationship{conflicts.length > 1 ? 's' : ''} have conflicting
                        information from different textbooks.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Definition */}
              {hasDefinition && (
                <WikiSection id="definition" title="Definition" icon={<BookOpen size={13} className="text-[#5c5c5c]" />}>
                  <div className="space-y-3">
                    {definitions.map((def) => (
                      <div key={def!.cid} className="text-sm text-[#c8c8c8] leading-relaxed">
                        {def!.contentType === 'text/markdown' ? (
                          <WikiMarkdown
                            payload={def!.payload}
                            onLinkClick={(id) => navigate(`/wiki/${id}`)}
                          />
                        ) : (
                          def!.payload
                        )}
                      </div>
                    ))}
                  </div>
                </WikiSection>
              )}

              {/* Examples */}
              {hasExamples && (
                <WikiSection id="examples" title="Examples" icon={<MessageSquareQuote size={13} className="text-[#5c5c5c]" />}>
                  <div className="space-y-3">
                    {examples.map((edge) => {
                      const exNode = engine.getNode(edge.from);
                      const chunk = exNode?.definitionCids[0] ? chunks.get(exNode.definitionCids[0]) : undefined;
                      if (!chunk || !exNode) return null;
                      return (
                        <div key={edge.id} className="rounded-lg bg-[#0f0f0f] border border-[#ffffff08] p-3.5">
                          <p className="text-sm text-[#eff1f6] font-medium font-mono leading-relaxed">
                            {exNode.labels.default}
                          </p>
                          <p className="text-xs text-[#8c8c8c] mt-1.5 leading-relaxed">{chunk.payload}</p>
                          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                            <SourceBadge qualifiers={edge.qualifiers} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </WikiSection>
              )}

              {/* Constructions */}
              {hasConstructions && (
                <WikiSection
                  id="constructions"
                  title="Constructions"
                  icon={<Construction size={13} className="text-[#5c5c5c]" />}
                >
                  <div className="space-y-4">
                    {constructions.map((c) => (
                      <div key={c.id} className="rounded-lg bg-[#0f0f0f] border border-[#ffffff08] p-3.5">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <p className="text-xs font-semibold text-[#eff1f6]">{c.name}</p>
                          <SourceBadge qualifiers={c.qualifiers} />
                        </div>
                        {/* Construction template */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {c.members
                            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
                            .map((m, idx, arr) => {
                              const memberNode = engine.getNode(m.nodeId);
                              const isSlot = m.nodeId.startsWith('slot:');
                              return (
                                <div key={m.nodeId} className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => {
                                      if (!isSlot) navigate(`/wiki/${m.nodeId}`);
                                    }}
                                    className={`text-[11px] px-2 py-1 rounded-md border transition-colors ${
                                      isSlot
                                        ? 'bg-[#1a1a1a] border-[#ffffff08] text-[#5c5c5c] italic cursor-default'
                                        : 'bg-[#1a1a1a] border-[#ffffff10] text-[#c8c8c8] hover:text-[#eff1f6] hover:border-[#ffffff20]'
                                    }`}
                                    title={`Role: ${m.role}${m.bound ? ', bound' : ''}${m.optional ? ', optional' : ''}`}
                                  >
                                    {memberNode?.labels.default ?? m.nodeId}
                                    {m.bound && <span className="text-[#5c5c5c] ml-0.5">•</span>}
                                    {m.optional && <span className="text-[#5c5c5c] ml-0.5">?</span>}
                                  </button>
                                  {idx < arr.length - 1 && (
                                    <span className="text-[#3e3e3e] text-[10px]">+</span>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                        {/* Role legend */}
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2.5">
                          {c.members.map((m) => (
                            <span key={m.nodeId} className="text-[9px] text-[#5c5c5c]">
                              {engine.getNode(m.nodeId)?.labels.default ?? m.nodeId}
                              <span className="text-[#3e3e3e]"> = </span>
                              <span className="text-[#8c8c8c]">{m.role}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </WikiSection>
              )}

              {/* Related Concepts */}
              {hasRelated && (
                <WikiSection id="related" title="Related Concepts" icon={<Link2 size={13} className="text-[#5c5c5c]" />}>
                  <div className="space-y-4">
                    {Array.from(groupedEdges.entries()).map(([type, edges]) => (
                      <div key={type}>
                        <p className="text-[10px] font-semibold text-[#8c8c8c] mb-2 uppercase tracking-wider">
                          {EDGE_TYPE_LABELS[type] ?? type}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {edges.map((edge) => {
                            const isOutgoing = edge.from === node.id;
                            const otherId = isOutgoing ? edge.to : edge.from;
                            const other = engine.getNode(otherId);
                            if (!other) return null;
                            const otherColor = TYPE_COLORS[other.type];
                            return (
                              <button
                                key={edge.id}
                                onClick={() => navigate(`/wiki/${otherId}`)}
                                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#0f0f0f] border border-[#ffffff06] hover:border-[#ffffff15] hover:bg-[#141414] transition-all text-left group"
                              >
                                <div
                                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                                  style={{
                                    backgroundColor: `${otherColor}12`,
                                    border: `1px solid ${otherColor}25`,
                                  }}
                                >
                                  <NodeIcon size={12} style={{ color: otherColor }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-[#c8c8c8] group-hover:text-[#eff1f6] transition-colors truncate">
                                    {isOutgoing ? '' : <span className="text-[#5c5c5c]">← </span>}
                                    {other.labels.default}
                                    {isOutgoing ? <span className="text-[#5c5c5c]"> →</span> : ''}
                                  </p>
                                  <p className="text-[9px] text-[#5c5c5c] mt-0.5">{other.type}</p>
                                </div>
                                <ChevronRight size={12} className="text-[#3e3e3e] flex-shrink-0" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </WikiSection>
              )}

              {/* Prerequisites */}
              {hasPrereqs && (
                <WikiSection
                  id="prerequisites"
                  title="Prerequisites"
                  icon={<GitFork size={13} className="text-[#5c5c5c]" />}
                >
                  <div className="flex flex-wrap gap-2">
                    {prerequisites.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => navigate(`/wiki/${p.id}`)}
                        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg bg-[#0f0f0f] border border-[#ffffff06] text-[#c8c8c8] hover:text-[#eff1f6] hover:border-[#ffffff15] transition-colors"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: TYPE_COLORS[p.type] }}
                        />
                        {p.labels.default}
                      </button>
                    ))}
                  </div>
                </WikiSection>
              )}

              {/* References / Citations */}
              {hasCitations && (
                <WikiSection id="citations" title="References" icon={<ScrollText size={13} className="text-[#5c5c5c]" />}>
                  <ol className="space-y-1.5 list-decimal list-inside">
                    {citations.map((cite, i) => (
                      <li key={i} className="text-xs text-[#8c8c8c]">
                        <span className="text-[#c8c8c8]">{cite.source}</span>
                        {cite.page && <span className="text-[#5c5c5c]">, p. {cite.page}</span>}
                        <span className="text-[#5c5c5c] ml-1">({cite.count} citation{cite.count > 1 ? 's' : ''})</span>
                      </li>
                    ))}
                  </ol>
                </WikiSection>
              )}

              {/* Concept Map */}
              <WikiSection id="graph" title="Concept Map" icon={<ExternalLink size={13} className="text-[#5c5c5c]" />}>
                <ConceptGraph rootId={node.id} maxDepth={1} onNodeClick={(id) => navigate(`/wiki/${id}`)} />
              </WikiSection>
            </div>

            {/* ── Right: Infobox (desktop) ── */}
            <aside className="hidden xl:block w-[240px] flex-shrink-0">
              <InfoBox node={node} engine={engine} onNavigate={(id) => navigate(`/wiki/${id}`)} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */
/*  Sub-components                                                        */
/* ─────────────────────────────────────────────────────────────────────── */

function WikiSection({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-8 scroll-mt-4">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#ffffff08]">
        {icon}
        <h2 className="text-sm font-bold text-[#eff1f6] uppercase tracking-wider">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/**
 * Renders markdown-like content with clickable concept links.
 * Looks for [[nodeId|Display Text]] or [[nodeId]] syntax.
 */
function WikiMarkdown({ payload, onLinkClick }: { payload: string; onLinkClick: (id: string) => void }) {
  // Simple regex to find [[id|label]] or [[id]]
  const parts: React.ReactNode[] = [];
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(payload)) !== null) {
    const before = payload.slice(lastIndex, match.index);
    if (before) {
      parts.push(
        <span
          key={lastIndex}
          dangerouslySetInnerHTML={{
            __html: before
              .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#eff1f6]">$1</strong>')
              .replace(/\*(.+?)\*/g, '<em>$1</em>'),
          }}
        />
      );
    }
    const nodeId = match[1].trim();
    const label = match[2]?.trim() ?? nodeId;
    parts.push(
      <button
        key={match.index}
        onClick={() => onLinkClick(nodeId)}
        className="text-[#3b82f6] hover:text-[#60a5fa] hover:underline transition-colors font-medium"
      >
        {label}
      </button>
    );
    lastIndex = regex.lastIndex;
  }

  const remaining = payload.slice(lastIndex);
  if (remaining) {
    parts.push(
      <span
        key={lastIndex}
        dangerouslySetInnerHTML={{
          __html: remaining
            .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#eff1f6]">$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>'),
        }}
      />
    );
  }

  return <>{parts}</>;
}

/**
 * Right-side infobox with structured node metadata.
 */
function InfoBox({
  node,
  engine,
  onNavigate,
}: {
  node: Node;
  engine: GraphEngine;
  onNavigate: (id: string) => void;
}) {
  const color = TYPE_COLORS[node.type];

  // Collect derived forms, inflections, variations
  const derivesFrom = engine
    .getEdgesTo(node.id)
    .filter((e) => e.type === 'DERIVES_FROM')
    .map((e) => engine.getNode(e.from))
    .filter(Boolean);

  const inflections = engine
    .getEdgesFrom(node.id)
    .filter((e) => e.type === 'INFLECTION_OF')
    .map((e) => engine.getNode(e.to))
    .filter(Boolean);

  const variations = engine
    .getEdgesFrom(node.id)
    .filter((e) => e.type === 'VARIES_BY')
    .map((e) => engine.getNode(e.to))
    .filter(Boolean);

  const contradicts = engine
    .getEdgesFrom(node.id)
    .filter((e) => e.type === 'CONTRADICTS')
    .map((e) => engine.getNode(e.to))
    .filter(Boolean);

  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] overflow-hidden">
      {/* Header */}
      <div className="px-3.5 py-3 border-b border-[#ffffff08]" style={{ borderLeft: `3px solid ${color}` }}>
        <p className="text-xs font-bold text-[#eff1f6]">{node.labels.default}</p>
        <p className="text-[10px] text-[#5c5c5c] mt-0.5">{node.type}</p>
      </div>

      {/* Fields */}
      <div className="px-3.5 py-3 space-y-2.5">
        {node.labels.somali && (
          <InfoField label="Somali" value={node.labels.somali} />
        )}
        {node.labels.english && (
          <InfoField label="English" value={node.labels.english} />
        )}
        {node.labels.transliteration && (
          <InfoField label="Transliteration" value={`/${node.labels.transliteration}/`} />
        )}

        {/* Attributes */}
        {Object.entries(node.attributes).length > 0 && (
          <div className="pt-1">
            <p className="text-[9px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1.5">Properties</p>
            <div className="space-y-1">
              {Object.entries(node.attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-2">
                  <span className="text-[10px] text-[#5c5c5c] capitalize">{key}</span>
                  <span className="text-[10px] text-[#8c8c8c] font-mono truncate max-w-[100px]">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Derived from */}
        {derivesFrom.length > 0 && (
          <InfoLinkField label="Derived from" nodes={derivesFrom as Node[]} onNavigate={onNavigate} />
        )}

        {/* Inflections */}
        {inflections.length > 0 && (
          <InfoLinkField label="Inflections" nodes={inflections as Node[]} onNavigate={onNavigate} />
        )}

        {/* Variations */}
        {variations.length > 0 && (
          <InfoLinkField label="Variations" nodes={variations as Node[]} onNavigate={onNavigate} />
        )}

        {/* Contradicts */}
        {contradicts.length > 0 && (
          <InfoLinkField label="Contrasts with" nodes={contradicts as Node[]} onNavigate={onNavigate} />
        )}
      </div>
    </div>
  );
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-bold text-[#5c5c5c] uppercase tracking-wider">{label}</p>
      <p className="text-xs text-[#c8c8c8] mt-0.5">{value}</p>
    </div>
  );
}

function InfoLinkField({
  label,
  nodes,
  onNavigate,
}: {
  label: string;
  nodes: Node[];
  onNavigate: (id: string) => void;
}) {
  return (
    <div className="pt-1">
      <p className="text-[9px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-1">{label}</p>
      <div className="flex flex-wrap gap-1">
        {nodes.map((n) => (
          <button
            key={n.id}
            onClick={() => onNavigate(n.id)}
            className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a1a] border border-[#ffffff08] text-[#8c8c8c] hover:text-[#eff1f6] hover:border-[#ffffff15] transition-colors"
          >
            {n.labels.default}
          </button>
        ))}
      </div>
    </div>
  );
}
