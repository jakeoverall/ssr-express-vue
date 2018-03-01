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
    // if (model.accessLevel[type] == 'any') {
    //   return cb({ auth: 'open' })
    // }
    // Users.findById(req.session.uid).then(user => {
    //   req.session.uid && user && user.hasAccess(model.accessLevel[type]) ? cb(user) : next(handleResponse(action, null, { error: 'Not Authorized' }))
    // })
  }

  function get(req, res, next) {
    var id = req.params.id || req.query.id || '';
    var params = req.params.id ? req.params : {};
    var query = req.query.with || '';
    // hasAccess(req, actions.find, 'read', next, () => {
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
          params = { creatorId: req.session.uid }
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
    // })
  }

  function create(req, res, next) {
    var action = actions.create
    console.log(req.body)
    hasAccess(req, action, 'write', next, () => {
      try {
        let model = new schema(req.body)
        model.creatorId = req.session.uid
        model.save()
          .then(data => {
            return res.send(handleResponse(action, data))
          })
          .catch(error => {
            return next(handleResponse(action, null, error))
          })
      }
      catch (e) {
        console.log(e)
      }
    })
  }

  function update(req, res, next) {
    var action = actions.update
    var id = req.params.id || req.query.id || '';

    if (!id) {
      return next(handleResponse(action, null, { error: { message: 'Invalid request no id provided' } }))
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

    if (!id || modelConfig.noRemove) {
      return next(handleResponse(action, null, { error: { message: 'Invalid request no id provided' } }))
    }

    hasAccess(req, action, 'write', next, (u) => {
      schema.findById(id).then(function (data) {
        if (data.creatorId == req.session.uid || u.role != 'student') {
          schema.findById(id).then(model => {
            model.remove()
            res.send(handleResponse(action, { message: 'Successfully removed' }))
          })
        } else {
          return res.status(401).send(handleResponse(action, null, { error: 'Invalid Access' }))
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
      response.error = error
    }
    return response
  }
}

module.exports = API