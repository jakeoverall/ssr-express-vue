let expressSession = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(expressSession);

module.exports = {
	init(app, env) {
		let store = new MongoDBStore(
			{
				uri: env.db.connectionstring,
				collection: 'Sessions',
			});

		// Catch errors 
		store.on('error', function (error) {
			console.error(error);
		});

		// @ts-ignore
		let session = expressSession({
			secret: env.db.secret,
			cookie: {
				maxAge: (1000 * 60 * 60 * 24 * 7 * 52), // 1 year
			},
			store: store,
			resave: true,
			saveUninitialized: false,
		})
		app.use(session)
	}
}