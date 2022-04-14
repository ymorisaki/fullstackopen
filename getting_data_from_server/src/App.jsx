import React, {
  useState, useEffect
} from 'react'
import Result from './Result'
import ListItem from './ListItem'
import Finder from './Finder'
import axios from 'axios'

const App = () => {
  const [text, setText] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])

  const isFilterListRender = filterCountries.length < 10 && filterCountries.length !==1
  const isFilterResultRender = filterCountries.length === 1
  const isAlertRender = text.length > 1 && filterCountries.length > 10


  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setAllCountries([...response.data])
    })
  }, []);

  useEffect(() => {
    setFilterCountries(allCountries.filter(country => country.name.common.includes(text)))
  }, [text])

  return (
    <>
      <Finder setText={setText} />
      {isFilterListRender &&
        <ul>
          {filterCountries.map(country => <ListItem key={country.name.common} country={country} />)}
        </ul>
      }

      {isFilterResultRender &&
        <Result item={filterCountries[0]} />
      }

      {isAlertRender &&
        <p>もう少し絞り込みが必要です</p>
      }
    </>
  )
}

export default App
