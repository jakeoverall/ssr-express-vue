var config = require('./server-config')
var express = require('express')
var app = express()
var fs = require('fs')
var path = require('path')
var eVue = require('express-vue')
var http = require('http')
var meta = require('./meta')


var node_env = process.env.NODE_ENV || 'prod'
var env = config[node_env] || config.prod
var port = env.port || 9000


var server = http.createServer(app)
var io = require('socket.io')(server, {
	origins: '*:*'
})

const vueOptions = {
	cacheOptions: {
		max: 1,
		maxAge: 1
	},
	rootPath: path.join(__dirname, "../" + env.views),
	head: { ...meta }
}
const eVueMiddleware = eVue.init(vueOptions)


app.set('port', port)
app.use('', express.static(__dirname + '/../static'))

app.use(eVueMiddleware)

if (env.watch) {
	var chokidar = require('chokidar');
	var watchList = env.watch.extensions.map(e => env.watch.path + '/**/*.' + e)
	watchList.push('static/**/*.css')
	console.log('Watching for changes in', watchList)

	chokidar.watch(watchList, { ignored: /(^|[\/\\])\../ }).on('change', (event, path) => {


		console.log('Change Detected....')

		io.emit('reload')

	});
}

console.log(`NODE_ENV: ${node_env}`, `APP PORT: ${port}`)

module.exports = {
	app,
	server,
	io
}



