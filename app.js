require('dotenv').config();
require('express-async-errors');

// packages
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// express
const app = express();

const dev = process.env.NODE_ENV !== 'production';
const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;

// database
const connectDB = require('./db/connect');

// routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('e-commerce api');
});

app.get('/api/v1', (req, res) => {
  // console.log(req.cookies);
  console.log(req.signedCookies);
  res.send('e-commerce api');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const ROOT_URL = `http://localhost:${port}`;

const start = async () => {
  try {
    await connectDB(MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${ROOT_URL}..`));
  } catch (error) {
    console.log(error);
  }
};

start();
