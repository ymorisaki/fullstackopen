import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote, sortNote } from '../reducers/anecdoteReducer'
import { show, hide } from '../reducers/showReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.notes)
  const filter = useSelector(state => state.filter)
  const filterAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filter))
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const handleVote = (id) => {
    const target = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(addVote(target))
    dispatch(sortNote())
    dispatch(show({
      content: target.content,
      vote: true
    }))
    setTimeout(() => {
      dispatch(hide())
    }, 3000)
  }

  const Anecdotes = ({target}) => (
    <>
      {target.map(anecdote =>
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
    </>
  )

  return (
    <div style={style}>
      {filter === '' &&
        <Anecdotes target={anecdotes} />
      }
      {filter &&
        <Anecdotes target={filterAnecdotes} />
      }
      {(filter && filterAnecdotes.length === 0) &&
        <p>No Index</p>
      }
    </div>
  )
}

export default Notification