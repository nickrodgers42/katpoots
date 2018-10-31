const express = require('express');
import {_} from "lodash";
import {loadModels} from "../../data/models"
import { model } from 'mongoose';

module.exports = function(server) {
    server.delete('/api/question/:questionId', deleteQuestion);
    server.post('/api/question/:quizId', createQuestion);
    server.get('/api/question/:questionId', getQuestion);
    server.put('/api/question/:questionId', updateQuestion);
};

async function createQuestion(req, res, next){
    try{
        const models = await loadModels();
        const quiz = await models.quiz.findById(req.params.quizId);
        if (!quiz) {
            res.status(404).send({ error: `Quiz with ID ${req.params.quizId} not found!` });
            return next();
        }
        const newQuestion = new models.question({
            questionText: req.body.questionText,
            parent:quiz._id,
        });
        quiz.questions.push(newQuestion);
        await quiz.save();
        await newQuestion.save();
        res.json(newQuestion);
        next();
    }
    catch(e){
        res.status(500).send({ error: e.message });
        next(e);
    }
}

async function deleteQuestion(req, res, next){
    try{
        const models = await loadModels();
        const question = await models.question.findById(req.params.questionId);
        if (!question) {
            res.status(404).send({ error: `Question with ID ${req.params.questionId} not found!` });
            return next();
        }
        const quiz = await models.quiz.findById(question.parent);
        if (!quiz) {
            res.status(404).send({ error: `Quiz with ID ${question.parent} not found!` });
            return next();
        }
        quiz.questions.remove(_.pull(quiz.questions, question._id));
        question.remove();
        await quiz.save();
        res.json({"success":"true"});
        next();
    }
    catch(e){
        res.status(500).send({ error: e.message });
        next(e);
    }
}

async function getQuestion(req, res, next){
    try{
        const models = await loadModels();
        const question = await models.question.findById(req.params.questionId)
        .populate({
            path: "answers",
        });
        if (!question) {
            res.status(404).send({ error: `Question with ID ${questionId} not found!` });
            return next();
        }
        res.json(question);
        next();
    }   
    catch(e){
        res.status(500).send({ error: e.message });
        next(e);
    }
}

async function updateQuestion(req, res, next){
    try{
        const models = await loadModels();
        const question = await models.question.findOneAndUpdate(
            {_id:req.params.questionId},
            req.body,
            {new:true}
        )
        if (!question){
            res.status(404).send({ error: `Question with ID ${req.params.questionId} not found!` });
            return next();
        }
        res.json(question);
        next();
    }
    catch(e){
        res.status(500).send({ error: e.message });
        next(e);
    }
}