import React from 'react'

const Profile = ({ user, setUser }) => {
  const logout = () => {
    setUser({
      username: '',
      name: '',
      token: '',
    })
    window.localStorage.removeItem('blogappUserData')
  }

  return (
    <>
      {user.username &&
    <p>{user.username} logged in <button className='button-logout' type="button" onClick={logout}>LogOut</button></p>
      }
    </>
  )
}

export default Profile