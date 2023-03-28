import User from '../models/user'

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

export = {
  usersInDb
}
