import React from 'react'

const Result = ({item}) => {
  const [data, setData] = useState({})
  const apiKey = process.env.REACT_APP_API_KEY

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

export default Result