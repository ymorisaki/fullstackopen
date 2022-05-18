import React, {
  useState, useEffect
} from 'react'
import noteService from './services/notes'

const Note = ({note, toggleImportant}) => {
  const label = note.important ? 'importance' : 'not importance'
  return (
    <li>{note.content}<button type="button" onClick={toggleImportant}>{label}</button></li>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNote = async (event) => {
    event.preventDefault()
    const newObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }

    const response = await noteService.create(newObject)
    setNotes(notes.concat(newObject))
    setNewNote('')
    console.log(response)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const handleChange = (event) => {
    setNewNote(event.target.value)
    console.log(event.target.value, newNote)
  }

  const toggleImportant = async (id) => {
    try {
      const note = notes.find(n => n.id === id)
      const changeNote = {...note, important: !note.important}

      const response = await noteService.update(id, changeNote)
      setNotes(notes.map(note => note.id !== id ? note: response.data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() =>{
    (async () => {
      const data = await noteService.getAll()
      console.log(data)
      setNotes(data.data)
    })()
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <button type='button' onClick={() => setShowAll(!showAll)}>{showAll ? 'important' : 'All'}</button>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportant={() => toggleImportant(note.id)} />)}
      </ul>

      <form onSubmit={addNote}>
        <input type="text" onChange={handleChange} value={newNote} placeholder="..." />
        <button type="button">save</button>
      </form>
    </div>
  )
}

export default App
