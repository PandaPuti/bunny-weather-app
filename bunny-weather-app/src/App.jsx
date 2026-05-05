import React, { useEffect, useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { useAINarrator } from './hooks/useAINarrator';
import { getBunnyState } from './utils/weatherMapping';
import WeatherCanvas from './components/WeatherCanvas';
import WeatherCard from './components/WeatherCard';
import AINarrator from './components/AINarrator';


function App() {
  const [city, setCity] = useState('Mumbai'); // Default city
  const { data, loading, error } = useWeather(city);
  console.log(data);
  const { thought, isThinking, generateThought } = useAINarrator();

  useEffect(() => {
    if (data) {
      const { action } = getBunnyState(data.condition);
      generateThought(`${data.temp}°C and ${data.description}`, action);
    }
  }, [data]);

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
        <WeatherCanvas weatherState={getBunnyState(data.condition)} />

        {/* The Information Card */}
        <WeatherCard data={data} city={city} />
      </div>
    )}
  </div>
);
}

export default App;