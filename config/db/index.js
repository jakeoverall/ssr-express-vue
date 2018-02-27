var mongoose = require('mongoose');
var connection = mongoose.connection;

module.exports = {
	init(app, env) {

		mongoose.connect(env.db.connectionstring);

		connection.on('error', err => {
			console.log("mlab Error: ", err);
		});

		connection.once('open', () => {
			console.log("mlab connection established!");
		});
		if (env.useSessions) {
			require('./sessions').init(app, env)
		}
	}

}