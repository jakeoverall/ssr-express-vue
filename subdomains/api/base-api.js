const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

function API(modelConfig, schema) {
  if (modelConfig.preventDefaultApi) { return {} }
  return {
    get: get,
    post: create,
    put: update,
    delete: remove
  }

  function hasAccess(req, action, type, next, cb) {
    if (!modelConfig.authLevels || !modelConfig.authLevels[type] || modelConfig.authLevels[type] == 'public') {
      return cb(req.user)
    }
    if (req.user && req.user.hasAccess(modelConfig.authLevels[type])) {
      return cb(req.user)
    }
    return next(handleResponse(action, null, new Error('Invalid Permission')))
  }

  function get(req, res, next) {
    var id = req.params.id || req.query.id || '';
    var params = req.params.id ? req.params : {};
    var query = req.query.with || '';
    hasAccess(req, actions.find, 'read', next, () => {
      if (id) {
        schema.findById(id)
          .populate(query)
          .then(data => {
            return res.send(handleResponse(actions.find, data))
          })
          .catch(error => {
            return next(handleResponse(actions.find, null, error))
          })

      } else {
        if (modelConfig.restrictOwnerQuery) {
          if (req.user) {
            params = { creatorId: req.user._id }
          } else {
            return next(handleResponse(actions.findAll, null, new Error('Invalid Permission')))
          }
        }

        schema.find(params, query)
          .populate(query)
          .then(data => {
            var result = handleResponse(actions.findAll, data);
            result.query = query
            result.params = params
            return res.send(result)
          })
          .catch((error) => {
            return next(handleResponse(actions.findAll, null, error))
          })
      }
    })
  }

  function create(req, res, next) {
    var action = actions.create
    hasAccess(req, action, 'write', next, () => {
      let model = new schema(req.body)
      if (req.user) {
        model.creatorId = req.user._id
      }
      model.save()
        .then(data => {
          return res.send(handleResponse(action, data))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    })
  }

  function update(req, res, next) {
    var action = actions.update
    var id = req.params.id || req.query.id || '';

    if (!id) {
      return next(handleResponse(action, null, new Error('Invalid request no id provided')))
    }
    hasAccess(req, action, 'write', next, () => {
      schema.findOneAndUpdate({ _id: id }, req.body)
        .then(data => {
          return res.send(handleResponse(action, { message: 'Successfully updated' }))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    })
  }

  function remove(req, res, next) {
    var action = actions.remove
    var id = req.params.id || req.query.id || '';

    if (!id || modelConfig.preventRemove) {
      return next(handleResponse(action, null, new Error('Invalid request no id provided')))
    }

    hasAccess(req, action, 'write', next, (u) => {
      schema.findById(id).then(function (data) {
        if (data.creatorId == req.user._id || u.role != 'student') {
          schema.findById(id).then(model => {
            model.remove()
            res.send(handleResponse(action, { message: 'Successfully removed' }))
          })
        } else {
          return res.status(401).send(handleResponse(action, null, new Error('Invalid Access')))
        }
      })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    })
  }

  function handleResponse(action, data, error) {
    var response = {
      schemaType: modelConfig.name,
      action: action,
      data: data
    }
    if (error) {
      error.details = response
      return error

    }
    return response
  }
}

module.exports = API