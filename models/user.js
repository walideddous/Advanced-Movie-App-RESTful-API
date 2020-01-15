const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minength: 5,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minength: 5,
    maxlength: 1024
  }
});
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
}

module.exports = {
  User,
  validateUser
};
