import react, { useEffect, useState } from 'react'
import './App.css'
import Temprature from './components/Temprature'
import Highlights from './components/Highlights'

function App() {
  const[city, newCity] = useState('Mansehra');
  const[weatherData, setWeatherData] = useState(null);
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=b7670c15b09c459ca02123931240605&q=${city}&aqi=no`
  useEffect(() => {
    fetch(apiURL)
  .then((response)=>{
    if (!response.ok) {
      throw new Error("new Error")      
    }
    return response.json()
  })
  .then(
    (data)=>{
      console.log(data)
      setWeatherData(data)
    }
  )
  .catch((e)=>{
    console.log(e)
  })
  },[city])
  return (
    <>
      <div className='bg-[#1F213A] h-screen flex justify-center align-top '>
        <div className='mt-40 w-1/5 h-1/3 ' >
         {weatherData && <Temprature setCity={newCity}
          states = {{
            temp : weatherData.current.temp_c,
            condition: weatherData.current.condition.text,
            isDay: weatherData.current.is_day,
            location: weatherData.location.name,
            time: weatherData.location.localtime
          }}
          />}
        </div>
        <div className='mt-40 w-1/3 h-1/3 p-10 grid grid-cols-2 gap-5 ' >
          <h2 className='text-slate-200 text-2xl col-span-2' >Today's Highlights</h2>
         { weatherData &&
         <>
          <Highlights state = {{
            title: "Wind Status",
            value: weatherData.current.wind_mph,
            unit: "mph",
            direction: weatherData.current.wind_dir
          }} />
          <Highlights state = {{
            title: "Humidity",
            value: weatherData.current.humidity,
            unit: "%",
          }}/>
          <Highlights state = {{
            title: "Visibility",
            value: weatherData.current.vis_miles,
            unit: "miles",
          }}/>
          <Highlights state = {{
            title: "Air Pressure",
            value: weatherData.current.pressure_mb,
            unit: "mb",
          }}/>
         </> 
          }

        </div>
      </div>
    </>
  )
}

export default App
