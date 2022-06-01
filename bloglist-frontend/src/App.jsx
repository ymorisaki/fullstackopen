import { useState, useEffect } from 'react'
import HeadingL2 from './components/HeadingL2'
import Blog from './components/Blog'
import Profile from './components/Profile'
import FormNewPost from './components/FormNewPost'
import Message from './components/Message'
import FormLogin from './components/FormLogin'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({
    message: '',
    error: false,
  })
  const [user, setUser] = useState({
    username: '',
    name: '',
    token: '',
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loginStorage = window.localStorage.getItem('blogappUserData')

    if (loginStorage) {
      const parse = JSON.parse(loginStorage)
      setUser(parse)
      blogService.setToken(parse.token)
    }
  }, [])

  return (
    <div>
      <HeadingL2>Blogs</HeadingL2>
      <Profile
        user={user}
        setUser={setUser}
      />
      {user.username &&
      <HeadingL2>create new</HeadingL2>
      }
      <FormNewPost
        user={user}
        blogs={blogs}
        setBlogs={setBlogs}
        setMessage={setMessage}
      />
      <FormLogin
        user={user}
        setUser={setUser}
        setMessage={setMessage}
      />
      <Message message={message} />
      {user.username !== '' &&
        blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default App
