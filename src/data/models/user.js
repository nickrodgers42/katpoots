const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bcrypt = bluebird.promisifyAll(require("bcrypt"));

let uniqueValidator = require("mongoose-unique-validator");

let UserSchema = new mongoose.Schema({
  // --- MVP Required --- //

  // must have a username
  username: { type: String, required: true, unique: true },
  // display name
  displayName: { type: String },

  // must have password
  password: { type: String, requried: true },
  //owned quizzes, no proctor class needed
  quizzes: [{type:mongoose.SchemaTypes.ObjectId, ref: 'quiz' }],

  firstName: { type: String, required: true },

  lastName: { type: String, required: true },

  email: { type: String, required: true, unique: true }

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

UserSchema.pre("save", async function() {
  if (!this.isModified("password") || !this.isNew) return;
  const salt = await bcrypt.genSaltAsync(10);
  const hash = await bcrypt.hash(this.password, salt, null);
  this.password = hash;
});

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

//if the uniqueValidator defined above is found, has the message somewhere
UserSchema.plugin(uniqueValidator, { message: "must be unique" });

//once the database links all of this, this is all that is needed
module.exports = UserSchema;
