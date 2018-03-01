let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = 'List'

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

module.exports = {
  name,
  schema,
  queries: [
    //custom route handlers
    // {
    //   reqType: 'use',
    //   url: '/api/lists/:listId',
    //   method(req, res, next) {
    //     model.findById(req.params.listId).then(list => {
    //       req.LIST = list
    //       next()
    //     })
    //     res.status(400).send(new Error('[BAD REQUEST] Invalid ListId'))
    //   }
    // }
  ],
  authLevels: {
    read: 'public',
    write: 'moderator'
  }
}