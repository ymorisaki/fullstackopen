const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const password = process.env.PASSWORD
const url = `mongodb+srv://yuji:${password}@cluster0.t2mhw.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
})

Note.find({important: true}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

// note.save().then(result => {
//   console.log('note saved')
//   mongoose.connection.close()
// })