import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const {data} = await axios.get(baseUrl)
  return data
}

const createNew = async (content) => {
  const object = {
    content,
    important: false,
  }
  const {data} = await axios.post(baseUrl, object)

  return data
}

export default {
  getAll,
  createNew,
}
