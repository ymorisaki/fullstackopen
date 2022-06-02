import React, { useState } from 'react'
import loginService from '../services/login'
import noteService from '../services/notes'

const FormLogin = ({ user, setUser, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginUser = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(loginUser))
      setUser(loginUser)
      noteService.setToken(loginUser.token)
      setUsername('')
      setPassword('')
      console.log(loginUser.token)
    } catch (error) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  return (
    <>
      {
        !user &&
        <form onSubmit={handleLogin}>
          <label>
            username
            <input
              type="text"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
          <br />
          <label>
            password
            <input
              type="text"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
          <br />
          <button type="submit" id="login-button">login</button>
        </form>
      }
    </>
  )
}

export default FormLogin