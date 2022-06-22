import React from 'react'
import { useSelector } from 'react-redux'

const Notice = () => {
  const {show} = useSelector(state => state)
  return (
    <>
      {show.isShow &&
      <p>{show.content}</p>
      }
    </>
  )
}

export default Notice