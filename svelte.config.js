import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'docs',
      assets: 'docs',
      precompress: false,
      strict: true
    }),
    prerender: {
      handleUnseenRoutes: 'warn'
    }
  }
}

export default config
