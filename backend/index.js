const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectToDatabase = require("./db/db");
const cors = require("cors");
const weatherRouter = require("./routes/weather");

connectToDatabase();
app.use(cors());

app.use("/api/weather", weatherRouter);

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});
