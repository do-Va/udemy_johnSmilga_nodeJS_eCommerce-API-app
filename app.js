require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');
const app = express();

// database
const connectDB = require('./db/connect');

//middleware
const notfoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// req.body içerisindeki json verileri almamızı sağlıyor.
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1 >e-commerce api</h1>');
});

app.use(notfoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
