const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper');

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promisies = blogObjects.map(blog => blog.save())

  await Promise.all(promisies)
})

test('getのレスポンステスト', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('正しくPOSTできているか', async () => {
  const newBlog = {
    title: 'post test New Blog',
    author: 'yuji',
    url: 'http://localhost',
    likes: 3,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const afterBlogs = await helper.blogsInDb()
  const title = afterBlogs.map(b => b.title)

  expect(afterBlogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(title).toContain('post test New Blog')
})

test('likesがリクエストに存在しなかった場合にデフォルトで0になる', async () => {
  const newBlog = {
    title: 'likes is empty',
    author: 'yuji',
    url: 'http://localhost'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const afterPosts = await helper.blogsInDb()
  const posted = afterPosts.find(p => p.id === response.body.id)

  expect(posted.likes).toBe(0)
})

describe('値が不正の場合に400を返すか', () => {
  test('titleが空の場合に400を返すか', () => {
    const newBlog = {
      title: '',
      author: 'yuji',
      url: 'http://localhost',
    }

    api.post('/api/blogs').send(newBlog).expect(400)
  })
  test('authorが空の場合に400を返すか', () => {
    const newBlog = {
      title: 'hoge',
      author: '',
      url: 'http://localhost',
    }

    api.post('/api/blogs').send(newBlog).expect(400)
  })
  test('titleが存在しない場合に400を返すか', () => {
    const newBlog = {
      author: 'yuji',
      url: 'http://localhost',
    }

    api.post('/api/blogs').send(newBlog).expect(400)
  })
  test('authorが存在しない場合に400を返すか', () => {
    const newBlog = {
      title: 'hoge',
      url: 'http://localhost',
    }

    api.post('/api/blogs').send(newBlog).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
