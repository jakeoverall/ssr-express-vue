module.exports = {
	local: {
		usernameField: 'email',
		passwordField: 'password',
		strategy: require('passport-local').Strategy
	}
	,
	google: {
		clientID: 'CLIENTID',
		clientSecret: 'CLIENTSECRET',
		strategy: require('passport-google-oauth').OAuth2Strategy,
		scope: { scope: ['profile', 'email'] }
	}
	// ,
	// facebook: {
	// 	clientID: 'your-secret-clientID-here',
	// 	clientSecret: 'your-client-secret-here',
	// }
	// ,
	// twitter: {
	// 	clientID: 'your-secret-clientID-here',
	// 	clientSecret: 'your-client-secret-here',
	// }
	// ,
	// github: {
	// 	clientID: 'your-secret-clientID-here',
	// 	clientSecret: 'your-client-secret-here',
	// }

};