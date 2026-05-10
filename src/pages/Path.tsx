import { useNavigate } from 'react-router';
import { Flame, TrendingUp, Lock, Check, Sparkles } from 'lucide-react';
import { pathUnits, getOrderedTopics, getTopicPosition } from '@/data/path';
import { useProgress } from '@/hooks/useProgress';
import { useEffect, useRef } from 'react';

export default function Path() {
  const navigate = useNavigate();
  const { getLessonStatus, progress } = useProgress();
  const currentRef = useRef<HTMLDivElement>(null);

  const topics = getOrderedTopics();

  // Auto-scroll to current step on load
  useEffect(() => {
    const timer = setTimeout(() => {
      currentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-full bg-bg-secondary pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-4 pb-4 sticky top-0 z-30 border-b border-ios-border">
        <h1 className="text-2xl font-bold text-text-primary mb-3">Soomaali Grammar</h1>
        {/* Stats bar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-bg-secondary rounded-xl px-3 py-2">
            <Flame size={18} className="text-warning" />
            <span className="font-bold text-text-primary">{progress.streak || 0}</span>
            <span className="text-xs text-text-secondary">day streak</span>
          </div>
          <div className="flex items-center gap-2 bg-bg-secondary rounded-xl px-3 py-2">
            <TrendingUp size={18} className="text-accent" />
            <span className="font-bold text-text-primary">{progress.completedLessons.length}/{topics.length}</span>
            <span className="text-xs text-text-secondary">lessons</span>
          </div>
        </div>
      </div>

      {/* Path */}
      <div className="max-w-[480px] mx-auto px-6 py-6">
        {pathUnits.map((unit) => (
          <div key={unit.id} className="mb-8">
            {/* Unit header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-accent-light flex items-center justify-center">
                <Sparkles size={22} className="text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-text-primary">{unit.name}</h2>
                <p className="text-xs text-text-secondary">{unit.description}</p>
              </div>
            </div>

            {/* Topic steps */}
            <div className="relative">
              {/* SVG connecting lines */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 0 }}
              >
                {unit.topics.map((topic, i) => {
                  if (i === unit.topics.length - 1) return null;
                  const isLeft = getTopicPosition(i) === 'left';
                  const nextIsLeft = getTopicPosition(i + 1) === 'left';
                  // Draw zigzag line between steps
                  const x1 = isLeft ? '35%' : '65%';
                  const x2 = nextIsLeft ? '35%' : '65%';
                  const y1 = `${(i / unit.topics.length) * 100 + 8}%`;
                  const y2 = `${((i + 1) / unit.topics.length) * 100 + 8}%`;
                  return (
                    <line
                      key={`${topic.id}-line`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#E5E5EA"
                      strokeWidth="2"
                      strokeDasharray="6 4"
                    />
                  );
                })}
              </svg>

              {/* Topic circles */}
              <div className="relative z-10 space-y-6">
                {unit.topics.map((topic, topicIndex) => {
                  const globalIndex = topics.findIndex((t) => t.id === topic.id);
                  const status = getLessonStatus(topic.lessonId);
                  const isLeft = getTopicPosition(topicIndex) === 'left';
                  const isCurrent = status === 'current';

                  return (
                    <div
                      key={topic.id}
                      ref={isCurrent ? currentRef : undefined}
                      className={`flex items-center ${
                        isLeft ? 'justify-start' : 'justify-end'
                      }`}
                      style={{
                        animationDelay: `${globalIndex * 50}ms`,
                      }}
                    >
                      <button
                        onClick={() => {
                          if (status !== 'locked') {
                            navigate(`/lesson/${topic.lessonId}`);
                          }
                        }}
                        disabled={status === 'locked'}
                        className={`relative flex flex-col items-center gap-1 tap-scale ${
                          status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        {/* Circle */}
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                            status === 'completed'
                              ? 'bg-path-gold shadow-[0_0_12px_rgba(255,215,0,0.4)]'
                              : isCurrent
                              ? 'bg-white border-[3px] border-accent current-ring'
                              : 'bg-path-locked'
                          }`}
                        >
                          {status === 'completed' && (
                            <Check size={28} className="text-white" strokeWidth={3} />
                          )}
                          {isCurrent && (
                            <Sparkles size={24} className="text-accent" />
                          )}
                          {status === 'locked' && (
                            <Lock size={20} className="text-text-tertiary" />
                          )}
                        </div>

                        {/* Label */}
                        <div className="text-center max-w-[100px]">
                          <p
                            className={`text-[11px] font-semibold leading-tight ${
                              status === 'locked' ? 'text-text-tertiary' : 'text-text-primary'
                            }`}
                          >
                            {topic.title}
                          </p>
                          {isCurrent && (
                            <span className="text-[9px] text-accent font-medium">START</span>
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
