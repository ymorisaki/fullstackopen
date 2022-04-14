import React from 'react'

const Finder = ({setText}) => {
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

export default Finder