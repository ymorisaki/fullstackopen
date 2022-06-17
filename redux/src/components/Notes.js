import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
const Notes = () => {
  const notes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.notes
    }
    return state.filter === 'IMPORTANT' ?
      state.notes.filter(note => note.important) :
      state.notes.filter(note => !note.important)
  })
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