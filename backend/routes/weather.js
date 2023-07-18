const express = require("express");
const router = express.Router();
const axios = require('axios');
const Weather = require('../modal/Weather');

router.get("/", async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    const newWeather = new Weather({
      latitude,
      longitude,
      data: response.data,
    });
    await newWeather.save();

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

module.exports = router;
