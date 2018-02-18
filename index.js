var config = require('./config')
var app = config.app
var server = config.server
var io = config.io
var routes = require('./app/src/routes')

app.use(routes)




io.sockets.on('connection', socket => {




})


server.listen(app.get('port'), () => {
	console.log('running on port', app.get('port'))
})



