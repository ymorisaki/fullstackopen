import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <>
      <div>{store.getState()}</div>
      <button onClick={() => store.dispatch({type: 'INCREMENT'})}>+</button>
      <button onClick={() => store.dispatch({type: 'DECREMENT'})}>-</button>
      <button onClick={() => store.dispatch({type: 'ZERO'})}>0</button>
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
