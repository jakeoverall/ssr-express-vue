let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId


let schema = new Schema({
  description: String,
  listId: { type: ObjectId, ref: 'list' }
})

module.exports = {
  model: mongoose.model('todo', schema),
  schema: schema,
  queries: [
    //custom route handlers
    {

    }
  ],
  preventBaseApi: false,
  authLevels: {
    read: 'public',
    write: 'moderator'
  }
}