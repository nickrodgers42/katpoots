require("@babel/polyfill");
import restify from "restify";

const server = restify.createServer({ accept: ["application/json"] });

server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.queryParser({ mapParams: false }));
server.use(restify.plugins.bodyParser({ mapParams: false }));

require("./controllers")(server);
server.listen(3004, () => {
  console.log("API listening on port 3004");
});

module.exports = server;
