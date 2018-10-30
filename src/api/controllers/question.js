const express = require('express');

import {loadModels} from "../../data/models"
import { model } from 'mongoose';

module.exports = function(server) {
    server.delete('/api/question/:questionId', deleteQuestion);
    server.post('/api/question/:quizId', createQuestion);
    server.get('/api/question/:questionId', getQuestion);
    server.put('/api/question/:questionId', updateQuestion);
};

async function createQuestion(req, res, next){
    const models = await loadModels();
    const Quiz = await models.quiz;
    const Question = await models.question;
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
        res.status(404).send({ error: `Quiz with ID ${req.params.quizId} not found!` });
        return next();
    }
    const newQuestion = new Question({
        questionText: req.body.questionText,
        parent:quiz._id,
    });
    quiz.questions.push(newQuestion);
    await quiz.save();
    await newQuestion.save();
    res.json(newQuestion);
    next();
}

async function deleteQuestion(req, res, next){
    const models = await loadModels();
    const Quiz = await models.quiz;
    const Question = await models.question;
    const question = await Question.findById(req.params.questionId);
    if (!question) {
        res.status(404).send({ error: `Question with ID ${req.params.questionId} not found!` });
        return next();
    }
    const quiz = await Quiz.findById(question.parent);
    if (!quiz) {
        res.status(404).send({ error: `Quiz with ID ${question.parent} not found!` });
        return next();
    }
    quiz.questions.pop(question);
    question.remove();
    await quiz.save();
    res.json(quiz);
    next();
}

async function getQuestion(req, res, next){
    const models = await loadModels();
    const Question = await models.question;
    const question = await Question.findById(req.params.questionId)
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

async function updateQuestion(req, res, next){
    const models = await loadModels();
    const Question = await models.question;
    const question = await Question.findOneAndUpdate(
        {_id:req.params.questionId},
        req.body,
        {new:true},
        (err) =>{
            if(err){
                res.send(err);
                next();
            }
        }
    )
    if (!question){
        res.status(404).send({ error: `Question with ID ${req.params.questionId} not found!` });
        return next();
    }
    res.json(question);
    next();
}