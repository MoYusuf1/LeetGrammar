/**
 * Global source filter — toggles which textbooks are visible.
 */

import { useMemo } from 'react';
import { useGraphStore } from '@/stores/graph-store';

interface SourceFilterProps {
  selected: string[];
  onChange: (sources: string[]) => void;
}

export default function SourceFilter({ selected, onChange }: SourceFilterProps) {
  const { engine } = useGraphStore();

  const sources = useMemo(() => {
    const set = new Set<string>();
    const snapshot = engine.toSnapshot();
    for (const edge of snapshot.edges) {
      set.add(edge.qualifiers.source.textbookId);
    }
    return Array.from(set).sort();
  }, [engine]);

  if (sources.length <= 1) return null;

  const toggle = (source: string) => {
    if (selected.includes(source)) {
      onChange(selected.filter((s) => s !== source));
    } else {
      onChange([...selected, source]);
    }
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {sources.map((source) => (
        <button
          key={source}
          onClick={() => toggle(source)}
          className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-colors ${
            selected.includes(source)
              ? 'bg-[#ffa116]20 text-[#ffa116] border border-[#ffa116]30'
              : 'bg-[#1a1a1a] text-[#5c5c5c] border border-[#ffffff08] hover:text-[#8c8c8c]'
          }`}
        >
          {source}
        </button>
      ))}
    </div>
  );
}
