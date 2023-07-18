const mongoose = require('mongoose');
async function connectToDatabase(connectionUri) {
  try {
    await mongoose.connect('mongodb://127.0.0.1/weatherApp');
    console.log('Connected to the database.');
  } catch (error) {
    console.error('some thing went wrong:', error);
  }
}

module.exports = connectToDatabase;
