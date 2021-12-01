module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      Colors: {
        lightBlue: '#d4e0fb'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['visited'],
    },
  },
  plugins: [],
}
