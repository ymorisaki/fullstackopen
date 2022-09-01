import React from 'react'

const Person = ({person, onClose}) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>
        {person.phone}
      </div>
      <button type='button' onClick={onClose}>Close</button>
    </div>
  )
}

export default Person