import { loadModels } from "../../data/models";
import { ensureLoggedIn } from "connect-ensure-login";

module.exports = function(server) {
  server.get("/api/answer/:answerId", getAnswer);
  server.post("/api/answer/:questionId", createAnswer);
  server.delete("/api/answer/:questionId/:answerId", deleteAnswer);
  server.put("/api/answer/:answerId", updateAnswer);
};

async function createAnswer(req, res, next) {
  const models = await loadModels();
  const Question = await models.question;
  const Answer = await models.answer;
  const question = await Question.findById(req.params.questionId);
  if (!question){
    res.status(404).send({ error: `Question with ID ${req.params.questionId} not found!` });
    return next();
}
  const newAnswer = new Answer({
    answerText: req.body.answerText,
    correctAnswer: req.body.correctAnswer
  });
  question.answers.push(newAnswer);
  await question.save();
  await newAnswer.save();
  res.json(newAnswer);
  next();
}

async function getAnswer(req, res, next) {
  try {
    const answerId = req.params.answerId;
    const models = await loadModels();
    const answer = await models.answer.findById(answerId);
    if (!answer) {
      res.status(404).send({ error: `Answer with ID ${answerId} not found!` });
      return next();
    }
    res.json(answer);
    next();
  } catch (e) {
    res.status(500).send({ error: e.message });
    next(e);
  }
}

async function deleteAnswer(req, res, next){
  const models = await loadModels();
  const Question = await models.question;
  const Answer = await models.answer;
  const question = await Question.findById(req.params.questionId);
  if (!question) {
    res.status(404).send({ error: `Question with ID ${req.params.questionId} not found!` });
    return next();
  }
  const answer = await Answer.findById(req.params.answerId);
  if (!answer) {
    res.status(404).send({ error: `Answer with ID ${req.params.answerId} not found!` });
    return next();
  } 
  question.answers.pop(answer);
  answer.remove();
  await question.save();
  res.json(question);
  next();
}

async function updateAnswer(req, res, next){
  const models = await loadModels();
  const Answer = await models.answer;
  const answer = await Answer.findOneAndUpdate(
    {_id:req.params.answerId},
    req.body,
    (err) =>{
      if(err){
        res.send(err);
        next();
      }
    }
  )
  if (!answer){
    res.status(404).send({ error: `Answer with ID ${req.params.answerId} not found!` });
    return next();
  }
  res.json(answer);
  next();
}
