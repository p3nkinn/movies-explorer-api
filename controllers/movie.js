const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ForbiddenError = require('../errors/ForbiddenError');
const modelMovie = require('../models/movie');

module.exports.getMovie = (req, res, next) => {
  modelMovie
    .find({})
    .then((movie) => res.send({ movie }))
    .catch((err) => next(err));
};

module.exports.delMovieById = (req, res, next) => {
  modelMovie
    .findById(req.params.id)
    .orFail(() => new NotFound('Фильм по указанному id не найдена в БД.'))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Передан некорректный id.'));
      } else {
        next(err);
      }
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Невозможно удалить чужой фильм');
      }
      modelMovie
        .findByIdAndDelete(req.params.id)
        .then((movieDelete) => res.send({ data: movieDelete }));
    })
    .catch((err) => next(err));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  modelMovie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};
