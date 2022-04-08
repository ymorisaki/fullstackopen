import React, {
  useState, useEffect
} from 'react'
import axios from 'axios'

const apiKey = process.env.REACT_APP_API_KEY

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

const Result = ({item}) => {
  const [data, setData] = useState({})
  useEffect(() => {
    const getData = async () => {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${item.capitalInfo.latlng[0]}&lon=${item.capitalInfo.latlng[1]}&appid=${apiKey}`)
      setData(data)
    }

    getData()
  }, [])

  return (
    <>
      <p><b>{item.name.common}</b></p>
      <p>{item.area}</p>
      <p>{item.region}</p>
      <p>{item.timezones}</p>
      <p>{item.capitalInfo.latlng[0]}</p>
      <p>{item.capitalInfo.latlng[1]}</p>
      {Object.keys(data).length && data.list[0].weather[0].main &&
        <p>{data.list[0].weather[0].main}</p>
      }
      <ul>
        {Object.keys(item.languages).map(lang => <li key={lang}>{item.languages[lang]}</li>)}
      </ul>
      <img src={item.flags.png} alt="" />
    </>
  )
}

const App = () => {
  const [text, setText] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [filterCountries, setFilterCountries] = useState([])

  const isFilterListRender = filterCountries.length < 10 && filterCountries.length !==1
  const isFilterResultRender = filterCountries.length === 1
  const isAlertRender = text.length > 1 && filterCountries.length > 10

  const handleChange = (e) => {
    setText(e.target.value)
  }

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
      <label>
        find countries　
        <input type="text" onChange={handleChange} />
      </label>

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
