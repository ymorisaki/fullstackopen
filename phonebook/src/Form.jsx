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

    const sameName = persons.find(person => person.name === newName)

    if (sameName) {
      if (window.confirm(`${sameName.name}の電話番号を変更しますか？`)) {
        const {data} = await axios.put(`http://localhost:3001/persons/${sameName.id}`, newPerson)
        setPersons(persons.map(person => person.id === data.id ? data : person))
      } else {
        return
      }
    } else {
      const {data} = await axios.post('http://localhost:3001/persons', newPerson)
      setPersons([...persons, data])
    }

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