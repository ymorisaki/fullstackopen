import React from 'react'
import Person from './Person'

const Persons = ({persons, setPersons, filter}) => {
  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <ul>
      {filter === '' && persons.map(person => (
        <Person
          key={person.name}
          person={person}
          persons={persons}
          setPersons={setPersons}
        />
      ))}
      {filter !== '' && filterPersons.map(person => (
        <Person
          key={person.name}
          person={person}
          persons={persons}
          setPersons={setPersons}
        />
      ))}
    </ul>
  )
}

export default Persons