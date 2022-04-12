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
      number: newNumber
    }])
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (e) => {
    e.preventDefault()

    setNewName(e.target.value)
    console.log(newName)
  }

  const handleNumberChange = (e) => {
    e.preventDefault()

    setNewNumber(e.target.value)
    console.log(newNumber)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:
        <input type="text" value={newName} onChange={handleNameChange} />
        </label>
        <button>save</button>
      </div>
      <div>
        <label>Number:
        <input type="tel" value={newNumber} onChange={handleNumberChange} />
        </label>
        <button>save</button>
      </div>
    </form>
  )
}

export default Form