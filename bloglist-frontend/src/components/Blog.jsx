import { useState, useEffect } from 'react'
import styles from './Blog.module.scss'
import axios from 'axios'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [active, setActive] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = async () => {
    const updateBlogs = blogs.map(b => {
      if (b.id === blog.id) {
        active ? b.likes-- : b.likes++
      }
      return b
    })
    if (active) {
      setLikes(likes - 1)
      setActive(false)
    } else {
      setLikes(likes + 1)
      setActive(true)
    }

    await axios.put(`/api/blogs/${blog.id}`, {
      add: !active,
      userId: user.id
    })

    setBlogs(updateBlogs)
  }

  const handleDelete = async () => {
    try {
      if (!window.confirm('削除を実行しますか？')) {
        return
      }
      await axios.delete(`/api/blogs/${blog.id}`, {
        headers: { Authorization: user.token },
      })
      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/users/${user.id}`)

      if (data) {
        const like = data.likes.some(like => like === blog.id)
        if (like) {
          setActive(true)
        }
      }
    })()
  }, [])

  return (
    <div>
    Tilte:{blog.title}, Author:{blog.author}, URL:{blog.url}
      <button
        className={`${styles.buttonLikes} ${active ? styles.active : ''}`}
        type="button"
        onClick={handleLike}
      >
        Likes {likes}
      </button>
      {blog.user.id === user.id &&
        <button type="button" onClick={handleDelete}>Delete</button>
      }
    </div>
  )
}

export default Blog