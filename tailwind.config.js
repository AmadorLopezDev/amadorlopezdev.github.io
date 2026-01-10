/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        // Backgrounds
        bg: {
          primary: '#0D1117',
          secondary: '#161B22',
          tertiary: '#21262D',
          overlay: '#30363D',
        },
        // Primary Brand
        primary: {
          DEFAULT: '#3B82F6',
          50: '#EBF5FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Accent (Emerald)
        accent: {
          DEFAULT: '#10B981',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        // Emphasis (Amber)
        emphasis: {
          DEFAULT: '#F59E0B',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        // Text
        text: {
          primary: '#F0F6FC',
          secondary: '#C9D1D9',
          tertiary: '#8B949E',
          muted: '#6E7681',
        },
        // Borders
        border: {
          DEFAULT: '#30363D',
          muted: '#21262D',
          emphasis: '#58A6FF',
        },
        // Semantic
        success: {
          bg: 'rgba(16, 185, 129, 0.1)',
          DEFAULT: '#10B981',
        },
        warning: {
          bg: 'rgba(245, 158, 11, 0.1)',
          DEFAULT: '#F59E0B',
        },
        error: {
          bg: 'rgba(239, 68, 68, 0.1)',
          DEFAULT: '#EF4444',
        },
        info: {
          bg: 'rgba(59, 130, 246, 0.1)',
          DEFAULT: '#3B82F6',
        },
        // Tech stacks
        tech: {
          dotnet: '#512BD4',
          azure: '#0078D4',
          typescript: '#3178C6',
          python: '#3776AB',
          sql: '#CC2927',
        },
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.75' }],
        lg: ['1.125rem', { lineHeight: '1.75' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.1' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
      },
    },
  },
  plugins: [],
};
