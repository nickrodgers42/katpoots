let mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let uniqueValidator = require('mongoose-unique-validator');

let UserSchema = new mongoose.Schema({
  // --- MVP Required --- //

  // must have a username
  username: { type: String, required: true },
  // display name
  displayName: { type: String},

  // must have password
  password: { type: String, requried: true },
  //owned quizzes, no proctor class needed
  quizzes: [mongoose.SchemaTypes.ObjectId],

  firstName: {type: String, default: '', required:true},

  lastName: {type:String, default: '', required:true},

  email: {type:String, default:'', required:true},

  //----------------------------------//
  // --- once we're done with MVP --- //
  //----------------------------------//
  // all scores from all quizzes
  // totalScore: {type: Number, default: 0},
  // // number of quizzes participated in
  // numberOfQuizzesPlayed: {type: Number, default: 0},
  // // number of quizzes owned
  // numberOfQuizzesOwned: {type: Number, default: 0}
  // // average score
  // averageScore: {type: Number, default: 0},
});

UserSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

//if the uniqueValidator defined above is found, has the message somewhere
UserSchema.plugin(uniqueValidator, { message: 'something is not unique' });

//once the database links all of this, this is all that is needed
module.exports = UserSchema;
