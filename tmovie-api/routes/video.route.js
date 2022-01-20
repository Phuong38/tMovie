const Video = require('../models/Video');

const router = require('express').Router();

router.post('/create', async (req, res) => {
    const newVideo = new Video({
        name: req.body.name,
        key: req.body.key,
        idMovie: req.body.idMovie,
    });

    try {
        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    const query = req.query.new;
    try {
      const Videos = query
        ? await Video.find().sort({ _id: -1 }).limit(5)
        : await Video.find();
      res.status(200).json(Videos);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;