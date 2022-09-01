import React from 'react'

const Notify = ({errorMessage}) => {
  if (!errorMessage) {
    return null
  }

  return (
    <div>
      <strong>{errorMessage}</strong>
    </div>
  )
}

export default Notify
