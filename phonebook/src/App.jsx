import React, {
  useState, useEffect
} from 'react'
import Person from './Person'
import Form from './Form'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([{
    name: 'Arto Hellas',
    number: '02-3333-3333'
  }])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  return (
    <>
      <h1>PhoneBook</h1>
      <Form
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>

      <ul>
        {persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
      </ul>
    </>
  )
}

export default App
