import { useState, useEffect } from 'react';

export const useWeather = (city) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) throw new Error('City not found');
        
        const result = await response.json();
        setData({
          temp: Math.round(result.main.temp),
          condition: result.weather[0].main,
          description: result.weather[0].description,
          wind: result.wind.speed,
          humidity:result.main.humidity,
          result: result,
          dt: result.dt,
          sunrise: result.sys.sunrise,
          sunset: result.sys.sunset,
          city: result.name
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, loading, error };
};