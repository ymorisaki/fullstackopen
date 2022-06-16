import { useSelector, useDispatch } from 'react-redux'
import { addVote, addNote } from './actions/anecdoteCreators'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleVote = (id) => {
    const target = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(addVote(target))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (event.target.anecdote.value === '') {
      return
    }

    dispatch(addNote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App