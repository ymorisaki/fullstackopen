const notesRounter = require('express').Router()
const Note = require('../models/note')

notesRounter.get('/', async (request, response) => {
  const notes = await Note.find({})

  response.json(notes)
})

notesRounter.get('/:id', async (request, response) => {
  const note = await Note.findById(request.params.id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRounter.post('/', async (request, response) => {
  const { body } = request

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important,
    date: new Date(),
  })

  const savedNote = await note.save()

  response.status(201).json(savedNote)
})

notesRounter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    {
      new: true,
      runValidators: true,
      context: 'query',
    }
  ).then(updatedNote => {
    response.json(updatedNote)
  }).catch(error => next(error))
})

notesRounter.delete('/:id', async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = notesRounter
