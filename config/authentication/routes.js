module.exports = {
    register(app, passport, authClients) {

        Object.keys(authClients).forEach(c => {
            var client = authClients[c]
            if (c == 'local') {
                app.post('/auth/login', passport.authenticate('local-login'), sendUser)
                app.post('/auth/register', passport.authenticate('local-register'), sendUser)
            }

            app.get('/auth/' + c, passport.authenticate(c, client.scope));
            app.get('/auth/' + c + '/callback',
                passport.authenticate(c, {
                    successRedirect: '',
                    failureRedirect: '/auth'
                }));
        })

        app.get('/authenticate', (req, res, next) => {
            //ALL SOCAIAL AUTH ROUTES END UP HERE
            if (req.user) {
                return res.send(req.user)
            }
            return res.redirect('/auth')
        })

        function sendUser(req, res, next) {
            if (req.user) {
                return res.send(req.user)
            }
            res.status(400).send(err)
        }
    }
}