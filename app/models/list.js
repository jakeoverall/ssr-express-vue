let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


let schema = new Schema({
  name: String,
  todos: [{ type: ObjectId, ref: 'todo' }]
})

schema.statics.addTodo = function (listId, todoId) {
  return new Promise((resolve, reject) => {
    this.findById(listId)
      .then(list => {
        if (!list) { throw new Error('Invalid ListID') }
        list.todos.addToSet(todoId)
        return list.save()
      })
      .then(resolve)
      .catch(reject)
  })
}

var model = mongoose.model('list', schema)


module.exports = {
  model,
  schema: schema,
  queries: [
    //custom route handlers
    {
      reqType: 'use',
      url: '/api/lists/:listId',
      method(req, res, next) {
        model.findById(req.params.listId).then(list => {
          req.LIST = list
          next()
        })
        res.status(400).send(new Error('[BAD REQUEST] Invalid ListId'))
      }
    }
  ],
  preventBaseApi: false,
  authLevels: {
    read: 'public',
    write: 'moderator'
  }
}