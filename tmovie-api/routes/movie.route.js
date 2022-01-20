const Movie = require('../models/Movie');
const Credit = require('../models/Credit');
const Genres = require('../models/Genre');
const Video = require('../models/Video');

const router = require('express').Router();


const getPagination = (page, size) => {
    const limit = size ? +size : 20;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
};


router.post('/create', async (req, res) => {
    const newMovie = new Movie({
        id: req.body.id,
        title: req.body.title,
        backdrop_path: req.body.backdrop_path,
        poster_path: req.body.poster_path,
        overview: req.body.overview,
        release_date: new Date(req.body.release_date),
        vote_average: req.body.vote_average,
        vote_count: req.body.vote_count,
        popularity: req.body.popularity,
        genres: req.body.genres,
    });

    try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    const { page, size, title } = req.query;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page - 1, size);

  Movie.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        page: data.page,
        results: data.docs,
        total_results: data.totalDocs,
        total_pages: data.totalPages,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.get("/popular", async (req, res) => {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page - 1, size);
    var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Movie.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        page: data.page,
        results: data.docs.sort((a, b) =>{
            return b.popularity - a.popularity;
        }),
        total_results: data.totalDocs,
        total_pages: data.totalPages,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

router.get("/top_rated", async (req, res) => {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page - 1, size);
    var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Movie.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        page: data.page,
        results: data.docs.sort((a, b) =>{
            return b.vote_count - a.vote_count;
        }),
        total_results: data.totalDocs,
        total_pages: data.totalPages,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});


router.get("/upcoming", async (req, res) => {
    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page - 1, size);
    var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};
  Movie.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        page: data.page,
        results: data.docs.sort((a, b) =>{
            return b.release_date - a.release_date;
        }),
        total_results: data.totalDocs,
        total_pages: data.totalPages,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});


router.get('/:id', async (req, res) => {
    const id = req.params.id
    const movie = await Movie.find({id: id});
    if (!movie || !movie.length) {
        res.status(404);
    }
    const genres = movie[0].genres;
    let rGenres = [];
    for (let i = 0; i < genres.length; i++) {
        const id = genres[i];
        const name = (await Genres.find({id: id}))[0].name;
        rGenres.push({name})
    }
    movie[0].genres = rGenres;
    const result = movie[0];
    res.send(result);
});

router.get('/:id/credits', async (req, res) => {
    const id = req.params.id;
    const Credits = await Credit.find( {idMovie: id});
    res.send(Credits.slice(0, 5))
});
module.exports = router;

router.get('/:id/videos', async (req, res) =>{
    const id = req.params.id;
    const videos = await Video.find( {idMovie: id});
    res.send({ results: videos});
});

router.get('/:id/similar', async (req, res) =>{
    const id = req.params.id;
    const movie = await Movie.find( {id: id})
    const genres = movie[0].genres;
    const similar = await Movie.find( {genres: genres} );
    res.send({
      'results': similar,
    })
});


router.get('/search/movie', async (req, res) =>{
  const {query} = req.query;
    const movie = await Movie.find( {title: { $regex: query }});
    res.send({
      "results": movie,
    });
});


module.exports = router;