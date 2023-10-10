import adapter from '@sveltejs/adapter-static'
import sveltePreprocess from 'svelte-preprocess'

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
      precompress: false
    })
  },
  preprocess: sveltePreprocess()
}

export default config
