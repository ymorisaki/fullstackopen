import { useState } from 'react'
import { useQuery} from '@apollo/client'
import { ALL_PERSONS } from './query'

import Persons from './Persons'
import PersonForm from './PersonForm'
import PhoneForm from './PhoneForm'
import Notice from './Notice'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS)

  const notice = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <>
      {errorMessage && <Notice message={errorMessage} />}
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notice} />
      <PhoneForm setError={notice} />
    </>
  )
}

export default App
