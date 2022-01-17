const mongoose = require('mongoose');

const gameSchema = {
    location: String,
    matchDate: Date,
    players: Number,
}

module.exports = mongoose.model('Game', gameSchema);