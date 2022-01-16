const mongoose = require('mongoose');

const userSchema = {
    firstName: String,
    lastName: String,
    password: String,
    age: Number,
}

module.exports = mongoose.model('User', userSchema);