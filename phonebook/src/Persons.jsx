import React from 'react'

const Persons = ({persons, filter}) => {
  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter))

  const generator = (list) => list.map(item => <li key={item.name}>Name: {item.name} / Number: {item.number}</li>) 

  return (
    <ul>
      {filter === '' && generator(persons)}
      {filter !== '' && generator(filterPersons)}
    </ul>
  )
}

export default Persons