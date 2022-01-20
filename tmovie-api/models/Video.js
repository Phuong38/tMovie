const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    
    name: { type: String, required: true},
    key: { type: String, required: true},
    idMovie: { type: Number, required: true},
});

module.exports = mongoose.model('Video', VideoSchema)