import React from 'react'

const Note = ({ note, toggleImportant }) => {
  const label = note.important ? 'importance' : 'not importance'
  return (
    <li className='note'>{note.content}<button type="button" onClick={toggleImportant}>{label}</button></li>
  )
}

export default Note