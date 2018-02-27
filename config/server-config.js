// Paths are relative to project root
module.exports = {
	prod: {
		views: './app/src/components',
		useAuth: true,
		useSessions: true,
		port: process.env.PORT || 9000,
		output: './dist',
		db: {
			connectionstring: '',
			secret: ''
		}
	},
	dev: {
		views: './app/src/components',
		useAuth: true,
		useSessions: true,
		port: process.env.PORT || 9000,
		db: {
			connectionstring: 'mongodb://test:test@ds044907.mlab.com:44907/delete-me',
			secret: 'A VERY special PHRASE Works Best when SETTING TH!$'
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
