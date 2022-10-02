const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validate');
const { auth } = require('../middlewares/auth');

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users/me', auth, getCurrentUser);
router.patch('/users/me', auth, validateUpdateUser, updateUser);

module.exports = router;
