import React, {useState} from 'react'
import axios from 'axios'

const Form = (
  {
    persons,
    setPersons,
    setMessage,
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
        try {
          const {data} = await axios.put(`/api/persons/${sameName.id}`, newPerson)
          setPersons(persons.map(person => person.id === data.id ? data : person))
        } catch (err) {
          console.log(err.response)
          setMessage({visible: true, error: true, valid: true})
          setTimeout(() => {
            setMessage({visible: false, error: true, valid: true})
          }, 2000)
          return
        }
      } else {
        return
      }
    } else {
      try {
        const {data} = await axios.post('/api/persons', newPerson)
        setPersons(persons.concat([data]))
        setMessage({visible: true, error: false, valid: true})
        setTimeout(() => {
          setMessage({visible: false, error: false, valid: true})
        }, 2000)
      } catch (error) {
        setMessage({visible: true, error: true, valid: false})
        setTimeout(() => {
          setMessage({visible: false, error: false, valid: true})
        }, 5000)
        return
      }
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