"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadModels = loadModels;

var _globPromise = _interopRequireDefault(require("glob-promise"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function loadModels() {
  return _loadModels.apply(this, arguments);
}

function _loadModels() {
  _loadModels = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var modelPaths, models;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _globPromise.default)('*.js', {
              cwd: __dirname
            });

          case 2:
            modelPaths = _context2.sent;
            models = {};
            modelPaths.forEach(
            /*#__PURE__*/
            function () {
              var _ref = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(path) {
                var file, modelName;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        file = "".concat(__dirname, "/").concat(path);

                        if (process.platform == "win32") {
                          file = "".concat(__dirname, "\\").concat(path);
                        }

                        if (!(__filename === file)) {
                          _context.next = 4;
                          break;
                        }

                        return _context.abrupt("return");

                      case 4:
                        modelName = path.split('.')[0];
                        _context.next = 7;
                        return _mongoose.default.model(modelName, require(file));

                      case 7:
                        models[modelName] = _context.sent;

                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }());
            return _context2.abrupt("return", models);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _loadModels.apply(this, arguments);
}