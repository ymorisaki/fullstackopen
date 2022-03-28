import React, {useState} from 'react'

const AddPerson = ({persons, setPersons}) => {
  const [name, setName] = useState('')
  const [tel, setTel] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      name === '' ||
      tel === ''
    ) {
      return
    }

    setPersons([
      ...persons,
      {
        id: persons.length + 1,
        name,
        tel
      }
    ])
    setName('')
    setTel('')
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleTelChange = (event) => setTel(event.target.value)

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: <input onChange={handleNameChange} value={name} type="text" /></label>
      <label>Tel: <input onChange={handleTelChange} value={tel} type="tel" /></label>
      <button type='submit'>Add</button>
    </form>
  )
}

export default AddPerson