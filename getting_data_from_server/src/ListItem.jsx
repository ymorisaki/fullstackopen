import React from 'react'

const ListItem = ({country}) => {
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(!show)
  }
  return (
    <li>
      {country.name.common}　
      <button type='button' onClick={handleClick}>{show ? 'hide' : 'show'}</button>
      {show &&
        <Result item={country} />
      }
    </li>
  )
}

export default ListItem