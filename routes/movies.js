const express = require('express');
const router = express.Router();
const { Movie, validateMovies } = require('../models/movies');
const { Genre } = require('../models/genres');
const auth = require('../middleware/auth');
require('express-async-errors');

router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
});

router.get('/:id', async (req, res) => {
  const movies = await Movie.findById(req.params.id);
  if (!movies) return res.status(404).send('The given ID doesnt exist');
  res.send(movies);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateMovies(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre');

  let movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });

  movie = await movie.save();
  res.send(movie);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateMovies(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movies = await Movie.findByIdAndUpdate(
    req.params.id,
    { title: req.body.titles },
    { new: true }
  );

  if (!movies) return res.status(404).send('The given ID doesnt exist');

  res.send(movies);
});

router.delete('/:id', auth, async (req, res) => {
  const movies = await Movie.findByIdAndRemove(req.params.id);

  if (!movies) return res.status(404).send('The given ID doesnt exist');

  res.send(movies);
});

module.exports = router;
