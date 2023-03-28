import mongoose from 'mongoose'
import app from '../app'
import supertest from 'supertest'

import Note from '../models/note'

const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Node.js',
    important: true
  }
]

beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

test('is json', async () => {
  await api.get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('notes.length', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(initialNotes.length)
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'a valid note can be added'
  }

  await api.post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/notes')
  const content = response.body.map((r: {content: string, important: boolean}) => r.content)

  expect(response.body).toHaveLength(initialNotes.length + 1)
  expect(content).toContain('a valid note can be added')
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api.post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
