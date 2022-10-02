const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { validateDeleteMovie, validateCreateMovie } = require('../middlewares/validate');
const {
  getMovie,
  createMovie,
  delMovieById,
} = require('../controllers/movie');

router.get(
  '/movies',
  auth,
  getMovie,
);
router.post(
  '/movies',
  auth,
  validateCreateMovie,
  createMovie,
);
router.delete('/movies/:id', auth, validateDeleteMovie, delMovieById);

module.exports = router;
