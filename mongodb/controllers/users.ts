import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user'

const usersRouter = express.Router()

usersRouter.post('/', async (req, res) => {
  const { userName, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    userName,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

export = usersRouter
