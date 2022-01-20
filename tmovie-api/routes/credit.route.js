const Credit = require('../models/Credit');
const Movie = require('../models/Movie');

const router = require('express').Router();

router.post('/create', async (req, res) => {
    const newCredit = new Credit({
        id: req.body.id,
        name: req.body.name,
        profile_path: req.body.profile_path,
        birthday: new Date(req.body.birthday),
        biography: req.body.biography,
        idMovie: req.body.idMovie,
    });

    try {
        const savedCredit = await newCredit.save();
        res.status(201).json(savedCredit);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    const query = req.query.new;
    try {
      const credits = query
        ? await Credit.find().sort({ _id: -1 }).limit(5)
        : await Credit.find();
      res.status(200).json(credits);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const cast = await Credit.find({ id: id });
  let movies = [];
  for (let i = 0; i < cast.length; i++) {
    const idMovie = cast[i].idMovie;
    const movie = await Movie.find({ id: idMovie})
    movies.push({
      "title": movie[0].title,
      "poster_path": movie[0].poster_path,
    });
  }
  res.send({
    "info":cast[0],
    movies,
  });
});

module.exports = router;