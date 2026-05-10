import { BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-bg-secondary">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3 sticky top-0 z-30 border-b border-ios-border flex items-center gap-3">
        <button
          onClick={() => navigate('/profile')}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary tap-scale"
        >
          <ArrowLeft size={22} className="text-text-primary" />
        </button>
        <h1 className="text-xl font-bold text-text-primary">About</h1>
      </div>

      <div className="max-w-[480px] mx-auto px-5 py-6 space-y-5">
        {/* App info */}
        <div className="bg-white rounded-2xl p-6 shadow-card text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent-light flex items-center justify-center mx-auto mb-4">
            <BookOpen size={32} className="text-accent" />
          </div>
          <h2 className="text-xl font-bold text-text-primary mb-1">LeetGrammar</h2>
          <p className="text-sm text-text-secondary">A guided course for learning Somali grammar</p>
        </div>

        {/* Sources */}
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <h3 className="font-semibold text-text-primary mb-3">Sources</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="text-accent font-bold">1</span>
              <div>
                <p className="text-text-primary font-medium">
                  Morgan Nilsson, &ldquo;Learner&apos;s Somali Grammar&rdquo; (2025)
                </p>
                <p className="text-text-secondary text-xs">University of Gothenburg</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">2</span>
              <div>
                <p className="text-text-primary font-medium">
                  J.W.C. Kirk, &ldquo;A Grammar of the Somali Language&rdquo; (1905)
                </p>
                <p className="text-text-secondary text-xs">Cambridge University Press</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">3</span>
              <div>
                <p className="text-text-primary font-medium">
                  Larajasse &amp; Sampoint, &ldquo;Practical Grammar of the Somali Language&rdquo; (1897)
                </p>
                <p className="text-text-secondary text-xs">Historical reference</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="text-accent font-bold">4</span>
              <div>
                <p className="text-text-primary font-medium">
                  John Saeed, &ldquo;Central Somali: A Grammatical Outline&rdquo; (1982)
                </p>
                <p className="text-text-secondary text-xs">Academic reference</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Built with care */}
        <div className="bg-white rounded-2xl p-5 shadow-card">
          <p className="text-sm text-text-secondary leading-relaxed text-center">
            Built with care for Somali learners. This course follows a pedagogical approach inspired by
            research on micro-learning, spaced repetition, and guided instruction.
          </p>
        </div>
      </div>
    </div>
  );
}
