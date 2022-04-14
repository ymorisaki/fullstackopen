import React from 'react'

const Persons = ({persons, filter}) => {
  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <ul>
      {filter === '' && persons.map(person => <li key={person.name}>Name: {person.name} / Number: {person.number}</li>)}
      {filter !== '' && filterPersons.map(person => <li key={person.name}>Name: {person.name} / Number: {person.number}</li>)}
    </ul>
  )
}

export default Persons