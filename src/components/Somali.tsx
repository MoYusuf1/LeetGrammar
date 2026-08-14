/**
 * <Somali> — the one way Somali text is rendered.
 *
 * The interface is quiet and small; the language is large. That scale contrast
 * is the whole visual idea, so it lives in one component rather than being
 * re-decided per screen.
 *
 * Set in New York, Apple's system serif — a genuine iPhone font, so it reads
 * native next to SF while still giving the target language its own voice.
 * Tracking is slightly open because the course turns on noticing that `aa` is
 * two letters and that `guri` became `guriga`.
 *
 * Also sets lang="so", so a screen reader stops applying English phonetics to
 * Somali mid-sentence.
 */

import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Size = 'inline' | 'lg' | 'hero';

export interface SomaliProps {
  children: ReactNode;
  /**
   * inline — inside a sentence of English
   * lg     — a form on a row or a chip
   * hero   — the specimen: the biggest thing on the screen
   */
  size?: Size;
  /** Take the parent's color instead of label — for tinted feedback text. */
  inherit?: boolean;
  as?: ElementType;
  className?: string;
}

const SIZE: Record<Size, string> = {
  inline: 'so so-inline',
  lg: 'so so-lg',
  hero: 'so-hero',
};

export default function Somali({
  children,
  size = 'inline',
  inherit = false,
  as,
  className,
}: SomaliProps) {
  const Tag = (as ?? (size === 'hero' ? 'p' : 'span')) as ElementType;
  return (
    <Tag lang="so" className={cn(SIZE[size], inherit && 'text-inherit', className)}>
      {children}
    </Tag>
  );
}
