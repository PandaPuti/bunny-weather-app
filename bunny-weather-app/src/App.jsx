import React, { useEffect, useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { useAINarrator } from './hooks/useAINarrator';
import { getBunnyState } from './utils/weatherMapping';
import { isDaytime } from './utils/timeutils';
import WeatherCanvas from './components/WeatherCanvas';
import WeatherCard from './components/WeatherCard';
import AINarrator from './components/AINarrator';


function App() {
  const fallbackCity = 'Mumbai';
  const [city, setCity] = useState(fallbackCity);
  const { data, loading, error } = useWeather(city);
  console.log(data);
  const { thought, isThinking, generateThought } = useAINarrator();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${coords.latitude}&lon=${coords.longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_KEY}`
          );

          if (!response.ok) {
            throw new Error(`Reverse geocode failed: ${response.status}`);
          }

          const [location] = await response.json();
          if (location?.name) {
            setCity(location.name);
          } else {
            setCity(fallbackCity);
          }
        } catch (error) {
          console.error('Reverse geocode failed', error);
          setCity(fallbackCity);
        }
      },
      (error) => {
        console.error('Geolocation error', error);
        setCity(fallbackCity);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  useEffect(() => {
    if (data) {
      const { action } = getBunnyState(data.condition);
      generateThought(`${data.temp}°C and ${data.description}`, action);
    }
  }, [data]);
  
  const dayTimeStatus = data ? isDaytime(data.dt, data.sunrise, data.sunset) : true;
  return (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 gap-6 font-sans">
    {/* Search Input */}
    <div className="w-full max-w-md flex gap-2">
      <input 
        type="text" 
        className="flex-1 px-5 py-3 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="Enter a city (e.g. Kolkata, London)..."
        onKeyDown={(e) => e.key === 'Enter' && setCity(e.target.value)}
      />
    </div>

    {data && (
      <div className="flex flex-col items-center gap-4 w-full">
        {/* The AI Thought Bubble */}
        <AINarrator thought={thought} isThinking={isThinking} />

        {/* The Visual Scene */}
        <WeatherCanvas 
          weatherState={getBunnyState(data.condition)} 
          isDay={dayTimeStatus} 
          windSpeed={data.wind.speed}
        />

        {/* The Information Card */}
        <WeatherCard data={data} />
      </div>
    )}
  </div>
);
}

export default App;