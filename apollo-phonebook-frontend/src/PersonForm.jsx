import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, ALL_PERSONS } from './query'

const PersonForm = ({setError}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{query: ALL_PERSONS}],
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
        city,
      }
    })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={submit}>
        <div>
          <label>Name <input type="text" value={name} onChange={({target}) => setName(target.value)} /></label>
        </div>

        <div>
          <label>Phone <input type="text" value={phone} onChange={({target}) => setPhone(target.value)} /></label>
        </div>

        <div>
          <label>Street <input type="text" value={street} onChange={({target}) => setStreet(target.value)} /></label>
        </div>

        <div>
          <label>City <input type="text" value={city} onChange={({target}) => setCity(target.value)} /></label>
        </div>
        <div>
          <button type='submit'>Create</button>
        </div>
      </form>
    </>
  )
}

export default PersonForm