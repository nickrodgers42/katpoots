import { loadModels } from "./index";
//just needed at the head of everything for some reason
let mongoose = require("mongoose");
// below is to make sure nothing is identical, that could cause issue
let uniqueValidator = require("mongoose-unique-validator");

var QuizSchema = new mongoose.Schema({
  owner: mongoose.SchemaTypes.ObjectId,
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  closed: Boolean,
  //array of questions that will follow the Question schema
  questions: [{ type: mongoose.SchemaTypes.ObjectId, ref: "question" }],

  parent: { type: mongoose.SchemaTypes.ObjectId },
  //array of users that will represent who is in the quiz
  users: [mongoose.SchemaTypes.ObjectId],
  pin: Number,
  questionIndex: { type: Number, default: 0 },
  closeQuestion: { type: Boolean, default: false }
});

async function getNextPin() {
  const models = await loadModels();
  let pinExists;
  let pin;

  do {
    pin = (Math.random() * 1e6).toFixed(0);
    pinExists = Boolean(await models.quiz.findOne({ pin }));
  } while (pinExists);

  return pin;
}

QuizSchema.pre("save", async function() {
  this.pin = await getNextPin();
});

QuizSchema.pre("remove", async function() {
  const questions = await mongoose.models["question"].find({ parent: this._id });
  for (let question of questions) {
    question.remove();
  }
});

//if the uniqueValidator defined above is found, has the message somewhere
QuizSchema.plugin(uniqueValidator, { message: "something is not unique" });

//once the database links all of this, this is all that is needed
module.exports = QuizSchema;
