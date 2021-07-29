const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@webeetle/windy/dist/*.{js,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        nutrition: {
          darkest: colors.red[900],
          dark: colors.red[600],
          DEFAULT: colors.red[400],
          light: colors.red[200],
          lightest: colors.red[100]
        },
        tree: {
          darkest: colors.green[900],
          dark: colors.green[600],
          DEFAULT: colors.green[400],
          light: colors.green[200],
          lightest: colors.green[100]
        },
        mobility: {
          darkest: '#1f2d3d',
          dark: '#3c4858',
          DEFAULT: '#c0ccda',
          light: '#e0e6ed',
          lightest: '#f9fafc'
        },
        paper: {
          darkest: colors.blue[900],
          dark: colors.blue[600],
          DEFAULT: colors.blue[400],
          light: colors.blue[200],
          lightest: colors.blue[100]
        }
      }
    }
  },
  variants: {
    extend: {
      translate: ['group-hover']
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
