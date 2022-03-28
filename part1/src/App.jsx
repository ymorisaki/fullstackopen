import React, {useState} from 'react'

const NumberItem = ({name, tel}) => {
  return (
    <li>{name}: {tel}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filterList, setFilterList] = useState([
    ...persons
  ])
  const [newName, setNewName] = useState('')
  const [newTel, setNewTel] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      newName === '' ||
      newTel === ''
    ) {
      return
    }

    const newPerson = [
      ...persons,
      {
        id: persons.length + 1,
        name: newName,
        tel: newTel
      }
    ]

    setPersons(newPerson)
    setNewName('')
    setNewTel('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleTelChange = (event) => {
    setNewTel(event.target.value)
  }

  const handleFilterSubmit = (event) => {
    event.preventDefault()

    if (filter === '') {
      setFilterList(persons)

      return
    }

    setFilterList(persons.filter(person => person.name.includes(filter)))
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleClear = () => setFilterList(persons)

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <div><label>Name: <input onChange={handleNameChange} value={newName} type="text" placeholder='Name is' /></label></div>
        <div><label>Number: <input onChange={handleTelChange} value={newTel} type="tel" placeholder='00-0000-0000' /></label></div>
        <button>add</button>
      </form>

      <h2>Filter</h2>
      <form onSubmit={handleFilterSubmit}>
        <label>Filter name: <input onChange={handleFilterChange} value={filter} type="text" /></label>
        <button>Filter</button>
        <button type='button' onClick={handleClear}>Clear</button>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filterList.map(person => <NumberItem key={person.id} name={person.name} tel={person.tel} />)}
      </ul>
    </div>
  )
}

export default App
