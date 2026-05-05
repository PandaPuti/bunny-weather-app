import React, { useEffect, useState } from 'react';
import { useWeather } from './hooks/useWeather';
import { useAINarrator } from './hooks/useAINarrator';
import { getBunnyState } from './utils/weatherMapping';
import WeatherCanvas from './components/WeatherCanvas';

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
      {console.log(data)}
      
      {data && (
        <div className="text-center">
          <h1 className="text-2xl font-bold">{city}: {data.temp}°C</h1>
          <p className="italic text-gray-600">"{isThinking ? 'Bunny is thinking...' : thought}"</p>
        </div>
      )}

      {/* Next Step: The WeatherCanvas will go here */}
      {/* // inside App.jsx return */}
      <div className="w-full flex flex-col items-center gap-6">
        {data && (
          <>
            <WeatherCanvas weatherState={getBunnyState(data.condition)} />
            
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md text-center border-b-4 border-blue-200">
              <h2 className="text-3xl font-black text-gray-800">{data.temp}°C in {data.city}</h2>
              <p className="text-blue-500 font-bold uppercase tracking-widest mt-1">{data.description}</p>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">BUNNY'S THOUGHT</span>
                <p className="text-gray-700 italic">
                  {isThinking ? "Thinking of a witty remark..." : thought}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;