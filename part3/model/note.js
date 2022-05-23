const mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config()
const url = process.env.MONGODB_URI
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
})

console.log(`connecting to ${url}`)

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
}).catch(err => {
  console.log(`error connecting to MongoDB: ${err.message}`)
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', noteSchema)
