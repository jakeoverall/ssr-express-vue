var expressSession = require("express-session");
var mongoStore = require("connect-mongodb-session")(expressSession);


module.exports = {
	init(app, env) {
		var store = new mongoStore({
			uri: env.db.connectionstring,
			collection: "Sessions"
		});

		store.on("error", function (err) {
			console.log("[SESSION ERROR]", err);
		});

		// @ts-ignore
		var session = expressSession({
			secret: env.db.secret,
			cookie: {
				maxAge: 1000 * 60 * 60 * 24 * 7 * 52 * 2,
			},
			store,
			resave: true,
			saveUninitialized: true
		});
	}
};