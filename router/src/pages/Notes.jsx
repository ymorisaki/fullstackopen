import React from 'react'
import { Link } from 'react-router-dom'

const Notes = ({notes}) => {
  return (
    <ul>
      {notes.map(note => (
        <li key={note.id}><Link to={`/notes/${note.id}`}>{note.content}</Link></li>
      ))}
    </ul>
  )
}

export default Notes