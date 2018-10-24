"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var db = require('../../data/db');

module.exports = function (server) {
  server.get('/answers/:answerId', getAnswer);
  server.post('/answers', createAnswer);
};

function createAnswer(_x, _x2, _x3) {
  return _createAnswer.apply(this, arguments);
}

function _createAnswer() {
  _createAnswer = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var models, answer;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return db.connect();

          case 2:
            models = _context.sent;
            _context.next = 5;
            return new models.answer({
              text: 'test'
            }).save();

          case 5:
            answer = _context.sent;
            res.json(answer);
            next();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _createAnswer.apply(this, arguments);
}

function getAnswer(_x4, _x5, _x6) {
  return _getAnswer.apply(this, arguments);
}

function _getAnswer() {
  _getAnswer = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var models, answer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return db.connect();

          case 2:
            models = _context2.sent;
            _context2.next = 5;
            return models.answer.findById(req.params.answerId);

          case 5:
            answer = _context2.sent;
            res.json(answer);
            next();

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _getAnswer.apply(this, arguments);
}