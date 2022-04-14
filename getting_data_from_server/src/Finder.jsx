import React from 'react'

const Find = ({setText}) => {
  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <label>
      find countries　
      <input type="text" onChange={handleChange} />
    </label>
  )
}

export default Find