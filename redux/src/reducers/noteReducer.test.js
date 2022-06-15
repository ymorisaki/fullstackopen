const deepFreeze = require('deep-freeze')
const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE': {
      const {id} = action.data
      const noteToChange = state.find(n => n.id === id)
      const changeNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id !== id ? note : changeNote)
    }
    default:
      return state
  }
}
describe('noteReducer', () => {
  test('returns new state', () => {
    const state = []
    const action = {
      type: 'NEW_NOTE',
      data: {
        content: 'the app state',
        id: 1,
        important: true
      }
    }

    deepFreeze(state)

    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
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
      type: 'TOGGLE_IMPORTANCE',
      data: {
        id: 2,
      }
    }

    deepFreeze(state)

    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[0])
    expect(newState).toContainEqual({
        content: 'change state',
        id: 2,
        important: true,
    })
  })
});