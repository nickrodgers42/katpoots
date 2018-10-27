import { loadModels } from "../../data/models";

module.exports = function(server) {
  server.get("/api/answers/:answerId", getAnswer);
  server.post("/api/answers", createAnswer);
};

async function createAnswer(req, res, next) {
  const models = await loadModels();
  const answer = await new models.answer({ text: "test" }).save();
  res.json(answer);
  next();
}

async function getAnswer(req, res, next) {
  const models = await loadModels();
  const answer = await models.answer.findById(req.params.answerId);
  res.json(answer);
  next();
}
