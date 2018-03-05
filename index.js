var config = require('./config')
var app = config.app
var server = config.server
var io = config.io
var subdomains = require('./subdomains')
var routes = require('./app/src/routes')



//main site ssr
app.use(routes)

//Initializes each subdomain in subdomains.config
subdomains.init(app)

io.sockets.on('connection', socket => {


})


// Default error handler 
app.use(function handleError(err, req, res, next) {
	var output = {
		error: {
			name: err.name,
			message: err.message,
			text: err.toString(),
			details: err.details
		}
	};
	var statusCode = err.status || 400;
	res.status(statusCode).json(output);
})

app.use((req, res, next) => {
	res.status(404).send(404)
})

server.listen(app.get('port'), () => {
	console.log('running on port', app.get('port'))
})
