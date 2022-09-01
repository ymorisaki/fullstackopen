import React, {useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from './query'

const PhoneForm = ({setError}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [changeNumber, result] = useMutation(EDIT_NUMBER)

  const submit = (e) => {
    e.preventDefault()

    changeNumber({
      variables: {
        name,
        phone,
      }
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
      <h2>Chage Number</h2>
      <form onSubmit={submit}>
        <div>
          <label>Name <input type="text" value={name} onChange={({target}) => setName(target.value)} /></label>
        </div>
        <div>
          <label>Phone <input type="text" value={phone} onChange={({target}) => setPhone(target.value)} /></label>
        </div>
        <p>
          <button>change</button>
        </p>
      </form>
    </>
  )
}

export default PhoneForm