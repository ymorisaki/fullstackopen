import { useState, useEffect } from 'react'
import styles from './Blog.module.scss'
import axios from 'axios'

const Blog = ({ blog, user }) => {
  const [active, setActive] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleClick = async () => {
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
  }

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/users/${user.id}`)
      const like = data.likes.some(like => like === blog.id)

      if (like) {
        setActive(true)
      }
    })()
  }, [])

  return (
    <div>
    Tilte:{blog.title}, Author:{blog.author}, URL:{blog.url}
      <button
        className={`${styles.buttonLikes} ${active ? styles.active : ''}`}
        type="button"
        onClick={handleClick}
      >
        Likes {likes}
      </button>
    </div>
  )
}

export default Blog