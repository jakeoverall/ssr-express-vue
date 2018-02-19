module.exports = {
	init(app, io, env) {
		var chokidar = require('chokidar');
		var watchList = env.watch.extensions.map(e => env.watch.path + '/**/*.' + e)
		watchList.push('static/**/*.css')
		console.log.cyan('Watching for changes in', watchList)

		chokidar.watch(watchList, { ignored: /(^|[\/\\])\../ }).on('change', (event, path) => {

			console.log.cyan('Change Detected....')
			console.log.bgMagenta(event)


			io.emit('reload')

		});
	}
}