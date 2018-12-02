import { loadModels } from "../../data/models";

module.exports = function(server) {
  server.post("/api/student", createStudent);
  server.put("/api/student/:studentId", updateScore);
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

async function updateScore(req, res, next){
  try{
    const models = await loadModels();
    const student = await models.student.findOneAndUpdate({_id: req.params.studentId}, req.body, { new: true});
    if(!student){
      res.status(404).send({ error: `Student with ID ${req.params.studentId} not found!` });
      return next();
    }
    res.json(student);
    next();
  } catch (e) {
    res.status(500).send({ error: e.message });
    next(e);
  }
}
