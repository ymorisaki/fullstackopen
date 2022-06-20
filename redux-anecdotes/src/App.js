import Form from './components/Form'
import HeadingL2 from './components/HeadingL2'
import Notification from './components/Notification'
import Notice from './components/Notice'

const App = () => {
  return (
    <div>
      <HeadingL2>Anecdotes</HeadingL2>
      <Notice />
      <Notification />
      <HeadingL2>create new</HeadingL2>
      <Form />
    </div>
  )
}

export default App