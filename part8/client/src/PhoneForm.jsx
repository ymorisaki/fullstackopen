import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_NUMBER, ALL_PERSONS } from "./query"

const PhoneForm = ({setError}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [changeNumber, result] = useMutation(EDIT_NUMBER, {
    refetchQueries: [
      {
        query: ALL_PERSONS
      }
    ]
  })

  const handleSubmit = e => {
    e.preventDefault()

    changeNumber({
      variables: {name, phone}
    })

    setName('')
    setPhone('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('Person not found')
    }
  }, [result.data])

  return (
    <div>
      <h2>Edit Number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name <input type="text" value={name} onChange={({target}) => setName(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Phone <input type="tel" value={phone} onChange={({target}) => setPhone(target.value)} />
          </label>
        </div>
        <button type="submit">edit</button>
      </form>
    </div>
  )
}

export default PhoneForm
