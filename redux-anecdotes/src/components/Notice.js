import React from 'react'
import { useSelector } from 'react-redux'

const Notice = () => {
  const {show} = useSelector(state => state)
  return (
    <>
      {show.isShow &&
      <p>{show.isVote ? 'you voted' : 'you created'} {show.content}</p>
      }
    </>
  )
}

export default Notice