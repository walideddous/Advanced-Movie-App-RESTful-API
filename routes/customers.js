const express = require('express');
const router = express.Router();
const { validate, Customers } = require('../models/customers');
require('express-async-errors');

router.get('/', async (req, res) => {
  const customer = await Customers.find().sort('name');
  res.send(customer);
});

router.get('/:id', async (req, res) => {
  const customer = await Customers.findById(req.params.id);
  if (!customer) return res.status(404).send('The given ID doesnt exist');
  res.send(customer);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customers({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();

  res.send(customer);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customers.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    { new: true }
  );

  if (!customer) return res.status(404).send('The given ID doesnt exist');

  res.send(customer);
});

router.delete('/:id', async (req, res) => {
  const customer = await Customers.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The given ID doesnt exist');

  res.send(customer);
});

module.exports = router;
