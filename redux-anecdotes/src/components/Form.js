import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/anecdoteReducer'
import { show, hide } from '../reducers/showReducer'
import noteService from '../services/note'

const Form = () => {
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value

    if (content === '') {
      return
    }

    const newNote = await noteService.createNew(content)

    dispatch(createNote(newNote))
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