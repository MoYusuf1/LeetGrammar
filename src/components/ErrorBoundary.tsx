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
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="w-12 h-12 rounded-xl bg-[#ef4444]15 border border-[#ef4444]25 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#ef4444] text-xl">!</span>
            </div>
            <h1 className="text-lg font-bold text-[#eff1f6] mb-2">Something went wrong</h1>
            <p className="text-sm text-[#8c8c8c] mb-6">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-[#ffa116] text-[#0f0f0f] text-sm font-semibold hover:bg-[#ffb800] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
