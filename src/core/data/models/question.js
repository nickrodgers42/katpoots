"use strict";

var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');

var QuestionSchema = new mongoose.Schema({
  questionId: Number,
  text: {
    type: String,
    required: true
  },
  answers: [mongoose.SchemaTypes.ObjectId],
  quizId: Number
});
QuestionSchema.plugin(uniqueValidator, {
  message: 'something is not unique'
});
module.exports = QuestionSchema;