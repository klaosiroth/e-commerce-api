require('dotenv').config();
require('express-async-errors');

// packages
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// express
const app = express();

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('e-commerce api');
});

app.get('/api/v1', (req, res) => {
  console.log(req.cookies);
  res.send('e-commerce api');
});

app.use('/api/v1/auth', authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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