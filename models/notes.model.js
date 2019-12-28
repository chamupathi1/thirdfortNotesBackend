const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Note = new Schema({
    userId: {
        type: String
    },
    content: {
        type: String
    },
    archived: {
        type: Boolean
    }
});

module.exports = mongoose.model('Note', Note);