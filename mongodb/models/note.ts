import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const URL = process.env.MONGODB_URI as string

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

mongoose.set('strictQuery', false)

mongoose.connect(URL).then(() => {
  console.log(`connected to MongoDB`)
}).catch(err => {
  console.log(`error connecting to MongoDB: ${err.message}`)
})

mongoose.set('toJSON', {
  transform: (_document, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

export const Note = mongoose.model('Note', noteSchema)
