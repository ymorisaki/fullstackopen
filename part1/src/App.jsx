import React, { useState } from 'react'
import AddPerson from './AddPerson'
import Filter from './Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', tel: '040-123456', id: 1 },
    { name: 'Ada Lovelace', tel: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', tel: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', tel: '39-23-6423122', id: 4 }
  ])
  const [filter, setFilter] = useState('')
  const [filterFlag, setFilterFlag] = useState(false)

  return (
    <>
      <h1>PhoneBook</h1>

      <h2>AddPerson</h2>
      <AddPerson
        persons={persons}
        setPersons={setPersons}
      />

      <h2>Filter</h2>
      <Filter
        filter={filter}
        setFilter={setFilter}
        setFilterFlag={setFilterFlag}
      />

      <h2>Persons</h2>
      <ul>
        {!filterFlag &&
          persons.map(person => <li key={person.id}>{person.name} {person.tel}</li>)
        }
        {filterFlag &&
          persons.filter(person => person.name.includes(filter))
            .map(person => <li key={person.id}>{person.name} {person.tel}</li>)
        }
      </ul>
    </>
  )
}

export default App
