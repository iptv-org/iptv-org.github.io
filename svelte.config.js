import adapter from '@sveltejs/adapter-static'

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
      precompress: true
    })
    // prerender: {
    //   default: true
    // }
  }
}

export default config
