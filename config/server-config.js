
// Paths are relative to project root
module.exports = {
	prod: {
		views: '',
		port: process.env.PORT || 9000,
		output: './dist'
	},
	dev: {
		views: './app/src/components',
		port: process.env.PORT || 9000,
		watch: {
			disabled: false,
			path: 'app',
			extensions: [
				'vue',
				'js',
				'css'
			]
		}
	}
}
