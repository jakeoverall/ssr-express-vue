var apiRoutes = require('./api')

/**
 * ********************************************************
 *   WARNING GOTCHA: 
 *    TO USE SUBDOMAINS MAKE SURE YOU EDIT YOUR HOSTS FILE
 *    FOR LOCAL DEVELOPMENT
 *    LINUX: /etc/hosts
 *    WINDOWS: %systemroot%\system32\drivers\etc
 * ********************************************************
 */

module.exports = [
  {
    mount: 'api',
    preware(req, res, next) {
      if (req.type == 'POST' && req.user) {
        req.body.creatorId = req.user._id
      }
      next()
    },
    // outware(req, res, next) { },
    // catcher(err, req, res, next) { },
    router: apiRoutes
  }
]