const auth = require('../middleware/auth');
const isadmnin = require('../middleware/isadmin');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const _ = require('lodash');
const { User, validateUser } = require('../models/user');

router.get('/me', auth, async (req, res) => {
  // console.log(req.user._id);
  const user = await User.findById(req.user.id).select('-password');
  try {
    res.send(user);
  } catch (ex) {
    console.log('cannot get the User');
  }
});

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});

module.exports = router;
