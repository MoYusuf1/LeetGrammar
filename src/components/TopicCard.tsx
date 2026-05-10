import { useNavigate } from 'react-router';
import { getTopicByLessonId } from '@/data/path';

interface TopicCardProps {
  lessonId: number;
  isCompleted: boolean;
  onPractice?: () => void;
}

export default function TopicCard({ lessonId, isCompleted, onPractice }: TopicCardProps) {
  const navigate = useNavigate();
  const topic = getTopicByLessonId(lessonId);

  if (!topic) return null;

  const handleClick = () => {
    if (onPractice) {
      onPractice();
    } else {
      navigate(`/lesson/${lessonId}`);
    }
  };

  const diffColor =
    topic.difficulty === 'easy'
      ? 'bg-success-light text-success'
      : topic.difficulty === 'medium'
      ? 'bg-warning-light text-warning'
      : 'bg-error-light text-error';

  const completionRing = isCompleted ? (
    <svg width="32" height="32" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill="none" stroke="#00BFA5" strokeWidth="3" />
      <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E5EA" strokeWidth="3" strokeDasharray="100.5" strokeDashoffset="0" />
      <path d="M12 18l4 4 8-8" stroke="#00BFA5" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="32" height="32" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="16" fill="none" stroke="#E5E5EA" strokeWidth="3" />
    </svg>
  );

  return (
    <button
      onClick={handleClick}
      className="bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all text-left w-full tap-scale border border-ios-border/50"
    >
      <div className="flex items-start justify-between mb-2">
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${diffColor}`}>
          {topic.difficulty}
        </span>
        {completionRing}
      </div>
      <h3 className="font-semibold text-text-primary text-sm leading-tight mb-0.5">
        {topic.title}
      </h3>
      <p className="text-xs text-text-tertiary">{topic.subtitle}</p>
    </button>
  );
}
