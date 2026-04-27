/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          page: '#0b0d10',
          card: '#15181d',
          cardSoft: '#1b1f25',
          border: '#262a31',
        },
        accent: {
          blue: '#3aa9ff',
          gold: '#c98a1d',
          goldSoft: '#7a5613',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
