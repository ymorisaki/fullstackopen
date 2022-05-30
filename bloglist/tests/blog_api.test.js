const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const userObjects = helper.initailUsers.map(user => new User(user))
  const blogPromisies = blogObjects.map(blog => blog.save())
  const userPromisies = userObjects.map(user => user.save())

  await Promise.all([...blogPromisies, ...userPromisies])
})

describe('getテスト', () => {
  test('意図したレスポンスステータスとContent-Typeを返すか', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('postテスト', () => {
  test('Userが正しく登録できているか', async () => {
    const beforeUsers = await User.find({})
    const newUser = {
      username: 'testuser',
      name: 'testuser',
      password: 'test',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const afterUsers = await User.find({})

    expect(beforeUsers).toHaveLength(afterUsers.length - 1)
  })

  test('User登録に必要な情報が欠けていた場合に正しくエラーが発生するか', async () => {
    const newUser1 = {
      name: 'test',
      password: 'test',
    }
    const newUser2 = {
      username: 'test',
      password: 'test',
    }
    const newUser3 = {
      username: 'test',
      name: 'test',
    }

    const posted1 = await api
      .post('/api/users')
      .send(newUser1)
      .expect(401)

    const posted2 = await api
      .post('/api/users')
      .send(newUser2)
      .expect(401)

    const posted3 = await api
      .post('/api/users')
      .send(newUser3)
      .expect(401)

    const posted = await User.findOne({
      username: 'test'
    })

    expect(posted).toBeNull()
    expect(posted1.text).toMatch(/username or name or password is empty/)
    expect(posted2.text).toMatch(/username or name or password is empty/)
    expect(posted3.text).toMatch(/username or name or password is empty/)
  })

  test('重複するusernameでPOSTした際に正しくエラーが発生するか', async () => {
    const newUser1 = {
      username: 'test',
      name: 'test',
      password: 'test',
    }
    const newUser2 = {
      username: 'test',
      name: 'this is only name for JEST TEST',
      password: 'test',
    }

    await api
      .post('/api/users')
      .send(newUser1)

    const { text } = await api
      .post('/api/users')
      .send(newUser2)
      .expect(401)

    const posted = await User.findOne({
      name: 'this is only name for JEST TEST',
    })

    expect(text).toMatch(/test was register/)
    expect(posted).toBeNull()
  })

  test('Blogが正しくPOSTできているか', async () => {
    const [user] = await User.find({})
    const newBlog = {
      title: 'post test New Blog',
      author: 'yuji',
      url: 'http://localhost',
      likes: 3,
      user: user._id
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
    const [user] = await User.find({})
    const newBlog = {
      title: 'likes is empty',
      author: 'yuji',
      url: 'http://localhost',
      user: user._id,
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const afterPosts = await helper.blogsInDb()
    const posted = afterPosts.find(p => p.id === response.body.id)

    expect(posted.likes).toBe(0)
  })

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

describe('deleteテスト', () => {
  test('該当のエンドポイントが存在した場合に削除がされているか', async () => {
    const blogs = await helper.blogsInDb()
    const targetId = blogs[0].id

    await api
      .delete(`/api/blogs/${targetId}`)
      .expect(204)

    const afterBlogs = await Blog.find({})

    expect(afterBlogs).toHaveLength(blogs.length - 1)
  })
})

describe('putテスト', () => {
  test('likesが1増えたか', async () => {
    const blogs = await helper.blogsInDb()
    const targetId = blogs[0].id

    await api
      .put(`/api/blogs/${targetId}`)
    expect(200)

    const afterBlogs = await helper.blogsInDb()

    expect(afterBlogs[0].likes).toBe(blogs[0].likes + 1)
  })
})

describe('loginテスト', () => {
  test('loginが出来るか', async () => {
    const newUser = {
      username: 'login test',
      name: 'login test',
      password: 'password',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    await api
      .post('/api/login')
      .send(newUser)
      .expect(200)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
