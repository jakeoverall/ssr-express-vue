var router = require('express').Router
var subdomain = require('express-subdomain')
var config = require('./config')


module.exports = {
  init(app) {
    config.forEach(sd => {
      try {
        if (sd.preware) {
          app.use(sd.mount, sd.preware)
        }

        app.use(subdomain(sd.mount, sd.router))

        if (sd.outware) {
          app.use(sd.mount, sd.outware)
        }
        if (sd.catcher) {
          app.use(sd.mount, sd.catcher)
        }
      } catch (e) {
        console.error('[SUBDOMAIN ERROR] unable to load subdomain', sd)
      }
    })
  }
}