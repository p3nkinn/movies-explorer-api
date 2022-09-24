const mongoose = require('mongoose');
const { isURL } = require('validator');
const { regEXp } = require('../utils/regEXp');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
    length: 4,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: regEXp,
    validate: [isURL, 'Пожалуйста, заполните правильный URL адрес!'],
  },
  trailerLink: {
    type: String,
    required: true,
    match: regEXp,
    validate: [isURL, 'Пожалуйста, заполните правильный URL адрес!'],
  },
  thumbnail: {
    type: String,
    required: true,
    match: regEXp,
    validate: [isURL, 'Пожалуйста, заполните правильный URL адрес!'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
