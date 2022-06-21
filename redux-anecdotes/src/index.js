import React from 'react'
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'
import notesReducer from './reducers/anecdoteReducer'
import showReducer from './reducers/showReducer'
import filterReducer from './reducers/filterReducer'

const container = document.getElementById('root');
const root = createRoot(container);
const store = configureStore({
  reducer: {
    notes: notesReducer,
    show: showReducer,
    filter: filterReducer,
  }
})

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);