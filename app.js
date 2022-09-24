const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');
const { validateLogin, validateCreateUser } = require('./middlewares/validate');

const options = {
  origin: [
    'http://localhost:3000',
    'https://p3nkinn.students.nomoredomains.sbs',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

const app = express();
app.use('*', cors(options));
const { PORT = 3000 } = process.env;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/moviesdb');
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  validateLogin,
  login,
);
app.post(
  '/signup',
  validateCreateUser,
  createUser,
);

app.use('/', auth, require('./routes/users'));
app.use('/', auth, require('./routes/movie'));

app.use(auth, () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
