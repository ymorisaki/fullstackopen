import React, { useState } from 'react'
import noteService from '../services/notes'

const FormNote = ({ user, notes, setNotes }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = async (event) => {
    event.preventDefault()

    const newObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: false,
    }

    const saved = await noteService.create(newObject)
    setNotes(notes.concat(saved))
    setNewNote('')
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <>
      {user &&
      <form onSubmit={addNote}>
        <input
          type="text"
          id="note-input"
          onChange={handleChange}
          value={newNote}
          placeholder="..."
        />
        <button id="note-save" type="submit">save</button>
      </form>
      }
    </>
  )
}

export default FormNote