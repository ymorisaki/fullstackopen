import React from 'react'

const ButtonShow = ({ showAll, setShowAll }) => {
  return (
    <button type='button' onClick={() => setShowAll(!showAll)}>{showAll ? 'important' : 'All'}</button>
  )
}

export default ButtonShow