const BaseAPI = require('./base-api')
const mongoose = require('mongoose')
const pluralize = require('pluralize')
const fs = require('fs');

var router = require('express').Router();

let files = fs.readdirSync(__dirname + '/../../models');
console.log(files)
files.forEach(function (file) {

  if (!file.endsWith('.js')) return;
  if (file.endsWith('index.js')) return;
  if (file.endsWith('base-api.js')) return;
  if (file.endsWith('user.js')) return;

  let modelConfig = require('../../models/' + file);

  try {
    //CREATE MONGOOSE MODEL
    modelConfig.model = mongoose.model(modelConfig.name, modelConfig.schema)
    modelConfig.endpoint = modelConfig.endpoint || pluralize(modelConfig.name).toLowerCase()

    //REGISTER THE BASEAPI
    let routes = BaseAPI(modelConfig, modelConfig.model)
    Object.keys(routes).forEach(method => {
      console.log('[BASE API]', `/${modelConfig.endpoint}/:id?`)
      router.route(`/${modelConfig.endpoint}/:id?`)[method](routes[method])
    })

    //LOAD CUSTOM QUERY ROUTES
    modelConfig.queries = modelConfig.queries || []
    modelConfig.queries.forEach(query => {
      if (!query.endpoint || !query.reqType || !query.method) { return console.error('[QUERY ERROR] bad query config on model: ', modelConfig.name, query) }
      query.endpoint = query.endpoint[0] == '/' ? query.endpoint : '/' + query.endpoint
      var p = modelConfig.endpoint + query.endpoint
      console.log('[CUSTOM QUERY]:', p)
      router.route(p)[query.reqType](query.method)
    })


  } catch (e) {
    console.error('[MODEL ERROR] unable to load model in ', file)
  }
});

module.exports = router