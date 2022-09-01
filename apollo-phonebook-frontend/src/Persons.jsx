import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { FIND_PERSON } from './query'
import Person from './Person'

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: {nameToSearch},
    skip: !nameToSearch,
  })

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    )
  }

  return (
    <>
      <h2>Persons</h2>
      <ul>
        {persons.map(person => (
          <li key={person.name}>
            {person.name} {person.phone}
            <button type='button' onClick={() => setNameToSearch(person.name)}>
              show address
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Persons