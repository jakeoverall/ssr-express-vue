var layouts = require('../layouts')

module.exports = {
	mountPath: '',
	routes: [{
		reqType: 'get',
		path: '',
		method(req, res, next) {
			var data = {
				user: { name: 'from server' }
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
	}]
}