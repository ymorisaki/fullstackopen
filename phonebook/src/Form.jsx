import React, {useState} from 'react'
import axios from 'axios'

const Form = (
  {
    persons,
    setPersons,
  }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const newPerson = {
    name: newName,
    number: newNumber,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newName === '' || newNumber === '') {
      return
    }

    if (persons.some(person => person.name === newName)) {
      alert('同名の人物が存在します。')
      return
    }

    const {data} = await axios.post('http://localhost:3001/persons', newPerson)

    setPersons([...persons, data])
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    e.preventDefault()
    setNewNumber(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:
        <input type="text" value={newName} onChange={handleNameChange} />
        </label>
      </div>
      <div>
        <label>Number:
        <input type="tel" value={newNumber} onChange={handleNumberChange} />
        </label>
      </div>
      <button>add</button>
    </form>
  )
}

export default Form