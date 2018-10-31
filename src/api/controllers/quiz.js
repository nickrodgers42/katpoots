import {loadModels} from "../../data/models"
import {_} from "lodash";

const express = require('express');

module.exports = function(server) {
    server.get("/api/quiz/:quizId/", getQuiz);
    server.post("/api/quiz/:userId/", createQuiz);
    server.delete('/api/quiz/:quizId', deleteQuiz);
    server.put('/api/quiz/:quizId/', updateQuiz)
};

async function getQuiz(req, res, next) {
    try{
        const models = await loadModels();
        const quiz = await models.quiz.findById(req.params.quizId)
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
    catch(e){
        res.status(500).send({ error: e.message });
        next(e);
    }
}

async function createQuiz(req, res, next){
    try{
        const models = await loadModels();
        const user = await models.user.findById(req.params.userId);
        if (!user) {
            res.status(404).send({ error: `User with ID ${req.params.userId} not found!` });
            return next();
        }
        const newQuiz = new models.quiz({
            quizTitle: req.body.quizTitle,
            parent:user._id
        });
        user.quizzes.push(newQuiz);
        await user.save();
        await newQuiz.save();
        res.json(newQuiz);
        next();
    }
        catch(e){
        res.status(500).send({ error: e.message });
        next(e);
    }
}

async function deleteQuiz(req, res, next){
    try{
        const models = await loadModels();
        const quiz = await models.quiz.findById(req.params.quizId);
        if (!quiz) {
            res.status(404).send({ error: `Quiz with ID ${req.params.quizId} not found!` });
            return next();
        }
        const user = await models.user.findById(quiz.parent);
        if (!user) {
            res.status(404).send({ error: `User with ID ${req.params.userId} not found!` });
            return next();
        }
        user.quizzes.remove(_.pull(user.quizzes, quiz._id));
        quiz.remove();
        await user.save();
        res.json({"success":"true"});
        next();
    }
    catch(e){
        res.status(500).send({ error: e.message });
        next(e);
    }
}

async function updateQuiz(req, res, next){
    try{
        const models = await loadModels();
        const quiz = await models.quiz.findOneAndUpdate(
            {_id:req.params.quizId},
            req.body,
            {new:true}
        )
        if (!quiz){
            res.status(404).send({ error: `Quiz with ID ${req.params.quizId} not found!` });
            return next();
        }
        res.json(quiz);
        next();
    }
    catch(e){
        res.status(500).send({ error: e.message });
        next(e);
    }
}