/**
 * Roadmap.tsx — Simplified roadmap aligned with problem categories.
 *
 * 5 sections matching the 5 problem categories from Workbook 1.
 * Click a section to filter problems by that category.
 */

import { useState } from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router';
import { problemSections } from '@/data/problems';

const SECTION_COLORS: Record<number, string> = {
  0: '#3b82f6', // Marker System — blue
  1: '#8b5cf6', // Contractions — purple
  2: '#06b6d4', // Word Order — cyan
  3: '#f59e0b', // Prepositions — amber
  4: '#ef4444', // Connectors — red
};

export default function Roadmap() {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<number | null>(null);

  const handleSectionClick = (sectionId: number) => {
    // Navigate to problems page and filter by section
    navigate(`/problems?section=${sectionId}`);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#eff1f6] mb-2">Somali Grammar Path</h1>
          <p className="text-sm text-[#8c8c8c]">
            Master Somali Workbook 1 through 5 progressive sections
          </p>
        </div>

        {/* Sections as cards */}
        <div className="space-y-3 pb-20 sm:pb-8">
          {problemSections.map((section, idx) => {
            const color = SECTION_COLORS[section.id];
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="w-full p-4 rounded-xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] text-left"
                style={{
                  borderColor: color,
                  backgroundColor: `${color}08`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="inline-flex w-6 h-6 rounded-lg items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {idx + 1}
                      </span>
                      <h2 className="text-sm font-bold text-[#eff1f6]">{section.name}</h2>
                    </div>
                    <p className="text-[10px] text-[#8c8c8c] ml-8">{section.description}</p>
                  </div>
                  <ChevronRight size={16} className="flex-shrink-0 mt-1" style={{ color }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Info card */}
        <div className="fixed bottom-20 sm:bottom-8 left-4 right-4 max-w-2xl mx-auto rounded-xl bg-[#1a1a1a] border border-[#ffffff08] p-4">
          <div className="flex items-start gap-3">
            <BookOpen size={14} className="text-[#ffa116] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#ffa116] uppercase tracking-wider mb-1">
                How it works
              </p>
              <p className="text-[10px] text-[#8c8c8c]">
                Each section has 1-2 problems. Complete them to unlock the next section and build your Somali grammar skills progressively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
