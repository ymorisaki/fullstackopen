import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import notesRouter from './controllers/notes'
import usersRouter from './controllers/users'

import logger from './utils/logger'
import config from './utils/config'
import middleware from './utils/middleware'

const app = express()
const URI = config.MONGODB_URI as string

mongoose.set('strictQuery', false)
mongoose.connect(URI).then(() => {
  logger.info('connected to MongoDB')
}).catch(error => {
  logger.error(`error connecting to MongoDB: ${error.message}`)
})

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

export = app
