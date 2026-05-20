import { useEffect, useState } from 'react';
import { CheckCircle, Star, Flame } from 'lucide-react';
import { useNavigate } from 'react-router';

interface CelebrationOverlayProps {
  xp?: number;
  streak?: number;
  onContinue?: () => void;
}

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
}

const COLORS = ['#00BFA5', '#FFD700', '#FF4B4B', '#4CAF50', '#FF9600', '#2196F3', '#E040FB'];

function generateConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 1.5,
    size: 6 + Math.random() * 8,
  }));
}

export default function CelebrationOverlay({
  xp = 10,
  streak = 1,
  onContinue,
}: CelebrationOverlayProps) {
  const navigate = useNavigate();
  const [confetti] = useState(() => generateConfetti(40));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else {
      navigate('/problems');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: `${c.left}%`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
            animation: `confetti-fall 2.5s ease-in forwards`,
            top: '-20px',
          }}
        />
      ))}

      {/* Card */}
      <div
        className={`mx-6 bg-white rounded-2xl shadow-xl p-8 max-w-[340px] w-full text-center transform transition-all duration-500 ${
          visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={36} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Lesson Complete!</h2>
        <p className="text-text-secondary text-sm mb-6">You mastered a new concept</p>

        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <Star size={18} className="text-warning fill-warning" />
              <span className="text-lg font-bold text-text-primary">+{xp}</span>
            </div>
            <span className="text-xs text-text-tertiary">XP</span>
          </div>
          {streak > 0 && (
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1">
                <Flame size={18} className="text-warning" />
                <span className="text-lg font-bold text-text-primary">{streak}</span>
              </div>
              <span className="text-xs text-text-tertiary">Streak</span>
            </div>
          )}
        </div>

        <button
          onClick={handleContinue}
          className="w-full h-14 bg-accent text-white font-semibold rounded-2xl cta-button text-base"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
