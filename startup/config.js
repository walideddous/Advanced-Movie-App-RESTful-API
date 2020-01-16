const config = require('config');

module.exports = function() {
  if (!config.get('jsonSecretKey')) {
    throw new Error('Fatal Error jsonSecretKey is not defined');
  }
};
