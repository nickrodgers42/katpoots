//just needed at the head of everything for some reason
let mongoose = require('mongoose');
// below is to make sure nothing is identical, that could cause issue
let uniqueValidator = require('mongoose-unique-validator');

var QuizSchema = new mongoose.Schema({
  owner: mongoose.SchemaTypes.ObjectId,
  quizTitle: {type:String, required:true},
  date: {type:Date, default:Date.now},
  closed: Boolean,
  //array of questions that will follow the Question schema
  questions: [{type:mongoose.SchemaTypes.ObjectId, ref:'question'}],
  //array of users that will represent who is in the quiz
  users: [mongoose.SchemaTypes.ObjectId]
});

//if the uniqueValidator defined above is found, has the message somewhere
QuizSchema.plugin(uniqueValidator, { message: 'something is not unique' });

//once the database links all of this, this is all that is needed
module.exports = QuizSchema;
