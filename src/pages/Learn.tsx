import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Check, Star, BookOpen, Dumbbell, X } from 'lucide-react';
import { grammarTopics } from '@/data/grammarTopics';
import { allProblems } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';
import { getProblemContent } from '@/data/problemLessons';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PathLesson {
  id: number;
  title: string;
  topicId: string;
  topicTitle: string;
  topicColor: string;
  unitId: number;
  description: string;
}

/* ------------------------------------------------------------------ */
/*  Build flat lesson list                                             */
/* ------------------------------------------------------------------ */

const pathLessons: PathLesson[] = [];
grammarTopics.forEach((topic) => {
  topic.lessonIds.forEach((lessonId) => {
    const problem = allProblems.find((p) => p.id === lessonId);
    pathLessons.push({
      id: lessonId,
      title: problem?.title ?? `Lesson ${lessonId}`,
      topicId: topic.id,
      topicTitle: topic.title,
      topicColor: topic.color,
      unitId: topic.unitId,
      description: topic.description,
    });
  });
});

/* ------------------------------------------------------------------ */
/*  Layout constants — tuned to feel like Duolingo                     */
/* ------------------------------------------------------------------ */

const NODE_SIZE = 58;           // px
const NODE_CURRENT_SIZE = 68;   // px
const GAP_Y = 86;               // px between node centers
const PAD_Y = 56;               // top padding
const PATH_STROKE = 22;         // ribbon thickness

/** Left / right positions as percentages of container width */
function getNodeX(index: number): number {
  // Dramatic left-right snake: 18% ↔ 82%
  return index % 2 === 0 ? 18 : 82;
}

function getNodeY(index: number): number {
  return PAD_Y + index * GAP_Y;
}

/* ------------------------------------------------------------------ */
/*  Unit boundary helpers                                              */
/* ------------------------------------------------------------------ */

function getUnitBoundaries() {
  const boundaries: { startIdx: number; endIdx: number; topic: typeof grammarTopics[0] }[] = [];
  let idx = 0;
  grammarTopics.forEach((topic) => {
    const startIdx = idx;
    const endIdx = idx + topic.lessonIds.length;
    boundaries.push({ startIdx, endIdx, topic });
    idx = endIdx;
  });
  return boundaries;
}

