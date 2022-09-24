const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translate3d(0, 100%, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        slideDown: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(0, 200%, 0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '15%': { transform: 'rotate(-3deg)' },
          '25%': { transform: 'rotate(0deg)' },
          '35%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 200ms ease-out forwards',
        slideUp: 'slideUp 350ms cubic-bezier(.21,1.02,.73,1) forwards',
        slideDown: 'slideDown 400ms cubic-bezier(.06,.71,.55,1) forwards',
        wiggle: 'wiggle 1s ease infinite',
      },
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['emerald', 'dark'],
    darkTheme: 'dark',
  },
}
