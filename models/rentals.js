const mongoose = require('mongoose');
const Joi = require('joi');

const Rentals = mongoose.model(
  'Rentals',
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
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
      }),
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          trim: true,
          minength: 5,
          maxlength: 255
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255
        }
      }),
      required: true
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now
    },
    dateReturned: {
      type: Date
    },
    rentalFee: {
      type: Number,
      min: 0
    }
  })
);

function validateRental(rentals) {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  };
  return Joi.validate(rentals, schema);
}

module.exports = {
  Rentals,
  validateRental
};
