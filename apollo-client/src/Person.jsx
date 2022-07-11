import React from 'react'

const Person = ({person, onClose}) => {
  return (
    <>
      <h2>{person.name}</h2>
      <p>{person.address.street} {person.address.city}</p>
      {person.phone &&
        <p>{person.phone}</p>
      }
      <button type="button" onClick={onClose}>close</button>
    </>
  )
}

export default Person