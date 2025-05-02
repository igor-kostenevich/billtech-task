export default {
  darkMode: ['class', "[data-theme='dark']"],
  content: ['./components/**/*.{vue,js,ts}', './layouts/**/*.{vue,js,ts}', './pages/**/*.{vue,js,ts}', './plugins/**/*.{js,ts}', './app.vue'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2196F3',
        },
        secondary: {
          DEFAULT: '#4A4A4A',
          additional: '#A0B0B9'
        },
        light: {
          DEFAULT: '#F3F7FA',
        },
        gray: {
          DEFAULT: '#DFE5EC',
        }
      },
    },
  },
}
