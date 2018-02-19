// Paths are relative to project root
module.exports = {
	prod: {
		views: './app/src/components',
		useAuth: true,
		port: process.env.PORT || 9000,
		output: './dist',
		db: {
			connectionstring: ''
		}
	},
	dev: {
		views: './app/src/components',
		useAuth: false,
		port: process.env.PORT || 9000,
		db: {
			connectionstring: ''
		},
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
