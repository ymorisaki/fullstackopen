import React, {
  useState, useEffect
} from 'react'
import Persons from './Persons'
import Form from './Form'
import Filter from './Filter'
import Message from './Message'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState({visible: false, error: false})

  useEffect(() => {
    (async () => {
      const {data} = await axios.get('/api/persons')
      setPersons(data)
    })()
  }, [])

  return (
    <>
      <h1>PhoneBook</h1>
      <Filter setFilter={setFilter} />
      <h2>add a new</h2>
      <Message message={message} />
      <Form persons={persons} setPersons={setPersons} setMessage={setMessage} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </>
  )
}

export default App
