/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#ffffff',
        'bg-secondary': '#f8fafc',
        'bg-tertiary': '#f1f5f9',
        'bg-dark': '#0f172a',
        'text-primary': '#0f172a',
        'text-secondary': '#334155',
        'text-muted': '#64748b',
        'text-subtle': '#94a3b8',
        'text-inverse': '#ffffff',
        'accent-600': '#16a34a',
        'accent-500': '#22c55e',
        'accent-400': '#4ade80',
        'accent-100': '#dcfce7',
        'accent-50': '#f0fdf4',
        'border-light': '#e2e8f0',
        'border-medium': '#cbd5e1',
        'border-accent': '#86efac',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
