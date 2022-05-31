import React, {
  useState, useEffect
} from 'react'
import Heading1 from './components/Heading1'
import ButtonShow from './components/ButtonShow'
import FormLogin from './components/FormLogin'
import FormNote from './components/FormNote'
import Notes from './components/Notes'
import Notification from './components/Notification'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  useEffect(() =>{
    (async () => {
      const {data} = await noteService.getAll()
      setNotes(data)
    })()
  }, [])

  return (
    <div>
      <Heading1 />
      <ButtonShow showAll={showAll} setShowAll={setShowAll} />
      <Notes showAll={showAll} notes={notes} setShowAll={setShowAll} setNotes={setNotes} />
      <FormNote notes={notes} setNotes={setNotes} />
    </div>
  )
}

export default App
