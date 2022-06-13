import React from 'react'
import Note from './Note'
import noteService from '../services/notes'

const Notes = ({ showAll, notes, setNotes }) => {
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
  const toggleImportant = async (id) => {
    try {
      const note = notes.find(n => n.id === id)
      const changeNote = { ...note, important: !note.important }
      const response = await noteService.update(id, changeNote)
      setNotes(notes.map(note => note.id !== id ? note: response.data))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ul>
      {notesToShow.map(note => <Note key={note.id} note={note} toggleImportant={() => toggleImportant(note.id)} />)}
    </ul>
  )
}

export default Notes