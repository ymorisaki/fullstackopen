import axios from 'axios'

const endPoint = '/api/login'
const login = async loginData => {
  const response = await axios.post(endPoint, loginData)
  return response.data
}

export default login
