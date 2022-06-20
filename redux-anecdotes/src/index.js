import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import App from './App'
import notesReducer from './reducers/anecdoteReducer'
import showReducer from './reducers/showReducer'

const store = configureStore({
  reducer: {
    notes: notesReducer,
    show: showReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
