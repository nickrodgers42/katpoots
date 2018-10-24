"use strict";

var _restify = _interopRequireDefault(require("restify"));

var _restifyCorsMiddleware = _interopRequireDefault(require("restify-cors-middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("@babel/polyfill");

var server = _restify.default.createServer({
  accept: ["application/json"]
});

var cors = (0, _restifyCorsMiddleware.default)({
  preflightMaxAge: 5,
  origins: ["*"],
  allowHeaders: ["API-Token"],
  exposeHeaders: ["API-Token-Expiry"]
});
server.pre(cors.preflight);
server.use(cors.actual);
server.pre(_restify.default.pre.sanitizePath());
server.use(_restify.default.plugins.queryParser({
  mapParams: false
}));
server.use(_restify.default.plugins.bodyParser({
  mapParams: false
}));

require("./controllers")(server);

server.listen(3004, function () {
  console.log("API listening on port 3004");
});
module.exports = server;