import { useState } from 'react'
import axios from 'axios'

const FormSignup = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('/api/users', {
        username,
        name,
        password
      })

      setUsername('')
      setName('')
      setPassword('')
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>username
          <input
            className=""
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <br />
        <label>name
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <br />
        <label>password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <br />
        <button type="submit">SignUp</button>
      </form>
    </>
  )
}

export default FormSignup