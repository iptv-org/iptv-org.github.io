import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    alias: {
      '~': 'src'
    },
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      precompress: false,
      strict: true
    })
  }
}

export default config
