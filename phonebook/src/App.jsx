import React, {
  useState, useEffect
} from 'react'
import Persons from './Persons'
import Form from './Form'
import Filter from './Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    (async () => {
      const {data} = await axios.get('http://localhost:3001/persons')
      setPersons(data)
    })()
  }, [])

  return (
    <>
      <h1>PhoneBook</h1>
      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <Form persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </>
  )
}

export default App
