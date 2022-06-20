import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const style ={
    margin: '0 0 20px'
  }
  const handleChange = (event) => {
    dispatch(setFilter(event.target.value))
  }
  return (
    <div style={style}>
      <label>Filter <input type="text" onChange={handleChange} /></label>
    </div>
  )
}

export default Filter