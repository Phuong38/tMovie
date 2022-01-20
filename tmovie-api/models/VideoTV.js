const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    
    name: { type: String, required: true},
    key: { type: String, required: true},
    idTV: { type: Number, required: true},
});

module.exports = mongoose.model('VideoTV', VideoSchema)