/**
 * Error Boundary — catches rendering errors and shows a fallback UI.
 */

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-surface px-4">
          <div className="max-w-sm text-center">
            {/* Was `bg-[#ef4444]15` — a malformed arbitrary value that Tailwind
                never compiled, so this badge had no background at all. */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-error-line bg-error-wash">
              <span className="text-heading text-error">!</span>
            </div>
            <h1 className="mb-2 text-heading font-semibold text-ink">Something went wrong</h1>
            <p className="mb-6 text-small text-ink-muted">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-accent-strong px-5 py-3 text-small font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
