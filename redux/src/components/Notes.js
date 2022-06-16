import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../creators/creators'

const Notes = () => {
  const notes = useSelector(state => state)
  const dispatch = useDispatch()
  return (
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important': ''}</strong>
            <button type="button" onClick={() => dispatch(toggleImportanceOf(note.id))}>toggleImportance</button>
          </li>
        ))}
      </ul>
  )
}

export default Notes