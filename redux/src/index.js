import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';
import App from './App'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

const root = () => {
  ReactDOM.createRoot(document.getElementById('root')).render (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
  )
}

root()
store.subscribe(root)
