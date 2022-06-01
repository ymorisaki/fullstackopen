import React, { useState } from 'react'
import noteService from '../services/notes'

const FormNote = ({ user, notes, setNotes }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = async (event) => {
    event.preventDefault()

    const newObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    await noteService.create(newObject)
    setNotes(notes.concat(newObject))
    setNewNote('')
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <>
      {user &&
      <form onSubmit={addNote}>
        <input type="text" onChange={handleChange} value={newNote} placeholder="..." />
        <button type="submit">save</button>
      </form>
      }
    </>
  )
}

export default FormNote