const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { validateDeleteMovie, validateCreateMovie } = require('../middlewares/validate');
const {
  getMovie,
  createMovie,
  delMovieById,
} = require('../controllers/movie');

router.get(
  '/cards',
  auth,
  getMovie,
);
router.delete('/cards/:id', auth, validateDeleteMovie, delMovieById);
router.post(
  '/cards',
  auth,
  validateCreateMovie,
  createMovie,
);

module.exports = router;
