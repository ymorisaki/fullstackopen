import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, post, setToken }
