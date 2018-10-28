import { loadModels } from "../../data/models";
import { ensureLoggedIn } from "connect-ensure-login";

module.exports = function(server) {
  server.get("/api/answers/:answerId", getAnswer);
  server.post("/api/answers", ensureLoggedIn(), createAnswer);
};

async function createAnswer(req, res, next) {
  try {
    const models = await loadModels();
    const answer = await new models.answer({ text: "test" }).save();
    res.json(answer);
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
