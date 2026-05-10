import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { grammarTopics } from '@/data/grammar-topics';
import { useProgress } from '@/hooks/useProgress';
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
  const maxDepth = Math.max(...Array.from(depths.values()));

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

export default function Roadmap() {
  const { isTopicCompleted, getTopicProgress } = useProgress();

  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopic | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // ─── Pan / Drag State ───
  const containerRef = useRef<HTMLDivElement>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({ startX: 0, startY: 0, panX: 0, panY: 0 });

  const { positions, rows, maxDepth, rowWidths } = useMemo(() => computeLayout(grammarTopics), []);
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
  }, [canvasW, canvasH]);

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
    for (const topic of grammarTopics) {
      if (isTopicCompleted(topic.lessonIds)) {
        map.set(topic.id, 'completed');
      } else {
        map.set(topic.id, 'current');
      }
    }
    return map;
  }, [isTopicCompleted]);

  const totalCompleted = grammarTopics.filter((t) => topicStatus.get(t.id) === 'completed').length;

  // ─── Lines ───
  const lines = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; color: string; key: string }[] = [];
    for (const topic of grammarTopics) {
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
  }, [positions]);

  const handleTopicClick = (topic: RoadmapTopic) => {
    setSelectedTopic(topic);
    setDialogOpen(true);
  };

  return (
    <div className="h-[calc(100vh-50px)] bg-[#0f0f0f] relative overflow-hidden select-none">
      {/* Floating Header */}
      <div className="absolute top-4 left-4 z-20 px-4 py-3 rounded-xl bg-[#0f0f0f]/90 backdrop-blur-md border border-[#ffffff10] shadow-xl">
        <h1 className="text-sm font-semibold text-[#eff1f6]">Grammar Roadmap</h1>
        <p className="text-[11px] text-[#8c8c8c] mt-0.5">
          {totalCompleted}/{grammarTopics.length} completed · Drag to pan
        </p>
        <div className="h-1.5 w-32 bg-[#1a1a1a] rounded-full overflow-hidden mt-2">
          <div className="h-full rounded-full bg-[#ffa116] transition-all" style={{ width: `${(totalCompleted / grammarTopics.length) * 100}%` }} />
        </div>
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
            transform: `translate(${pan.x}px, ${pan.y}px)`,
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
          {grammarTopics.map((topic) => {
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
