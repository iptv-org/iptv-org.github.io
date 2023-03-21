module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      flexBasis: {
        88: '22rem'
      },
      transitionProperty: {
        width: 'width'
      },
      colors: {
        accent: {
          400: '#594ee9',
          500: '#5045e8',
          600: '#4338e5'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
