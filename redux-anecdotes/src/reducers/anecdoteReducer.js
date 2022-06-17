import { createSlice } from "@reduxjs/toolkit"
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const noteSlice = createSlice({
  name: 'notes',
  initialState,
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
  }
})

export const {createNote, addVote, sortNote} =noteSlice.actions
export default noteSlice.reducer
