import React, {useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from './query/query'

const PhoneForm = ({setError}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [changeNumber, result] = useMutation(EDIT_NUMBER)

  const submit = event => {
    event.preventDefault()

    changeNumber({
      variables: {name, phone}
    })

    setName('')
    setPhone('')
  }

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('person not found')
    }
  }, [result.data])

  return (
    <>
      <h2>change number</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <input type="text" value={name} onChange={({target}) =>setName(target.value)} />
          </label>
        </div>
        <div>
          <label>
            phone
            <input type="text" value={phone} onChange={({target}) => setPhone(target.value)} />
          </label>
        </div>
        <button type="submit">change number</button>
      </form>
    </>
  )
}

export default PhoneForm