/**
 * <Somali> — the one way Somali text is rendered.
 *
 * WHY THIS IS A COMPONENT AND NOT A CLASS YOU REMEMBER TO APPLY:
 *
 * The course exists to make a learner *notice forms* — that `guri` became
 * `guriga`, that `aa` is two letters and not a long one, that `c` and `x` are
 * consonants. Before this, every page styled Somali its own way: some bold,
 * some accent-colored, some just inline text. A learner had no visual signal
 * telling them "this is the language" versus "this is me explaining it", so
 * the noticing had to come entirely from the prose.
 *
 * Now serif means Somali, everywhere, with no exceptions — and English never
 * uses the serif. See the rule at the top of src/index.css.
 *
 * It also sets lang="so", so a screen reader stops applying English phonetics
 * to Somali strings mid-sentence.
 */

import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SomaliSize = 'inline' | 'lg' | 'block';
type SomaliTone = 'accent' | 'ink' | 'inherit';

export interface SomaliProps {
  children: ReactNode;
  /**
   * inline — flows inside a sentence of English (default)
   * lg     — a form being examined, e.g. on a card or a word chip
   * block  — the specimen of the card; the thing the learner is looking at
   */
  size?: SomaliSize;
  /**
   * accent  — the default: henna ink, marks it as the target language
   * ink     — body ink, for when the surface is already accent-colored
   *           (a filled chip, a selected option) and accent-on-accent would
   *           lose contrast
   * inherit — take the parent's color, for print and for the answer key
   */
  tone?: SomaliTone;
  as?: ElementType;
  className?: string;
}

const SIZE: Record<SomaliSize, string> = {
  inline: 'somali',
  lg: 'somali somali-lg',
  block: 'somali-block',
};

const TONE: Record<SomaliTone, string> = {
  accent: '',
  ink: 'text-ink',
  inherit: 'text-inherit',
};

export default function Somali({
  children,
  size = 'inline',
  tone = 'accent',
  as,
  className,
}: SomaliProps) {
  const Tag = (as ?? (size === 'block' ? 'p' : 'span')) as ElementType;
  return (
    <Tag lang="so" className={cn(SIZE[size], TONE[tone], className)}>
      {children}
    </Tag>
  );
}
