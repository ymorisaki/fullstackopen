import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useMatch,
} from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'
import Notes from './pages/Notes'
import Note from './pages/Note'
import Login from './pages/Login'

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      important: true,
      content: 'React is easy',
      user: 'Yuji',
    },
    {
      id: 2,
      important: false,
      content: 'HTML is easy',
      user: 'Yuji',
    },
    {
      id: 3,
      important: true,
      content: 'JavaScript is easy',
      user: 'Mori',
    },
  ])
  const [user, setUser] = useState(null)
  const padding = {
    padding: 5,
  }
  const match = useMatch('/notes/:id')
  console.log(match)
  const note = match ?
    notes.find(note => note.id === Number(match.params.id)) :
    null

  const login = (user) => {
    setUser(user)
  }

  return (
    <>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user ?
          <em>{user} logged in</em> :
          <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login toLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2022</i>
      </div>
    </>
  )
}

export default App
