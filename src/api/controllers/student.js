import { loadModels } from "../../data/models";

module.exports = function(server) {
  server.post("/api/student", createStudent);
  server.put("/api/student/:studentId", updateScore);
  server.get("/api/allStudents/:quizId", getAllStudents);
  server.delete("/api/allStudents/:quizId", deleteStudents);
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

async function getAllStudents(req, res, next){
  try {
    const models = await loadModels();
    const students = await models.student.find({ quizId: req.params.quizId }).sort('-score');
    res.json(students);
    next();
  } catch (e) {
    res.status(500).send({ error: e.message });
    next(e);
  }
}

async function deleteStudents(req, res, next){
  try {
    const models = await loadModels();
    const students = await models.student.find({ quizId: req.params.quizId })
    for (let student of students){
      student.remove()
    }
    res.json({ success: "true" });
    next();
  } catch (e) {
    res.status(500).send({ error: e.message });
    next(e);
  }
}
