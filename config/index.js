var express = require('express')
var http = require('http')

var config = require('./server-config')
var db = require('./db')
var middleware = require('./build/middleware')

var node_env = process.env.NODE_ENV || 'prod'
var env = config[node_env] || config.prod
var port = env.port || 9000

var app = express()
var server = http.createServer(app)
var io = require('socket.io')(server, {
	origins: '*:*'
})

app.set('port', port)

db.init(app, env)
middleware.init(app, env, io)

console.log(`NODE_ENV: ${node_env}`, `APP PORT: ${port}`)

module.exports = {
	app,
	server,
	io
}



