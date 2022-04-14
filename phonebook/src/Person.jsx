import React from 'react'
import axios from 'axios'

const Person = ({person, persons, setPersons}) => {
  const handleClick = async () => {
    await axios.delete(`http://localhost:3001/persons/${person.id}`)
    setPersons(persons.filter(deleted => deleted.id !== person.id))
  }

  return (
    <li>Name: {person.name} / Number: {person.number} <button type="button" onClick={handleClick}>Delete</button></li>
  )
}

export default Person