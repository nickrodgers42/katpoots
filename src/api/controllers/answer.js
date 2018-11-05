import { loadModels } from "../../data/models";
import { ensureLoggedIn } from "connect-ensure-login";

module.exports = function(server) {
  server.get("/api/answer/:answerId", getAnswer);
  server.post("/api/answer/:questionId", createAnswer);
  server.delete("/api/answer/:answerId", deleteAnswer);
  server.put("/api/answer/:answerId", updateAnswer);
  // server.put("/api/vote/:answerId", vote);
};

// async function vote(req, res, next) {
//   try {
//     const models = await loadModels();
//     const answer = await models.answer.findById(req.params.answerId);

//   }
// }

async function createAnswer(req, res, next) {
  try {
    const models = await loadModels();
    const question = await models.question.findById(req.params.questionId);
    if (!question) {
      res.status(404).send({ error: `Question with ID ${req.params.questionId} not found!` });
      return next();
    }
    const newAnswer = new models.answer({
      answerText: req.body.answerText,
      correctAnswer: req.body.correctAnswer,
      parent: question._id
    });

    question.answers.push(newAnswer);
    await question.save();
    await newAnswer.save();
    res.json(newAnswer);
    next();
  } catch (e) {
    res.status(500).send({ error: e.message });
    next(e);
  }
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

async function deleteAnswer(req, res, next) {
  try {
    const models = await loadModels();
    const answer = await models.answer.findById(req.params.answerId);
    if (!answer) {
      res.status(404).send({ error: `Answer with ID ${req.params.answerId} not found!` });
      return next();
    }
    const question = await models.question.findById(answer.parent);
    if (!question) {
      res.status(404).send({ error: `Question with ID ${answer.parent} not found!` });
      return next();
    }
    question.answers.remove(answer._id);
    answer.remove();
    await question.save();
    res.json({ success: "true" });
    next();
  } catch (e) {
    res.status(500).send({ error: e.message });
    next(e);
  }
}

async function updateAnswer(req, res, next) {
  try {
    const models = await loadModels();
    const answer = await models.answer.findOneAndUpdate({ _id: req.params.answerId }, req.body, { new: true });
    if (!answer) {
      res.status(404).send({ error: `Answer with ID ${req.params.answerId} not found!` });
      return next();
    }
    res.json(answer);
    next();
  } catch (e) {
    res.status(500).send({ error: e.message });
    next(e);
  }
}
