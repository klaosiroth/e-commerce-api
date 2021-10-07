const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = (url) => {
  return mongoose.connect(url, options);
};

module.exports = connectDB;
