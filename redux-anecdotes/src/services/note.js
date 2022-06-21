import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const { data } = await axios.get(baseUrl)

  return data
}

const createNew = async (content) => {
  const { data } = await axios.post(baseUrl, {
    content,
    votes: 0,
  })

  return data
}

const addVote = async (note, id) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, note)

  return data
}

export default {
  getAll,
  createNew,
  addVote,
}
