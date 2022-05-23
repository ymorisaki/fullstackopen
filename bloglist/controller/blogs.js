const blogRounter = require('express').Router();
const Blog = require('../models/blog');

blogRounter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogRounter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  console.log(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  })
})

blogRounter.delete('/:id', (request, response) => {
  const {id} = request.params

  Blog.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  })
})

module.exports = blogRounter
