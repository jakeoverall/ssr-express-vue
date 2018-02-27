var config = require('./config')
var app = config.app
var server = config.server
var io = config.io
var routes = require('./app/src/routes')

app.use(routes)




io.sockets.on('connection', socket => {




})



// Default error handler
app.use(function handleError(err, req, res, next) {
	var output = {
		error: {
			name: err.name,
			message: err.message,
			text: err.toString()
		}
	};
	var statusCode = err.status || 400;
	res.status(statusCode).json(output);
})

server.listen(app.get('port'), () => {
	console.log('running on port', app.get('port'))
})



