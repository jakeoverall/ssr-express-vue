var path = require('path')
var express = require('express')
var morgan = require('morgan');
var bodyParser = require('body-parser');

// VUE LOADER
function vueLoader(env) {
	var eVue = require('express-vue')
	var meta = require('../vue-options')
	var vueOptions = {
		cacheOptions: {
			max: 1,
			maxAge: 1
		},
		rootPath: path.join(__dirname, "../../" + env.views),
		head: { ...meta }
	}
	return eVue.init(vueOptions)
}

module.exports = {
	init(app, env, io) {


		app.use(morgan('dev'))
		app.use(bodyParser.json())
		app.use(bodyParser.urlencoded({ extended: true }))

		if (env.useAuth) {
			var auth = require('../authentication')
			auth.init(app, env)
		}

		app.use('', express.static(__dirname + '/../../static'))


		app.use(vueLoader(env))


		if (env.watch) {
			var watcher = require('./watcher')
			watcher.init(app, io, env)
		}

	}
}