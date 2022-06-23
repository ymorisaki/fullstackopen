import React from 'react'

const Note = ({note}) => {
  if (!note) {
    return (
      <h2>No Index</h2>
    )
  }

  return (
    <>
      <h2>{note.content}</h2>
      <p>{note.user}</p>
      {note.important ?
        <p><strong>important</strong></p> :
        <></>
      }
    </>
  )
}

export default Note