const fs = require('fs');

var router = require('express').Router();

let files = fs.readdirSync(__dirname);
console.log(files)
files.forEach(function (file) {

	if (!file.endsWith('.js')) return;
	if (file.endsWith('index.js')) return;

	let controller = require('./' + file);
	try {
		controller.routes.forEach(r => {
			var p = controller.mountPath + '/' + r.path
			console.log('adding route:', p)
			router.route(p)[r.reqType](r.method)
		})
	} catch (e) {
		console.log('[ROUTE ERROR] unable to load routes in ', file)
	}
});

module.exports = router