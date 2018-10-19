const db = require("../../data/db");

module.exports = function(server) {
  server.get("/answers/:answerId", getAnswer);
  server.post("/answers", createAnswer);
};

async function createAnswer(req, res, next) {
  const models = await db.connect();
  const answer = await new models.answer({ text: "test" }).save();
  res.json(answer);
  next();
}

async function getAnswer(req, res, next) {
  console.log(req.params.answerId);
  res.send("hello world");
  next();
}
