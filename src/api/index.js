require("@babel/polyfill");
import restify from "restify";
import corsMiddleware from "restify-cors-middleware";

const server = restify.createServer({ accept: ["application/json"] });
const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ["*"],
  allowHeaders: ["API-Token"],
  exposeHeaders: ["API-Token-Expiry"]
});

server.pre(cors.preflight);
server.use(cors.actual);
server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.queryParser({ mapParams: false }));
server.use(restify.plugins.bodyParser({ mapParams: false }));

require("./controllers")(server);
server.listen(3004, () => {
  console.log("API listening on port 3004");
});

module.exports = server;
