import { useState } from 'react'
import './App.css'
import PropTypes from "prop-types"
//images
import searchIcon from './assets/search1.png'
import cleanIcon from './assets/clean.jpg'
import drizzleIcon from './assets/drizzle.png'
import humadityIcon from './assets/humadity.png'
import rainIcon from './assets/rain.png'
import snowIcon from './assets/snow.jpg'
import cloudIcon from './assets/cloud.jpg'
import windIcon from './assets/windspeed.jpg'

const WeatherDeatiles = ({icon,temp,city,country,lat,log,humidity,wind}) => {
  return(
    <>
    <div className="image">
      <img src={icon} alt="image"/>
    </div>
    <div className="temp">{temp}℃</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className="lat">Latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className="log">Longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img className='icon1' src={humadityIcon} alt="humidity" />
        <div className="data">
          <div className="hum-percentage">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img className='icon2' src={windIcon} alt="wind" />
        <div className="data">
          <div className="wind-percentage">{wind} km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
  </>
  )
  
}

WeatherDeatiles.propTypes = {
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  humidity:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired,
  lat:PropTypes.number.isRequired,
  log:PropTypes.number.isRequired,

}

function App() {
  let api_key="d00007d69b4d03d047e254c2726c48fa"

  const[text,setText]=useState("")
  const[icon,setIcon]=useState(snowIcon)
  const[temp,setTemp]=useState(0)
  const[city,setCity]=useState("")
  const[country,setCountry]=useState("")
  const[lat,setLat]=useState(0)
  const[log,setLog]=useState(0)
 const[humidity,setHumidity]=useState(0)
 const[wind,setWind]=useState(0)

 const[cityNotFound,setCityNotFound]=useState(false)
 const[loading,setLoading]=useState(false)
 const[error,setError]=useState("")

 const weatherIconMap={
  "o1d":cleanIcon,
  "o1n":cleanIcon,
  "o2d":cloudIcon,
  "o2n":cloudIcon,
  "o3d":drizzleIcon,
  "o3n":drizzleIcon,
  "o4d":drizzleIcon,
  "o4n":drizzleIcon,
  "o9d":rainIcon,
  "o9n":rainIcon,
  "10d":rainIcon,
  "10n":rainIcon,
  "13d":snowIcon,
  "13n":snowIcon,

 }

 const search=async () =>{
  setLoading(true)
  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}
  &appid=${api_key}&units=Metric`;

  try{
    let res=await fetch(url);
    let data=await res.json();
    if(data.cod==="404"){
      console.error("City Not Found")
      setCityNotFound(true)
      setLoading(false)
      return;
    }

    setHumidity(data.main.humidity)
    setWind(data.wind.speed)
    setTemp(Math.floor(data.main.temp))
    setCity(data.name)
    setCountry(data.sys.country)
    setLat(data.coord.lat)
    setLog(data.coord.lon)
    const weatherIconCode=data.weather[0].icon
    setIcon(weatherIconMap[weatherIconCode] || cleanIcon)
    setCityNotFound(false)
  }catch(error){
    console.error("An error occurred:",error.message)
    setError("An error occured while featching weather deatile")
  }finally{
    setLoading(false)
  }
}
const handleCity=(e)=>{
  setText(e.target.value)
};
const handleKeyDown=(e)=>{
  if(e.key==="Enter")
  {
    search();
  }
};
  return (
    <>
      <div className='container'>
        <div className='input-container'>
          <input 
          type="text"
          placeholder='Search City' 
          onChange={handleCity} 
          className='search-box'
          value={text} 
          onKeyDown={handleKeyDown}/>
          <div className='search-icon' onClick={()=>search()}>
              <img src={searchIcon} alt="search" />
          </div>
        </div>
       

      {loading &&<div className="loading-message">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      {cityNotFound && <div className="city-not-found">City not found</div>}

      { !loading && !cityNotFound &&<WeatherDeatiles icon={icon} temp={temp} city={city} 
       country={country} lat={lat} log={log}  
       humidity={humidity} wind={wind}/>}

       <p className='copyright'>
        Designed by <span>Hariharapudhran</span>
       </p>
      </div>
    </>
  )
}

export default App
