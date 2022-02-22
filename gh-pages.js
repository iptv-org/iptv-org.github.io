import { publish } from 'gh-pages'

publish('build', () => {
	console.log('Deploy Complete!')
})
