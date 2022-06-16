const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNote = content => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      id: generateId(),
      important: false,
    }
  }
}

export const toggleImportanceOf = id => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: {id}
  }
}
