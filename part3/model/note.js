const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const url = process.env.MONGODB_URI
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

console.log(`connecting to ${url}`)

mongoose.connect(url).then(result => {
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
