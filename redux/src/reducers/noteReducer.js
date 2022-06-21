import { createSlice } from "@reduxjs/toolkit"

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const initialState = []

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const target = state.find(n => n.id === id)
      const changedNote = {
        ...target,
        important: !target.important
      }
      return state.map(note => note.id !== id ? note : changedNote)
    },
    appendNote(state, action) {
      state.push(action.payload)
    },
    setNotes(state, action) {
      return action.payload
    }
  }
})

export const {
  createNote,
  toggleImportanceOf,
  appendNote,
  setNotes,
} = noteSlice.actions
export default noteSlice.reducer
