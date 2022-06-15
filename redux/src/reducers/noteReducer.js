const noteReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return state.concat(action.data)
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

export default noteReducer
