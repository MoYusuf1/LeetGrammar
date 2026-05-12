import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Check, Sparkles, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import TopicDialog from '@/components/TopicDialog';
import type { RoadmapTopic } from '@/types';

// ─── Layout Constants ───
const NODE_W = 220;
const NODE_H = 48;
const ROW_H = 90;
const PAD_X = 80;
const PAD_Y = 80;
const MIN_COL_W = 280;

function computeDepths(topics: RoadmapTopic[]): Map<string, number> {
  const depths = new Map<string, number>();
  function getDepth(id: string): number {
    if (depths.has(id)) return depths.get(id)!;
    const topic = topics.find((t) => t.id === id);
    if (!topic || topic.prerequisites.length === 0) {
      depths.set(id, 0);
      return 0;
    }
    const maxParentDepth = Math.max(...topic.prerequisites.map((p) => getDepth(p)));
    const d = maxParentDepth + 1;
    depths.set(id, d);
    return d;
  }
  topics.forEach((t) => getDepth(t.id));
  return depths;
}

function computeLayout(topics: RoadmapTopic[]) {
  const depths = computeDepths(topics);
  const maxDepth = Math.max(...Array.from(depths.values()), -1);

  const rows: RoadmapTopic[][] = [];
  for (let d = 0; d <= maxDepth; d++) {
    rows.push(topics.filter((t) => depths.get(t.id) === d));
  }

  const positions = new Map<string, { x: number; y: number }>();
  const rowWidths: number[] = [];

  rows.forEach((row, d) => {
    row.sort((a, b) => a.unitId - b.unitId);
    const rowWidth = Math.max(row.length * MIN_COL_W, 500);
    rowWidths.push(rowWidth);
    row.forEach((topic, i) => {
      const x = rowWidth / 2 - (row.length * MIN_COL_W) / 2 + i * MIN_COL_W + MIN_COL_W / 2 - NODE_W / 2;
      positions.set(topic.id, { x, y: d });
    });
  });

  return { positions, rows, maxDepth, rowWidths };
}

function useRoadmapTopics() {
  const [topics, setTopics] = useState<RoadmapTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!isSupabaseConfigured) {
        setError('Supabase not configured');
        setLoading(false);
        return;
      }

      try {
        const { data, error: rpcError } = await getSupabase()
          .rpc('get_roadmap_topics');

        if (cancelled) return;

        if (rpcError) {
          setError(rpcError.message);
          setLoading(false);
          return;
        }

        if (data && Array.isArray(data)) {
          const mapped: RoadmapTopic[] = data.map((u: any) => ({
            id: u.id,
            title: u.title,
            description: u.description ?? '',
            unitId: u.unit_order,
            color: u.color,
            lessonIds: u.problem_ids ?? [],
            prerequisites: u.prerequisite_ids ?? [],
          }));
          setTopics(mapped);
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? 'Failed to load roadmap');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { topics, loading, error };
}

