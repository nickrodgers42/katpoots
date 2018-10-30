let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let QuestionSchema = new mongoose.Schema({
  questionId: Number,
  questionText: { type: String, required: true },
  answers: [{type:mongoose.SchemaTypes.ObjectId, ref:'answer'}],
});

QuestionSchema.plugin(uniqueValidator, { message: 'something is not unique' });

module.exports = QuestionSchema;
