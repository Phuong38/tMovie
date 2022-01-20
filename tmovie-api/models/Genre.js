const mongoose = require("mongoose")

const GenreSchema = new mongoose.Schema({

    id: { type: Number, require: true, unique: true },
    name: { type: String, require: true},
});

module.exports = mongoose.model('Genre', GenreSchema);