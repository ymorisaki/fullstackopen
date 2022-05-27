const express = require('express')
const cors = require('cors')
const blogRouter = require('./controller/blogs')
const userRouter = require('./controller/users')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

module.exports = app
