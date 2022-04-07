import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			precompress: true
		}),
		prerender: {
			default: true
		}
	}
}

export default config
