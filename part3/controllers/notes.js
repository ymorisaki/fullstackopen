const notesRounter = require('express').Router()
const Note = require('../models/note')

notesRounter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRounter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

notesRounter.post('/', (request, response, next) => {
  const { body } = request

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important,
    date: new Date(),
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error => next(error))
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

notesRounter.delete('/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
})

module.exports = notesRounter
