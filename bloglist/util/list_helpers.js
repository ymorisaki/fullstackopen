const dummy = blogs => 1

const totalLikes = blogs => {
  const likes = []

  blogs.forEach(blog => likes.push(blog.likes))

  return likes.reduce((prev, current) => prev + current, 0)
}

const favoriteBlog = blogs => {
  const favorite = {
    title: '',
    author: '',
    likes: 0
  }

  blogs.forEach((blog, index) => {
    if (index === 0 || favorite.likes < blog.likes) {
      favorite.title = blog.title
      favorite.author = blog.author
      favorite.likes = blog.likes
    }
  })

  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}