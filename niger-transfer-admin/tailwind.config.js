/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff3f0',
          100: '#ffe4de',
          200: '#ffcdc2',
          300: '#ffab98',
          400: '#ff7a5c',
          500: '#FF6B35',
          600: '#e55a2b',
          700: '#c1471f',
          800: '#a03c1e',
          900: '#83361f',
        },
        secondary: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          200: '#bce5cd',
          300: '#8dd1aa',
          400: '#57b57f',
          500: '#2E8B57',
          600: '#26784a',
          700: '#20603d',
          800: '#1d4d33',
          900: '#19402b',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}