import { loadModels } from "../../data/models";

module.exports = function(server) {
  server.post("/api/student", createStudent);
};

async function createStudent(req, res, next) {
  try {
    const models = await loadModels();
    const student = await new models.student(req.body).save();
    res.json(student.toObject());
    next();
  } catch (e) {
    res.status(500).send({ error: e.message });
    next(e);
  }
}
