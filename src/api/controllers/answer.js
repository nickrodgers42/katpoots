const db = require('../../data/db');

module.exports = function(server) {
  server.get('/answers/:answerId', getAnswer);
  server.post('/answers', createAnswer);
};

async function createAnswer(req, res, next) {
  const models = await db.connect();
  const answer = await new models.answer({ text: 'test' }).save();
  res.json(answer);
  next();
}

async function getAnswer(req, res, next) {
  const models = await db.connect();
  const answer = await models.answer.findById(req.params.answerId);
  res.json(answer);
  next();
}
