module.exports = function (config) {
	try {
		config.metas = config.metas || []
		config.scripts = config.scripts || []
		config.styles = config.styles || []
		if (!config.title) { throw 'YOU MUST SET A TITLE' }
		return {
			head: {
				title: config.title,
				metas: [...config.metas],
				scripts: [
					{ src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js' },
					{ src: '/app/tiny-redux.js' },
					{ src: '/app/main.js' },
					...config.scripts
				],
				styles: [
					{ style: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.min.css' },
					{ style: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' },
					{ style: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
					{ style: 'https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300' },
					...config.styles
				]
			}
		}
	} catch (e) {
		console.log('[ERROR LOADING ROUTE] bad config', e)
		return { head: { styles: [{ style: '/assets/styles/error.css' }] } }
	}
}