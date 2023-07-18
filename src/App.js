import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [data, setData] = useState({})
    const [location, setLocation] = useState('Moscow')
    const [state, setState] = useState('blank')


    async function fetchWeather() {
        try {
            setState('loading')
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=61eae1b135251c95a1d8f7d060d50322`)
            setData(response.data)
            setState('success')
        } catch (err) {
            setState('error')
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    function detectKeyPress(e) {
        if (e.key === 'Enter') {
            return fetchWeather()
        }
    }

    if (state === 'loading') {
        return <div className='App'>
            <div className='container'>
                <h2 className='bold' className='search'>Loading. Please wait.</h2>
            </div>
        </div>
    } else if (state === 'error') {
        return <div className='App'>
            <div className='container'>
                <h2 className='bold' className='search'>Error, please update this page</h2>
            </div>
        </div>
    } else if (state === 'success') {
        return (
            <div className="App">
                <div className='search'>
                    <input value={location}
                           type='text'
                           placeholder='Enter your location'
                           onChange={event => setLocation(event.target.value)}
                           onKeyPress={detectKeyPress}
                    />
                </div>
                <div className='container'>
                    <div className='top'>
                        <div className='location'>
                            <p>{data.name}</p>
                        </div>
                        <div className='temp'>
                            <h1 className='bold'>{data.main.temp} C</h1>
                        </div>
                        <div className='description'>
                            <p>{data.weather[0].main}</p>
                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='feels'>
                            <p className='bold'>{data.main.feels_like} C</p>
                            <p>Fells like</p>
                        </div>
                        <div className='humidity'>
                            <p className='bold'>{data.main.humidity} %</p>
                            <p>Humidity</p>
                        </div>
                        <div className='wind'>
                            <p className='bold'>{data.wind.speed} M/S</p>
                            <p>Wind speed</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
