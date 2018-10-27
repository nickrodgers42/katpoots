let mongoose = require('mongoose');

let uniqueValidator = require('mongoose-unique-validator');

let SessionSchema = new mongoose.Schema({
    userId:{type: String, default: ''},

    timestamp: {type: Date, default: Date.now()}
});

//once the database links all of this, this is all that is needed
module.exports = SessionSchema;