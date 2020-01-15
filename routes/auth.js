const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
// const config = require('config');
// const jwt = require('jsonwebtoken');

const { User } = require('../models/user');

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user.email) return res.status(400).send('Email or Password invalid');

  const Passvalid = await bcrypt.compare(req.body.password, user.password);
  if (!Passvalid) return res.status(400).send('Password is not valid');

  // const token = jwt.sign({ id: user._id }, config.get('jsonSecretKey'));
  const token = user.generateAuthToken();
  res.send(token);
});

function validateUser(user) {
  const schema = {
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

module.exports = router;
