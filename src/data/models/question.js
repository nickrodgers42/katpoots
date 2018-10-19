let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let QuestionSchema = new mongoose.Schema({
  questionId: Number,
  text: { type: String, required: true },
  answers: [mongoose.SchemaTypes.ObjectId],
  quizId: Number
});

QuestionSchema.plugin(uniqueValidator, { message: 'something is not unique' });

module.exports = QuestionSchema;
