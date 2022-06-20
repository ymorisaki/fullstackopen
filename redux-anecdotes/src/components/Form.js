import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import { show, hide } from '../reducers/showReducer'

const Form = () => {
  const dispatch = useDispatch()
  const handleSubmit = (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    if (content === '') {
      return
    }

    dispatch(createNote(content))
    dispatch(show({
      content
    }))
    setTimeout(() => {
      dispatch(hide())
    }, 3000)
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