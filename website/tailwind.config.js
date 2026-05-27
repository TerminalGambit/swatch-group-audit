/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF9F5',
        slate: '#141413',
        clay: '#D97757',
        oat: '#E3DACC',
        olive: '#788C5D',
        rust: '#B04A3F',
        muted: '#6B7280',
        border: '#D1CFC5',
      },
      fontFamily: {
        serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontFeatureSettings: {
        nums: '"tnum"',
      },
    },
  },
  plugins: [],
};
