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
        <div className="flex min-h-[100dvh] items-center justify-center bg-bg px-4">
          <div className="max-w-sm text-center">
            {/* Was `bg-[#ef4444]15` — a malformed arbitrary value that Tailwind
                never compiled, so this badge had no background at all. */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-fill">
              <span className="text-title3 text-red">!</span>
            </div>
            <h1 className="mb-2 text-title3 font-semibold text-label">Something went wrong</h1>
            <p className="mb-6 text-footnote text-label-2">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-accent px-5 py-3 text-footnote font-semibold text-accent-ink transition-colors hover:opacity-90"
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
