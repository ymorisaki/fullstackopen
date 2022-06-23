import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({toLogin}) => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    toLogin('Yuji')
    navigate('/')
  }

  return (
    <>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <label>Name <input type="text" name="name" /></label><br />
      <label>Password <input type="password" name="password" /></label><br />
      <button>Login</button>
    </form>
    </>
  )
}

export default Login