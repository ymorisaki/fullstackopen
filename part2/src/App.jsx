import React, {
  useState, useEffect
} from 'react'
import Heading1 from './components/Heading1'
import ButtonShow from './components/ButtonShow'
import FormLogin from './components/FormLogin'
import FormNote from './components/FormNote'
import Notes from './components/Notes'
import Profile from './components/Profile'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() =>{
    (async () => {
      const {data} = await noteService.getAll()
      setNotes(data)
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

    if (loggedUserJSON) {
      const loginUser = JSON.parse(loggedUserJSON)
      setUser(loginUser)
      noteService.setToken(loginUser.token)
    }
  }, [])

  return (
    <div>
      <Heading1 />
      <Profile user={user} />
      <FormLogin user={user} setUser={setUser} setMessage={setMessage} />
      <Notification message={message} />
      <ButtonShow showAll={showAll} setShowAll={setShowAll} />
      <Notes showAll={showAll} notes={notes} setShowAll={setShowAll} setNotes={setNotes} />
      <FormNote user={user} notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App
