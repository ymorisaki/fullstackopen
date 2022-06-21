import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Form from './components/Form'
import HeadingL2 from './components/HeadingL2'
import Notification from './components/Notification'
import Notice from './components/Notice'
import Filter from './components/Filter'
import { initNote } from './reducers/anecdoteReducer'
import noteService from './services/note'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      const notes = await noteService.getAll()

      dispatch(initNote(notes))
    })()
  })

  return (
    <div>
      <HeadingL2>Anecdotes</HeadingL2>
      <Notice />
      <Filter />
      <Notification />
      <HeadingL2>create new</HeadingL2>
      <Form />
    </div>
  )
}

export default App