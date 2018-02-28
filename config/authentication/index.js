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
	client.callbackURL = 'http://localhost:9000/auth/' + c + '/callback'

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
							console.log('PROFILE:', profile)
							user.email = profile.email || profile.emails && profile.emails[0] && profile.emails[0].value
							user.displayName = profile.displayName || profile.username || profile.email || profile.name.givenName
							return User.create(user)
								.then(u => {
									next(null, u)
								}).catch(next)
						}
						next(null, doc)
					})
					.catch(next)
			} else {
				if(!req.user[c].id){
					req.user[c] = { id: profile.id, ...profile }
					return req.user.save().then(err => {
						next(null, req.user)
					})
				}
				return next(null, req.user)
			}
		})
	}))
}


function setupLocal(client) {
	passport.use('local-login', new client.strategy(client, login))
	passport.use('local-register', new client.strategy(client, register))

	function login(req, email, password, next) {
		User.findOne({ 'local.email': email })
			.then(user => {
				var error = new Error('user not found')
				if (!user) {
					return next(error, false)
				}
				if (!user.validatePassword(password)) {
					return next(error, false)
				}
				return next(null, user)
			})
			.catch(next)
	}

	function register(req, email, password, next) {
		User.findOne({ 'email': email })
			.then(user => {
				var error = new Error('unable to register at this time')
				if (user) {
					return next(error)
				}
				User.create({
					email: email,
					displayName: req.body.displayName || req.body.name || email,
					local: {
						email: email,
						password: User.generateHash(password)
					}, ...req.body
				}).then(user => {
					return next(null, user)
				})
			})
			.catch(next)
	}
}

module.exports = {
	passport,
	init(app, env) {
		app.use(cookieParser())
		session.init(app, env)
		app.use(passport.initialize())
		app.use(passport.session())
		authRoutes.register(app, passport, authClients)

		passport.serializeUser(function (user, next) {
			next(null, user.id);
		});
		passport.deserializeUser(function (id, next) {
			User.findById(id, function (err, user) {
				next(err, user);
			});
		});
	}
}