export default function Roadmap() {
  const { isTopicCompleted, getTopicProgress } = useProgress();
  const { topics, loading, error } = useRoadmapTopics();

  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopic | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // ─── Pan / Zoom State ───
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, panX: 0, panY: 0 });

  const { positions, rows, maxDepth, rowWidths } = useMemo(
    () => (topics.length > 0 ? computeLayout(topics) : { positions: new Map(), rows: [], maxDepth: -1, rowWidths: [] }),
    [topics]
  );
  const maxRowWidth = Math.max(...rowWidths, 600);
  const canvasW = maxRowWidth + PAD_X * 2;
  const canvasH = PAD_Y + (maxDepth + 1) * ROW_H + 60;

  // Center the canvas initially
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const cx = container.clientWidth / 2 - canvasW / 2;
    const cy = container.clientHeight / 2 - canvasH / 2;
    setPan({ x: cx, y: cy });
    setScale(1);
  }, [canvasW, canvasH]);

  const zoomIn = () => setScale((s) => Math.min(s * 1.2, 3));
  const zoomOut = () => setScale((s) => Math.max(s / 1.2, 0.4));
  const resetView = () => {
    const container = containerRef.current;
    if (!container) return;
    const cx = container.clientWidth / 2 - canvasW / 2;
    const cy = container.clientHeight / 2 - canvasH / 2;
    setPan({ x: cx, y: cy });
    setScale(1);
  };

  // ─── Drag Handlers ───
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
  }, [pan]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.panX + dx, y: dragRef.current.panY + dy });
  }, [isDragging]);

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    const t = e.touches[0];
    setIsDragging(true);
    dragRef.current = { startX: t.clientX, startY: t.clientY, panX: pan.x, panY: pan.y };
  }, [pan]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const t = e.touches[0];
    const dx = t.clientX - dragRef.current.startX;
    const dy = t.clientY - dragRef.current.startY;
    setPan({ x: dragRef.current.panX + dx, y: dragRef.current.panY + dy });
  }, [isDragging]);

  const onTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ─── Topic Status ───
  const topicStatus = useMemo(() => {
    const map = new Map<string, 'completed' | 'current'>();
    for (const topic of topics) {
      if (isTopicCompleted(topic.lessonIds)) {
        map.set(topic.id, 'completed');
      } else {
        map.set(topic.id, 'current');
      }
    }
    return map;
  }, [topics, isTopicCompleted]);

  // ─── Lines ───
  const lines = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; color: string; key: string }[] = [];
    for (const topic of topics) {
      const childPos = positions.get(topic.id);
      if (!childPos) continue;
      for (const prereqId of topic.prerequisites) {
        const parentPos = positions.get(prereqId);
        if (!parentPos) continue;
        result.push({
          x1: PAD_X + parentPos.x + NODE_W / 2,
          y1: PAD_Y + parentPos.y * ROW_H + NODE_H,
          x2: PAD_X + childPos.x + NODE_W / 2,
          y2: PAD_Y + childPos.y * ROW_H,
          color: topic.color,
          key: `${prereqId}-${topic.id}`,
        });
      }
    }
    return result;
  }, [topics, positions]);

  const handleTopicClick = (topic: RoadmapTopic) => {
    setSelectedTopic(topic);
    setDialogOpen(true);
  };

  // ─── Empty / Loading State ───
  if (loading) {
    return (
      <div className="h-[calc(100vh-50px)] bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[#8c8c8c]">Loading curriculum...</p>
        </div>
      </div>
    );
  }

  if (error || topics.length === 0) {
    return (
      <div className="h-[calc(100vh-50px)] bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-center space-y-3 max-w-sm px-4">
          <p className="text-sm text-[#8c8c8c]">
            {error ? `Error: ${error}` : 'No curriculum data available.'}
          </p>
          <p className="text-xs text-[#5c5c5c]">
            Connect to Supabase and run the latest migrations to load curriculum units.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-50px)] bg-[#0f0f0f] relative overflow-hidden select-none">
      {/* Floating Header */}
      <div className="absolute top-4 left-4 z-20 px-4 py-2.5 rounded-xl bg-[#0f0f0f]/90 backdrop-blur-md border border-[#ffffff10] shadow-xl">
        <h1 className="text-sm font-semibold text-[#eff1f6]">Grammar Roadmap</h1>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={zoomIn}
          className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] flex items-center justify-center text-[#8c8c8c] hover:text-[#eff1f6] hover:border-[#ffffff20] transition-colors"
          title="Zoom in"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={zoomOut}
          className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] flex items-center justify-center text-[#8c8c8c] hover:text-[#eff1f6] hover:border-[#ffffff20] transition-colors"
          title="Zoom out"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={resetView}
          className="w-9 h-9 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] flex items-center justify-center text-[#8c8c8c] hover:text-[#eff1f6] hover:border-[#ffffff20] transition-colors"
          title="Reset view"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Canvas Container */}
      <div
        ref={containerRef}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Panned Content */}
        <div
          className="absolute"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            width: canvasW,
            height: canvasH,
            willChange: 'transform',
          }}
        >
          {/* Dot grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'radial-gradient(circle, #282828 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Level Labels */}
          {rows.map((_, d) => (
            <div
              key={`level-${d}`}
              className="absolute text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider"
              style={{
                left: 24,
                top: PAD_Y + d * ROW_H + NODE_H / 2 - 6,
              }}
            >
              L{d + 1}
            </div>
          ))}

          {/* SVG Lines */}
          <svg className="absolute inset-0 pointer-events-none" width={canvasW} height={canvasH} style={{ zIndex: 1 }}>
            {lines.map((line) => (
              <path
                key={line.key}
                d={`M ${line.x1} ${line.y1} C ${line.x1} ${line.y1 + 24}, ${line.x2} ${line.y2 - 24}, ${line.x2} ${line.y2}`}
                fill="none"
                stroke={line.color}
                strokeWidth="2"
                opacity={0.35}
              />
            ))}
          </svg>

          {/* Topic Nodes */}
          {topics.map((topic) => {
            const status = topicStatus.get(topic.id) ?? 'current';
            const isCurrent = status === 'current';
            const isCompleted = status === 'completed';

            const pos = positions.get(topic.id);
            if (!pos) return null;

            const { completed, total } = getTopicProgress(topic.lessonIds);
            const left = PAD_X + pos.x;
            const top = PAD_Y + pos.y * ROW_H;

            return (
              <div
                key={topic.id}
                className="absolute"
                style={{ left, top, width: NODE_W, height: NODE_H, zIndex: 2 }}
              >
                <button
                  onClick={() => handleTopicClick(topic)}
                  className={`w-full h-full rounded-xl flex items-center gap-2.5 px-3.5 text-left transition-all duration-200 cursor-pointer
                    ${isCurrent ? 'shadow-[0_0_24px_rgba(255,161,22,0.2)] hover:shadow-[0_0_28px_rgba(255,161,22,0.3)]' : 'hover:shadow-lg'}
                    hover:scale-[1.03] hover:-translate-y-0.5
                  `}
                  style={{
                    backgroundColor: isCompleted ? `${topic.color}15` : '#161616',
                    border: `1.5px solid ${
                      isCompleted ? `${topic.color}80` : isCurrent ? '#ffa116' : `${topic.color}50`
                    }`,
                  }}
                >
                  {/* Status icon */}
                  <div className="flex-shrink-0">
                    {isCompleted && (
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${topic.color}30` }}
                      >
                        <Check size={12} style={{ color: topic.color }} strokeWidth={3} />
                      </div>
                    )}
                    {isCurrent && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#ffa11620]">
                        <Sparkles size={12} className="text-[#ffa116]" />
                      </div>
                    )}
                  </div>

                  {/* Title + count */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-semibold truncate ${isCompleted ? 'text-white' : 'text-[#eff1f6]'}`}>
                      {topic.title}
                    </p>
                    <p className="text-[10px] text-[#8c8c8c]">
                      {total} lessons{completed > 0 ? ` · ${completed} done` : ''}
                    </p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic Dialog */}
      <TopicDialog topic={selectedTopic} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
