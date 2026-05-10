import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Check, Sparkles } from 'lucide-react';
import { grammarTopics } from '@/data/grammarTopics';
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

// Compute depth (longest path from root) for each topic
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

// Group topics by depth and assign x positions
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
    // Sort by unitId for consistent ordering
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
  const navigate = useNavigate();
  const { isTopicCompleted, getTopicProgress, arePrerequisitesMet } = useProgress();
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopic | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { positions, rows, maxDepth, rowWidths } = useMemo(() => computeLayout(grammarTopics), []);
  const maxRowWidth = Math.max(...rowWidths, 600);
  const canvasW = maxRowWidth + PAD_X * 2;
  const canvasH = PAD_Y + (maxDepth + 1) * ROW_H + 60;

  // Derive topic status (all unlocked)
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

  // Find the "current" topic for auto-scroll
  const currentTopic = useMemo(() => {
    for (const topic of grammarTopics) {
      if (topicStatus.get(topic.id) === 'current') return topic;
    }
    return grammarTopics[0];
  }, [topicStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentRef.current && scrollRef.current) {
        const container = scrollRef.current;
        const el = currentRef.current;
        const cRect = container.getBoundingClientRect();
        const eRect = el.getBoundingClientRect();
        container.scrollTo({
          left: eRect.left - cRect.left + container.scrollLeft - cRect.width / 2 + NODE_W / 2,
          top: eRect.top - cRect.top + container.scrollTop - cRect.height / 2 + NODE_H / 2,
          behavior: 'smooth',
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Lines: from bottom of parent to top of child
  const lines = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; color: string; key: string }[] = [];
    for (const topic of grammarTopics) {
      const childPos = positions.get(topic.id);
      if (!childPos) continue;
      for (const prereqId of topic.prerequisites) {
        const parentPos = positions.get(prereqId);
        if (!parentPos) continue;
        const parentTopic = grammarTopics.find((t) => t.id === prereqId);
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

  const totalCompleted = grammarTopics.filter((t) => topicStatus.get(t.id) === 'completed').length;

  const handleTopicClick = (topic: RoadmapTopic) => {
    setSelectedTopic(topic);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-8 py-5 border-b border-[#ffffff10]">
        <div className="flex items-center justify-between max-w-[1400px]">
          <div>
            <h1 className="text-xl font-semibold text-[#eff1f6]">Soomaali Grammar Roadmap</h1>
            <p className="text-sm text-[#8c8c8c] mt-1">
              This graph shows the recommended order to learn different grammar topics. Click a topic to see its lessons.
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#eff1f6]">
              {totalCompleted}<span className="text-[#5c5c5c]">/{grammarTopics.length}</span>
            </div>
            <div className="text-xs text-[#8c8c8c]">topics completed</div>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div ref={scrollRef} className="overflow-auto scrollbar-hide relative" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <div className="relative mx-auto" style={{ width: canvasW, height: canvasH }}>

          {/* Level Labels */}
          {rows.map((_, d) => (
            <div
              key={`level-${d}`}
              className="absolute text-[10px] font-bold text-[#3e3e3e] uppercase tracking-wider"
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
            const status = topicStatus.get(topic.id) ?? 'locked';
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
                ref={topic.id === currentTopic?.id ? currentRef : undefined}
                className="absolute"
                style={{ left, top, width: NODE_W, height: NODE_H, zIndex: 2 }}
              >
                <button
                  onClick={() => handleTopicClick(topic)}

                  className={`w-full h-full rounded-xl flex items-center gap-2.5 px-3.5 text-left transition-all duration-150 cursor-pointer hover:scale-[1.03] hover:shadow-lg
                    ${isCurrent ? 'shadow-[0_0_20px_rgba(255,161,22,0.25)]' : ''}
                  `}
                  style={{
                    backgroundColor: isCompleted ? `${topic.color}18` : '#1a1a1a',
                    border: `2px solid ${
                      isCompleted ? topic.color : isCurrent ? '#ffa116' : topic.color
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
                    {!isCompleted && !isCurrent && <Sparkles size={12} className="text-[#5c5c5c]" />}
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
