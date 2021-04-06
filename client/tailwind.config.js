module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        70: '17.5rem',
        160: '40rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
