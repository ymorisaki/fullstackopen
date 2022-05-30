const blogRounter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRounter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRounter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')

  if (blog) {
    response.json(blog)
  }
})

blogRounter.post('/', async (request, response) => {
  const { body } = request
  const user = await User.findById(body.user)

  if (
    !body.title ||
    !body.author ||
    !body.user ||
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

blogRounter.delete('/:id', (request, response) => {
  const { id } = request.params

  Blog.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  })
})

blogRounter.put('/:id', async (request, response, next) => {
  const { id } = request.params
  const { likes } = await Blog.findById(id)
  const updateLikes = {
    likes: likes + 1,
  }

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      updateLikes,
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    )
    response.json(blog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRounter
