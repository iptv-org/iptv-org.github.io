import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    alias: {
      '~': 'src'
    },
    files: {
      routes: 'src/pages'
    },
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      precompress: false,
      strict: true
    })
  },
  preprocess: vitePreprocess()
}

export default config
