import React, { useEffect, useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { useAINarrator } from './hooks/useAINarrator';
import { getBunnyState } from './utils/weatherMapping';

function App() {
  const [city, setCity] = useState('Mumbai'); // Default city
  const { data, loading, error } = useWeather(city);
  const { thought, isThinking, generateThought } = useAINarrator();

  useEffect(() => {
    if (data) {
      const { action } = getBunnyState(data.condition);
      generateThought(`${data.temp}°C and ${data.description}`, action);
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* UI to change city */}
      <div className="mb-8 z-10">
        <input 
          type="text" 
          placeholder="Enter city..." 
          className="p-2 rounded shadow-md outline-none"
          onKeyDown={(e) => e.key === 'Enter' && setCity(e.target.value)}
        />
      </div>

      {loading && <p>Finding the bunny...</p>}
      
      {data && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">{data.city}: {data.temp}°C</h1>
          <p className="italic text-gray-600">"{isThinking ? 'Bunny is thinking...' : thought}"</p>
        </div>
      )}

      {/* Next Step: The WeatherCanvas will go here */}
    </div>
  );
}

export default App;