import axios from 'axios'
const baseUrl = '/api/notes'

let token = ''
const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => axios.get(baseUrl)

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(baseUrl, newObject, config)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

export default { getAll, create, update, setToken }
