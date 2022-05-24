const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Note = require('../models/note')

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes.map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())

  await Promise.all(promiseArray)
})

test('all notes are returnd', async () => {
  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(r => r.content)

  expect(contents).toContain('Browser can execute only Javascript')
})

test('a valid note can be added', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect('Content-Type', /application\/json/)
    .expect(201)

  const notesAtEnd = await helper.notesInDb()
  const contents = notesAtEnd.map(n => n.content)

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
  expect(contents).toContain('async/await simplifies making async calls')
})

test('note without content is not added', async () => {
  const newNote = {
    content: '',
    important: false,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const response = await api.get('/api/notes')

  expect(response.body).toHaveLength(helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const resultNote = await api
    .get(`/api/notes/${notesAtStart[0].id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(JSON.parse(JSON.stringify(notesAtStart[0]))).toEqual(resultNote.body)
})

test('a note can be deleted', async () => {
  const allNote = await helper.notesInDb()

  await api
    .delete(`/api/notes/${allNote[0].id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
  expect(notesAtEnd).not.toContain(allNote[0].content)
})

afterAll(() => {
  mongoose.connection.close()
})
