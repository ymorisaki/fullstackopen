const express = require('express')
const cors = require('cors')
const blogRouter = require('./controller/blogs')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const app = express()

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controller/testing')

  app.use('/api/testing', testingRouter)
}

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

module.exports = app
