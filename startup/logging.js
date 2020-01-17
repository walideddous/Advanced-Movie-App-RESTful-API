const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtException.log' })
  );

  process.on('unhandledRejection', ex => {
    throw ex;
  });

  // logging the error on the File
  winston.add(winston.transports.File, { filename: 'log.log' });

  //logging the error on the database

  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/Movie_app',
  //   level: 'info'
  // });
};
