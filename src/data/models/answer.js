var mongoose = require('mongoose');
// below is to make sure nothing is identical, that could cause issue
var uniqueValidator = require('mongoose-unique-validator')

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

//if the uniqueValidator defined above is found, has the message somewhere
AnswerSchema.plugin(uniqueValidator, {message: 'something is not unique'})
//registers our schema with mongoose
mongoose.model('Answer', AnswerSchema);