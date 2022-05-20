const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const url = process.env.MONGODB_URI
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

console.log(`connecting ${url}`)

mongoose.connect(url).then(result => {
  console.log(`connected to MongoDB`)
}).catch(err => {
  console.log(`error connecting to MongoDB: ${g6CwCR9xIASus1x1}`)
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
