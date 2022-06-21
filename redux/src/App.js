import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import Radio from './components/Radio'
import { setNotes } from './reducers/noteReducer'
import noteService from './services/notes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const notes = await noteService.getAll()

      dispatch(setNotes(notes))
    })()
  }, [])

  return (
    <>
      <NewNote />
      <Radio />
      <Notes />
    </>
  )
}

export default App