import React, {useState} from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import PhoneForm from './PhoneForm'
import Notify from './Notify'
import { useQuery } from '@apollo/client'
import { ALL_PERSONS } from './query'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)

  const setError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <PersonForm setError={setError} />
      <PhoneForm setError={setError} />
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
    </div>
  )
}

export default App
