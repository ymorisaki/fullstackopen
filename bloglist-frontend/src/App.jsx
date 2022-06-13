import { useState, useEffect } from 'react'
import HeadingL1 from './components/HeadingL1'
import HeadingL2 from './components/HeadingL2'
import Blog from './components/Blog'
import Profile from './components/Profile'
import FormNewPost from './components/FormNewPost'
import Message from './components/Message'
import FormLogin from './components/FormLogin'
import FormSignup from './components/FormSignup'
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
    likes: []
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
      <HeadingL1>Blogs</HeadingL1>
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
      {!user.username && <HeadingL2>SignIn</HeadingL2>}
      <FormLogin
        user={user}
        setUser={setUser}
        setMessage={setMessage}
      />
      {!user.username && <HeadingL2>SignUp</HeadingL2>}
      {!user.username && <FormSignup />}
      <Message message={message} />
      {user.username !== '' &&
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            setUser={setUser}
          />
        )}
    </div>
  )
}

export default App
