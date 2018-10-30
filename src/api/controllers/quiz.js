import {loadModels} from "../../data/models"

const express = require('express');

module.exports = function(server) {
    server.get("/api/quiz/:quizId/", getQuiz);
    server.post("/api/quiz/:userId/", createQuiz);
    server.delete('/api/quiz/:userId/:quizId', deleteQuiz);
    server.put('/api/quiz/:quizId/', updateQuiz)
};

async function getQuiz(req, res, next) {
    const models = await loadModels();
    const Quiz = await models.quiz;
    const quiz = await Quiz.findById(req.params.quizId)
    .populate({
        path: "questions",
        populate:{
            path: "answers",
        }
    });
    if (!quiz) {
        res.status(404).send({ error: `Quiz with ID ${quizId} not found!` });
        return next();
      }
    res.json(quiz);
    next();
}

async function createQuiz(req, res, next){
    const models = await loadModels();
    const User = await models.user;
    const Quiz = await models.quiz;
    const user = await User.findById(req.params.userId);
    const newQuiz = new Quiz({
        quizTitle: req.body.quizTitle,
    });
    user.quizzes.push(newQuiz);
    await user.save();
    await newQuiz.save();
    res.json(newQuiz);
    next();
}

async function deleteQuiz(req, res, next){
    const models = await loadModels();
    const User = await models.user;
    const Quiz = await models.quiz;
    const user = await User.findById(req.params.userId);
    if (!user) {
        res.status(404).send({ error: `User with ID ${req.params.userId} not found!` });
        return next();
    }
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
        res.status(404).send({ error: `Quiz with ID ${req.params.quizId} not found!` });
        return next();
    }
    user.quizzes.pop(quiz);
    quiz.remove();
    await user.save();
    res.json(user);
    next();
}

async function updateQuiz(req, res, next){
    const models = await loadModels();
    const Quiz = await models.quiz;
    const quiz = await Quiz.findOneAndUpdate(
        {_id:req.params.quizId},
        req.body,
        {new:true},
        (err) =>{
            if(err){
                res.send(err);
                next()
            }
        }
    )
    if (!quiz){
        res.status(404).send({ error: `Quiz with ID ${req.params.quizId} not found!` });
        return next();
    }
    res.json(quiz);
    next();
}