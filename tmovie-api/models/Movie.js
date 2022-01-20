const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const MovieSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true, unique: true },
        title: { type: String, required: true, unique: true},
        backdrop_path: { type: String, required: true},
        poster_path: { type: String, required: true},
        overview : { type: String, required: true},
        release_date: { type: Date, required: true},
        vote_average: { type: Number, required: true},
        vote_count: { type: Number, required: true},
        popularity: { type: Number, required: true},
        genres: { type: Array, required: true, default: []},
    }
);

MovieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model('Movie', MovieSchema);
module.exports = Movie;