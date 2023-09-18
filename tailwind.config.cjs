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
        primary: {
          light: '#2f4368',
          default: '#293b5b',
          dark: '#253552'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
