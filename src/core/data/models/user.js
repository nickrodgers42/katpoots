"use strict";

var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  // --- MVP Required --- //
  // must have a username
  username: {
    type: String,
    required: true
  },
  // display name
  displayName: {
    type: String,
    required: true
  },
  // must have password
  password: {
    type: String,
    required: true 
  }
  //owned quizzes, editable by them
  ownedQuizzes: {
    type: [mongoose.SchemaTypes.ObjectId],
    // doesn't necessarily need to own ANY quizzes, but field must exist
    required: true,
    default: []
  }

  //----------------------------------//
    // --- once we're done with MVP --- //
    //----------------------------------//
    // all scores from all quizzes
    // totalScore: {type: Number, default: 0},
    // // number of quizzes participated in
    // numberOfQuizzes: {type: Number, default: 0},
    // // average score
    // averageScore: {type: Number, default: 0},
}); //if the uniqueValidator defined above is found, has the message somewhere

UserSchema.plugin(uniqueValidator, {
  message: 'something is not unique'
}); //once the database links all of this, this is all that is needed

module.exports = UserSchema;