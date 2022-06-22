import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/note'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    sortNote(state, action) {
      return [...state].sort((a, b) => a.votes > b.votes ? -1 : 1)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const initNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()

    dispatch(setNotes(notes))
  }
}

export const createNote = (content) => {
  return async (dispatch, getState) => {
    const newNote = await noteService.createNew(content)

    dispatch(setNotes([...getState().notes, newNote]))
  }
}

export const addVote = (id, target) => {
  return async (dispatch, getState) => {
    const updateTarget = {...target, votes: target.votes + 1}

    await noteService.addVote(updateTarget, id)
    dispatch(setNotes(getState().notes.map(note => note.id === id ? updateTarget : note)))
  }
}

export const {
  sortNote,
  setNotes,
  showNotice,
} = noteSlice.actions

export default noteSlice.reducer
