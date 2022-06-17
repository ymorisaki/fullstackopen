import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'

const Form = () => {
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()

    if (event.target.anecdote.value === '') {
      return
    }

    dispatch(createNote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  return (
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
  )
}

export default Form