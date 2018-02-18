// INJECTED INTO EVERY ROUTE
(function () {
	var store = new $TinyStore({
		state: {
			user: { name: 'tiny store' }
		},
		mutations: {
			user(state, user) {
				console.log(state, user)
				if (user) {
					state.user = user
				}
			}
		},
		actions: {
			updateUser(payload) {
				//simulated ajax call 
				//which can then use the above 
				//mutation to write to the state
				return new Promise(function (resolve, reject) {
					setTimeout(function () {
						return resolve({ type: 'test', data: payload })
					}, 500)
				}).then(function (res) {
					return store.commit('user', res.data)
				})
			}
		}
	})

	window.$store = store

	window.socket = io()
	window.socket.on('reload', () => {
		setTimeout(() => {
			console.log('reloading....')
			window.location.reload()
		}, 1500)
	})
}())
