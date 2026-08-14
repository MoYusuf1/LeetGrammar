/** @type {import('tailwindcss').Config} */

/*
 * WARM PAPER.
 *
 * Every color here resolves to a custom property declared in src/index.css.
 * Nothing is restated as a literal — that is the whole point. The previous
 * config hardcoded #ffa116 and friends alongside a parallel shadcn HSL set
 * describing the same colors, so a change had to be made in two places and
 * nothing caught it when it wasn't.
 *
 * The shadcn names (background, card, muted, primary...) are kept and remapped
 * onto the new tokens rather than deleted, so the vendored src/components/ui/*
 * components inherit the theme instead of going unstyled.
 */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans 3', 'system-ui', '-apple-system', 'sans-serif'],
        /* Reserved for Somali. See the rule in src/index.css. */
        serif: ['Source Serif 4', 'Georgia', 'serif'],
      },
      colors: {
        /* --- semantic tokens (use these) --- */
        surface: 'var(--surface)',
        'surface-sunken': 'var(--surface-sunken)',
        card: {
          DEFAULT: 'var(--card)',
          raised: 'var(--card-raised)',
          foreground: 'var(--ink)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--ink-muted)',
          faint: 'var(--ink-faint)',
          inverse: 'var(--ink-inverse)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          strong: 'var(--accent-strong)',
          hover: 'var(--accent-hover)',
          wash: 'var(--accent-wash)',
          line: 'var(--accent-line)',
        },
        success: {
          DEFAULT: 'var(--success)',
          wash: 'var(--success-wash)',
          line: 'var(--success-line)',
        },
        error: {
          DEFAULT: 'var(--error)',
          wash: 'var(--error-wash)',
          line: 'var(--error-line)',
        },
        info: {
          DEFAULT: 'var(--info)',
          wash: 'var(--info-wash)',
          line: 'var(--info-line)',
        },

        /* --- shadcn compatibility, derived from the tokens above --- */
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        input: 'var(--border-strong)',
        ring: 'var(--accent)',
        background: 'var(--surface)',
        foreground: 'var(--ink)',
        primary: {
          DEFAULT: 'var(--accent-strong)',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: 'var(--surface-sunken)',
          foreground: 'var(--ink)',
        },
        destructive: {
          DEFAULT: 'var(--error)',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'var(--surface-sunken)',
          foreground: 'var(--ink-muted)',
        },
        popover: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--ink)',
        },
      },
      fontSize: {
        /* Mobile-first reading scale. Body is 1rem/16px, up from the old 14px. */
        micro: ['0.75rem', { lineHeight: '1.4' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
        body: ['1rem', { lineHeight: '1.6' }],
        lead: ['1.125rem', { lineHeight: '1.55' }],
        heading: ['1.25rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        title: ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        display: ['1.875rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        column: 'var(--app-column)',
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      boxShadow: {
        /* Warm-tinted and shallow. Black drop shadows read as grime on paper. */
        card: '0 1px 2px rgba(28, 26, 23, 0.04), 0 2px 8px rgba(28, 26, 23, 0.04)',
        raised: '0 2px 4px rgba(28, 26, 23, 0.05), 0 8px 24px rgba(28, 26, 23, 0.07)',
        cta: '0 2px 8px rgba(155, 58, 21, 0.25)',
      },
      spacing: {
        'safe-b': 'var(--safe-bottom)',
        'safe-t': 'var(--safe-top)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '50%': { transform: 'translateX(4px)' },
          '75%': { transform: 'translateX(-4px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.25s ease-out',
        'slide-up': 'slide-up 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        shake: 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
