//just needed at the head of everything for some reason
var mongoose = require('mongoose');
// below is to make sure nothing is identical, that could cause issue
var uniqueValidator = require('mongoose-unique-validator')

var quizSchema = new mongoose.Schema({
    owner: ObjectId,
    title: string,
    date: Date,
    closed: Boolean
    //array of questions that will follow the Question schema
    questions: [Question]
    //array of users that will represent who is in the quiz
    users: [User]
})


//if the uniqueValidator defined above is found, has the message somewhere
quizSchema.plugin(uniqueValidator, {message: 'something is not unique'})

//once the database links all of this, this is all that is needed
module.exports = quizSchema;