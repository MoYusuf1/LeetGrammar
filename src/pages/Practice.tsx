import { useNavigate } from 'react-router';
import { getOrderedTopics } from '@/data/path';
import { useProgress } from '@/hooks/useProgress';

export default function Practice() {
  const navigate = useNavigate();
  const { isLessonCompleted, completionPercentage } = useProgress();
  const topics = getOrderedTopics();

  const completedCount = topics.filter((t) => isLessonCompleted(t.lessonId)).length;

  const diffColor = (d: string) =>
    d === 'easy'
      ? 'bg-success-light text-success'
      : d === 'medium'
      ? 'bg-warning-light text-warning'
      : 'bg-error-light text-error';

  return (
    <div className="min-h-full bg-bg-secondary pb-24">
      {/* Header */}
      <div className="bg-white px-5 pt-5 pb-4 sticky top-0 z-30 border-b border-ios-border">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Practice</h1>
        <p className="text-sm text-text-secondary">
          {completedCount} completed &middot; {completionPercentage}% done
        </p>
      </div>

      {/* Topic grid */}
      <div className="max-w-[480px] mx-auto px-4 py-5">
        <div className="grid grid-cols-2 gap-3">
          {topics.map((topic) => {
            const completed = isLessonCompleted(topic.lessonId);
            return (
              <button
                key={topic.id}
                onClick={() => navigate(`/lesson/${topic.lessonId}`)}
                className="bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all text-left tap-scale border border-ios-border/50 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${diffColor(
                      topic.difficulty
                    )}`}
                  >
                    {topic.difficulty}
                  </span>
                  {completed ? (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-ios-border" />
                  )}
                </div>
                <h3 className="font-semibold text-text-primary text-sm leading-tight mb-0.5">
                  {topic.title}
                </h3>
                <p className="text-xs text-text-tertiary">{topic.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
