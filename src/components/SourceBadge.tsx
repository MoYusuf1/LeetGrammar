/**
 * Displays a source attribution badge with confidence and color coding.
 */

import type { Qualifiers } from '@/engine/types';

interface SourceBadgeProps {
  qualifiers: Qualifiers;
  size?: 'sm' | 'md';
}

export default function SourceBadge({ qualifiers, size = 'sm' }: SourceBadgeProps) {
  const { source, confidence, dialects } = qualifiers;

  const confidenceColor =
    confidence >= 0.95
      ? '#22c55e'
      : confidence >= 0.8
        ? '#eab308'
        : '#ef4444';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border border-[#ffffff08] bg-[#1a1a1a] ${
        size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-1 text-[10px]'
      }`}
    >
      <span className="text-[#8c8c8c] font-medium truncate max-w-[120px]">
        {source.textbookId}
      </span>
      {source.page && (
        <span className="text-[#5c5c5c]">p.{source.page}</span>
      )}
      <span
        className="font-bold"
        style={{ color: confidenceColor }}
      >
        {Math.round(confidence * 100)}%
      </span>
      {dialects.length > 0 && dialects[0] !== 'standard' && (
        <span className="text-[#5c5c5c]">{dialects.join(', ')}</span>
      )}
    </span>
  );
}
