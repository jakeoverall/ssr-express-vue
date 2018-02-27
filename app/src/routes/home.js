var layouts = require('../layouts')

module.exports = {
	mountPath: '',
	routes: [{
		reqType: 'get',
		path: '',
		name: 'Home',
		method(req, res, next) {
			var data = {
				user: req.user || {}
			}
			req.vueOptions = layouts.main({
				title: 'Welcome Home',
				metas: [
					{ name: 'something else', content: 'bla bla' }
				]
			})
			console.log(req.vueOptions.layout)
			res.renderVue('home.vue', data, req.vueOptions)
		}
	}, {
		reqType: 'get',
		path: 'about',
		name: 'Home',
		method(req, res, next) {
			var data = {
				testVal: 'from home route'
			}
			req.vueOptions = layouts.main({
				title: 'The About page',
				metas: [
					{ name: 'something else', content: 'bla bla' }
				]
			})

			res.renderVue('about.vue', data, req.vueOptions)
		}
	}, {
		reqType: 'get',
		path: 'auth',
		name: 'Auth',
		method(req, res, next) {
			var data = {user: req.user}
			req.vueOptions = layouts.main({
				title: 'CodeWorks Student Login',
				metas: [
					{ name: 'description', content: 'Student login and registration. Start your coding adventure today!' }
				]
			})
			res.renderVue('auth.vue', data, req.vueOptions)
		}
	}]
}