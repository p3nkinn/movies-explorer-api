const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFound = require('../errors/NotFound');
const { validateLogin, validateCreateUser } = require('../middlewares/validate');

router.post(
  '/signin',
  validateLogin,
  login,
);
router.post(
  '/signup',
  validateCreateUser,
  createUser,
);

router.use('/', auth, require('./users'));
router.use('/', auth, require('./movie'));

router.use(auth, () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
