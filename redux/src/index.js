import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux'

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.data)
  }
  return state
}

const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state change are made with actions',
    important: true,
  },
  id: 1,
})
store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state change are made with actions',
    important: false,
  },
  id: 2,
})

const App = () => {
  return (
    <>
      <ul>
        {store.getState().map(note => (
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important': ''}</strong>
          </li>
        ))}
      </ul>
    </>
  )
}

const root = () => {
  ReactDOM.createRoot(document.getElementById('root')).render (
  <React.StrictMode>
    <App />
  </React.StrictMode>
  )
}

root()
store.subscribe(root)
