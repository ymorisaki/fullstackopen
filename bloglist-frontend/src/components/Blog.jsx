import { useState } from 'react'
import styles from './Blog.module.scss'

const Blog = ({ blog }) => {
  const [active, setActive] = useState(false)
  const handleClick = () => {
    if (active) {
      setActive(false)
    } else {
      setActive(true)
    }
  }

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