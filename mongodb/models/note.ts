import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

mongoose.set('toJSON', {
  transform: (_document, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

export = mongoose.model('Note', noteSchema)
