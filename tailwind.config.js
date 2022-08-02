/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        'body-lg': '1rem',
        'body': '.875rem',
        xxs: '.60rem',
        xxxs: '.55rem',
      },
      screens: {
        xs: { max: '640px' }, // Mobile (iPhone 3 - iPhone XS Max).
        xxs: {max: '500px'},
        xxxs: {max: '400px'},
      },
    },
  },
  plugins: [],
}
