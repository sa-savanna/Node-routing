const mongoose = require('mongoose');

let iceSchema = new mongoose.Schema({
    header: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // }
})

module.exports = mongoose.model('Ice', iceSchema);
