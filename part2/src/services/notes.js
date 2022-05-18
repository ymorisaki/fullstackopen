import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => axios.get(baseUrl)

const create = newObject => axios.post(baseUrl, newObject)

const update = (id, newObject) => axios.put(`${baseUrl}/${id}`, newObject)

export default { getAll, create, update, }
