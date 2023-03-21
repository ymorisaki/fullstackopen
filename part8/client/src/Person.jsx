const Person = ({person, onClose}) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <p>{person.phone}</p>
      <p>{person.address.street}</p>
      <p>{person.address.city}</p>
      <button type="button" onClick={onClose}>Close</button>
    </div>
  )
}

export default Person
