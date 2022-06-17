const deepFreeze = require('deep-freeze')
const {createSlice} = require('@reduxjs/toolkit')
const initialState = []
const generateId = () => Number((Math.random() * 1000000).toFixed(0))

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
describe('noteReducer', () => {
  test('returns new state', () => {
    const state = []
    const action = {
      type: 'notes/createNote',
      payload: 'create slice'
    }

    deepFreeze(state)

    const newState = noteSlice.reducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map(s => s.content)).toContainEqual(action.payload)
  })

  test('toggle important', () => {
    const state = [
      {
        content: 'the app state',
        id: 1,
        important: true,
      },
      {
        content: 'change state',
        id: 2,
        important: false,
      },
    ]

    const action = {
      type: 'notes/toggleImportanceOf',
      payload: 2
    }

    deepFreeze(state)

    const newState = noteSlice.reducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
        content: 'change state',
        id: 2,
        important: true,
    })
  })
});