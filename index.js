const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

console.log(`app: ${app.get('env')}`);

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  winston.info(`Server is runing on port ${port}`)
);

module.exports = server;
