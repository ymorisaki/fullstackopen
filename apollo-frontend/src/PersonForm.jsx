import React, {useState} from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_PERSON, ALL_PERSONS } from './query/query'

const PersonForm = ({setError}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [
      {
        query: ALL_PERSONS,
      }
    ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = event => {
    event.preventDefault()

    createPerson({
      variables: {
        name,
        phone,
        street,
        city
      }
    })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <input
              type="text"
              value={name}
              onChange={({target}) => setName(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            phone
            <input
              type="text"
              value={phone}
              onChange={({target}) => setPhone(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            street
            <input
              type="text"
              value={street}
              onChange={({target}) => setStreet(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            city
            <input
              type="text"
              value={city}
              onChange={({target}) => setCity(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default PersonForm