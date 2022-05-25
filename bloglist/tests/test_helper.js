const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'React',
    author: 'yuji',
    url: 'http://localhost',
    likes: 15,
  },
  {
    title: 'Heroku',
    author: 'yuji',
    url: 'http://localhost',
    likes: 5,
  },
  {
    title: 'MongoDB',
    author: 'mori',
    url: 'http://localhost',
    likes: 7,
  },
  {
    title: 'Jest',
    author: 'mori',
    url: 'http://localhost',
    likes: 9,
  },
]

const noExistingId = async () => {
  const newBlog = new Blog({
    title: 'すぐに消される投稿',
    author: 'mori',
    url: 'http://localhost',
    likes: 9,
  })

  await newBlog.save()
  await newBlog.remove()
  return newBlog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  noExistingId,
}
