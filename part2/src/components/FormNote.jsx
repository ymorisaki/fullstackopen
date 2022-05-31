import React from 'react'
import noteService from '../services/notes'

const FormNote = ({notes, setNotes, newNote, setNewNote}) => {
  const addNote = async (event) => {
    event.preventDefault()

    const newObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    const response = await noteService.create(newObject)
    newObject.id = response.data.id
    setNotes(notes.concat(newObject))
    setNewNote('')
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <form onSubmit={addNote}>
      <input type="text" onChange={handleChange} value={newNote} placeholder="..." />
      <button type="submit">save</button>
    </form>
  )
}

export default FormNote