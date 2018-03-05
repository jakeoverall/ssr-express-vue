let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = 'List'

let schema = new Schema({
  name: String,
  todos: [{ type: ObjectId, ref: 'Todo' }]
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
    {
      reqType: 'post',
      endpoint: '/lists/:listId/todos',
      method(req, res, next) {
        Models.lists.findById(req.params.listId)
          .then(list => {
            if (!list) { return next(new Error('Invalid listId')) }
            Models.todos.create(req.body)
              .then(t => {
                list.todos.addToSet(t._id)
                list.save().then(() => {
                  res.send({ message: 'Successfully added Todo' })
                })
              })
              .catch(next)
          })
          .catch(next)
      }
    },
    {
      reqType: 'get',
      endpoint: '/lists/:listId/todos',
      method(req, res, next) {
        Models.lists.findById(req.params.listId).populate('todos').exec((err, list) => {
          if (err) (next(err))
          if (!list) { return next(new Error('[BAD REQUEST] Invalid ListId')) }
          res.send(list)
        })
      }
    },
    {
      reqType: 'put',
      endpoint: '/lists/:listId/todos/:todoId',
      method(req, res, next) {
        Models.todos.findById(req.params.todoId)
          .then(todo => {
            if (!todo) { return next(new Error('Invalid todoId')) }
            todo.description = req.body.description
            todo.save()
              .then(res.send({ message: 'succesfully updated', data: todo }))
              .catch(next)
          })
          .catch(next)
      }
    },
    {
      reqType: 'delete',
      endpoint: '/lists/:listId/todos/:todoId',
      method(req, res, next) {
        Models.lists.findById(req.params.listId).then(list => {
          if (!list) { return next(new Error('Invalid listId')) }
          Models.todos.findByIdAndRemove(req.params.listId)
            .then(todo => {
              list.todos.remove(req.params.todoId)
              list.save()
                .then(() => res.send({ message: 'successfully removed todo' }))
                .catch(next)
            })
        })
          .catch(next)
      }
    },
  ],
  // restrictOwnerQuery: true,
  // preventRemove: true,
  authLevels: {
    read: 'public',
    write: 'public'
  }
}