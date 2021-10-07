require('dotenv').config();

// packages
const express = require('express');

// express
const app = express();

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

// database
const connectDB = require('./db/connect');

const port = process.env.PORT || 5000;
const ROOT_URL = `http://localhost:${port}`;

const start = async () => {
  try {
    await connectDB(MONGO_URL)
    app.listen(port, console.log(`Server is listening on port ${ROOT_URL}..`));
  } catch (error) {
    console.log(error);
  }
}

start();