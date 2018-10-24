"use strict";

var _globPromise = _interopRequireDefault(require("glob-promise"));

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function load(_x) {
  return _load.apply(this, arguments);
}

function _load() {
  _load = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(server) {
    var filePaths;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _globPromise.default)('*.js', {
              cwd: __dirname
            });

          case 2:
            filePaths = _context.sent;
            filePaths.forEach(function (path) {
              var file = "".concat(__dirname, "/").concat(path);

              if (process.platform == "win32") {
                file = "".concat(__dirname, "\\").concat(path);
              }

              if (__filename === file) {
                return;
              }

              var controller = require(file);

              controller(server);
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _load.apply(this, arguments);
}

module.exports = load;