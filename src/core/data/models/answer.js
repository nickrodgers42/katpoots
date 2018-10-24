"use strict";

//just needed at the head of everything for some reason
var mongoose = require('mongoose'); // below is to make sure nothing is identical, that could cause issue


var uniqueValidator = require('mongoose-unique-validator');

var AnswerSchema = new mongoose.Schema({
  // position in question spot
  position: Number,
  // array of voters picking this answer
  text: {
    type: String,
    required: true
  },
  // to retrieve a specific question
  questionId: Number,
  // keep track of how many votes received
  voteCount: {
    type: Number,
    default: 0
  },
  // array of voterids on this answer
  voterIds: [mongoose.SchemaTypes.ObjectId]
}); //if the uniqueValidator defined above is found, has the message somewhere

AnswerSchema.plugin(uniqueValidator, {
  message: 'something is not unique'
}); //once the database links all of this, this is all that is needed

module.exports = AnswerSchema;