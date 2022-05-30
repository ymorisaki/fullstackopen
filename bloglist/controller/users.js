const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const uniqueUser = await User.findOne({ username })

  if (
    !username ||
    !name ||
    !password
  ) {
    return response.status(401).json({
      error: 'username or name or password is empty'
    })
  }

  if (uniqueUser) {
    return response.status(401).json({
      error: `${username} was register`
    })
  }

  if (
    username.length < 4 ||
    name.length < 4 ||
    password.length < 4
  ) {
    return response.status(401).json({
      error: 'error invalid'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter
