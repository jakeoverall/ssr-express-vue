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
    // preware(req, res, next) { },
    // outware(req, res, next) { },
    // catcher(err, req, res, next) { },
    router: apiRoutes
  }
]