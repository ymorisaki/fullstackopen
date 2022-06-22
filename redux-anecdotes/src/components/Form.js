import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import { toggleNotice } from '../reducers/showReducer'

const Form = () => {
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    if (content === '') {
      return
    }

    dispatch(createNote(content))
    dispatch(toggleNotice(`you posted ${content}`, 5))
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