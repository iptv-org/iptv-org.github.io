var { publish } = require('gh-pages')

publish(
	'build',
	{
		branch: 'gh-pages',
		repo: 'https://github.com/iptv-org/iptv-org.github.io.git',
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!')
	}
)
