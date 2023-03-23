import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'

(async () => {
  dotenv.config()

  const url = process.env.MONGODB_URI

  console.log(url)

  mongoose.set('strictQuery', false)

  if (url) {
    mongoose.connect(url)
  }

  const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
  })

  noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const Note = mongoose.model('Note', noteSchema)

  const note = new Note({
    content: 'Node.js',
    important: true
  })

  // note.save().then(result => {
  //   console.log('Save!')
  //   mongoose.connection.close()
  // })

  const result = await Note.find({})

  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()

})()

