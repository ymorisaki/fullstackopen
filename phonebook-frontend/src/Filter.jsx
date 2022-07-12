import React from 'react'

const Filter = ({setFilter}) => {
  const handleChange = (e) => {
    setFilter(e.target.value.toLowerCase())
  }

  return (
      <label>filter shown with <input type="text" onChange={handleChange} /></label>
  )
}

export default Filter
