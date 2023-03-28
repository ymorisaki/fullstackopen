import express from 'express'
import Note from '../models/note'

const notesRouter = express.Router()

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})

  res.json(notes)
})

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)

    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (req, res, next) => {
  const { body } = req

  try {
    const note = new Note({
      content: body.content,
      important: body.important || false
    })

    const saveNote = await note.save()

    res.status(201).json(saveNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', async (req, res, next) => {
  const { body } = req
  const note = {
    content: body.content,
    important: body.important
  }
  
  try {
    const updateNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true })

    res.json(updateNote)
  } catch (error) {
    next(error)
  }
})

export = notesRouter
