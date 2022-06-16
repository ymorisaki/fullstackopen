import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../actions/anecdoteCreators'

const Notification = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const handleVote = (id) => {
    const target = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(addVote(target))
  }

  return (
    <div style={style}>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Notification