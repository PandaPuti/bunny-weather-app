import React from 'react';
import { Thermometer, Wind, Droplets, MapPin, Sunrise, Sunset } from 'lucide-react';
import { convertTemp } from '../utils/conversions';
// import { convertEpoch } from '../utils/epochConversion';
import { getWeatherDateTime } from '../utils/weatherDateTime';

const WeatherCard = ({ data }) => {
  if (!data) return null;
  const result = getWeatherDateTime(data.dt, data.result.timezone);
  const sunrise = getWeatherDateTime(data.sunrise, data.timeZone);
  const sunset = getWeatherDateTime(data.sunset, data.timeZone);

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl w-full max-w-md border border-white/50">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-1 text-blue-600 mb-1">
            <MapPin size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">{data.city}</span>
            <span className="text-xs font-bold uppercase tracking-widest">{result.full}</span>
          </div>
          <h2 className="text-5xl font-black text-gray-800" id="convert-temp" data-temp="C">{data.temp}°C</h2>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-700 capitalize">{data.description}</p>
          <p className="text-sm text-gray-500">Real Feel: {data.temp}°C</p>
          <p className="text-sm text-gray-500">Real Feel: {convertTemp(data.temp, 'F')}°F</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
            <Thermometer size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Min Temp</p>
            <p className="font-bold text-gray-700">{data.minTemp}</p> 
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg text-red-500">
            <Thermometer size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Max Temp</p>
            <p className="font-bold text-gray-700">{data.maxTemp}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
            <Droplets size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Humidity</p>
            <p className="font-bold text-gray-700">{data.humidity}%</p> 
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg text-green-500">
            <Wind size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Wind Speed</p>
            <p className="font-bold text-gray-700">{data.wind} km/h</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
            <Sunrise size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Sunrise</p>
            <p className="font-bold text-gray-700">{ sunrise.time }</p> 
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg text-green-500">
            <Sunset size={20} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold">Sunset</p>
            <p className="font-bold text-gray-700">{ sunset.time }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;