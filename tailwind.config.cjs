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
          400: '#61a5fa',
          500: '#3b82f6',
          600: '#2664ec',
          700: '#1d4ed8'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar-hide')]
}
