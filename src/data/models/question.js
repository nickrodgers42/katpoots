let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let QuestionSchema = new mongoose.Schema({
  questionId: Number,
  questionText: { type: String, required: true },
  answers: [{type:mongoose.SchemaTypes.ObjectId, ref:'answer'}],
  parent: {type:mongoose.SchemaTypes.ObjectId},
});

QuestionSchema.pre("remove", async function(){ 
  const answers = await mongoose.models["answer"].find({"parent":this._id});
  for(let answer of answers){
    answer.remove();
  }
});

QuestionSchema.plugin(uniqueValidator, { message: 'something is not unique' });

module.exports = QuestionSchema;
