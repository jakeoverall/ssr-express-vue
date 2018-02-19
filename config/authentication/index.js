var User = require('../../app/models/user')
var authClients = require('./auth-clients')
var passport = require('passport')
var cookieParser = require('cookie-parser');
var session = require('./session')
var authRoutes = require('./routes')


Object.keys(authClients).forEach(setupAuth)


function setupAuth(c) {
	var client = authClients[c]
	client.passReqToCallback = true

	if (c == 'local') {
		return setupLocal(client)
	}

	passport.use(c, new client.strategy(client, function findOrCreateUser(req, token, refreshToken, profile, next) {
		process.nextTick(() => {
			if (!req.user) {
				var clientId = c + '.id'
				var query = {}
				query[clientId] = profile.id

				User.findOne(query)
					.then(doc => {
						if (!doc) {
							// modify this object to match user schema if necessary
							var user = {}
							user[c] = { id: profile.id, ...profile }
							user.email = profile.email
							user.displayName = profile.name || profile.displayName || profile.username || profile.email
							return User.create(user).then(next).catch(next)
						}
						next(null, doc)
					})
					.catch(next)
			} else {
				req.user[c] = { id: profile.id, ...profile }
				req.user.save().then(err => {
					next(err, req.user)
				})
			}
		})
	}))
}


function setupLocal(client) {
	passport.use('local-login', new client.strategy(client, login))
	passport.use('local-register', new client.strategy(client, register))


	function login(req, email, password, next) {
		process.nextTick(() => {
			if (req.user) { return next(null, req.user) }
			User.findOne({ 'local.email': email })
				.then(user => {
					if (!user) {
						return next({ error: 'User not found' })
					}
					if (!user.validatePassword(password)) {
						return next({ error: 'User not found' })
					}
					delete user.local.password
					return next(null, user)
				})
				.catch(next)
		})
	}

	function register(req, email, password, next) {
		process.nextTick(() => {
			User.findOne({ 'email': email })
				.then(user => {
					if (user) {
						if (user.validatePassword(password)) {
							delete user.local.password
							return next(null, user)
						}
						return next({ error: 'unable to register at this time' })
					}
					delete req.body.password
					delete req.body.local

					User.create({
						email: email,
						displayName: req.body.displayName || req.body.name || email,
						local: {
							email: email,
							password: User.generateHash(password)
						}, ...req.body
					}).then(user => {
						delete user.local.password
						return next(null, user)
					})
				})
				.catch(next)
		})
	}

}

module.exports = {
	passport,
	serialize(next) {
		// used to serialize the user for the session
		passport.serializeUser(function (user) {
			next(null, user.id);
		});

	},
	deserialize(next) {
		// used to deserialize the user
		passport.deserializeUser(function (id) {
			User.findById(id, function (err, user) {
				next(err, user);
			});
		});
	},
	init(app, env) {

		app.use(cookieParser())
		session.init(app, env)
		app.use(passport.initialize())
		app.use(passport.session())

		app.use(authRoutes)
	}
}
