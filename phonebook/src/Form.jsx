import React, {useState} from 'react'

const Form = (
  {
    persons,
    setPersons,
  }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newName === '' || newNumber === '') {
      return
    }

    if (persons.some(person => person.name === newName)) {
      alert('同名の人物が存在します。')
      return
    }

    setPersons([...persons, {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }])
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