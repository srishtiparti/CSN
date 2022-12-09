const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username must be provided'],
        minlength: 6,
        maxlength: 50
    },
    password: {
        type: String,
        required: [true, 'Password must be provided'],
        minlength: 3,
    },
    model: {
        type: String,
    },
    insurer: {
        type: String,
    }
})

module.exports = mongoose.model('User', userSchema)