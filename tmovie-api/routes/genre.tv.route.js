const Genre = require('../models/GenreTV');

const route = require('express').Router();

route.post('/create', async (req, res) => {
    const newGenre = new Genre({
        id: req.body.id,
        name : req.body.name,
    });

    try {
        const savedGenre = await newGenre.save();
        res.status(200).json(savedGenre);
    } catch (err) {
        res.status(500).json(err);
    }
});


route.get("/", async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await Genre.find().sort({ _id: -1 }).limit(5)
        : await Genre.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = route;