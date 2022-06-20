import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import App from './App'
import notesReducer from './reducers/anecdoteReducer'
import showReducer from './reducers/showReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: notesReducer,
    show: showReducer,
    filter: filterReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
