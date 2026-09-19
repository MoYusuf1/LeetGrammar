/**
 * A centered one-line notice for empty and error states — "no test exists
 * for that unit", "something went wrong". The back link is opt-in because a
 * notice reached mid-flow already has its own way out.
 */

import type { ReactNode } from 'react';
import { Link } from 'react-router';

export default function CenteredNotice({
  children,
  withBackLink = false,
}: {
  children: ReactNode;
  withBackLink?: boolean;
}) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-bg px-4">
      <div className="max-w-sm text-center text-body text-label-2">
        {children}
        {withBackLink && (
          <div className="mt-4">
            <Link to="/learn" className="text-body font-medium text-accent hover:underline">
              Back to lessons
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
