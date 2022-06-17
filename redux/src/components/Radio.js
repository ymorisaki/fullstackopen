import React from 'react'
import { useDispatch } from 'react-redux'
import {filterChange} from '../reducers/filterReducer'

const Radio = () => {
  const dispatch = useDispatch()
  const handleChange = (value) => {
    dispatch(filterChange(value))
  }

  return (
    <ul>
      <li><label>All<input type="radio" name="filter" onChange={() => handleChange('ALL')} /></label></li>
      <li><label>Important<input type="radio" name="filter" onChange={() => handleChange('IMPORTANT')} /></label></li>
      <li><label>No important<input type="radio" name="filter" onChange={() => handleChange('NOIMPORTANT')} /></label></li>
    </ul>
  )
}

export default Radio