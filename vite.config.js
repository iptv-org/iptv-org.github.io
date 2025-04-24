import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import mkcert from 'vite-plugin-mkcert'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [mkcert(), tailwindcss(), sveltekit()],
  server: {
    https: true,
    host: '127.0.0.1',
    port: 3000
  },
  preview: {
    https: true,
    port: 4000
  }
}

export default config
