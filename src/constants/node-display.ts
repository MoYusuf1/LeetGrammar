/**
 * Node Display Constants — Colors and icons for grammar node types.
 * Single source of truth shared across all components.
 */

import type { NodeType, EdgeType } from '@/engine/types';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Hash,
  MessageSquareQuote,
  Wrench,
  ScrollText,
  Construction,
} from 'lucide-react';

export const TYPE_COLORS: Record<NodeType, string> = {
  CONCEPT: '#3b82f6',
  MORPHEME: '#f97316',
  WORD: '#22c55e',
  EXAMPLE: '#a855f7',
  RULE: '#eab308',
  LESSON: '#06b6d4',
  TEXTBOOK: '#ef4444',
  CONSTRUCTION: '#ec4899',
  LEXICAL_ENTRY: '#14b8a6',
};

export const TYPE_ICONS: Record<NodeType, LucideIcon> = {
  CONCEPT: BookOpen,
  MORPHEME: Hash,
  WORD: Hash,
  EXAMPLE: MessageSquareQuote,
  RULE: Wrench,
  LESSON: ScrollText,
  TEXTBOOK: BookOpen,
  CONSTRUCTION: Construction,
  LEXICAL_ENTRY: Hash,
};

export const EDGE_TYPE_LABELS: Record<EdgeType, string> = {
  REQUIRES: 'Prerequisites',
  CONTRADICTS: 'Contrasts With',
  DERIVES_FROM: 'Derived From',
  EXEMPLIFIES: 'Examples',
  CITES: 'Cited In',
  IS_A: 'Is A',
  PART_OF: 'Part Of',
  VARIES_BY: 'Varies By',
  SHARED_FORM: 'Shared Form',
  AGREES_WITH: 'Agreement',
  INFLECTION_OF: 'Inflection',
  HOMONYM_OF: 'Homonym',
};
