const mongoose = require('mongoose');
const weatherSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  data: { type: Object, required: true },
});

const Weather = mongoose.model('Weather', weatherSchema);
module.exports=Weather