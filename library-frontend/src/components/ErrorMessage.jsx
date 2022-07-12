import React from 'react'

const ErrorMessage = ({errorMessage}) => {
  const style = {
    color: 'red'
  }
  return (
    <>
      {errorMessage &&
        <p style={style}><strong>{errorMessage}</strong></p>
      }
    </>
  )
}

export default ErrorMessage