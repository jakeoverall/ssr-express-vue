var chalk = require('chalk')
var colors = ['red', 'yellow', 'blue', 'green', 'bgGreen', 'bgRed', 'bgYellow', 'magenta', 'cyan', 'bgMagenta', 'bgCyan']

function logHijack() {
	console.clear()
	var log = console.log
	var error = console.error
	var warn = console.warn
	console.error = function () {
		Object.keys(arguments).forEach(k => {
			error(chalk.red(arguments[k]))
		})
	}

	console.warn = function () {
		Object.keys(arguments).forEach(k => {
			error(chalk.yellow(arguments[k]))
		})
	}

	colors.forEach(c => {

		if (typeof chalk[c] == 'function') {
			console.log[c] = function () {
				Object.keys(arguments).forEach(k => {
					log(chalk[c](arguments[k]))
				})
			}
		}
	})

}

logHijack()