import React from 'react'
import { useDispatch } from 'react-redux'
import {createNote} from '../creators/creators'

const NewNote = () => {
  const dispatch = useDispatch()
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
      <form onSubmit={addNote}>
        <input type="text" name="note" />
        <button type="submit">add</button>
      </form>
  )
}

export default NewNote