import mongoose from 'mongoose'
import app from '../app'
import supertest from 'supertest'

const api = supertest(app)

test('is json', async () => {
  await api.get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
  await mongoose.connection.close()
})
