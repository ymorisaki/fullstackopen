const mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config()
const url = process.env.MONGODB_URI
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(\d{2}|\d{3})-\d{4}-\d{4}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    },
    required: [true, 'User phone number required'],
  }
})

console.log(`connecting ${url}`)

mongoose.connect(url).then(() => {
  console.log('connected to MongoDB')
}).catch(() => {
  console.log(`error connecting to MongoDB: ${url}`)
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
