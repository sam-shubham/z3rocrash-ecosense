"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  CloudRain,
  CloudLightning,
  Sun,
  CloudSnow,
  Wind,
  Droplets,
  MapPin,
  Clock,
  Mountain,
  Loader2,
} from "lucide-react";

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  const getWeatherIcon = (code) => {
    if (code === 1000) return <Sun className="w-8 h-8 text-yellow-400" />;
    if (code >= 1001 && code <= 1003)
      return <Cloud className="w-8 h-8 text-gray-400" />;
    if (code >= 1180 && code <= 1201)
      return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (code >= 1273 && code <= 1282)
      return <CloudLightning className="w-8 h-8 text-yellow-400" />;
    if (code >= 1210 && code <= 1225)
      return <CloudSnow className="w-8 h-8 text-white" />;
    return <Cloud className="w-8 h-8 text-gray-400" />;
  };

  // Get user's location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
          });
          setLocationLoading(false);
        },
        (error) => {
          setError("Unable to get location: " + error.message);
          setLocationLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setLocationLoading(false);
    }
  }, []);

  // Fetch weather data once we have location
  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;

      try {
        const API_KEY = "d13c6b8b7f0b4f9683091808250802";
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location.latitude},${location.longitude}&aqi=no`
        );

        if (!response.ok) {
          throw new Error("Weather data fetch failed");
        }

        const data = await response.json();

        localStorage.setItem("weatherData", JSON.stringify(data));
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

  if (locationLoading || loading) {
    return (
      <div className="bg-gray-800/50 rounded-3xl p-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        <span className="ml-2 text-gray-300">
          {locationLoading
            ? "Getting your location..."
            : "Fetching weather data..."}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 rounded-3xl p-6">
        <h3 className="text-xl text-red-400">Error</h3>
        <p className="text-gray-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
      {/* Current Weather */}
      <motion.div
        className="md:col-span-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-light mb-2">Current Weather</h2>
            <div className="text-6xl font-light">
              {Math.round(weatherData?.current?.temp_c)}°C
            </div>
            <div className="text-gray-400 mt-2">
              {weatherData?.current?.condition?.text}
            </div>
          </div>
          {getWeatherIcon(weatherData?.current?.condition?.code)}
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center text-gray-300">
            <MapPin className="w-4 h-4 mr-2" />
            <span>
              {weatherData?.location?.name}, {weatherData?.location?.country}
            </span>
          </div>
          {location?.altitude && (
            <div className="flex items-center text-gray-300">
              <Mountain className="w-4 h-4 mr-2" />
              <span>
                Altitude:{" "}
                {location?.altitude
                  ? `${Math.round(location.altitude)}m`
                  : "Not available"}
              </span>
            </div>
          )}
          <div className="flex items-center text-gray-300">
            <Clock className="w-4 h-4 mr-2" />
            <span>{weatherData?.location?.localtime}</span>
          </div>
        </div>
      </motion.div>

      {/* Weather Stats */}
      <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Coordinates */}
        <motion.div
          className="bg-gray-800/50 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-gray-400 mb-4">Location</h3>
          <div className="text-sm space-y-2">
            <div>Lat: {location?.latitude.toFixed(4)}°</div>
            <div>Long: {location?.longitude.toFixed(4)}°</div>
          </div>
        </motion.div>

        {/* Wind Status */}
        <motion.div
          className="bg-gray-800/50 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Wind</h3>
            <Wind className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-light">
            {weatherData?.current?.wind_kph}
            <span className="text-sm ml-1">km/h</span>
          </div>
          <div className="text-sm text-gray-400 mt-2">
            Direction: {weatherData?.current?.wind_dir}
          </div>
        </motion.div>

        {/* Humidity */}
        <motion.div
          className="bg-gray-800/50 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Humidity</h3>
            <Droplets className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-3xl font-light">
            {weatherData?.current?.humidity}
            <span className="text-sm ml-1">%</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherCard;
