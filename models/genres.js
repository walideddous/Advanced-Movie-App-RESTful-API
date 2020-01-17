const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minength: 5,
    maxlength: 50
  }
});
const Genre = mongoose.model('Genre', genreSchema);

function validate(genre) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  };
  return Joi.validate(genre, schema);
}

module.exports = {
  Genre,
  validate,
  genreSchema
};
