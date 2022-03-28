import React from 'react'

const Filter = ({
  persons,
  filter,
  setFilter,
  setFilterList,
  setFilterFlag
}) => {

  const handleSubmit = (event) => {
    event.preventDefault()

    if (filter === '') {
      setFilterList(persons)
      setFilter('')
      setFilterFlag(false)
      return
    }

    setFilterFlag(true)
    setFilterList(persons.filter(person => person.name.includes(filter)))
  }

  const handleChange = (event) => setFilter(event.target.value)
  const handleClick = () => {
    setFilterFlag(false)
    setFilter('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" value={filter} placeholder='FIlter' />
      <button type='submit'>Filter</button>
      <button onClick={handleClick} type='button'>Clear</button>
    </form>
  )
}

export default Filter