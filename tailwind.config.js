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
      maxWidth: {
        xxs: '14rem',
        xxxs: '9rem'
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        nutrition: {
          darkest: '#002c32',
          dark: '#005560',
          DEFAULT: '#00B6CE',
          light: '#6AC7D9',
          lightest: '#9ef4ff'
        },
        tree: {
          darkest: colors.green[900],
          dark: colors.green[600],
          DEFAULT: '#54BDB9',
          light: '#90d3d0',
          lightest: colors.green[100]
        },
        mobility: {
          darkest: '#1f2d3d',
          dark: '#3c4858',
          DEFAULT: '#FFED00',
          light: '#FFFBDB',
          lightest: '#f9fafc'
        },
        paper: {
          darkest: colors.blue[900],
          dark: colors.blue[600],
          DEFAULT: '#79B1E0',
          light: colors.blue[200],
          lightest: colors.blue[100]
        },
        kds: {
          green: {
            DEFAULT: '#00A182',
            neon: '#3FFFBF',
            header: '#7FFF7F'
          },
          light: '#60BDA8',
          blue_light: '#BEFFFF'
        },
        footer: '#01A3B9'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      }
    }
  },
  variants: {
    extend: {
      translate: ['group-hover'],
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      textColor: ['disabled']
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
