import React from 'react'

const Note = ({ note, toggleImportant }) => {
  const label = note.important ? 'is importance' : 'not importance'
  return (
    <li className='note'><span className='note-text'>{note.content}</span><button type="button" className='toggle' onClick={toggleImportant}>{label}</button></li>
  )
}

export default Note