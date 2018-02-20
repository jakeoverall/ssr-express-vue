var router = require('express').Router()







module.exports = {
    getRoutes(app, passport, authClients) {

        Object.keys(authClients).forEach(c => {
            var client = authClients[c]
            router.get('/auth/' + c, passport.authenticate(c, client.scope));
            app.get('/auth/' + c + '/callback',
                passport.authenticate(c, {
                    successRedirect: '/authenticate',
                    failureRedirect: '/'
                }));
        })

        app.get('/authenticate', (req, res, next) => {
            res.send(req.user)
        })

        return router
    }
}