const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
  mongoose
    .connect('mongodb://localhost/Movie_app', {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
    .then(() => winston.info('Connected on MongoDB...'));
};
