import User from '../models/user'
import Note from '../models/note'

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Node.js',
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({
    content: 'will remove'
  })

  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

export = {
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb
}
