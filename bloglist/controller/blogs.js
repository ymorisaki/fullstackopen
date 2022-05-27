const blogRounter = require('express').Router()
const Blog = require('../models/blog')

blogRounter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogRounter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  }
})

blogRounter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.likes) {
    blog.likes = 0
  }
  if (
    !blog.title ||
    !blog.author
  ) {
    return response.status(400).end()
  }

  blog.save().then(result => {
    response.status(201).json(result)
  })
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
