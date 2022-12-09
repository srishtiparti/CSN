const mongoose = require('mongoose')

const InsurerSchema = new mongoose.Schema({
    Insurer: {
        type: String,
        required: [true, 'Username must be provided'],
    },
    Paint: {
        type: String,
    },
    Mechanical: {
        type: String,
    },
    Bodywork: {
        type: String,
    },
})

module.exports = mongoose.model('Insurer', InsurerSchema)