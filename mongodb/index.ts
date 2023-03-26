import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import Note from './models/note'
import notesRouter from './controllers/notes'

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
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  console.log(`$http://localhost:${config.PORT}`)
})
