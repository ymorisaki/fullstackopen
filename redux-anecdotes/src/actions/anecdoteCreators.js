export const addVote = (target) => {
  return {
    type: 'ADD_VOTE',
    data: target,
  }
}

export const addNote = (text) => {
  return {
      type: 'ADD_NOTE',
      data: text
  }
}
