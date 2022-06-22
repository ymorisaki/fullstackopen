import { createSlice } from "@reduxjs/toolkit"
import noteService from '../services/note'

const noteSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      return [...state].map(note => note.id === action.payload.id ?
      {...note, votes: note.votes + 1} :
      note
      )
    },
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

export const {
  addVote,
  sortNote,
  setNotes,
  showNotice,
} = noteSlice.actions
export default noteSlice.reducer
