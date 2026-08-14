/** @type {import('tailwindcss').Config} */

/*
 * iOS. Every color resolves to a custom property in src/index.css — nothing is
 * restated as a literal, so there is one place to change a color.
 *
 * The shadcn names are kept and remapped rather than deleted, so the vendored
 * src/components/ui/* components inherit the theme instead of going unstyled.
 */
module.exports = {
  darkMode: 'media', // system only — there is no toggle
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ui)'],
        somali: ['var(--font-somali)'],
      },
      colors: {
        bg: 'var(--bg)',
        elevated: 'var(--bg-elevated)',
        fill: 'var(--fill)',
        separator: 'var(--separator)',
        label: {
          DEFAULT: 'var(--label)',
          2: 'var(--label-2)',
          3: 'var(--label-3)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          ink: 'var(--accent-ink)',
        },
        green: 'var(--green)',
        red: 'var(--red)',

        /* shadcn compatibility */
        border: 'var(--separator)',
        input: 'var(--fill)',
        ring: 'var(--accent)',
        background: 'var(--bg)',
        foreground: 'var(--label)',
        primary: { DEFAULT: 'var(--accent)', foreground: 'var(--accent-ink)' },
        secondary: { DEFAULT: 'var(--fill)', foreground: 'var(--label)' },
        destructive: { DEFAULT: 'var(--red)', foreground: '#ffffff' },
        muted: { DEFAULT: 'var(--fill)', foreground: 'var(--label-2)' },
        popover: { DEFAULT: 'var(--bg-elevated)', foreground: 'var(--label)' },
        card: { DEFAULT: 'var(--bg-elevated)', foreground: 'var(--label)' },
      },
      fontSize: {
        /* Apple's type scale, by its own names. Body is 17. */
        caption2: ['11px', { lineHeight: '1.25', letterSpacing: '0.005em' }],
        caption: ['12px', { lineHeight: '1.35' }],
        footnote: ['13px', { lineHeight: '1.4' }],
        subhead: ['15px', { lineHeight: '1.4' }],
        callout: ['16px', { lineHeight: '1.45' }],
        body: ['17px', { lineHeight: '1.45' }],
        title3: ['20px', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        title2: ['22px', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        title1: ['28px', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        large: ['34px', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
      },
      maxWidth: {
        column: 'var(--column)',
      },
      borderRadius: {
        /* iOS radii. 12 for grouped lists, 14 for cards, full for buttons. */
        sm: '8px',
        md: '10px',
        lg: '12px',
        xl: '14px',
        '2xl': '18px',
      },
      spacing: {
        'safe-b': 'var(--safe-b)',
        'safe-t': 'var(--safe-t)',
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
