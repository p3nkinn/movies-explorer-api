const { isEmail } = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Пожалуйста, введите имя!'],
    maxlength: 30,
    default: 'Сергей',
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Укажите адрес электронной почты'],
    validate: [isEmail, 'Пожалуйста, заполните правильный адрес электронной почты'],
  },
  password: {
    type: String,
    required: [true, 'Пожалуйста, введите пароль'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные почта или пароль');
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
