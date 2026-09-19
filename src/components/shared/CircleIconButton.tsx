/**
 * The 40px circular icon button — the app's one chrome control.
 *
 * Two finishes, both already established:
 *   glass — floating over content (lesson player, repair session)
 *   fill  — sitting on the page background (home header)
 *
 * Positioning stays with the caller; this owns size, shape, finish and the
 * pressed feedback so a new control cannot drift to a third look.
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const FINISH = {
  glass: 'glass pressable flex items-center justify-center',
  fill: 'grid place-items-center bg-fill backdrop-blur active:opacity-60',
} as const;

export interface CircleIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  finish?: keyof typeof FINISH;
  children: ReactNode;
}

export default function CircleIconButton({
  label,
  finish = 'glass',
  className,
  children,
  ...rest
}: CircleIconButtonProps) {
  return (
    <button aria-label={label} className={cn('h-10 w-10 rounded-full', FINISH[finish], className)} {...rest}>
      {children}
    </button>
  );
}
