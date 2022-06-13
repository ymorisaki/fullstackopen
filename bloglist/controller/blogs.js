const jwt = require('jsonwebtoken')
const blogRounter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const getToken = require('../util/getToken')

blogRounter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRounter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).json({
      error: 'not found'
    })
  }
})

blogRounter.post('/', async (request, response) => {
  const { body } = request
  const token = getToken(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)

  if (
    !body.title ||
    !body.author ||
    !user
  ) {
    return response.status(400).end()
  }

  if (!body.likes) {
    body.likes = 0
  }

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRounter.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const token = getToken(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    await User.findByIdAndUpdate(user._id, {
      blogs: user.blogs.filter(blog => blog._id.toString() !== id)
    })

    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } catch (error) {
    response.status(401).send({
      error: 'Unauthorized or token missing'
    })
  }
})

blogRounter.put('/:id', async (request, response, next) => {
  const { body } = request
  const blogId = request.params.id
  const { likes } = await Blog.findById(blogId)
  const user = await User.findById(body.userId)
  const userId = user.toJSON().id
  const updateLikes = {
    likes: body.add ? likes + 1 : likes -1,
  }
  const updateUser = {
    likes: body.add ?
      user.likes.concat([blogId]) :
      user.likes.filter(like => like !== blogId)
  }

  try {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      updateLikes,
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    )
    await User.findByIdAndUpdate(
      userId,
      updateUser,
      {
        new: true
      }
    )
    response.json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRounter
