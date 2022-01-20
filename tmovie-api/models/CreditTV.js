const mongoose = require('mongoose');

const CreditSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    name: { type: String, required: true},
    profile_path: { type: String, required: true},
    birthday: { type: Date, required: true},
    biography: { type: String, required: true},
    idTV: {type: Number, required: true},
});

module.exports = mongoose.model('CreditTV', CreditSchema)