import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    createNote(state, action) {
      const newNote = {
        content: action.payload,
        votes: 0,
        id: getId()
      }
      return [...state, newNote]
    },
    addVote(state, action) {
      return [...state].map(note => note.id === action.payload.id ?
      {...note, votes: note.votes + 1} :
      note
      )
    },
    sortNote(state, action) {
      return [...state].sort((a, b) => a.votes > b.votes ? -1 : 1)
    },
    initNote(state, action) {
      return action.payload
    }
  }
})

export const {
  createNote,
  addVote,
  sortNote,
  showNotice,
  initNote,
} = noteSlice.actions
export default noteSlice.reducer
