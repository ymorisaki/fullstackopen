import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import Person from './Person'
import { FIND_PERSON } from './query/query'

const Persons = ({persons}) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: {nameToSearch},
    skip: !nameToSearch,
  })

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={(() => setNameToSearch(null))}
      />
    )
  }

  return (
    <>
      <h2>Persons</h2>
      <ul>
        {persons.map(person => (
          <li key={person.id}>
            {person.name} {person.phone}
            <button type='button' onClick={() => setNameToSearch(person.name)}>show address</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Persons