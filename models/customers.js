const mongoose = require('mongoose');
const Joi = require('joi');

const Customers = mongoose.model(
  'Customers',
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true,
      minength: 5,
      maxlength: 50
    },
    phone: {
      type: Number,
      required: true
    }
  })
);

function validate(customer) {
  const schema = {
    name: Joi.string().required(),
    isGold: Joi.boolean().required(),
    phone: Joi.number().required()
  };
  return Joi.validate(customer, schema);
}

module.exports = {
  Customers,
  validate
};