const unitBoundaries = getUnitBoundaries();

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Learn() {
  const { getLessonStatus } = useProgress();
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLButtonElement>(null);

  const [selectedLesson, setSelectedLesson] = useState<PathLesson | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  /* ---- find current lesson for auto-scroll ----------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentRef.current && scrollRef.current) {
        const container = scrollRef.current;
        const el = currentRef.current;
        const cRect = container.getBoundingClientRect();
        const eRect = el.getBoundingClientRect();
        container.scrollTo({
          top: eRect.top - cRect.top + container.scrollTop - cRect.height / 2 + NODE_CURRENT_SIZE / 2,
          behavior: 'smooth',
        });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  /* ---- SVG ribbon path ------------------------------------------- */
  const { ribbonPath, ribbonShadowPath } = useMemo(() => {
    if (pathLessons.length < 2) return { ribbonPath: '', ribbonShadowPath: '' };

    let ribbon = '';
    let shadow = '';

    for (let i = 0; i < pathLessons.length - 1; i++) {
      const x1 = getNodeX(i);
      const y1 = getNodeY(i) + NODE_SIZE / 2 + 6;   // start from bottom of node
      const x2 = getNodeX(i + 1);
      const y2 = getNodeY(i + 1) - NODE_SIZE / 2 - 6; // end at top of next node

      // Use a bezier that curves outward based on direction
      const midY = (y1 + y2) / 2;
      const ctrlY1 = y1 + (midY - y1) * 0.5;
      const ctrlY2 = y2 - (y2 - midY) * 0.5;

      // The SVG path strings use percentages — we draw in a 100×viewBox
      // but we actually need pixel coordinates. We'll compute those at render
      // time inside the SVG. For now just store normalized values.
      ribbon += `M ${x1} ${y1} C ${x1} ${ctrlY1}, ${x2} ${ctrlY2}, ${x2} ${y2} `;
      shadow += `M ${x1} ${y1 + 2} C ${x1} ${ctrlY1 + 2}, ${x2} ${ctrlY2 + 2}, ${x2} ${y2 + 2} `;
    }
    return { ribbonPath: ribbon, ribbonShadowPath: shadow };
  }, []);

  const canvasH = PAD_Y + pathLessons.length * GAP_Y + NODE_CURRENT_SIZE + 80;

  const handleLessonTap = (lesson: PathLesson) => {
    setSelectedLesson(lesson);
    setSheetOpen(true);
  };

  /* ---- render ---------------------------------------------------- */
  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* ── Top Header ── */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f]">
        <div className="max-w-[520px] mx-auto">
          <h1 className="text-xl font-bold text-[#eff1f6]">Learn</h1>
          <p className="text-xs text-[#8c8c8c] mt-0.5">Follow the path to master Somali grammar</p>
        </div>
      </div>

      {/* ── Scrollable Path ── */}
      <div
        ref={scrollRef}
        className="overflow-y-auto scrollbar-hide relative"
        style={{ height: 'calc(100vh - 110px)' }}
      >
        <div className="relative max-w-[520px] mx-auto" style={{ height: canvasH }}>
          {/* SVG Ribbon Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            preserveAspectRatio="none"
            style={{ zIndex: 1, overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1e1e" />
                <stop offset="50%" stopColor="#181818" />
                <stop offset="100%" stopColor="#1e1e1e" />
              </linearGradient>
              <linearGradient id="ribbonHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="50%" stopColor="#222222" />
                <stop offset="100%" stopColor="#2a2a2a" />
              </linearGradient>
            </defs>

            {/* We need to draw the path using the actual pixel coordinates.
                Since the SVG is responsive, we use percentage-based coordinates
                and map them with a transform or viewBox. Instead, let's compute
                the path using the actual rendered width. */}
            <ResponsiveRibbon
              ribbonPath={ribbonPath}
              shadowPath={ribbonShadowPath}
              strokeWidth={PATH_STROKE}
              canvasH={canvasH}
            />
          </svg>

          {/* ── Nodes & Unit Banners ── */}
          {unitBoundaries.map((boundary) => {
            const { startIdx, endIdx, topic } = boundary;

            return (
              <div key={topic.id}>
                {/* Unit Banner */}
                <UnitBanner topic={topic} top={getNodeY(startIdx) - 42} />

                {/* Lesson Nodes */}
                {pathLessons.slice(startIdx, endIdx).map((lesson, localIdx) => {
                  const globalIdx = startIdx + localIdx;
                  const status = getLessonStatus(lesson.id);
                  const isCompleted = status === 'completed';
                  const isCurrent = status === 'current';
                  const isLocked = status === 'locked';

                  const xPct = getNodeX(globalIdx);
                  const y = getNodeY(globalIdx);
                  const size = isCurrent ? NODE_CURRENT_SIZE : NODE_SIZE;

                  return (
                    <button
                      key={lesson.id}
                      ref={isCurrent ? currentRef : undefined}
                      onClick={() => !isLocked && handleLessonTap(lesson)}
                      className={`absolute z-20 transition-transform duration-200 ${
                        isLocked ? 'cursor-default' : 'hover:scale-110 active:scale-95'
                      }`}
                      style={{
                        left: `${xPct}%`,
                        top: y,
                        width: size,
                        height: size,
                        transform: 'translate(-50%, -50%)',
                        marginLeft: 0,
                      }}
                      disabled={isLocked}
                    >
                      <NodeVisual
                        isCompleted={isCompleted}
                        isCurrent={isCurrent}
                        isLocked={isLocked}
                        color={lesson.topicColor}
                        lessonId={lesson.id}
                      />

                      {/* Label below node */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
                        style={{ top: size / 2 + 6 }}
                      >
                        <span
                          className={`text-[10px] font-semibold tracking-wide ${
                            isCompleted
                              ? 'text-[#8c8c8c]'
                              : isCurrent
                              ? 'text-[#eff1f6]'
                              : 'text-[#444444]'
                          }`}
                        >
                          {isCompleted ? (
                            <span className="flex items-center gap-0.5">
                              <Star size={9} className="text-[#ffa116] fill-[#ffa116]" />
                              1
                            </span>
                          ) : (
                            `Lesson ${lesson.id}`
                          )}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Bottom spacer */}
        <div className="h-20" />
      </div>

      {/* ── Bottom Sheet ── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          className="bg-[#141414] border-t border-[#ffffff08] rounded-t-3xl px-5 pt-5 pb-8"
        >
          {selectedLesson && <LessonSheet lesson={selectedLesson} onClose={() => setSheetOpen(false)} />}
        </SheetContent>
      </Sheet>

      {/* ── Animations ── */}
      <style>{`
        @keyframes float-bounce {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }
        .animate-float-bounce {
          animation: float-bounce 2.2s ease-in-out infinite;
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0px rgba(255,161,22,0.0); }
          50% { box-shadow: 0 0 0 12px rgba(255,161,22,0.08); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 2.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** The colored circle for each lesson node */
function NodeVisual({
  isCompleted: _isCompleted,
  isCurrent,
  isLocked,
  color,
  lessonId,
}: {
  isCompleted: boolean;
  isCurrent: boolean;
  isLocked: boolean;
  color: string;
  lessonId: number;
}) {
  if (isLocked) {
    return (
      <div className="w-full h-full rounded-full flex items-center justify-center border-2 border-[#252525] bg-[#111111]">
        <span className="text-xs font-bold text-[#333333]">{lessonId}</span>
      </div>
    );
  }

  if (isCurrent) {
    return (
      <div
        className="w-full h-full rounded-full flex items-center justify-center animate-float-bounce animate-glow-pulse"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${adjustBrightness(color, -20)} 100%)`,
          boxShadow: `0 6px 24px ${color}50, 0 0 0 4px ${color}20`,
          border: `3px solid ${color}`,
        }}
      >
        <span className="text-lg font-extrabold text-white drop-shadow-sm">
          {lessonId}
        </span>
        {/* Start arrow indicator */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <div
            className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white uppercase tracking-wider"
            style={{ backgroundColor: color }}
          >
            Start
          </div>
        </div>
      </div>
    );
  }

  // Completed
  return (
    <div
      className="w-full h-full rounded-full flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${adjustBrightness(color, -25)} 100%)`,
        boxShadow: `0 4px 14px ${color}35`,
      }}
    >
      <Check size={22} className="text-white" strokeWidth={3} />
    </div>
  );
}

/** Full-width unit banner */
function UnitBanner({ topic, top }: { topic: typeof grammarTopics[0]; top: number }) {
  return (
    <div
      className="absolute left-0 right-0 z-10 px-4"
      style={{ top }}
    >
      <div
        className="max-w-[520px] mx-auto rounded-xl overflow-hidden flex items-center"
        style={{
          background: `linear-gradient(90deg, ${topic.color}18 0%, #161616 60%)`,
          borderLeft: `4px solid ${topic.color}`,
        }}
      >
        <div className="flex-1 px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#eff1f6]">{topic.title}</span>
          </div>
        </div>
        <div className="pr-3.5">
          <span className="text-[10px] font-semibold text-[#8c8c8c]">
            {topic.lessonIds.length} lessons
          </span>
        </div>
      </div>
    </div>
  );
}

/** SVG Ribbon that fills the full container width */
function ResponsiveRibbon({
  ribbonPath,
  shadowPath,
  strokeWidth,
  canvasH,
}: {
  ribbonPath: string;
  shadowPath: string;
  strokeWidth: number;
  canvasH: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [w, setW] = useState(520);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setW(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Convert percentage-based path strings to pixel-based
  const toPx = (d: string) => {
    return d.replace(/M ([\d.]+) ([\d.]+)/g, (_, x, y) => `M ${(parseFloat(x) / 100) * w} ${y}`)
            .replace(/C ([\d.]+) ([\d.]+), ([\d.]+) ([\d.]+), ([\d.]+) ([\d.]+)/g,
              (_, x1, y1, x2, y2, x3, y3) =>
                `C ${(parseFloat(x1) / 100) * w} ${y1}, ${(parseFloat(x2) / 100) * w} ${y2}, ${(parseFloat(x3) / 100) * w} ${y3}`);
  };

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full pointer-events-none"
      style={{ height: canvasH, overflow: 'visible' }}
    >
      {/* Shadow ribbon */}
      <path
        d={toPx(shadowPath)}
        fill="none"
        stroke="#0a0a0a"
        strokeWidth={strokeWidth + 4}
        strokeLinecap="round"
        opacity={0.6}
      />
      {/* Main ribbon */}
      <path
        d={toPx(ribbonPath)}
        fill="none"
        stroke="url(#ribbonGrad)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Highlight center line */}
      <path
        d={toPx(ribbonPath)}
        fill="none"
        stroke="url(#ribbonHighlight)"
        strokeWidth={strokeWidth - 8}
        strokeLinecap="round"
        opacity={0.4}
      />
    </svg>
  );
}

/** Bottom sheet content for a lesson */
function LessonSheet({ lesson, onClose }: { lesson: PathLesson; onClose: () => void }) {
  const navigate = useNavigate();
  const content = getProblemContent(lesson.id);
  const firstExercise = content?.exercises?.[0];

  return (
    <div>
      {/* Grabber */}
      <div className="w-10 h-1 rounded-full bg-[#333333] mx-auto mb-4" />

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${lesson.topicColor}30 0%, ${lesson.topicColor}10 100%)`,
            border: `2px solid ${lesson.topicColor}50`,
          }}
        >
          <span className="text-base font-extrabold" style={{ color: lesson.topicColor }}>
            {lesson.id}
          </span>
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <h3 className="text-base font-bold text-[#eff1f6]">{lesson.title}</h3>
          <p className="text-xs text-[#8c8c8c] mt-0.5">{lesson.topicTitle}</p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#222222] flex items-center justify-center text-[#8c8c8c] hover:text-[#eff1f6] transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      {/* Preview */}
      <div className="space-y-3">
        {content?.testCases && content.testCases.length > 0 && (
          <div className="rounded-xl bg-[#0f0f0f] border border-[#ffffff08] p-3.5">
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2.5">Preview</p>
            <div className="space-y-2">
              {content.testCases.slice(0, 2).map((tc, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <span className="text-[#8c8c8c] truncate">{tc.input}</span>
                  <span className="text-[#ffa116] flex-shrink-0">→</span>
                  <span className="text-[#eff1f6] font-mono flex-shrink-0">{tc.output}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {firstExercise && (
          <p className="text-xs text-[#8c8c8c] leading-relaxed">
            {firstExercise.question}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => {
            onClose();
            navigate(`/lesson/${lesson.id}`);
          }}
          className="flex-1 h-12 rounded-xl bg-[#1a1a1a] border border-[#ffffff10] text-[#eff1f6] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#222222] transition-colors"
        >
          <BookOpen size={15} />
          Read Lesson
        </button>
        <button
          onClick={() => {
            onClose();
            navigate(`/problem/${lesson.id}`);
          }}
          className="flex-1 h-12 rounded-xl font-bold text-sm text-[#0f0f0f] flex items-center justify-center gap-2 transition-transform active:scale-95"
          style={{
            backgroundColor: lesson.topicColor,
            boxShadow: `0 4px 16px ${lesson.topicColor}40`,
          }}
        >
          <Dumbbell size={15} />
          Practice
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Utility                                                            */
/* ------------------------------------------------------------------ */

function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000ff) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
