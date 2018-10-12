var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
    // position in question spot
    position: Number,
    // array of voters picking this answer
    text : String,
    // to retrieve a specific question
    questionid: Number,
    // keep track of how many votes received
    votecount: Number,
    // array of voterids on this answer
    voterids: [Number],
})