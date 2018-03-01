let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let name = 'Todo'

let schema = new Schema({
  description: String,
  listId: { type: ObjectId, ref: 'list' }
})

module.exports = {
  name,
  schema,
  //custom route handlers
  queries: [],
  authLevels: {
    read: 'public',
    write: 'moderator'
  }
}