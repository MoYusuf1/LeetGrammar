/**
 * The two full-width actions every task surface ends with.
 *
 * The class strings below were repeated verbatim across the unit test,
 * homework and correctives — eight copies that could only drift. One
 * primary (accent) and one secondary (plain ink) cover every case; an icon
 * or layout tweak is a className away, not a third button style.
 */

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** False when the button shares a row (flex-1) instead of owning one. */
  full?: boolean;
}

export function PrimaryButton({ children, full = true, className, ...rest }: ActionButtonProps) {
  return (
    <button
      className={cn(
        'pressable rounded-xl bg-accent py-4 text-body font-semibold text-accent-ink transition-colors hover:opacity-90',
        full && 'w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, full = true, className, ...rest }: ActionButtonProps) {
  return (
    <button
      className={cn(
        'pressable rounded-xl py-4 text-body font-semibold text-label transition-colors hover:bg-fill',
        full && 'w-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
