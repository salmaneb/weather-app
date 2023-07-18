import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherData } from '../redux/WeatherSlice';
import { motion } from 'framer-motion';

const WeatherCard = ({ latitude, longitude }) => {
  const dispatch = useDispatch();
  const { currentWeather, forecast, loading, error } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(fetchWeatherData({ latitude, longitude }));
  }, [dispatch, latitude, longitude]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const staggerFadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const fadeInTransition = {
    duration: 2,
  };

  return (
    <div className="p-4">
      {currentWeather && (
        <motion.div
          className="border rounded-lg p-4 bg-blue-100"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={fadeInTransition}
        >
          <motion.h2 className="text-2xl font-semibold" variants={fadeInVariants}>
            Current Weather
          </motion.h2>
          <motion.p className="text-lg" variants={fadeInVariants}>
            Temperature: <span className="font-semibold">{currentWeather.temperature}°C</span>
          </motion.p>
          <motion.p className="text-lg" variants={fadeInVariants}>
            Weather Code: {currentWeather.weathercode}
          </motion.p>
        </motion.div>
      )}
      {forecast.length > 0 && (
        <motion.div
          className="mt-4"
          variants={staggerFadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.h2 className="text-2xl font-semibold mb-2" variants={fadeInVariants}>
            7-Day Forecast
          </motion.h2>
          <motion.div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {forecast.map((day, index) => (
              <motion.div
                key={index}
                className="border rounded-lg p-4 bg-green-100"
                variants={fadeInVariants}
              >
                <motion.p className="text-lg font-semibold">Date: {day.date}</motion.p>
                <motion.p className="text-lg" variants={fadeInVariants}>
                  Max Temperature: <span className="font-semibold">{day.temperature_2m_max}°C</span>
                </motion.p>
                <motion.p className="text-lg" variants={fadeInVariants}>
                  Min Temperature: <span className="font-semibold">{day.temperature_2m_min}°C</span>
                </motion.p>
                <motion.p className="text-lg" variants={fadeInVariants}>
                  Weather Code: {day.weathercode}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default WeatherCard;
