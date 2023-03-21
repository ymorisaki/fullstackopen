import { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_PERSON, ALL_PERSONS } from "./query"


const PersonForm = ({setError}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [
      {
        query: ALL_PERSONS
      }
    ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name) {
    // if (!name || !city || !street) {
      alert('名前と住所を入力してください')
      return
    }

    createPerson({
      variables: {
        name, phone, city, street
      }
    })

    setName('')
    setPhone('')
    setCity('')
    setStreet('')
  }

  return (
    <>
      <h2>Add Person</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name <input type="text" value={name} onChange={({target}) => setName(target.value)} /></label>
        </div>
        <div>
          <label>Phone <input type="tel" value={phone} onChange={({target}) => setPhone(target.value)} /></label>
        </div>
        <div>
          <label>
            city <input type="text" value={city} onChange={({target}) => setCity(target.value)} />
          </label>
        </div>
        <div>
          <label>
            street <input type="text" value={street} onChange={({target}) => setStreet(target.value)} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default PersonForm
