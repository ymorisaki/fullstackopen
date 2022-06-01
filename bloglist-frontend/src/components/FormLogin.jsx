import {useState} from 'react'
import login from '../services/login'
import blogs from '../services/blogs'

const FormLogin = ({user, setUser, setMessage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const userData = await login({
        username, password
      })

      blogs.setToken(userData.token)
      window.localStorage.setItem('blogappUserData', JSON.stringify(userData))
      setUsername(userData.username)
      setUser(userData)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage({
        message: 'username or password invalid',
        error: true,
      })
      setTimeout(() => {
        setMessage({
          message: '',
          error: false,
        })
      }, 4000)
    }
  }

  return (
    <>
      {user.username === '' &&
      <form onSubmit={handleSubmit}>
        <label>username <input type="text" value={username} onChange={({target}) => setUsername(target.value)} /></label>
        <br />
        <label>password <input type="text" value={password} onChange={({target}) => setPassword(target.value)} /></label>
        <br />
        <button type="submit">login</button>
      </form>
      }
    </>
  )
}

export default FormLogin
