import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    longitude: "",
    latitude: "",
  });
  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });
  const [error, setError] = useState(null);
  const { selectedLocation } = useContext(LocationContext);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading((prev) => ({
        ...prev,
        state: true,
        message: "Fetching weather data...",
      }));

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setWeatherData({
        location: data.name || "Unknown",
        climate: data.weather?.[0]?.main || "Unknown",
        temperature: data.main?.temp || "N/A",
        maxTemperature: data.main?.temp_max || "N/A",
        minTemperature: data.main?.temp_min || "N/A",
        humidity: data.main?.humidity || "N/A",
        cloudPercentage: data.clouds?.all || "N/A",
        wind: data.wind?.speed || "N/A",
        time: data.dt || Date.now(),
        longitude,
        latitude,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading((prev) => ({ ...prev, state: false, message: "" }));
    }
  };

  useEffect(() => {
    if (selectedLocation.latitude && selectedLocation.longitude) {
      fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError("Unable to retrieve location. Using default location.");
          fetchWeatherData(51.5074, -0.1278); // Default to London
        }
      );
    }
  }, [selectedLocation]);

  return {
    weatherData,
    error,
    loading,
  };
};

export default useWeather;
