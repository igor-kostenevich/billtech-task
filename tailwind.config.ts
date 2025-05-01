export default {
  darkMode: ['class', "[data-theme='dark']"],
  content: ['./components/**/*.{vue,js,ts}', './layouts/**/*.{vue,js,ts}', './pages/**/*.{vue,js,ts}', './plugins/**/*.{js,ts}', './app.vue'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {},
    },
  },
}
