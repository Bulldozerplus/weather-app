import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [data, setData] = useState({})
    const [location, setLocation] = useState('Moscow')

    async function fetchWeather() {
        try {
        const urlWeather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=61eae1b135251c95a1d8f7d060d50322`)
            .then((response => setData(response.data)))}
        catch (err){

        }
    }

    useEffect(() => {
        setData(fetchWeather)
    },[location])
    console.log(data)

    return (
        <div className="App">
            <div className='search'>
                <input value={location}
                       type='text'
                       placeholder='Enter your location'
                       onChange={event => setLocation(event.target.value)}/>
            </div>
            <div className='container'>
                <div className='top'>
                    <div className='location'>
                        <p>{data.name}</p>
                    </div>
                    <div className='temp'>
                        {data.main ? <h1 className='bold'>{data.main.temp}</h1> : null}
                    </div>
                    <div className='description'>
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                <div className='bottom'>
                    <div className='feels'>
                        {data.main ? <p className='bold'>{data.main.feels_like}</p> : null}
                        <p>Fells like</p>
                    </div>
                    <div className='humidity'>
                        {data.main ? <p className='bold'>{data.main.humidity}</p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className='wind'>
                        {data.wind ? <p className='bold'>{data.wind.speed}</p> : null}
                        <p>Wind speed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
