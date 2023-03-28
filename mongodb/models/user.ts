import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userName: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returndObject) => {
    returndObject.id = returndObject.__id.toString()
    delete returndObject.__id
    delete returndObject.___v
    delete returndObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

export = User
