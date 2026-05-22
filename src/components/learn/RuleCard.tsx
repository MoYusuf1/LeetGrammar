/**
 * RuleCard — Phase A of a level: the rule + examples.
 *
 * Shows the grammar rule with examples, then a CTA to start practice.
 */

import { ArrowRight, BookOpen } from 'lucide-react';
import type { LevelData } from '@/data/drill-content';

interface RuleCardProps {
  level: LevelData;
  onStart: () => void;
}

export default function RuleCard({ level, onStart }: RuleCardProps) {
  return (
    <div className="space-y-5">
      {/* Level header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: `${level.color}15`,
            border: `1px solid ${level.color}30`,
          }}
        >
          <BookOpen size={16} style={{ color: level.color }} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#eff1f6]">{level.title}</h2>
          <p className="text-xs text-[#8c8c8c]">{level.subtitle}</p>
        </div>
      </div>

      {/* THE RULE badge + content */}
      <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-4">
        {/* Badge */}
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${level.color}15`,
              color: level.color,
              border: `1px solid ${level.color}30`,
            }}
          >
            The Rule
          </span>
          <span className="text-[10px] text-[#5c5c5c]">
            Level {level.id}
          </span>
        </div>

        {/* Rule title */}
        <h3 className="text-sm font-bold text-[#eff1f6]">
          {level.rule.title}
        </h3>

        {/* Rule content — preserve line breaks */}
        <div className="text-sm text-[#c8c8c8] leading-relaxed whitespace-pre-line">
          {level.rule.content}
        </div>
      </div>

      {/* EXAMPLES section */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
          Examples
        </p>

        {level.rule.examples.map((example, i) => (
          <div
            key={i}
            className="rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-4 space-y-2"
          >
            {/* Somali sentence — mono font */}
            <p className="text-base font-medium text-[#eff1f6] font-mono leading-relaxed">
              {example.somali}
            </p>

            {/* Breakdown */}
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              {example.breakdown}
            </p>

            {/* English arrow */}
            <div className="flex items-center gap-2 pt-1">
              <ArrowRight size={12} style={{ color: level.color }} />
              <p className="text-sm font-medium" style={{ color: level.color }}>
                {example.english}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Start Practice CTA */}
      <button
        onClick={onStart}
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
        style={{
          backgroundColor: level.color,
          color: '#0f0f0f',
        }}
      >
        Start Practice
      </button>
    </div>
  );
}
