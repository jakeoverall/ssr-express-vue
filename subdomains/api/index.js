const BaseAPI = require('./base-api')
const mongoose = require('mongoose')
const pluralize = require('pluralize')
const fs = require('fs');

var router = require('express').Router();
global.Models = {}
var Queries = {}

// REGISTERS ALL OF THE MODELS FROM MODELS DIRECTORY
let files = fs.readdirSync(__dirname + '/../../models');
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
      router.route(`/${modelConfig.endpoint}/:id?`)[method](routes[method])
    })

    global.Models[modelConfig.endpoint] = modelConfig.model
    if (modelConfig.queries) {
      Queries[modelConfig.endpoint] = modelConfig.queries
    }
  } catch (e) {
    console.error('[MODEL ERROR] unable to load model in ', file)
  }
});

//LOAD CUSTOM QUERY ROUTES AFTER ALL MODELS REGISTERED
Object.keys(Queries).forEach(k => {
  try {
    Queries[k].forEach(query => {
      if (!query.endpoint || !query.reqType || !query.method) { return console.error('[QUERY ERROR] bad query config on model: ', modelConfig.name, query) }
      router.route(query.endpoint)[query.reqType](query.method)
    })
  } catch (e) {
    console.error('[MODEL QUERIES ERROR] unable to load queries for ', k)
  }
})

module.exports = router