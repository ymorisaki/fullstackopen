import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Form from './components/Form'
import HeadingL2 from './components/HeadingL2'
import Notification from './components/Notification'
import Notice from './components/Notice'
import Filter from './components/Filter'
import { initNotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initNotes())
  }, [dispatch])

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