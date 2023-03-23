import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {Note} from './models/note'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(err)
}

const unknownEndPoint = (req: any, res: any) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json())

app.get('/', (_req, res) => {
  res.send('<h1>Hello Express</h1><a href="/api/notes">notes</a>')
})

app.get('/api/notes', async (req, res) => {
  const notes = await Note.find({})

  res.json(notes)
})

app.get('/api/notes/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)

    res.json(note)
  } catch (err) {
    next(err)
  }
})

app.post('/api/notes', async (req, res) => {
  const {body} = req

  if (body.content === undefined) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  })

  const savedNote = await note.save()

  res.json(savedNote)
})

app.delete('/api/notes/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

app.put('/api/notes/:id', async (req, res, next) => {
  const {body} = req

  const note = {
    content: body.content,
    important: body.important
  }

  try {
    const updateNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true })

    res.json(updateNote)
  } catch (err) {
    next(err)
  }


})

app.use(unknownEndPoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`$http://localhost:${PORT}`)
})
