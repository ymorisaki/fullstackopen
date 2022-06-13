import { useState, useEffect } from 'react'
import styles from './Blog.module.scss'
import axios from 'axios'

const Blog = ({ blog, user }) => {
  const [active, setActive] = useState(false)
  const like = user.likes.some(l => blog.id === l)

  const handleClick = async () => {
    if (active) {
      setActive(false)
    } else {
      setActive(true)
    }

    await axios.put(`/api/blogs/${blog.id}`, {
      add: !active,
      userId: user.id
    })
  }

  useEffect(() => {
    console.log(user.likes, blog.id)
    if (like) {
      setActive(true)
    }
  }, [active])

  return (
    <div>
    Tilte:{blog.title}, Author:{blog.author}, URL:{blog.url}
      <button
        className={`${styles.buttonLikes} ${active ? styles.active : ''}`}
        type="button"
        onClick={handleClick}
      >
        Likes {blog.likes}
      </button>
    </div>
  )
}

export default Blog