module.exports = {
	local: {
		usernameField: 'email',
		passwordField: 'password',
		strategy: require('passport-local').Strategy
	}
	,
	google: {
		clientID: 'your-secret-clientID-here',
		clientSecret: 'your-client-secret-here',
		strategy: require('passport-google-oauth').OAuth2Strategy
	}
	// ,
	// facebook: {
	// 	clientID: 'your-secret-clientID-here',
	// 	clientSecret: 'your-client-secret-here',
	// 	callbackURL: '/auth/google/callback'
	// }
	// ,
	// twitter: {
	// 	clientID: 'your-secret-clientID-here',
	// 	clientSecret: 'your-client-secret-here',
	// 	callbackURL: '/auth/google/callback'
	// }
	// ,
	// github: {
	// 	clientID: 'your-secret-clientID-here',
	// 	clientSecret: 'your-client-secret-here',
	// 	callbackURL: '/auth/google/callback'
	// }

};