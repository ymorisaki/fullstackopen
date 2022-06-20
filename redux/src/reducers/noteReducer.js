import { createSlice } from "@reduxjs/toolkit"

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const initialState = []

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateId()
      })
    },
    toggleImportanceOf(state, action) {
      const id = action.payload
      const target = state.find(n => n.id === id)
      const changedNote = {
        ...target,
        important: !target.important
      }
      return state.map(note => note.id !== id ? note : changedNote)
    }
  }
})

export const {createNote, toggleImportanceOf} = noteSlice.actions
export default noteSlice.reducer
