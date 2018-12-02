let mongoose = require("mongoose");

let uniqueValidator = require("mongoose-unique-validator");

let UserSchema = new mongoose.Schema({
  // --- MVP Required --- //

  // must have a username
  username: { type: String },
  // display name
  displayName: { type: String, required: true },
  // must have password
  password: { type: String },

  score: { type: Number, default: 0 }

  //----------------------------------//
  // --- once we're done with MVP --- //
  //----------------------------------//
  // all scores from all quizzes
  // totalScore: {type: Number, default: 0},
  // // number of quizzes participated in
  // numberOfQuizzes: {type: Number, default: 0},
  // // average score
  // averageScore: {type: Number, default: 0},
});

//if the uniqueValidator defined above is found, has the message somewhere
UserSchema.plugin(uniqueValidator, { message: "something is not unique" });

//once the database links all of this, this is all that is needed
module.exports = UserSchema;
