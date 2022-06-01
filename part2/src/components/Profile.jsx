import React from 'react'

const Profile = ({ user }) => {
  return (
    <>
      {user &&
        <p>{user.username}</p>
      }
      {!user &&
        <p>Please login</p>
      }
    </>
  )
}

export default Profile
